# Status Component Monorepo 管理指南

## 📁 项目结构

```
status-component/
├── packages/
│   ├── status-component-core/     # 核心状态映射逻辑
│   ├── status-component-vue2/     # Vue 2 组件包
│   ├── status-component-vue3/     # Vue 3 组件包
│   ├── vue2-playground/           # Vue 2 测试环境
│   └── vue3-playground/           # Vue 3 测试环境
├── package.json                   # 根目录配置
├── pnpm-workspace.yaml           # pnpm workspace 配置
└── MONOREPO_GUIDE.md             # 本文档
```

## 🚀 常用命令

### 开发环境
```bash
# 启动 Vue 3 开发环境
pnpm run dev:vue3

# 启动 Vue 2 开发环境  
pnpm run dev:vue2
```

### 构建
```bash
# 构建所有组件包
pnpm run build

# 单独构建 Vue 2 版本
pnpm run build:vue2

# 单独构建 Vue 3 版本
pnpm run build:vue3

# 测试构建
pnpm run test:build
```

### 版本管理
```bash
# 升级补丁版本 (1.0.1 -> 1.0.2)
pnpm run version:patch

# 升级次版本 (1.0.1 -> 1.1.0)
pnpm run version:minor

# 升级主版本 (1.0.1 -> 2.0.0)
pnpm run version:major
```

### 发布
```bash
# 预览发布内容（不实际发布）
pnpm run test:pack

# 发布到 npm（需要登录）
pnpm run release
```

### 清理
```bash
# 清理构建产物和临时文件
pnpm run clean
```

### 依赖管理
```bash
# 安装所有依赖
pnpm run install:all

# 更新所有依赖
pnpm run update:deps
```

## 🔧 核心优化

### 解决 Workspace 依赖问题
- ✅ 移除了 `status-component-core@workspace:*` 依赖
- ✅ 构建时自动复制 core 代码到各组件包
- ✅ 发布后自动清理临时文件
- ✅ 构建产物完全独立，无外部依赖

### 国际化支持
- 🌍 支持中文 (zh-cn) 和英文 (en)
- 🍪 自动从 `blueking_language` cookie 读取语言设置
- 🎛️ 支持手动指定语言 `language` prop
- 📝 完整的状态文本翻译

### 自动化流程
- 🔄 `prebuild`: 构建前自动复制 core 代码
- 📦 `prepublishOnly`: 发布前自动构建
- 🧹 `postpublish`: 发布后清理临时文件

## 📝 发布流程

1. **开发完成后测试构建**
   ```bash
   pnpm run test:build
   ```

2. **预览发布内容**
   ```bash
   pnpm run test:pack
   ```

3. **升级版本**
   ```bash
   pnpm run version:patch  # 或 minor/major
   ```

4. **发布到 npm**
   ```bash
   pnpm run release
   ```

## ⚠️ 注意事项

- 发布前确保已登录 npm: `npm login`
- 确保包名在 npm 上可用
- 发布后版本无法撤回，请谨慎操作
- 建议先使用 `test:pack` 预览发布内容
