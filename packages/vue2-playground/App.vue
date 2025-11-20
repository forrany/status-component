<template>
  <div class="playground-container">
    <header class="header">
      <h1>Status Indicator Playground (Vue 2)</h1>
      <p class="subtitle">Universal Status Component for Vue 2 & Vue 3</p>
    </header>

    <main class="main-content">
      <!-- Section 0: Interactive Demo -->
      <section class="card">
        <h2>🎮 Interactive Demo</h2>
        <p class="description">Try changing the status and language to see how the component behaves.</p>
        
        <div class="interactive-area">
          <div class="controls">
            <div class="control-group">
              <label>Status</label>
              <input v-model="demoStatus" type="text" placeholder="e.g., running, failed" class="input-text" />
              <div class="quick-select">
                <button v-for="s in ['running', 'failed', 'deploying', 'custom']" :key="s" @click="demoStatus = s" class="btn-xs">
                  {{ s }}
                </button>
              </div>
            </div>
            
            <div class="control-group">
              <label>Language</label>
              <select v-model="demoLanguage" class="input-select">
                <option value="">Auto (Browser Default)</option>
                <option value="zh">Chinese (zh)</option>
                <option value="en">English (en)</option>
              </select>
            </div>
          </div>

          <div class="preview-box">
            <div class="preview-label">Result:</div>
            <div class="preview-content">
              <StatusIndicator :status="demoStatus" :language="demoLanguage" />
            </div>
          </div>

          <div class="code-tabs">
            <div class="tabs-header">
              <button 
                :class="['tab-btn', { active: activeTab === 'vue3' }]" 
                @click="activeTab = 'vue3'"
              >
                Vue 3 (Composition API)
              </button>
              <button 
                :class="['tab-btn', { active: activeTab === 'vue2' }]" 
                @click="activeTab = 'vue2'"
              >
                Vue 2 (Options API)
              </button>
            </div>
            <div class="code-block-wrapper">
              <button class="copy-btn" @click="copyCode" :class="{ copied: isCopied }">
                {{ isCopied ? 'Copied!' : 'Copy' }}
              </button>
              <div class="code-block">
                <pre><code v-html="highlightedCode" class="hljs"></code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 1: Standard Statuses -->
      <section class="card">
        <h2>🎨 Built-in Statuses</h2>
        <p class="description">Out-of-the-box support for common application states.</p>
        <div class="status-grid">
          <div class="status-item" v-for="status in standardStatuses" :key="status">
            <div class="status-display">
              <StatusIndicator :status="status" />
            </div>
            <span class="status-code">{{ status }}</span>
          </div>
        </div>
      </section>

      <!-- Section 2: Custom Configurations -->
      <section class="card">
        <h2>🛠 Custom Configurations</h2>
        <p class="description">Full control over text, colors, and icons via config object.</p>
        <div class="status-grid">
          <div class="status-item">
            <div class="status-display">
              <StatusIndicator status="ONLINE" :custom-config="customConfig" />
            </div>
            <span class="status-code">ONLINE</span>
            <span class="note">Custom Color & Text</span>
          </div>
          <div class="status-item">
            <div class="status-display">
              <StatusIndicator status="OFFLINE" :custom-config="customConfig" />
            </div>
            <span class="status-code">OFFLINE</span>
            <span class="note">Custom Color</span>
          </div>
           <div class="status-item">
            <div class="status-display">
              <StatusIndicator status="UPDATING" :custom-config="customConfig" />
            </div>
            <span class="status-code">UPDATING</span>
            <span class="note">Custom Spinner</span>
          </div>
           <div class="status-item">
            <div class="status-display">
              <StatusIndicator status="ARCHIVED" :custom-config="customConfig" />
            </div>
            <span class="status-code">ARCHIVED</span>
            <span class="note">Custom Text</span>
          </div>
           <div class="status-item">
            <div class="status-display">
              <StatusIndicator status="DELETED" :custom-config="customConfig" />
            </div>
            <span class="status-code">DELETED</span>
            <span class="note">No Icon</span>
          </div>
        </div>
      </section>

      <!-- Section 3: Internationalization -->
      <section class="card">
        <h2>🌍 Internationalization</h2>
        <p class="description">Built-in support for English and Chinese.</p>
        <div class="status-grid">
          <div class="status-item">
            <div class="status-display">
              <StatusIndicator status="running" language="en" />
            </div>
            <span class="status-code">language="en"</span>
          </div>
           <div class="status-item">
            <div class="status-display">
              <StatusIndicator status="running" language="zh" />
            </div>
            <span class="status-code">language="zh"</span>
          </div>
          <div class="status-item">
            <div class="status-display">
              <StatusIndicator status="failed" language="en" />
            </div>
            <span class="status-code">language="en"</span>
          </div>
           <div class="status-item">
            <div class="status-display">
              <StatusIndicator status="failed" language="zh" />
            </div>
            <span class="status-code">language="zh"</span>
          </div>
        </div>
      </section>

      <!-- Section 4: API Reference -->
      <section class="card">
        <h2>📚 API Reference</h2>
        <div class="table-container">
          <table class="api-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>status</code></td>
                <td>String</td>
                <td>Required</td>
                <td>The status key. Mapped to internal config or used as fallback text.</td>
              </tr>
              <tr>
                <td><code>language</code></td>
                <td>String</td>
                <td>'' (Auto)</td>
                <td>Force specific language ('zh', 'en').</td>
              </tr>
              <tr>
                <td><code>customConfig</code></td>
                <td>Object</td>
                <td>{}</td>
                <td>
                  Override default styles. Format: <br/>
                  <code>{ KEY: { text, color, iconType } }</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import StatusIndicator from 'status-component-vue2';
