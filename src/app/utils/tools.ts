import {FormGroup} from '@angular/forms';

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
  e.stopPropagation();
  e.preventDefault();
};

// 获取路由最后一个/后面的字符串
const fnFormatePath = function formatePath(path: string): string {
  return path.substring(path.lastIndexOf('\/') + 1);
};

export {
  fnGetFile,
  fnCheckForm,
  fnStopMouseEvent,
  fnFormatePath
};
