import { Injectable } from '@angular/core';
import { ChuyenService } from './chuyen.service';

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
  trangthai = 0;

  constructor(
    private dataService: ChuyenService,
  ) { }

  clear() {
    this.id = "";
    this.ngaydi = "";
    this.ngayve = "";
    this.tienxe =  0; // tiền đưa trước
    this.biensoxe = "";
    this.idtai = "";
    this.idphu = "";
    this.changduong = "";
    this.trangthai = 0;
  }

}
