/**
 * 国际化配置
 * 支持中文(zh-cn)和英文(en)
 */

// 中文文本配置
const zhCN = {
  running: '运行中',
  success: '成功',
  available: '可用',
  stopped: '已停用',
  disabled: '已禁用',
  failed: '失败',
  error: '异常',
  warning: '告警',
  deploying: '部署中',
  processing: '处理中',
  pending: '等待中',
  __default__: '未知'
};

// 英文文本配置
const en = {
  running: 'Running',
  success: 'Success',
  available: 'Available',
  stopped: 'Stopped',
  disabled: 'Disabled',
  failed: 'Failed',
  error: 'Error',
  warning: 'Warning',
  deploying: 'Deploying',
  processing: 'Processing',
  pending: 'Pending',
  __default__: 'Unknown'
};

// 语言包映射
const locales = {
  'zh-cn': zhCN,
  'zh': zhCN,  // 兼容简写
  'en': en,
  'en-us': en  // 兼容完整写法
};

/**
 * 从 cookie 中获取语言设置
 * @returns {string} 语言代码，默认为 'zh-cn'
 */
function getLanguageFromCookie() {
  if (typeof document === 'undefined') {
    // 服务端渲染环境，返回默认语言
    return 'zh-cn';
  }
  
  try {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'blueking_language') {
        return decodeURIComponent(value).toLowerCase();
      }
    }
  } catch (error) {
    console.warn('Failed to read blueking_language cookie:', error);
  }
  
  return 'zh-cn'; // 默认中文
}

/**
 * 获取指定语言的文本
 * @param {string} key - 状态键
 * @param {string} [lang] - 语言代码，不传则从 cookie 获取
 * @returns {string} 对应语言的文本
 */
export function getLocalizedText(key, lang) {
  const language = lang || getLanguageFromCookie();
  const locale = locales[language] || locales['zh-cn'];
  return locale[key] || locale.__default__ || key;
}

/**
 * 获取当前语言
 * @returns {string} 当前语言代码
 */
export function getCurrentLanguage() {
  return getLanguageFromCookie();
}

/**
 * 检查是否为英文环境
 * @returns {boolean}
 */
export function isEnglish() {
  const lang = getCurrentLanguage();
  return lang.startsWith('en');
}

// 导出语言包，供外部自定义使用
export { zhCN, en, locales };