import 'status-component-vue2/style.css';

import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);

export default {
  name: 'App',
  components: {
    StatusIndicator
  },
  data() {
    return {
      // Interactive Demo State
      demoStatus: 'running',
      demoLanguage: '',
      activeTab: 'vue2',
      isCopied: false,

      standardStatuses: [
        'running', 'success', 'available', 
        'stopped', 'disabled', 'failed', 
        'error', 'warning', 'deploying', 
        'processing', 'pending', 'unknown_status'
      ],
      customConfig: {
        ONLINE: { text: 'Online Service', color: '#2dcb56', iconType: 'dot' },
        OFFLINE: { text: 'Offline', color: '#63656e' },
        UPDATING: { text: 'System Updating...', color: '#3a84ff', iconType: 'spinner' },
        DELETED: { text: 'Deleted Item', color: '#ea3636', iconType: 'none' },
        ARCHIVED: { text: 'Archived', color: '#979ba5' },
        __default__: { text: 'Unknown', color: 'grey', iconType: 'dot' }
      }
    };
  },
  computed: {
    generatedCode() {
      const langAttr = this.demoLanguage ? ` language="${this.demoLanguage}"` : '';
      const componentTag = `<StatusIndicator status="${this.demoStatus}"${langAttr} />`;

      if (this.activeTab === 'vue3') {
        return `<script setup>
import StatusIndicator from 'status-component-vue3';
import 'status-component-vue3/style.css';
<\/script>

<template>
  ${componentTag}
</template>`;
      } else {
        return `<template>
  ${componentTag}
</template>

<script>
import StatusIndicator from 'status-component-vue2';
import 'status-component-vue2/style.css';

export default {
  components: {
    StatusIndicator
  }
};
<\/script>`;
      }
    },
    highlightedCode() {
      return hljs.highlight(this.generatedCode, { language: 'xml' }).value;
    }
  },
  methods: {
    copyCode() {
      navigator.clipboard.writeText(this.generatedCode).then(() => {
        this.isCopied = true;
        setTimeout(() => {
          this.isCopied = false;
        }, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #313238;
}

.playground-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 10px;
  color: #313238;
}

.subtitle {
  font-size: 16px;
  color: #63656e;
  margin: 0;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-bottom: 24px;
}

.card h2 {
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 8px;
  border-bottom: 1px solid #f0f1f5;
  padding-bottom: 12px;
}

.description {
  font-size: 14px;
  color: #979ba5;
  margin: 0 0 24px;
}

/* Interactive Demo Styles */
.interactive-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.controls {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 16px;
  background: #f9f9fc;
  border-radius: 4px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-size: 12px;
  font-weight: 600;
  color: #63656e;
}

.input-text, .input-select {
  padding: 8px 12px;
  border: 1px solid #dcdee5;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}

.quick-select {
  display: flex;
  gap: 8px;
}

.btn-xs {
  padding: 2px 8px;
  font-size: 12px;
  border: 1px solid #dcdee5;
  background: #fff;
  border-radius: 2px;
  cursor: pointer;
  color: #63656e;
}

.btn-xs:hover {
  color: #3a84ff;
  border-color: #3a84ff;
}

.preview-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border: 1px dashed #c4c6cc;
  border-radius: 4px;
  background: #fafbfd;
}

.preview-label {
  font-size: 14px;
  color: #979ba5;
}

.code-tabs {
  margin-top: 10px;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid #dcdee5;
}

.tab-btn {
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: #63656e;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: #3a84ff;
}

.tab-btn.active {
  color: #3a84ff;
  border-bottom-color: #3a84ff;
  font-weight: 500;
}

.code-block-wrapper {
  position: relative;
  background: #282c34;
  border-radius: 0 4px 4px 4px;
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.copy-btn.copied {
  background: #2dcb56;
  border-color: #2dcb56;
}

.code-block {
  color: #abb2bf;
  padding: 16px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 13px;
  overflow-x: auto;
  line-height: 1.5;
}

/* Grid Styles */
.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  border: 1px solid #dcdee5;
  border-radius: 4px;
  transition: all 0.3s;
}

.status-item:hover {
  border-color: #3a84ff;
  box-shadow: 0 2px 4px rgba(58, 132, 255, 0.1);
}

.status-display {
  margin-bottom: 8px;
  height: 24px;
  display: flex;
  align-items: center;
}

.status-code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  color: #63656e;
  background: #f0f1f5;
  padding: 2px 6px;
  border-radius: 2px;
}

.note {
  font-size: 12px;
  color: #979ba5;
  margin-top: 4px;
  font-style: italic;
}

/* API Table */
.table-container {
  overflow-x: auto;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.api-table th, .api-table td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #f0f1f5;
}

.api-table th {
  background: #fafbfd;
  color: #313238;
  font-weight: 600;
}

.api-table td code {
  background: #f0f1f5;
  padding: 2px 4px;
  border-radius: 2px;
  font-family: monospace;
  color: #c41d7f;
}
</style>