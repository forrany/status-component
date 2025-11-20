# 状态显示组件 - 支持 Vue 2 & 3

![](https://pic-bed-1302552283.cos.ap-guangzhou.myqcloud.com/undefined20251120112058620.png?imageSlim)

一个灵活、可复用的状态指示器组件，专为 Vue 2 和 Vue 3 设计。它提供了一种统一的方式来显示各种状态（例如：运行中、失败、处理中），并支持自定义文本、颜色和图标。

本项目是一个 pnpm monorepo，其结构经过精心设计，将核心逻辑、Vue 2 和 Vue 3 组件分包维护，确保了清晰的关注点分离和便捷的项目集成。

## 在线演示

- [Vue 3 Playground](https://vincentko.github.io/status-component/)
- [Vue 2 Playground](https://vincentko.github.io/status-component/vue2/)

## Monorepo 包结构

| 包名                      | 描述                                                                 |
| ------------------------- | -------------------------------------------------------------------- |
| `status-component-core`   | 一个与框架无关的核心库，包含默认的状态映射逻辑。                     |
| `status-component-vue2`   | 用于 Vue 2 项目的状态指示器组件，依赖于 `core` 包。                  |
| `status-component-vue3`   | 用于 Vue 3 项目的状态指示器组件，依赖于 `core` 包。                  |
| `vue2-playground`         | 一个由 Vite 驱动的演练场，用于测试 Vue 2 组件。                      |
| `vue3-playground`         | 一个由 Vite 驱动的演练场，用于测试 Vue 3 组件。                      |

---

## 特性

- ✅ **同时支持 Vue 2 & 3**: 提供独立的包，无缝集成。
- 🎨 **高度可定制**: 轻松覆盖默认状态或添加您自己的全新状态。
- 📦 **丰富的默认配置**: 已预设一组常用状态，如 `running`, `failed`, `warning`, `deploying` 等。
- ⚙️ **多种图标类型**: 开箱即用，支持 `dot` (圆点) 和 `spinner` (加载中) 图标，或不显示图标。
- 🏗️ **现代化工具链**: 使用 Vite 构建，并通过 pnpm workspace 进行 Monorepo 管理。
- 💪 **完整的 TypeScript 支持**: 内置类型定义，提供完整的类型提示和检查。
- 🌍 **国际化支持**: 内置中英文语言包，支持自动检测和手动切换语言。

## 安装

请根据您项目的 Vue 版本，安装对应的包。

**Vue 3 项目:**

```bash
pnpm install status-component-vue3
```

**Vue 2 项目:**

```bash
pnpm install status-component-vue2
```

## 使用方法

### Vue 3 (`<script setup>`)

**TypeScript 支持：** 组件已包含完整的类型定义，TypeScript 项目可直接使用，无需额外配置。

```vue
<template>
  <!-- 基础用法 -->
  <StatusIndicator status="running" />

  <!-- 使用自定义配置 -->
  <StatusIndicator status="ONLINE" :custom-config="myConfig" />
</template>

<script setup>
import StatusIndicator from 'status-component-vue3';
// 不要忘记引入样式文件！
import 'status-component-vue3/style.css';

const myConfig = {
  ONLINE: { text: '服务在线', color: 'deepskyblue', iconType: 'dot' },
  OFFLINE: { text: '已离线', color: '#666' },
  UPDATING: { text: '更新中...', color: 'orange', iconType: 'spinner' },
};
</script>
```

### Vue 3 with TypeScript

```vue
<template>
  <StatusIndicator status="running" :custom-config="myConfig" />
</template>

<script setup lang="ts">
import StatusIndicator from 'status-component-vue3';
import type { StatusConfig } from 'status-component-vue3';
import 'status-component-vue3/style.css';

const myConfig: Record<string, StatusConfig> = {
  ONLINE: { text: '服务在线', color: 'deepskyblue', iconType: 'dot' },
  OFFLINE: { text: '已离线', color: '#666' },
  UPDATING: { text: '更新中...', color: 'orange', iconType: 'spinner' },
};
</script>
```

### Vue 2 (选项式 API)

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <StatusIndicator status="failed" />

    <!-- 使用自定义配置 -->
    <StatusIndicator status="ONLINE" :custom-config="myConfig" />
  </div>
</template>

<script>
import StatusIndicator from 'status-component-vue2';
// 不要忘记引入样式文件！
import 'status-component-vue2/style.css';

export default {
  components: {
    StatusIndicator,
  },
  data() {
    return {
      myConfig: {
        ONLINE: { text: '服务在线', color: 'deepskyblue', iconType: 'dot' },
        OFFLINE: { text: '已离线', color: '#666' },
      },
    };
  },
};
</script>
```

## API

### Props

| Prop           | 类型     | 是否必须 | 默认值 | 描述                                                                     |
| -------------- | -------- | -------- | ------ | ------------------------------------------------------------------------ |
| `status`       | `String` | `true`   | `N/A`  | 状态字符串 (例如, 'running')。它将用于查找对应的显示配置。               |
| `customConfig` | `Object` | `false`  | `{}`   | 一个用于定义新状态或覆盖默认状态的对象。详见 "自定义" 部分。             |

### 默认状态

组件提供了一套丰富的默认配置。如果 `status` prop 匹配到以下任意一个键，组件将按其配置进行渲染。

| 状态键 (Status Key) | 文本     | 颜色       | 图标类型 (`iconType`) |
| ------------------- | -------- | ---------- | ------------------- |
| `running`           | 运行中   | `#3FC06D`  | `dot`               |
| `success`           | 成功     | `#3FC06D`  | `dot`               |
| `available`         | 可用     | `#3FC06D`  | `dot`               |
| `stopped`           | 已停用   | `#C4C6CC`  | `dot`               |
| `disabled`          | 已禁用   | `#C4C6CC`  | `dot`               |
| `failed`            | 失败     | `#F5222D`  | `dot`               |
| `error`             | 异常     | `#F5222D`  | `dot`               |
| `warning`           | 告警     | `#F59500`  | `dot`               |
| `deploying`         | 部署中   | `#1890ff`  | `spinner`           |
| `processing`        | 处理中   | `#1890ff`  | `spinner`           |
| `pending`           | 等待中   | `#faad14`  | `spinner`           |
| `__default__`       | 未知     | `#C4C6CC`  | `dot`               |

如果传入的 `status` 无法匹配任何键，则会使用 `__default__` 配置，并且文本将直接显示传入的 `status` 字符串。

### 自定义

通过传入 `customConfig` 对象，您可以轻松地进行自定义。该对象的 `key` 就是您希望定义或覆盖的状态名。

**配置对象属性:**

| 属性              | 类型     | 描述                                     |
| ----------------- | -------- | ---------------------------------------- |
| `text`            | `String` | 要显示的文本。                           |
| `color`           | `String` | 用于文本和图标的 CSS 颜色。              |
| `iconType`        | `String` | `'dot'`, `'spinner'`, 或 `'none'`。       |
| `backgroundColor` | `String` | (用于 `dot` 图标) 圆点的背景色。         |
| `borderColor`     | `String` | (用于 `dot` 图标) 圆点的边框颜色。       |

**示例: 覆盖一个默认状态并添加一个新状态**

```js
const myConfig = {
  // 覆盖默认的 'failed' 状态
  failed: { 
    text: '操作失败，请重试', 
    color: '#E53935' 
  },
  // 添加一个新的自定义状态
  ARCHIVED: { 
    text: '已归档', 
    color: 'purple', 
    iconType: 'dot' 
  },
  // 你也可以覆盖未知状态的默认显示
  __default__: {
    text: '状态未知',
    color: 'grey'
  }
};
```

## 本地开发

本项目是一个使用 pnpm workspaces 的 Monorepo。

1.  **克隆仓库:**
    ```bash
    git clone <repository-url>
    cd status-component
    ```

2.  **安装依赖:**
    ```bash
    pnpm install
    ```

3.  **运行演练场 (Playgrounds):**

    你可以运行 Vue 2 或 Vue 3 的演练场来实时测试组件。

    **Vue 3 Playground**
    ```bash
    cd packages/vue3-playground
    pnpm dev
    ```

    **Vue 2 Playground**
    ```bash
    cd packages/vue2-playground
    pnpm dev
    ```

4.  **可用脚本:**

    - `pnpm build`: 为生产环境打包 `status-component-vue2` 和 `status-component-vue3`。
    - `pnpm clean`: 删除所有组件包中的 `dist` 目录。
    - `pnpm lint`: 对整个项目进行代码风格检查。
