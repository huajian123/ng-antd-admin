import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { DisabledTimeFn, NzDateMode, PresetRanges, SupportTimeOptions } from 'ng-zorro-antd/date-picker';

export interface AlainDateRangePickerConfig {
  /**
   * 默认：`yyyy-MM-dd`
   */
  nzFormat?: string;
  nzClassName?: string;
  nzSize?: string;
  nzStyle?: string;
  /**
   * 默认：`true`
   */
  nzAllowClear?: boolean;
  /**
   * 默认：`false`
   */
  nzAutoFocus?: boolean;
  nzDisabledDate?: (d: Date) => boolean;
  nzDisabledTime?: DisabledTimeFn;
  /**
   * 默认：`{ position: 'relative' }`
   */
  nzPopupStyle?: object;
  nzDropdownClassName?: string;
  nzRenderExtraFooter?: string;
  nzShowTime?: SupportTimeOptions | boolean;
  /**
   * 默认：`true`
   */
  nzShowToday?: boolean;
  nzMode?: NzDateMode | NzDateMode[];
  nzRanges?: PresetRanges;
  shortcuts?: AlainDateRangePickerShortcut;
}

export interface AlainDateRangePickerShortcut {
  /** Whether to enable, default: `false` */
  enabled?: boolean;
  /** Whether to close the panel after clicking, default: `true` */
  closed?: boolean;
  /**
   * Shortcut list, default: `今天`, `昨天`, `近3天`, `近7天`, `本周`, `本月`, `全年`
   */
  list?: AlainDateRangePickerShortcutItem[];
}

export interface AlainDateRangePickerShortcutItem {
  [key: string]: NzSafeAny;

  text: string;
  fn: (value: [Date, Date]) => [Date, Date];
}
