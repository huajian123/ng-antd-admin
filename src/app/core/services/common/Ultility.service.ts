import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class Ultility {
    constructor() {}

    public static isEmpty(str: string) {
        str = str + "";
        if (str == "null" || str == "" || str == "undefined" || str == null || str == undefined || str.length == 0) {
        return true;
        }
        return false;
    }
}