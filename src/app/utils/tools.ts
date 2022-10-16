import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';

import { LockScreenFlag } from '@store/common-store/lock-screen-store.service';
import CryptoJS from 'crypto-js';
import { endOfDay, startOfDay } from 'date-fns';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { silentEvent } from 'ng-zorro-antd/core/util';
import { v4 as uuidv4 } from 'uuid';

/*获取1到100之间的随机整数 this.randomNum(1,101)*/
const fnGetRandomNum = function getRandomNum(m: number, n: number): number {
  let num = Math.floor(Math.random() * (m - n) + n);
  return num;
};

const fnGetFile = function getFile(url: string, isBlob = false): Promise<NzSafeAny> {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest();
    client.responseType = isBlob ? 'blob' : '';
    client.onreadystatechange = () => {
      if (client.readyState !== 4) {
        return;
      }
      if (client.status === 200) {
        const urlArr = client.responseURL.split('/');
        resolve({
          data: client.response,
          url: urlArr[urlArr.length - 1]
        });
      } else {
        reject(new Error(client.statusText));
      }
    };
    client.open('GET', url);
    client.send();
  });
};

const fnCheckForm = function checkForm(form: FormGroup): boolean {
  Object.keys(form.controls).forEach(key => {
    form.controls[key].markAsDirty();
    form.controls[key].updateValueAndValidity();
  });
  return !form.invalid;
};

// 清空formArray
const fnClearFormArray = function clearFormArray(formArray: FormArray): void {
  while (formArray.length !== 0) {
    formArray.removeAt(0);
  }
};

const fnStopMouseEvent = function stopMouseEvent(e: MouseEvent): void {
  silentEvent(e);
  // e.stopPropagation();
  // e.preventDefault();
};

// 数组对象去重
const fnRemoveDouble = function removeDouble<T>(list: NzSafeAny[], col: NzSafeAny): T {
  const obj = {};
  return list.reduce((cur, next) => {
    // @ts-ignore
    obj[next[col]] ? '' : (obj[next[col]] = true && cur.push(next));
    return cur;
  }, []);
};

// 获取路由复用缓存的key，为key+param的形式：login{name:xxx}
const getDeepReuseStrategyKeyFn = function (route: ActivatedRouteSnapshot): string {
  let temp = route;
  while (temp.firstChild) {
    temp = temp.firstChild;
  }
  return fnGetReuseStrategyKeyFn(temp);
};

// 获取key，为key+param的形式：login{name:xxx}
const fnGetReuseStrategyKeyFn = function getKey(route: ActivatedRouteSnapshot): string {
  const configKey = route.data['key'];
  if (!configKey) {
    return '';
  }
  // 是query传参,并且有参数
  if (Object.keys(route.queryParams).length > 0) {
    return configKey + JSON.stringify(route.queryParams);
  } else if (Object.keys(route.params).length > 0) {
    // 是路径传参，并且有参数
    return configKey + JSON.stringify(route.params);
  } else {
    // 没有路由参数
    return `${configKey}{}`;
  }
};

// 获取没有参数的路由
const fnGetPathWithoutParam = function getPathWithoutParam(path: string): string {
  const paramIndex = path.indexOf('?');
  if (paramIndex > -1) {
    return path.substring(0, paramIndex);
  }
  return path;
};

// 返回uuid
const fnGetUUID = function getUUID(): string {
  return uuidv4();
};

const fnGetBase64 = function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// 加密
const fnEncrypt = function encrypt(word: NzSafeAny, keyStr: string): string {
  return CryptoJS.AES.encrypt(JSON.stringify(word), keyStr).toString();
};

// 解密
const fnDecrypt = function decrypt(word: NzSafeAny, keyStr: string): LockScreenFlag {
  const bytes = CryptoJS.AES.decrypt(word, keyStr);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

/*import {endOfDay, startOfDay} from 'date-fns';*/
const fnStartOfDay = function StartOfDay(time: number): number {
  return startOfDay(time).getTime();
};

const fnEndOfDay = function EndOfDay(time: number): number {
  return endOfDay(time).getTime();
};

export {
  fnGetReuseStrategyKeyFn,
  fnDecrypt,
  fnEncrypt,
  fnGetBase64,
  fnGetPathWithoutParam,
  fnGetFile,
  fnClearFormArray,
  fnCheckForm,
  fnStopMouseEvent,
  getDeepReuseStrategyKeyFn,
  fnRemoveDouble,
  fnGetRandomNum,
  fnStartOfDay,
  fnEndOfDay,
  fnGetUUID
};
