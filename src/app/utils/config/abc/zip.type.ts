export interface AlainZipConfig {
  /**
   * Zip library path, Default: `//cdn.bootcss.com/jszip/3.3.0/jszip.min.js`
   */
  url?: string;
  /**
   * Defines which zip optional utils should get loaded
   */
  utils?: string[];
}
