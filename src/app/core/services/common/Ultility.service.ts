import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fnFormatePath, fnGetPathWithoutParam } from '@app/utils/tools';
import { SimpleReuseStrategy } from './reuse-strategy';
@Injectable({
    providedIn: 'root'
})
export class Ultility {
    
    constructor(
        private router : Router
    ) {}

    public static isEmpty(str: string) {
        str = str + "";
        if (str == "null" || str == "" || str == "undefined" || str == null || str == undefined || str.length == 0) {
        return true;
        }
        return false;
    }

    refresh(url:string): void {
        const sourceUrl = url;
        // 只有当前页签会刷新，如果涉及到tab页内的详情的页面不会刷新
        const currentRoute = fnGetPathWithoutParam(sourceUrl);
        const queryParams = this.router.parseUrl(sourceUrl).queryParams;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          SimpleReuseStrategy.deleteRouteSnapshot(this.getPathKey(sourceUrl));
          this.router.navigate([currentRoute], { queryParams });
        });
      }
      
      getPathKey(path: string): string {
        const tempPath = fnFormatePath(path);
        const pathParam = this.router.parseUrl(path).queryParams;
        let pathParamString = '';
        if (Object.keys(pathParam).length > 0) {
          pathParamString = JSON.stringify(this.router.parseUrl(path).queryParams);
        }
        return tempPath + pathParamString;
      }
}