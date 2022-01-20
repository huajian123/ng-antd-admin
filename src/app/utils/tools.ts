import {FormGroup} from '@angular/forms';
import CryptoJS from 'crypto-js';
import {silentEvent} from 'ng-zorro-antd/core/util';
import {v4 as uuidv4} from 'uuid';


const fnGetFile = function getFile(url: string, isBlob = false): Promise<any> {
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

const fnStopMouseEvent = function stopMouseEvent(e: MouseEvent): void {
  silentEvent(e);
  // e.stopPropagation();
  // e.preventDefault();
};


// 数组对象去重
const fnRemoveDouble = function removeDouble<T>(list: any[], col: any): T {
  const obj = {};
  return list.reduce((cur, next) => {
    // @ts-ignore
    obj[next[col]] ? '' : obj[next[col]] = true && cur.push(next);
    return cur;
  }, []);
};

// 获取路由最后一个/后面的字符串
const fnFormatePath = function formatePath(path: string): string {
  const newpath = path.replace(/\/[0-9]+/g, '');
  const paramIndex = newpath.substring(newpath.lastIndexOf('\/') + 1).indexOf('?');
  if (paramIndex > -1) {
    const tempPath = newpath.substring(newpath.lastIndexOf('\/') + 1);
    return tempPath.substring(0, paramIndex);
  } else {
    return newpath.substring(newpath.lastIndexOf('\/') + 1);
  }
};

// 返回uuid
const fnGetUUID = function getUUID(): string {
  return uuidv4();
}

const fnGetBase64 = function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// 加密
const fnEncrypt = function encrypt(word: any, keyStr: string) {
  return CryptoJS.AES.encrypt(JSON.stringify(word), keyStr).toString();
}

// 解密
const fnDecrypt = function decrypt(word: any, keyStr: string) {
  const bytes = CryptoJS.AES.decrypt(word, keyStr);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export {
  fnDecrypt,
  fnEncrypt,
  fnGetBase64,
  fnGetFile,
  fnCheckForm,
  fnStopMouseEvent,
  fnFormatePath,
  fnRemoveDouble,
  fnGetUUID
};
