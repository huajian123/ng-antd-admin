import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChiphichuyenDtoService {
  idchuyen = '';
  tenchiphi = '';
  sotien = '';
  ghichu = '';
  constructor() { }
  clear() {
    this.idchuyen = '';
    this.tenchiphi = '';
    this.sotien = '';
    this.ghichu = '';
  }
}
