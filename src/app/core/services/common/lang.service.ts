import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang = ['VNI','ENG','JPN']

  constructor() { }
}
