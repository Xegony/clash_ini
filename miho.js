/**
 * Sub-Store 原生 JS 脚本
 * 移除所有 lodash 依赖，兼容性最强版本
 */

function operator(config) {
  // 1. 获取并检查节点列表
  const proxies = config.proxies || [];
  if (proxies.length === 0) return config;

  const proxyNames = proxies.map(p => p.name);

  // 2. 筛选函数 (原生实现)
  const getGroupProxies = (regexStr) => {
    const r = new RegExp(regexStr, "i");
    const matched = proxyNames.filter(name => r.test(name));
    return matched.length > 0 ? matched : ["DIRECT"];
  };

  // 3. 地区自动分组逻辑 (使用你的原始正则)
  const regions = [
    { name: "🇭🇰 香港节点", reg: "(港|HK|hk|Hong Kong|HongKong|hongkong|深港)" },
    { name: "🇺🇸 美国节点", reg: "(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States|UnitedStates)" },
    { name: "🇯🇵 日本节点", reg: "(日本|川日|东京|大阪|泉日|埼玉|沪日|深日|(?<!尼|-)日|JP|Japan|🇯🇵)" },
    { name: "🇸🇬 新加坡节点", reg: "(新加坡|坡|狮城|SG|Singapore)" },
    { name: "🇼🇸 台湾节点", reg: "(台|新北|彰化|TW|Taiwan)" },
    { name: "🇰🇷 韩国节点", reg: "(KR|Korea|KOR|首尔|韩|韓)" },
    { name: "🇨🇦 加拿大节点", reg: "(加拿大|Canada|渥太华|温哥华|卡尔加里)" },
    { name: "🇬🇧 英国节点", reg: "(英国|Britain|United Kingdom|England|伦敦)" },
    { name: "🇫🇷 法国节点", reg: "(法国|France|巴黎)" },
    { name: "🇩🇪 德国节点", reg: "(德国|Germany|柏林|法兰克福)" },
    { name: "🇳🇱 荷兰节点", reg: "(荷兰|Netherlands|阿姆斯特丹)" },
    { name: "🇹🇷 土耳其节点", reg: "(土耳其|Turkey|Türkiye)" },
    { name: "🏠 家宽节点", reg: "(家宽|家庭宽带|住宅)" }
  ].map(g => ({
    name: g.name,
    type: "url-test",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    tolerance: 50,
    proxies: getGroupProxies(g.reg)
  }));

  const regionNames = regions.map(g => g.name);

  // 4. 构建策略组 (完全还原原始逻辑)
  const groups = [
    { name: "🚀 手动选择", type: "select", proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列"].concat(regionNames).concat(["🌐 其他地区"]) },
    { name: "🚀 手动选择2", type: "select", proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列"].concat(regionNames).concat(["🌐 其他地区"]) },
    { name: "♻️ 自动选择", type: "url-test", proxies: proxyNames, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "⚖️ 负载均衡-轮询", type: "load-balance", proxies: proxyNames, url: "http://www.google.com/generate_204", interval: 300, strategy: "round-robin" },
    { name: "⚖️ 负载均衡-散列", type: "load-balance", proxies: proxyNames, url: "http://www.google.com/generate_204", interval: 300, strategy: "consistent-hashing" },
    { name: "🌐 其他地区", type: "url-test", proxies: proxyNames, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    
    // 加密货币
    { name: "💰 加密货币", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇼🇸 台湾节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇰🇷 韩国节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    // 模型下载
    { name: "📦 模型下载", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "DIRECT"] },
    
    { name: "📹 YouTube", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🚀 GitHub", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🤖 AI服务", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点"] },
    { name: "🤖 ChatGPT", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点"] },
    { name: "💬 即时通讯", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    
    // 展开地区组
    ...regions,

    { name: "🔀 非标端口", type: "select", proxies: ["DIRECT", "🐟 漏网之鱼"] },
    { name: "🐟 漏网之鱼", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "DIRECT"] },
    { name: "🎯 全球直连", type: "select", proxies: ["DIRECT"] }
  ];

  // 5. 还原规则
  const rules = [
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
    "DOMAIN-KEYWORD,huggingface,📦 模型下载",
    "DOMAIN-SUFFIX,huggingface.co,📦 模型下载",
    "DOMAIN-SUFFIX,hf.co,📦 模型下载",
    "DOMAIN-KEYWORD,civitai,📦 模型下载",
    "DOMAIN-SUFFIX,civitai.com,📦 模型下载",
    "DOMAIN-KEYWORD,lmstudio,📦 模型下载",
    "DOMAIN-SUFFIX,lmstudio.ai,📦 模型下载",
    "GEOSITE,openai,🤖 ChatGPT",
    "GEOSITE,github,🚀 GitHub",
    "GEOSITE,youtube,📹 YouTube",
    "GEOSITE,cn,🎯 全球直连",
    "GEOIP,cn,🎯 全球直连,no-resolve",
    "FINAL,🐟 漏网之鱼"
  ];

  // 6. 赋值并返回
  config["proxy-groups"] = groups;
  config["rules"] = rules;

  return config;
}
