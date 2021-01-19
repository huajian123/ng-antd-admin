export interface AlainXlsxConfig {
  /**
   * Xlsx library path, default: `//cdn.bootcss.com/xlsx/0.15.6/xlsx.full.min.js`
   */
  url?: string;
  /**
   * Defines which Xlsx optional modules should get loaded, e.g:
   *
   * `[ '//cdn.bootcss.com/xlsx/0.15.6/cpexcel.js' ]`
   */
  modules?: string[];
}
