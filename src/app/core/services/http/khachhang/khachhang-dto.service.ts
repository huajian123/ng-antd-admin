import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KhachhangDtoService {

  kbnflg = false;
  id = "";
  name = "";
  dienthoai = "";
  diachi = "";
  groupid = "";
  sotienno = 0;
  constructor() { }

  clear() {
    this.kbnflg = false;
    this.id = "";
    this.name = "";
    this.dienthoai = "";
    this.diachi = "";
    this.groupid = "";
    this.sotienno = 0;
  }
}
