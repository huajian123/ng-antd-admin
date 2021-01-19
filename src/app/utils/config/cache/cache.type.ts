export interface AlainCacheConfig {
  /**
   * Cache mode, default: `promise`
   * - `promise` Convention mode, allowing `key` to get data as http
   * - `none` Normal mode
   */
  mode?: 'promise' | 'none';
  /**
   * Rename the return parameters, default: ``, for example:
   * - `null` The response body is content
   * - `list` The response body should be `{ list: [] }`
   * - `result.list` The response body should be `{ result: { list: [] } }`
   */
  reName?: string | string[];
  /**
   * Set the default storage type
   * - `m` Storage via memory
   * - `s` Storage via `localStorage`
   */
  type?: 'm' | 's';
  /**
   * Set the default expire time (Unit: second)
   */
  expire?: number;
  /**
   * Key prefix of persistent data, default: ``
   */
  prefix?: string;
  /**
   * Key name of persistent data metadata storage, default: `__cache_meta`
   */
  meta_key?: string;
}
