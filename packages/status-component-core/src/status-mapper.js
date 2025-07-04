/**
 * @typedef {Object} StatusInfo
 * @property {string} text - The display text for the status.
 * @property {string} color - The CSS color for the icon and text.
 * @property {'dot' | 'spinner' | 'none'} iconType - The type of icon to display.
 * @property {string} [backgroundColor] - The background color for dot icons.
 * @property {string} [borderColor] - The border color for dot icons.
 */

/**
 * 默认的状态映射配置
 * Key 可以是后端返回的任何字符串
 */
const defaultConfig = {
  // 成功/运行状态 - 绿色系
  running: {
    text: '运行中',
    color: '#3FC06D',
    iconType: 'dot',
    backgroundColor: '#E5F6EA',
    borderColor: '#3FC06D'
  },
  success: {
    text: '成功',
    color: '#3FC06D',
    iconType: 'dot',
    backgroundColor: '#E5F6EA',
    borderColor: '#3FC06D'
  },
  available: {
    text: '可用',
    color: '#3FC06D',
    iconType: 'dot',
    backgroundColor: '#E5F6EA',
    borderColor: '#3FC06D'
  },

  // 停用/失败状态 - 灰色系
  stopped: {
    text: '已停用',
    color: '#C4C6CC',
    iconType: 'dot',
    backgroundColor: '#F0F1F5',
    borderColor: '#C4C6CC'
  },
  disabled: {
    text: '已禁用',
    color: '#C4C6CC',
    iconType: 'dot',
    backgroundColor: '#F0F1F5',
    borderColor: '#C4C6CC'
  },

  // 失败/错误状态 - 红色系
  failed: {
    text: '失败',
    color: '#F5222D',
    iconType: 'dot',
    backgroundColor: '#FFEBEE',
    borderColor: '#F5222D'
  },
  error: {
    text: '异常',
    color: '#F5222D',
    iconType: 'dot',
    backgroundColor: '#FFEBEE',
    borderColor: '#F5222D'
  },

  // 警告状态 - 橙色系
  warning: {
    text: '告警',
    color: '#F59500',
    iconType: 'dot',
    backgroundColor: '#FCE5C0',
    borderColor: '#F59500'
  },

  // 加载/处理中状态 - 蓝色系，使用 spinner
  deploying: { text: '部署中', color: '#1890ff', iconType: 'spinner' },
  processing: { text: '处理中', color: '#1890ff', iconType: 'spinner' },
  pending: { text: '等待中', color: '#faad14', iconType: 'spinner' },

  // 未知或未匹配状态的默认值
  __default__: {
    text: '未知',
    color: '#C4C6CC',
    iconType: 'dot',
    backgroundColor: '#F0F1F5',
    borderColor: '#C4C6CC'
  }
};

/**
 * 创建一个状态映射器实例。
 * @param {Object.<string, Partial<StatusInfo>>} [customConfig] - 用户自定义的配置，会与默认配置合并。
 * @returns {(status: string) => StatusInfo} - 返回一个函数，该函数接收一个状态字符串，返回对应的状态信息。
 */
export function createStatusMapper(customConfig) {
  // 深合并配置，用户自定义的优先级更高
  const finalConfig = { ...defaultConfig };
  if (customConfig) {
    for (const key in customConfig) {
      // 允许用户只覆盖部分属性，比如只改文字，不改颜色
      finalConfig[key] = { ...(finalConfig[key] || {}), ...customConfig[key] };
    }
  }

  /**
   * 根据状态字符串获取其展示信息
   * @param {string} status - 后端返回的状态字符串, e.g., 'running', 'failed'.
   * @returns {StatusInfo}
   */
  return function getStatusInfo(status) {
    const info = finalConfig[status];
    if (info) {
      return {
        // 确保所有属性都有默认值，防止渲染出错
        text: info.text || 'N/A',
        color: info.color || defaultConfig.__default__.color,
        iconType: info.iconType || 'none',
        backgroundColor: info.backgroundColor,
        borderColor: info.borderColor
      };
    }

    // 如果找不到完全匹配的，返回默认的未知状态
    // 同时，将 text 设置为传入的 status，方便调试
    return { ...defaultConfig.__default__, text: status };
  };
}
