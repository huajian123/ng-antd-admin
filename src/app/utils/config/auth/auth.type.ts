export interface AlainAuthConfig {
  /**
   * 存储KEY值，默认：`_token`
   */
  store_key?: string;
  /**
   * 无效时跳转至登录页，默认：`true`，包括：
   * - 无效token值
   * - token已过期（限JWT）
   */
  token_invalid_redirect?: boolean;
  /**
   * token过期时间偏移值，默认：`10` 秒（单位：秒）
   */
  token_exp_offset?: number;
  /**
   * 发送token参数名，默认：·
   */
  token_send_key?: string;
  /**
   * 发送token模板（默认为：`'${token}'`），使用 `${token}` 表示token点位符（**注意：**请务必使用 \`\` 包裹），例如：
   *
   * - `Bearer ${token}`
   */
  token_send_template?: string;
  /**
   * 发送token参数位置，默认：`header`
   */
  token_send_place?: 'header' | 'body' | 'url';
  /**
   * 登录页路由地址，默认：`/login`
   */
  login_url?: string;
  /**
   * 忽略TOKEN的URL地址列表，默认值为：`[/\/login/, /assets\//, /passport\//]`
   */
  ignores?: RegExp[];
  /**
   * 允许匿名登录KEY，若请求参数中带有该KEY表示忽略TOKEN，默认：`_allow_anonymous`
   */
  allow_anonymous_key?: string;
  /**
   * 是否校验失效时命中后继续调用后续拦截器的 `intercept` 方法，默认：`true`
   */
  executeOtherInterceptors?: boolean;
  /**
   * 刷新间隔时长（单位：ms），默认：`3000`
   */
  refreshTime?: number;
  /**
   * 过期计算偏移值（单位：ms），默认：`6000`
   * - **建议**根据 `refreshTime` 倍数来设置
   */
  refreshOffset?: number;
}
