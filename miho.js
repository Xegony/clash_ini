function operator(config, {
  load
}) {
  const _ = load('lodash')
  const {
    proxies
  } = config
  const proxyNames = _.map(proxies, 'name')

  // --- 筛选函数 ---
  const getGroupProxies = (reg) => {
    const r = new RegExp(reg, 'i')
    const matched = _.filter(proxyNames, (name) => r.test(name))
    return matched.length > 0 ? matched : ['DIRECT']
  }

  // --- 1. 地区自动分组 (移除 Emoji) ---
  const regionGroups = [
    { name: "HK-Group", regex: "(港|HK|hk|Hong Kong|HongKong|hongkong|深港)" },
    { name: "US-Group", regex: "(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States|UnitedStates)" },
    { name: "JP-Group", regex: "(日本|川日|东京|大阪|泉日|埼玉|沪日|深日|(?<!尼|-)日|JP|Japan)" },
    { name: "SG-Group", regex: "(新加坡|坡|狮城|SG|Singapore)" },
    { name: "TW-Group", regex: "(台|新北|彰化|TW|Taiwan)" },
    { name: "KR-Group", regex: "(KR|Korea|KOR|首尔|韩|韓)" },
    { name: "CA-Group", regex: "(加拿大|Canada|渥太华|温哥华|卡尔加里)" },
    { name: "GB-Group", regex: "(英国|Britain|United Kingdom|England|伦敦)" },
    { name: "FR-Group", regex: "(法国|France|巴黎)" },
    { name: "DE-Group", regex: "(德国|Germany|柏林|法兰克福)" },
    { name: "NL-Group", regex: "(荷兰|Netherlands|阿姆斯特丹)" },
    { name: "TR-Group", regex: "(土耳其|Turkey|Türkiye)" },
    { name: "Residential-Group", regex: "(家宽|家庭宽带|住宅)" }
  ].map(g => ({
    name: g.name,
    type: "url-test",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    tolerance: 50,
    proxies: getGroupProxies(g.regex)
  }))

  const regionNames = _.map(regionGroups, 'name')

  // --- 2. 策略组 (纯文本名称) ---
  const groups = [
    { name: "Proxy", type: "select", proxies: ["Auto-Test", "Load-Balance-Round-Robin", "Load-Balance-Hashing", ...regionNames, "Others"] },
    { name: "Proxy-Backup", type: "select", proxies: ["Auto-Test", "Load-Balance-Round-Robin", "Load-Balance-Hashing", ...regionNames, "Others"] },
    { name: "Auto-Test", type: "url-test", proxies: proxyNames, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "Load-Balance-Round-Robin", type: "load-balance", proxies: proxyNames, url: "http://www.google.com/generate_204", interval: 300, strategy: "round-robin" },
    { name: "Load-Balance-Hashing", type: "load-balance", proxies: proxyNames, url: "http://www.google.com/generate_204", interval: 300, strategy: "consistent-hashing" },
    { name: "Others", type: "url-test", proxies: proxyNames, url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    
    // 功能组
    { name: "Crypto", type: "select", proxies: ["Proxy", "Proxy-Backup", "Auto-Test", "TW-Group", "JP-Group", "SG-Group", "HK-Group", "DIRECT"] },
    { name: "YouTube", type: "select", proxies: ["Proxy", "SG-Group", "HK-Group", "US-Group", "DIRECT"] },
    { name: "GitHub", type: "select", proxies: ["Proxy", "HK-Group", "US-Group", "DIRECT"] },
    { name: "AI-Services", type: "select", proxies: ["Proxy", "US-Group", "JP-Group", "SG-Group"] },
    { name: "Model-Download", type: "select", proxies: ["Proxy", "US-Group", "JP-Group", "DIRECT"] },
    { name: "ChatGPT", type: "select", proxies: ["Proxy", "US-Group", "JP-Group"] },
    { name: "Telegram", type: "select", proxies: ["Proxy", "HK-Group", "US-Group", "DIRECT"] },
    
    ...regionGroups,

    { name: "Final", type: "select", proxies: ["Proxy", "DIRECT"] },
    { name: "DIRECT", type: "select", proxies: ["DIRECT"] }
  ]

  // --- 3. 规则集 (对应纯文本组名) ---
  const rules = [
    "DOMAIN-KEYWORD,binance,Crypto",
    "DOMAIN-SUFFIX,binance.com,Crypto",
    "DOMAIN-SUFFIX,binance.me,Crypto",
    "DOMAIN-SUFFIX,bnbstatic.com,Crypto",
    "DOMAIN-KEYWORD,okx,Crypto",
    "DOMAIN-SUFFIX,okx.com,Crypto",
    "DOMAIN-SUFFIX,okx.org,Crypto",
    "DOMAIN-SUFFIX,okex.com,Crypto",
    "DOMAIN-SUFFIX,bitget.com,Crypto",
    "GEOSITE,binance,Crypto",
    "GEOSITE,okx,Crypto",
    "DOMAIN-KEYWORD,huggingface,Model-Download",
    "DOMAIN-SUFFIX,huggingface.co,Model-Download",
    "DOMAIN-SUFFIX,hf.co,Model-Download",
    "DOMAIN-KEYWORD,civitai,Model-Download",
    "DOMAIN-SUFFIX,civitai.com,Model-Download",
    "DOMAIN-KEYWORD,lmstudio,Model-Download",
    "DOMAIN-SUFFIX,lmstudio.ai,Model-Download",
    "GEOSITE,openai,ChatGPT",
    "GEOSITE,github,GitHub",
    "GEOSITE,youtube,YouTube",
    "GEOSITE,category-ai-!cn,AI-Services",
    "GEOSITE,cn,DIRECT",
    "GEOIP,cn,DIRECT,no-resolve",
    "FINAL,Final"
  ]

  return _.assign(config, {
    'proxy-groups': groups,
    rules: rules,
  })
}

module.exports = {
  operator
}
