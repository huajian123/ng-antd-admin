/**
 *  $timeoutメソッド代替え
 */
 export function $timeout(fn:any, delay= 0, ...args: any[]): void{

    new Promise((resolve, reject) => {
      setTimeout(function() {
        try {
          resolve(fn.apply(null, args));
        } catch (e) {
          reject(e);
        } finally {
        }
      }, delay);

    });
}
