import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolemanagerService {

  flag = true;
  role_id = "";
  mota = "";
  

  constructor() { }

  clear() {
    this.flag = true;
    this.role_id = "";
    this.mota = "";
  }
}
