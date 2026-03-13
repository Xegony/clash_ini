/**
 * 基于 Powerfullz 逻辑修复的 Sub-Store 脚本
 * 功能：注入 OpenClash 策略组逻辑及加密货币、模型下载规则
 */

function operator(config) {
  const { proxies } = config;
  const allProxyNames = proxies.map((p) => p.name);

  // --- 辅助函数：根据正则获取节点名 ---
  const getGroupProxies = (regexStr, fallback = ["DIRECT"]) => {
    const regex = new RegExp(regexStr, "i");
    const filtered = allProxyNames.filter((name) => regex.test(name));
    return filtered.length > 0 ? filtered : fallback;
  };

  // --- 1. 定义地区自动测速组 ---
  const regionGroups = [
    { name: "🇭🇰 香港节点", regex: "(港|HK|Hong Kong|HongKong|深港)" },
    { name: "🇺🇸 美国节点", regex: "(美|波特兰|洛杉矶|圣何塞|西雅图|US|United States)" },
    { name: "🇯🇵 日本节点", regex: "(日本|东京|大阪|JP|Japan)" },
    { name: "🇸🇬 新加坡节点", regex: "(新加坡|坡|狮城|SG|Singapore)" },
    { name: "🇼🇸 台湾节点", regex: "(台|TW|Taiwan)" },
    { name: "🇰🇷 韩国节点", regex: "(KR|Korea|首尔|韩)" },
    { name: "🇨🇦 加拿大节点", regex: "(加拿大|Canada)" },
    { name: "🇬🇧 英国节点", regex: "(英国|Britain|London)" },
    { name: "🇫🇷 法国节点", regex: "(法国|France)" },
    { name: "🇩🇪 德国节点", regex: "(德国|Germany)" },
    { name: "🇳🇱 荷兰节点", regex: "(荷兰|Netherlands)" },
    { name: "🇹🇷 土耳其节点", regex: "(土耳其|Turkey)" },
    { name: "🏠 家宽节点", regex: "(家宽|家庭宽带|住宅)" }
  ].map(g => ({
    name: g.name,
    type: "url-test",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    tolerance: 50,
    proxies: getGroupProxies(g.regex)
  }));

  // --- 2. 定义核心逻辑策略组 ---
  const mainGroups = [
    {
      name: "🚀 手动选择",
      type: "select",
      proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", ...regionGroups.map(g => g.name), "🌐 其他地区"]
    },
    {
      name: "🚀 手动选择2",
      type: "select",
      proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", ...regionGroups.map(g => g.name), "🌐 其他地区"]
    },
    {
      name: "♻️ 自动选择",
      type: "url-test",
      url: "https://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      proxies: allProxyNames
    },
    {
      name: "⚖️ 负载均衡-轮询",
      type: "load-balance",
      url: "http://www.google.com/generate_204",
      interval: 300,
      strategy: "round-robin",
      proxies: allProxyNames
    },
    {
      name: "⚖️ 负载均衡-散列",
      type: "load-balance",
      url: "http://www.google.com/generate_204",
      interval: 300,
      strategy: "consistent-hashing",
      proxies: allProxyNames
    },
    {
      name: "🌐 其他地区",
      type: "url-test",
      url: "https://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      proxies: allProxyNames
    }
  ];

  // --- 3. 定义功能分组 ---
  const functionalGroups = [
    { name: "💰 加密货币", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "🇼🇸 台湾节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "DIRECT"] },
    { name: "📹 YouTube", type: "select", proxies: ["🚀 手动选择", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🚀 GitHub", type: "select", proxies: ["🚀 手动选择", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🤖 AI服务", type: "select", proxies: ["🚀 手动选择", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点"] },
    { name: "📦 模型下载", type: "select", proxies: ["🚀 手动选择", "🇺🇸 美国节点", "🇯🇵 日本节点", "DIRECT"] },
    { name: "🤖 ChatGPT", type: "select", proxies: ["🚀 手动选择", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点"] },
    { name: "💬 即时通讯", type: "select", proxies: ["🚀 手动选择", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🐟 漏网之鱼", type: "select", proxies: ["🚀 手动选择", "DIRECT"] }
  ];

  // --- 4. 组装所有策略组 ---
  config["proxy-groups"] = [
    ...mainGroups,
    ...functionalGroups,
    ...regionGroups
  ];

  // --- 5. 定义规则 (完全对标你要求的 OpenClash 逻辑) ---
  config["rules"] = [
    "DOMAIN-KEYWORD,binance,💰 加密货币",
    "DOMAIN-SUFFIX,binance.com,💰 加密货币",
    "DOMAIN-SUFFIX,binance.me,💰 加密货币",
    "DOMAIN-SUFFIX,bnbstatic.com,💰 加密货币",
    "DOMAIN-KEYWORD,okx,💰 加密货币",
    "DOMAIN-SUFFIX,okx.com,💰 加密货币",
    "DOMAIN-SUFFIX,okx.org,💰 加密货币",
    "DOMAIN-SUFFIX,okex.com,💰 加密货币",
    "DOMAIN-SUFFIX,bitget.com,💰 加密货币",
    "GEOSITE,binance,💰 加密货币",
    "GEOSITE,okx,💰 加密货币",
    "GEOSITE,bitget,💰 加密货币",
    "DOMAIN-KEYWORD,huggingface,📦 模型下载",
    "DOMAIN-SUFFIX,huggingface.co,📦 模型下载",
    "DOMAIN-SUFFIX,hf.co,📦 模型下载",
    "DOMAIN-KEYWORD,civitai,📦 模型下载",
    "DOMAIN-SUFFIX,civitai.com,📦 模型下载",
    "DOMAIN-KEYWORD,lmstudio,📦 模型下载",
    "DOMAIN-SUFFIX,lmstudio.ai,📦 模型下载",
    "GEOSITE,openai,🤖 ChatGPT",
    "GEOSITE,category-communication,💬 即时通讯",
    "GEOSITE,github,🚀 GitHub",
    "GEOSITE,youtube,📹 YouTube",
    "GEOSITE,category-ai-!cn,🤖 AI服务",
    "GEOSITE,cn,DIRECT",
    "GEOIP,cn,DIRECT,no-resolve",
    "FINAL,🐟 漏网之鱼"
  ];

  return config;
}
