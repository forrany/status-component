# Status Component 国际化指南

## 🌍 支持的语言

- **中文 (zh-cn)**: 默认语言
- **英文 (en)**: 英文支持

## 🔧 使用方法

### 1. 自动语言检测（推荐）

组件会自动从 `blueking_language` cookie 中读取语言设置：

```javascript
// Vue 2
<template>
  <StatusIndicator status="running" />
</template>

// Vue 3
<template>
  <StatusIndicator status="running" />
</template>
```

### 2. 手动指定语言

```javascript
// Vue 2
<template>
  <StatusIndicator status="running" language="en" />
</template>

// Vue 3
<template>
  <StatusIndicator status="running" language="en" />
</template>
```

## 📝 支持的状态文本

| 状态键 | 中文 | 英文 |
|--------|------|------|
| running | 运行中 | Running |
| success | 成功 | Success |
| available | 可用 | Available |
| stopped | 已停用 | Stopped |
| disabled | 已禁用 | Disabled |
| failed | 失败 | Failed |
| error | 异常 | Error |
| warning | 告警 | Warning |
| deploying | 部署中 | Deploying |
| processing | 处理中 | Processing |
| pending | 等待中 | Pending |
| __default__ | 未知 | Unknown |

## 🍪 Cookie 设置

组件通过读取 `blueking_language` cookie 来确定语言：

```javascript
// 设置中文
document.cookie = 'blueking_language=zh-cn';

// 设置英文
document.cookie = 'blueking_language=en';
```

## 🎛️ 高级用法

### 自定义文本（覆盖国际化）

```javascript
// Vue 2
<template>
  <StatusIndicator 
    status="running" 
    :custom-config="{
      running: { text: '自定义运行中' }
    }" 
  />
</template>

// Vue 3
<template>
  <StatusIndicator 
    status="running" 
    :customConfig="{
      running: { text: 'Custom Running' }
    }" 
  />
</template>
```

### 编程式使用国际化函数

```javascript
import { getLocalizedText, getCurrentLanguage, isEnglish } from 'status-component-vue2';
// 或
import { getLocalizedText, getCurrentLanguage, isEnglish } from 'status-component-vue3';

// 获取本地化文本
const text = getLocalizedText('running'); // 根据 cookie 返回 "运行中" 或 "Running"

// 获取当前语言
const lang = getCurrentLanguage(); // 返回 "zh-cn" 或 "en"

// 检查是否为英文
const isEn = isEnglish(); // 返回 boolean
```

## 🔄 语言切换

当用户切换语言时，只需更新 cookie，组件会自动响应：

```javascript
function switchLanguage(lang) {
  document.cookie = `blueking_language=${lang}`;
  // 如果需要立即更新，可以刷新页面或重新渲染组件
  location.reload();
}
```

## ⚠️ 注意事项

1. **Cookie 优先级**: 如果同时设置了 `language` prop 和 cookie，prop 优先级更高
2. **服务端渲染**: 在 SSR 环境中，默认使用中文
3. **兼容性**: 支持 `zh-cn`, `zh`, `en`, `en-us` 等格式
4. **自定义配置**: 用户自定义的 `text` 会覆盖国际化文本

## 🚀 完整示例

```vue
<template>
  <div>
    <!-- 自动检测语言 -->
    <StatusIndicator status="running" />
    
    <!-- 强制英文 -->
    <StatusIndicator status="success" language="en" />
    
    <!-- 自定义配置 + 国际化 -->
    <StatusIndicator 
      status="warning" 
      :custom-config="{ warning: { color: '#ff6600' } }"
    />
    
    <!-- 语言切换按钮 -->
    <button @click="switchToEnglish">English</button>
    <button @click="switchToChinese">中文</button>
  </div>
</template>

<script>
import StatusIndicator from 'status-component-vue2';
// 或 import StatusIndicator from 'status-component-vue3';

export default {
  components: {
    StatusIndicator
  },
  methods: {
    switchToEnglish() {
      document.cookie = 'blueking_language=en';
      this.$forceUpdate(); // Vue 2
    },
    switchToChinese() {
      document.cookie = 'blueking_language=zh-cn';
      this.$forceUpdate(); // Vue 2
    }
  }
}
</script>
```
