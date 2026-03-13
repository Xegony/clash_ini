/**
 * Sub-Store 兼容性修复脚本 (Mihomo 专用)
 */

function operator(config) {
  // 1. 确保获取到节点列表，防止脚本报错中断导致空白
  if (!config.proxies) return config;
  
  const allProxies = config.proxies.map(p => p.name);
  if (allProxies.length === 0) return config;

  // 2. 定义筛选函数 (使用原始正则)
  const filterNodes = (regex) => {
    const r = new RegExp(regex, "i");
    const result = allProxies.filter(name => r.test(name));
    return result.length > 0 ? result : ["DIRECT"];
  };

  // 3. 构建策略组 (完全还原原始逻辑与正则)
  const groups = [
    { name: "🚀 手动选择", type: "select", proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "🚀 手动选择2", type: "select", proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "♻️ 自动选择", type: "url-test", proxies: allProxies, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "⚖️ 负载均衡-轮询", type: "load-balance", proxies: allProxies, url: "http://www.google.com/generate_204", interval: 300, strategy: "round-robin" },
    { name: "⚖️ 负载均衡-散列", type: "load-balance", proxies: allProxies, url: "http://www.google.com/generate_204", interval: 300, strategy: "consistent-hashing" },
    
    // 功能分组
    { name: "💰 加密货币", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "🇼🇸 台湾节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "DIRECT"] },
    { name: "📹 YouTube", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🚀 GitHub", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🤖 AI服务", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点"] },
    { name: "📦 模型下载", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇺🇸 美国节点", "🇯🇵 日本节点", "DIRECT"] },
    { name: "🤖 ChatGPT", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点"] },
    { name: "🤖 Copilot", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇺🇸 美国节点", "🇭🇰 香港节点", "DIRECT"] },
    { name: "💬 即时通讯", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    { name: "🌐 社交媒体", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"] },
    
    // 地区正则组 (原始正则)
    { name: "🇭🇰 香港节点", type: "url-test", proxies: filterNodes("(港|HK|hk|Hong Kong|HongKong|hongkong|深港)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇺🇸 美国节点", type: "url-test", proxies: filterNodes("(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States|UnitedStates)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇯🇵 日本节点", type: "url-test", proxies: filterNodes("(日本|川日|东京|大阪|泉日|埼玉|沪日|深日|(?<!尼|-)日|JP|Japan|🇯🇵)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇸🇬 新加坡节点", type: "url-test", proxies: filterNodes("(新加坡|坡|狮城|SG|Singapore)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇼🇸 台湾节点", type: "url-test", proxies: filterNodes("(台|新北|彰化|TW|Taiwan)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇰🇷 韩国节点", type: "url-test", proxies: filterNodes("(KR|Korea|KOR|首尔|韩|韓)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇨🇦 加拿大节点", type: "url-test", proxies: filterNodes("(加拿大|Canada|渥太华|温哥华|卡尔加里)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇬🇧 英国节点", type: "url-test", proxies: filterNodes("(英国|Britain|United Kingdom|England|伦敦)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇫🇷 法国节点", type: "url-test", proxies: filterNodes("(法国|France|巴黎)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇩🇪 德国节点", type: "url-test", proxies: filterNodes("(德国|Germany|柏林|法兰克福)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇳🇱 荷兰节点", type: "url-test", proxies: filterNodes("(荷兰|Netherlands|阿姆斯特丹)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇹🇷 土耳其节点", type: "url-test", proxies: filterNodes("(土耳其|Turkey|Türkiye)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🏠 家宽节点", type: "url-test", proxies: filterNodes("(家宽|家庭宽带|住宅)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🌐 其他地区", type: "url-test", proxies: allProxies, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },

    { name: "🐟 漏网之鱼", type: "select", proxies: ["🚀 手动选择", "DIRECT"] },
    { name: "🎯 全球直连", type: "select", proxies: ["DIRECT"] }
  ];

  // 4. 定义规则 (还原你要求的 Keyword/Suffix 规则)
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
    "GEOSITE,github,🚀 GitHub",
    "GEOSITE,youtube,📹 YouTube",
    "GEOSITE,category-ai-!cn,🤖 AI服务",
    "GEOSITE,cn,🎯 全球直连",
    "GEOIP,cn,🎯 全球直连,no-resolve",
    "FINAL,🐟 漏网之鱼"
  ];

  // 5. 直接修改 config 并返回
  config["proxy-groups"] = groups;
  config["rules"] = rules;

  return config;
}
