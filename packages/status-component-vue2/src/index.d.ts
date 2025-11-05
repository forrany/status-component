import Vue from 'vue';

export interface StatusConfig {
  text?: string;
  color?: string;
  iconType?: 'dot' | 'spinner' | 'none';
  backgroundColor?: string;
  borderColor?: string;
}

export interface StatusIndicatorProps {
  status: string;
  customConfig?: Record<string, StatusConfig>;
  language?: string;
}

declare const StatusIndicator: Vue.Component<any, any, any, StatusIndicatorProps>;

export default StatusIndicator;

