/**
 * 修复版 Sub-Store Script
 * 适用对象：Mihomo (Clash Meta) 配置生成
 */

function operator(config) {
  // --- 1. 获取所有节点名称 ---
  const allProxies = config.proxies ? config.proxies.map(p => p.name) : [];
  
  if (allProxies.length === 0) {
    return config; // 如果没有节点，直接返回原配置避免空白
  }

  // --- 2. 辅助函数：根据正则过滤节点 ---
  const filterNodes = (regexStr) => {
    const regex = new RegExp(regexStr, "i");
    const filtered = allProxies.filter(name => regex.test(name));
    return filtered.length > 0 ? filtered : ["DIRECT"]; 
  };

  // --- 3. 定义策略组 ---
  // 这里我们手动构造所有策略组
  const groups = [
    { name: "🚀 手动选择", type: "select", proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "🚀 手动选择2", type: "select", proxies: ["♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "♻️ 自动选择", type: "url-test", proxies: allProxies, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "⚖️ 负载均衡-轮询", type: "load-balance", proxies: allProxies, url: "http://www.google.com/generate_204", interval: 300, strategy: "round-robin" },
    { name: "⚖️ 负载均衡-散列", type: "load-balance", proxies: allProxies, url: "http://www.google.com/generate_204", interval: 300, strategy: "consistent-hashing" },
    
    // 功能组（手动加入节点池或跳转到其他策略组）
    { name: "💰 加密货币", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "🇼🇸 台湾节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "DIRECT"] },
    { name: "📹 YouTube", type: "select", proxies: ["🚀 手动选择", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "DIRECT"] },
    { name: "🚀 GitHub", type: "select", proxies: ["🚀 手动选择", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "DIRECT"] },
    { name: "🤖 AI服务", type: "select", proxies: ["🚀 手动选择", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇰🇷 韩国节点"] },
    { name: "📦 模型下载", type: "select", proxies: ["🚀 手动选择", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "DIRECT"] },
    { name: "🤖 ChatGPT", type: "select", proxies: ["🚀 手动选择", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点"] },
    { name: "💬 即时通讯", type: "select", proxies: ["🚀 手动选择", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇸🇬 新加坡节点", "DIRECT"] },
    
    // 地区正则自动分组
    { name: "🇭🇰 香港节点", type: "url-test", proxies: filterNodes("(港|HK|Hong Kong|HongKong|深港)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇺🇸 美国节点", type: "url-test", proxies: filterNodes("(美|波特兰|洛杉矶|圣何塞|西雅图|US|United States)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇯🇵 日本节点", type: "url-test", proxies: filterNodes("(日本|东京|大阪|JP|Japan)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇸🇬 新加坡节点", type: "url-test", proxies: filterNodes("(新加坡|坡|狮城|SG|Singapore)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇼🇸 台湾节点", type: "url-test", proxies: filterNodes("(台|TW|Taiwan)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇰🇷 韩国节点", type: "url-test", proxies: filterNodes("(KR|Korea|首尔|韩)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇨🇦 加拿大节点", type: "url-test", proxies: filterNodes("(加拿大|Canada)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇬🇧 英国节点", type: "url-test", proxies: filterNodes("(英国|Britain|London)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇫🇷 法国节点", type: "url-test", proxies: filterNodes("(法国|France)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇩🇪 德国节点", type: "url-test", proxies: filterNodes("(德国|Germany)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇳🇱 荷兰节点", type: "url-test", proxies: filterNodes("(荷兰|Netherlands)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇹🇷 土耳其节点", type: "url-test", proxies: filterNodes("(土耳其|Turkey)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🏠 家宽节点", type: "url-test", proxies: filterNodes("(家宽|家庭宽带|住宅)"), url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🌐 其他地区", type: "url-test", proxies: allProxies, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    
    // 兜底
    { name: "🐟 漏网之鱼", type: "select", proxies: ["🚀 手动选择", "DIRECT"] }
  ];

  // --- 4. 写入规则 ---
  const rules = [
    "DOMAIN-KEYWORD,binance,💰 加密货币",
    "DOMAIN-SUFFIX,binance.com,💰 加密货币",
    "DOMAIN-SUFFIX,okx.com,💰 加密货币",
    "GEOSITE,binance,💰 加密货币",
    "GEOSITE,okx,💰 加密货币",
    "GEOSITE,openai,🤖 ChatGPT",
    "GEOSITE,category-communication,💬 即时通讯",
    "GEOSITE,github,🚀 GitHub",
    "GEOSITE,youtube,📹 YouTube",
    "GEOSITE,category-ai-!cn,🤖 AI服务",
    "DOMAIN-KEYWORD,huggingface,📦 模型下载",
    "GEOSITE,cn,DIRECT",
    "GEOIP,cn,DIRECT,no-resolve",
    "FINAL,🐟 漏网之鱼"
  ];

  // --- 5. 替换原本的配置结构 ---
  config["proxy-groups"] = groups;
  config["rules"] = rules;

  return config;
}
