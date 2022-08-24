/** 是否为数字 */
export function isNum(value: string | number): boolean {
  return /^((-?\d+\.\d+)|(-?\d+)|(-?\.\d+))$/.test(value.toString());
}

/** 是否为整数 */
export function isInt(value: string | number): boolean {
  return isNum(value) && parseInt(value.toString(), 10).toString() === value.toString();
}

/** 是否为小数 */
export function isDecimal(value: string | number): boolean {
  return isNum(value) && !isInt(value);
}

/** 是否为身份证 */
export function isIdCard(value: string): boolean {
  return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(value);
}

/** 是否为手机号 */
export function isMobile(value: string): boolean {
  return /^(0|\+?86|17951)?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
}

/** 是否为电话号码 */
export function isTelPhone(value: string): boolean {
  return /^(0\d{2,3}-?)?\d{7,8}$/.test(value);
}

/** 是否邮箱地址 */
export function isEmail(value: string): boolean {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
}

/** 密码由6到20位大小写字母 */
export function isPasswordPass(value: string): boolean {
  const regTure = /^[^\s]{6,20}$/;
  const regFalse = /^\d+$/;
  return regTure.test(value) && !regFalse.test(value);
}

/** 是否URL地址 */
export function isUrl(url: string): boolean {
  return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(url);
}
