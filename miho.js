const _ = require('lodash');

/**
 * 完全参考 powerfullz 骨架还原版
 * 修复：解决 Sub-Store 运行空白及规则丢失问题
 */

function operator(config) {
  const { proxies } = config;
  const proxyNames = _.map(proxies, 'name');

  // --- 筛选辅助函数 ---
  const getGroupProxies = (reg) => {
    const r = new RegExp(reg, 'i');
    const matched = _.filter(proxyNames, (name) => r.test(name));
    return matched.length > 0 ? matched : ['DIRECT'];
  };

  // --- 1. 地区自动分组逻辑 ---
  const regionGroups = [
    { name: "🇭🇰 香港节点", regex: "(港|HK|hk|Hong Kong|HongKong|hongkong|深港)" },
    { name: "🇺🇸 美国节点", regex: "(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States|UnitedStates)" },
    { name: "🇯🇵 日本节点", regex: "(日本|川日|东京|大阪|泉日|埼玉|沪日|深日|(?<!尼|-)日|JP|Japan|🇯🇵)" },
    { name: "🇸🇬 新加坡节点", regex: "(新加坡|坡|狮城|SG|Singapore)" },
    { name: "🇼🇸 台湾节点", regex: "(台|新北|彰化|TW|Taiwan)" },
    { name: "🇰🇷 韩国节点", regex: "(KR|Korea|KOR|首尔|韩|韓)" },
    { name: "🇨🇦 加拿大节点", regex: "(加拿大|Canada|渥太华|温哥华|卡尔加里)" },
    { name: "🇬🇧 英国节点", regex: "(英国|Britain|United Kingdom|England|伦敦)" },
    { name: "🇫🇷 法国节点", regex: "(法国|France|巴黎)" },
    { name: "🇩🇪 德国节点", regex: "(德国|Germany|柏林|法兰克福)" },
    { name: "🇳🇱 荷兰节点", regex: "(荷兰|Netherlands|阿姆斯特丹)" },
    { name: "🇹🇷 土耳其节点", regex: "(土耳其|Turkey|Türkiye)" },
    { name: "🏠 家宽节点", regex: "(家宽|家庭宽带|住宅)" }
  ].map(g => ({
    name: g.name,
    type: "url-test",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    tolerance: 50,
    proxies: getGroupProxies(g.regex)
  }));

  // --- 2. 策略组结构 ---
  const groups = [
    { name: "🚀 手动选择", type: "select", proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", ..._.map(regionGroups, 'name'), "🌐 其他地区"] },
    { name: "🚀 手动选择2", type: "select", proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", ..._.map(regionGroups, 'name'), "🌐 其他地区"] },
    { name: "♻️ 自动选择", type: "url-test", proxies: proxyNames, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "⚖️ 负载均衡-轮询", type: "load-balance", proxies: proxyNames, url: "http://www.google.com/generate_204", interval: 300, strategy: "round-robin" },
    { name: "⚖️ 负载均衡-散列", type: "load-balance", proxies: proxyNames, url: "http://www.google.com/generate_204", interval: 300, strategy: "consistent-hashing" },
    { name: "🌐 其他地区", type: "url-test", proxies: proxyNames, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    
    // 💰 加密货币 (保持 100% 还原)
    { name: "💰 加密货币", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇼🇸 台湾节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇰🇷 韩国节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "📹 YouTube", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🚀 GitHub", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🤖 AI服务", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点"] },
    { name: "📦 模型下载", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇺🇸 美国节点", "🇯🇵 日本节点", "DIRECT"] },
    { name: "🤖 ChatGPT", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点"] },
    { name: "🤖 Copilot", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇺🇸 美国节点", "🇭🇰 香港节点", "DIRECT"] },
    { name: "💬 即时通讯", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🌐 社交媒体", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    
    ...regionGroups,

    { name: "🔀 非标端口", type: "select", proxies: ["DIRECT", "🐟 漏网之鱼"] },
    { name: "🐟 漏网之鱼", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "DIRECT"] },
    { name: "🎯 全球直连", type: "select", proxies: ["DIRECT"] }
  ];

  // --- 3. 规则集还原 ---
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
    "GEOSITE,bing,🤖 Copilot",
    "GEOSITE,category-communication,💬 即时通讯",
    "GEOSITE,github,🚀 GitHub",
    "GEOSITE,youtube,📹 YouTube",
    "GEOSITE,category-ai-!cn,🤖 AI服务",
    "GEOSITE,cn,🎯 全球直连",
    "GEOIP,cn,🎯 全球直连,no-resolve",
    "FINAL,🐟 漏网之鱼"
  ];

  // --- 4. 修改 config ---
  config['proxy-groups'] = groups;
  config['rules'] = rules;

  return config;
}

// 核心：使用 module.exports 导出 (对齐 powerfullz)
module.exports = { operator };
