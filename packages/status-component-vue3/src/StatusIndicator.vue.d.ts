import { DefineComponent } from 'vue';

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

declare const StatusIndicator: DefineComponent<StatusIndicatorProps>;

export default StatusIndicator;

