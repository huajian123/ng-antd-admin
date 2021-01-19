export interface AlainLodopConfig {
  /**
   * 注册信息：主注册号
   */
  license?: string;
  /**
   * 注册信息：附加注册号A
   */
  licenseA?: string;
  /**
   * 注册信息：附加注册号B
   */
  licenseB?: string;
  /**
   * 注册信息：注册单位名称
   */
  companyName?: string;
  /**
   * Lodop 远程脚本URL地址，**注意**务必使用 `name` 属性指定变量值
   *
   * - http://localhost:18000/CLodopfuncs.js
   * - https://localhost:8443/CLodopfuncs.js [默认]
   */
  url?: string;
  /**
   * Lodop 变量名，默认：`CLODOP`
   */
  name?: string;
  /**
   * 检查次数，默认 `100`，当检查超过时视为异常，这是因为 Lodop 需要连接 WebSocket
   */
  checkMaxCount?: number;
}
