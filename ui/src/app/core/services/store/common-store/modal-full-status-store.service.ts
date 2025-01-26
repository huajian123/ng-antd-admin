import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * 用于存储对话框是否是全屏状态的service
 * 就算打开多个对话框，同一时间也只能存在一个全屏的对话框
 *
 */
@Injectable({
  providedIn: 'root'
})
export class ModalFullStatusStoreService {
  $modalFullStatusStore = signal(false);
}
