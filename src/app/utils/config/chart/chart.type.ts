import { NzSafeAny } from 'ng-zorro-antd/core/types';

export interface AlainChartConfig {
  /**
   * [G2](https://g2.antv.vision/zh/docs/manual/getting-started) library path
   * default: `[
   *  "https://gw.alipayobjects.com/os/lib/antv/g2/4.1.4/dist/g2.min.js",
   *  "https://gw.alipayobjects.com/os/lib/antv/data-set/0.11.7/dist/data-set.js",
   * ]`
   */
  libs?: string[];

  theme?: string | { [key: string]: NzSafeAny };
}
