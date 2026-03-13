/**
 * Sub-Store Script: OpenClash Custom Rules To Mihomo Config
 * 该脚本用于将 OpenClash 的策略组和规则注入到 Sub-Store 生成的 Mihomo 配置中
 */

function operator(config) {
  // 1. 定义策略组 (Proxy Groups)
  // 我们保留原有的逻辑，并将 Sub-Store 处理后的节点池注入到各个组中
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
      proxies: [] // 后面由程序自动填充所有节点
    },
    {
      name: "⚖️ 负载均衡-轮询",
      type: "load-balance",
      url: "http://www.google.com/generate_204",
      interval: 300,
      strategy: "round-robin",
      proxies: []
    },
    {
      name: "⚖️ 负载均衡-散列",
      type: "load-balance",
      url: "http://www.google.com/generate_204",
      interval: 300,
      strategy: "consistent-hashing",
      proxies: []
    },
    // --- 功能分组 ---
    { name: "💰 加密货币", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇼🇸 台湾节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "📹 YouTube", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🚀 GitHub", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🤖 AI服务", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇭🇰 香港节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "📦 模型下载", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇭🇰 香港节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "🤖 ChatGPT", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇬🇧 英国节点", "🌐 其他地区"] },
    { name: "🤖 Copilot", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇭🇰 香港节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "💬 即时通讯", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🌐 社交媒体", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "📞 Talkatone", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🎥 Netflix", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "🎥 DisneyPlus", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "🎥 HBO", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🎥 PrimeVideo", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🎥 AppleTV+", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇺🇸 美国节点", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🎥 Emby", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "DIRECT", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "🎶 TikTok", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🎻 Spotify", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "📺 Bahamut", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "🇼🇸 台湾节点", "DIRECT"] },
    { name: "🌎 国外媒体", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇸🇬 新加坡节点", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🇬 谷歌服务", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "📢 谷歌FCM", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🚀 测速工具", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "⏬ PT站点", type: "select", proxies: ["DIRECT", "🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区"] },
    { name: "💳 PayPal", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🛒 国外电商", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🍎 苹果服务", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "Ⓜ️ 微软服务", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "💾 OneDrive", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🎮 游戏平台", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🎮 Steam", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    { name: "🎮 PlayStation", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] },
    // --- 地区正则分组 ---
    { name: "🇭🇰 香港节点", type: "url-test", proxies: [], filter: "(港|HK|hk|Hong Kong|HongKong|hongkong|深港)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇺🇸 美国节点", type: "url-test", proxies: [], filter: "(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States|UnitedStates)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇯🇵 日本节点", type: "url-test", proxies: [], filter: "(日本|川日|东京|大阪|泉日|埼玉|沪日|深日|(?<!尼|-)日|JP|Japan|🇯🇵)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇸🇬 新加坡节点", type: "url-test", proxies: [], filter: "(新加坡|坡|狮城|SG|Singapore)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇼🇸 台湾节点", type: "url-test", proxies: [], filter: "(台|新北|彰化|TW|Taiwan)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇰🇷 韩国节点", type: "url-test", proxies: [], filter: "(KR|Korea|KOR|首尔|韩|韓)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇨🇦 加拿大节点", type: "url-test", proxies: [], filter: "(加拿大|Canada|渥太华|温哥华|卡尔加里)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇬🇧 英国节点", type: "url-test", proxies: [], filter: "(英国|Britain|United Kingdom|England|伦敦)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇫🇷 法国节点", type: "url-test", proxies: [], filter: "(法国|France|巴黎)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇩🇪 德国节点", type: "url-test", proxies: [], filter: "(德国|Germany|柏林|法兰克福)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇳🇱 荷兰节点", type: "url-test", proxies: [], filter: "(荷兰|Netherlands|阿姆斯特丹)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🇹🇷 土耳其节点", type: "url-test", proxies: [], filter: "(土耳其|Turkey|Türkiye)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🏠 家宽节点", type: "url-test", proxies: [], filter: "(家宽|家庭宽带|住宅)", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    { name: "🌐 其他地区", type: "url-test", proxies: [], filter: "^(?!.*(港|HK|hk|Hong Kong|HongKong|hongkong|深港|美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States|UnitedStates|日本|川日|东京|大阪|泉日|埼玉|沪日|深日|(?<!尼|-)日|JP|Japan|🇯🇵|新加坡|坡|狮城|SG|Singapore|台|新北|彰化|TW|Taiwan|KR|Korea|KOR|首尔|韩|韓|加拿大|Canada|渥太华|温哥华|卡尔加里|英国|Britain|United Kingdom|England|伦敦|法国|France|巴黎|德国|Germany|柏林|法兰克福|荷兰|Netherlands|阿姆斯特丹|土耳其|Turkey|Türkiye|家宽|家庭宽带|住宅)).*", url: "https://www.gstatic.com/generate_204", interval: 300, tolerance: 50 },
    // --- 兜底组 ---
    { name: "🔀 非标端口", type: "select", proxies: ["DIRECT", "🐟 漏网之鱼"] },
    { name: "🐟 漏网之鱼", type: "select", proxies: ["🚀 手动选择", "🚀 手动选择2", "♻️ 自动选择", "⚖️ 负载均衡-轮询", "⚖️ 负载均衡-散列", "🇭🇰 香港节点", "🇺🇸 美国节点", "🇯🇵 日本节点", "🇸🇬 新加坡节点", "🇼🇸 台湾节点", "🇰🇷 韩国节点", "🇨🇦 加拿大节点", "🇬🇧 英国节点", "🇫🇷 法国节点", "🇩🇪 德国节点", "🇳🇱 荷兰节点", "🇹🇷 土耳其节点", "🏠 家宽节点", "🌐 其他地区", "DIRECT"] }
  ];

  // 2. 节点分配逻辑
  const allProxyNames = config.proxies.map(p => p.name);
  proxyGroups.forEach(group => {
    if (group.filter) {
      const regex = new RegExp(group.filter);
      group.proxies = allProxyNames.filter(name => regex.test(name));
      // 如果该地区没匹配到节点，为了防止报错，可以 fallback 到全部节点或保持为空
      if (group.proxies.length === 0) group.proxies = ["DIRECT"];
      delete group.filter; // 移除辅助用的 filter 字段
    } else if (group.name === "♻️ 自动选择" || group.name === "⚖️ 负载均衡-轮询" || group.name === "⚖️ 负载均衡-散列") {
      group.proxies = allProxyNames;
    }
  });

  // 3. 定义规则集 (Rules)
  // 将原有的规则集转化为 Mihomo 格式
  const rules = [
    "GEOSITE,private,DIRECT",
    "GEOIP,private,DIRECT,no-resolve",
    "DOMAIN-KEYWORD,binance,💰 加密货币",
    "DOMAIN-SUFFIX,binance.com,💰 加密货币",
    "DOMAIN-SUFFIX,binance.me,💰 加密货币",
    "DOMAIN-SUFFIX,bnbstatic.com,💰 加密货币",
    "GEOSITE,binance,💰 加密货币",
    "GEOSITE,okx,💰 加密货币",
    "DOMAIN-SUFFIX,okx.com,💰 加密货币",
    "DOMAIN-SUFFIX,okx.org,💰 加密货币",
    "DOMAIN-SUFFIX,okex.com,💰 加密货币",
    "GEOSITE,bitget,💰 加密货币",
    "DOMAIN-SUFFIX,bitget.com,💰 加密货币",
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
    "GEOSITE,category-social-media-!cn,🌐 社交媒体",
    "GEOSITE,talkatone,📞 Talkatone",
    "GEOSITE,onedrive,💾 OneDrive",
    "GEOSITE,github,🚀 GitHub",
    "GEOSITE,category-ai-!cn,🤖 AI服务",
    "GEOSITE,category-speedtest,🚀 测速工具",
    "GEOSITE,youtube,📹 YouTube",
    "GEOSITE,netflix,🎥 Netflix",
    "GEOSITE,disney,🎥 DisneyPlus",
    "GEOSITE,hbo,🎥 HBO",
    "GEOSITE,primevideo,🎥 PrimeVideo",
    "GEOSITE,apple-tvplus,🎥 AppleTV+",
    "GEOSITE,category-emby,🎥 Emby",
    "GEOSITE,spotify,🎻 Spotify",
    "GEOSITE,bahamut,📺 Bahamut",
    "GEOSITE,category-games,🎮 游戏平台",
    "GEOSITE,steam,🎮 Steam",
    "GEOSITE,apple,🍎 苹果服务",
    "GEOSITE,microsoft,Ⓜ️ 微软服务",
    "GEOSITE,googlefcm,📢 谷歌FCM",
    "GEOSITE,google,🇬 谷歌服务",
    "GEOSITE,tiktok,🎶 TikTok",
    "GEOSITE,category-entertainment,🌎 国外媒体",
    "GEOSITE,category-pt,⏬ PT站点",
    "GEOSITE,paypal,💳 PayPal",
    "GEOSITE,category-ecommerce,🛒 国外电商",
    "GEOSITE,gfw,🚀 手动选择",
    "GEOIP,telegram,💬 即时通讯,no-resolve",
    "GEOIP,twitter,🌐 社交媒体,no-resolve",
    "GEOIP,facebook,🌐 社交媒体,no-resolve",
    "GEOIP,google,🇬 谷歌服务,no-resolve",
    "GEOIP,netflix,🎥 Netflix,no-resolve",
    "GEOSITE,cn,DIRECT",
    "GEOIP,cn,DIRECT,no-resolve",
    "FINAL,🐟 漏网之鱼"
  ];

  // 4. 应用到配置
  config["proxy-groups"] = proxyGroups;
  config["rules"] = rules;

  return config;
}
