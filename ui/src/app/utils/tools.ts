import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';

import { LockScreenFlag } from '@store/common-store/lock-screen-store.service';
// import CryptoJS from 'crypto-js';
import { endOfDay, startOfDay } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { silentEvent } from 'ng-zorro-antd/core/util';

/*获取1到100之间的随机整数 this.randomNum(1,101)*/
const fnGetRandomNum = function getRandomNum(m: number, n: number): number {
  return Math.floor(Math.random() * (m - n) + n);
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

// 获取路由复用缓存的key，为key+param的形式：login{name:xxx}
const getDeepReuseStrategyKeyFn = function (route: ActivatedRouteSnapshot, needParams = true): string {
  let temp = route;
  while (temp.firstChild) {
    temp = temp.firstChild;
  }
  return fnGetReuseStrategyKeyFn(temp, needParams);
};

// 获取key，为key+param的形式：login{name:xxx}
const fnGetReuseStrategyKeyFn = function getKey(route: ActivatedRouteSnapshot, needParams = true): string {
  const configKey = route.data['key'];
  if (!configKey) {
    return '';
  }
  if (!needParams) {
    return configKey;
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

// todo https://stackoverflow.com/questions/78263714/the-package-crypto-wasnt-found-on-the-file-system-but-is-built-into-node
// https://stackoverflow.com/questions/77918038/problem-while-ng-build-using-the-new-angular-17-application-builder
// 加密
const fnEncrypt = function encrypt(word: NzSafeAny, keyStr: string): string {
  return JSON.stringify(word);
  // return CryptoJS.AES.encrypt(JSON.stringify(word), keyStr).toString();
};

// 解密
const fnDecrypt = function decrypt(word: NzSafeAny, keyStr: string): LockScreenFlag {
  return JSON.parse(word);
  // const bytes = CryptoJS.AES.decrypt(word, keyStr);
  // return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

/*import {endOfDay, startOfDay} from 'date-fns';*/
const fnStartOfDay = function StartOfDay(time: number): number {
  return startOfDay(time).getTime();
};

const fnEndOfDay = function EndOfDay(time: number): number {
  return endOfDay(time).getTime();
};

// weak-theme 转换为 weakTheme
// https://blog.csdn.net/weixin_39238200/article/details/125665052
const fnFormatToHump = function formatToHump(value: string): string {
  return value.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
};

export {
  fnFormatToHump,
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
  fnGetRandomNum,
  fnStartOfDay,
  fnEndOfDay,
  fnGetUUID
};
