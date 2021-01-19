import { SafeHtml } from '@angular/platform-browser';

export interface AlainLoadingConfig {
  /**
   * 类型，默认：`spin`
   */
  type?: 'text' | 'icon' | 'spin' | 'custom';
  /**
   * 显示文本，默认：`加载中...`
   */
  text?: string;
  icon?: {
    /** `nz-icon.nzType`，默认：`loading` */
    type?: string;
    /** `nz-icon.nzTheme`，默认：`outline` */
    theme?: 'fill' | 'outline' | 'twotone';
    /** `nz-icon.nzSpin`，默认：`true` */
    spin?: boolean;
  };
  custom?: {
    html?: string | SafeHtml;
    style?: object;
  };
  /**
   * 延迟，默认：`0`
   */
  delay?: number;

  /** 文字方向 */
  direction?: 'ltr' | 'rtl';
}
