<!-- StatusIndicator.vue (Vue 2, Options API) -->
<template>
  <span class="status-indicator" :style="{ color: statusInfo.color }">
    <!-- Spinner Icon -->
    <span v-if="statusInfo.iconType === 'spinner'" class="status-icon status-spinner">
      <i v-for="n in 8" :key="n" :style="{ transform: 'rotate(' + 45 * (n-1) + 'deg)' }"></i>
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

<script>
import { createStatusMapper } from './core/index.js';

export default {
  name: 'StatusIndicator',
  props: {
    status: {
      type: String,
      required: true,
    },
    customConfig: {
      type: Object,
      default: function() {
        return {};
      },
    },
    language: {
      type: String,
      default: '',
      validator: function(value) {
        return value === '' || ['zh-cn', 'zh', 'en', 'en-us'].includes(value.toLowerCase());
      }
    },
  },
  computed: {
    // Vue 2 中，我们可以将 mapper 的创建和使用合并在一个 computed 属性里
    statusInfo() {
      const getStatusInfo = createStatusMapper(this.customConfig, this.language || undefined);
      return getStatusInfo(this.status);
    },
  },
};
</script>

<!-- CSS 样式与 Vue 3 版本完全相同，可以直接复制过来 -->
<style scoped>
.status-indicator {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
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
  background-color: currentColor;
  border-radius: 1px;
  opacity: 0.8;
  transform-origin: center 7px;
}

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