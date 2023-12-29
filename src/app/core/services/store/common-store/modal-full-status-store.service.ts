import { Injectable } from '@angular/core';
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
  private modalFullStatusStore$ = new BehaviorSubject<boolean>(false);

  setModalFullStatusStore(store: boolean): void {
    this.modalFullStatusStore$.next(store);
  }

  getModalFullStatusStore(): Observable<boolean> {
    return this.modalFullStatusStore$.asObservable();
  }
}
