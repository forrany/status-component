<template>
  <h1>Vue 3 Status Indicator Playground</h1>

  <div class="status-group">
    <h3>Basic Usage (Default Config)</h3>
    <p><StatusIndicator status="running" /> - `running`</p>
    <p><StatusIndicator status="success" /> - `success`</p>
    <p><StatusIndicator status="available" /> - `available`</p>
    <p><StatusIndicator status="stopped" /> - `stopped`</p>
    <p><StatusIndicator status="disabled" /> - `disabled`</p>
    <p><StatusIndicator status="failed" /> - `failed`</p>
    <p><StatusIndicator status="error" /> - `error`</p>
    <p><StatusIndicator status="warning" /> - `warning`</p>
    <p><StatusIndicator status="deploying" /> - `deploying`</p>
    <p><StatusIndicator status="processing" /> - `processing`</p>
    <p><StatusIndicator status="pending" /> - `pending`</p>
    <p><StatusIndicator status="unknown_status" /> - `unknown_status` (Unknown status)</p>
  </div>

  <div class="status-group">
    <h3>Advanced Usage (Custom Config)</h3>
    <p><StatusIndicator status="ONLINE" :custom-config="myStatusConfig" /> - `ONLINE` (Custom)</p>
    <p><StatusIndicator status="OFFLINE" :custom-config="myStatusConfig" /> - `OFFLINE` (Overridden default)</p>
    <p><StatusIndicator status="UPDATING" :custom-config="myStatusConfig" /> - `UPDATING` (Custom Spinner)</p>
    <p><StatusIndicator status="DELETED" :custom-config="myStatusConfig" /> - `DELETED` (No Icon)</p>
    <p><StatusIndicator status="ARCHIVED" :custom-config="myStatusConfig" /> - `ARCHIVED` (Custom Text, default icon)</p>
    <p><StatusIndicator status="NON_EXISTENT" :custom-config="myStatusConfig" /> - `NON_EXISTENT` (Custom unknown, text passed)</p>
  </div>

  <div class="status-group">
    <h3>Partial Override Example</h3>
    <p><StatusIndicator status="running" :custom-config="partialOverrideConfig" /> - `running` (Text Only Override)</p>
    <p><StatusIndicator status="failed" :custom-config="partialOverrideConfig" /> - `failed` (Text Only Override)</p>
  </div>
</template>

<script setup>
import StatusIndicator from 'status-component-vue3';
import 'status-component-vue3/style.css'


const myStatusConfig = {
  ONLINE: { text: '服务在线', color: 'deepskyblue', iconType: 'dot' },
  OFFLINE: { text: '已离线', color: '#666' }, // iconType will inherit 'dot' from default
  UPDATING: { text: '更新中...', color: 'orange', iconType: 'spinner' },
  DELETED: { text: '已删除', color: '#f5222d', iconType: 'none' },
  ARCHIVED: { text: '已归档', color: 'purple' }, // Only text and color, iconType inherits 'dot'
  __default__: { text: '未知自定义', color: 'grey', iconType: 'dot' } // Override default unknown
};

const partialOverrideConfig = {
  running: { text: '系统活跃中' }, // Only text overridden
  failed: { text: '操作失败' } // Only text overridden
};
</script>

<style>
/* Global styles for playground can go here if needed */
</style>