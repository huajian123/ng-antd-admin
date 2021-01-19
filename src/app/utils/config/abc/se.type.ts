export interface AlainSEConfig {
  /**
   * 大小，默认：`default`
   * - `compact` 紧凑型，强制忽略 `error`、`extra` 展示
   */
  size?: 'default' | 'compact';
  /**
   * 布局类型，等同 `nzLayout`，默认：`horizontal`
   * - `inline` 时强制大小为 `compact`
   */
  nzLayout?: 'horizontal' | 'vertical' | 'inline';
  /**
   * 间距，当 `nzLayout:horizontal` 时有效，默认：`32`
   */
  gutter?: number;
  /**
   * 列数，默认：`2`
   */
  col?: number;
  /**
   * 标签文本宽度，单位：`px`，默认：`150`
   */
  labelWidth?: number;
  /**
   * 是否立即呈现错误视觉，默认：`false`
   */
  firstVisual?: boolean;
  /**
   * 是否忽略 `dirty` 校验，默认：`false`
   */
  ingoreDirty?: boolean;
}
