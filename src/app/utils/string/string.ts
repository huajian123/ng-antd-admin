import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { deepGet } from '../other/deep';

/**
 * 字符串格式化
 * ```
 * format('this is ${name}', { name: 'asdf' })
 * // output: this is asdf
 * format('this is ${user.name}', { user: { name: 'asdf' } }, true)
 * // output: this is asdf
 * ```
 */
export function format(str: string | null | undefined, obj: NzSafeAny | null | undefined, needDeepGet: boolean = false): string {
  return (str || '').replace(/\${([^}]+)}/g, (_work: string, key: string) =>
    needDeepGet ? deepGet(obj, key.split('.'), '') : (obj || {})[key] || '',
  );
}
