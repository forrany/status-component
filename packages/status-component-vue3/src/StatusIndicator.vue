<!-- StatusIndicator.vue (Vue 3, <script setup>) -->
<template>
  <span class="status-indicator" :style="{ color: statusInfo.color }">
    <!-- Spinner Icon -->
    <span v-if="statusInfo.iconType === 'spinner'" class="status-icon status-spinner">
      <!-- 这个 spinner 的实现模拟了原图中的点状旋转效果 -->
      <i v-for="n in 8" :key="n" :style="{ transform: `rotate(${45 * (n - 1)}deg)` }"></i>
    </span>
    
    <!-- Dot Icon -->
    <span
      v-else-if="statusInfo.iconType === 'dot'"
      class="status-icon status-dot"
      :style="{
        backgroundColor: statusInfo.backgroundColor || statusInfo.color,
        borderColor: statusInfo.borderColor || statusInfo.color
      }"
    ></span>

    <!-- Text -->
    <span class="status-text">{{ statusInfo.text }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { createStatusMapper } from 'status-component-core';

const props = defineProps({
  // 后端返回的状态值
  status: {
    type: String,
    required: true,
  },
  // 允许在使用组件时传入自定义配置
  customConfig: {
    type: Object,
    default: () => ({}),
  },
});

// 创建一个响应式的映射器
// 它只会在 customConfig 变化时重新创建
const getStatusInfo = computed(() => createStatusMapper(props.customConfig));

// 根据 status prop 获取最终的展示信息
const statusInfo = computed(() => getStatusInfo.value(props.status));
</script>

<style scoped>
.status-indicator {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
}

.status-icon {
  margin-right: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid;
}

.status-spinner {
  position: relative;
  width: 14px;
  height: 14px;
  animation: spin 1.2s linear infinite;
}

.status-spinner i {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 4px;
  margin-left: -1px;
  background-color: currentColor; /* 使用父元素的 color */
  border-radius: 1px;
  opacity: 0.8;
  transform-origin: center 7px; /* 旋转中心点 (width/2, height/2) */
}

/* 模拟原图点状效果的淡出 */
.status-spinner i:nth-child(1) { opacity: 1; }
.status-spinner i:nth-child(2) { opacity: 0.9; }
.status-spinner i:nth-child(3) { opacity: 0.8; }
.status-spinner i:nth-child(4) { opacity: 0.6; }
.status-spinner i:nth-child(5) { opacity: 0.4; }
.status-spinner i:nth-child(6) { opacity: 0.3; }
.status-spinner i:nth-child(7) { opacity: 0.2; }
.status-spinner i:nth-child(8) { opacity: 0.1; }


@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.status-text {
  line-height: 1;
}
</style>