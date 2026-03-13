/**
 * Sub-Store 脚本：完全还原 OpenClash 逻辑版
 */

function operator(config) {
  const { proxies } = config;
  const allProxyNames = proxies.map((p) => p.name);

  // 1. 地区节点筛选逻辑 (完全对应你的正则)
  const filter = (regex) => {
    const r = new RegExp(regex, "i");
    const result = allProxyNames.filter((n) => r.test(n));
    return result.length > 0 ? result : ["DIRECT"];
  };

  // 2. 策略组设置 (完全还原你的手动选择顺序和逻辑)
  const proxyGroups = [
    {
      name: "🚀 手动选择",
      type: "select",
      proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"]
    },
    {
      name: "🚀 手动选择2",
      type: "select",
      proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"]
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
    // --- 地区组 ---
    { name: "🇭🇰 香港节点", type: "url-test", proxies: filter("(港|HK|hk|Hong Kong|HongKong|hongkong|深港)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇺🇸 美国节点", type: "url-test", proxies: filter("(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States|UnitedStates)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇯🇵 日本节点", type: "url-test", proxies: filter("(日本|川日|东京|大阪|泉日|埼玉|沪日|深日|(?<!尼|-)日|JP|Japan|🇯🇵)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇸🇬 新加坡节点", type: "url-test", proxies: filter("(新加坡|坡|狮城|SG|Singapore)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇼🇸 台湾节点", type: "url-test", proxies: filter("(台|新北|彰化|TW|Taiwan)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇰🇷 韩国节点", type: "url-test", proxies: filter("(KR|Korea|KOR|首尔|韩|韓)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇨🇦 加拿大节点", type: "url-test", proxies: filter("(加拿大|Canada|渥太华|温哥华|卡尔加里)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇬🇧 英国节点", type: "url-test", proxies: filter("(英国|Britain|United Kingdom|England|伦敦)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇫🇷 法国节点", type: "url-test", proxies: filter("(法国|France|巴黎)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇩🇪 德国节点", type: "url-test", proxies: filter("(德国|Germany|柏林|法兰克福)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇳🇱 荷兰节点", type: "url-test", proxies: filter("(荷兰|Netherlands|阿姆斯特丹)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇹🇷 土耳其节点", type: "url-test", proxies: filter("(土耳其|Turkey|Türkiye)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🏠 家宽节点", type: "url-test", proxies: filter("(家宽|家庭宽带|住宅)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🌐 其他地区", type: "url-test", proxies: allProxyNames, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    
    // --- 还原功能分组 ---
    { name: "💰 加密货币", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇼🇸 台湾节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇰🇷 韩国节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "📹 YouTube", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🚀 GitHub", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🤖 AI服务", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇭🇰 香港节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "📦 模型下载", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇭🇰 香港节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "🤖 ChatGPT", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇬🇧 英国节点", "🌐 其他地区"] },
    { name: "🤖 Copilot", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇭🇰 香港节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "💬 即时通讯", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🌐 社交媒体", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🎥 Netflix", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    // --- 还原兜底 ---
    { name: "🔀 非标端口", type: "select", proxies: ["DIRECT", "🐟 漏网之鱼"] },
    { name: "🐟 漏网之鱼", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🎯 全球直连", type: "select", proxies: ["DIRECT"] }
  ];

  // 3. 还原所有规则 (完全匹配你要求的域名和关键词)
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
    "GEOSITE,bitget,💰 加密货币",
    "DOMAIN-KEYWORD,huggingface,📦 模型下载",
    "DOMAIN-SUFFIX,huggingface.co,📦 模型下载",
    "DOMAIN-SUFFIX,hf.co,📦 模型下载",
    "DOMAIN-KEYWORD,civitai,📦 模型下载",
    "DOMAIN-SUFFIX,civitai.com,📦 模型下载",
    "DOMAIN-KEYWORD,lmstudio,📦 模型下载",
    "DOMAIN-SUFFIX,lmstudio.ai,📦 模型下载",
    "GEOSITE,private,🎯 全球直连",
    "GEOIP,private,🎯 全球直连,no-resolve",
    "GEOSITE,openai,🤖 ChatGPT",
    "GEOSITE,bing,🤖 Copilot",
    "GEOSITE,category-communication,💬 即时通讯",
    "GEOSITE,category-social-media-!cn,🌐 社交媒体",
    "GEOSITE,github,🚀 GitHub",
    "GEOSITE,youtube,📹 YouTube",
    "GEOSITE,netflix,🎥 Netflix",
    "GEOSITE,category-ai-!cn,🤖 AI服务",
    "GEOSITE,cn,🎯 全球直连",
    "GEOIP,cn,🎯 全球直连,no-resolve",
    "FINAL,🐟 漏网之鱼"
  ];

  // 4. 使用严格合并，防止 Sub-Store 输出空白
  return {
    ...config,
    "proxy-groups": proxyGroups,
    "rules": rules
  };
}
