import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChuyendtoService {
  id = "";
  ngaydi = "";
  ngayve = "";
  tienxe =  0; // tiền đưa trước
  biensoxe = "";
  idtai = "";
  idphu = "";
  changduong = "";

  constructor() { }

  clear() {
    this.id = "";
    this.ngaydi = "";
    this.ngayve = "";
    this.tienxe =  0; // tiền đưa trước
    this.biensoxe = "";
    this.idtai = "";
    this.idphu = "";
    this.changduong = "";
  }
}
