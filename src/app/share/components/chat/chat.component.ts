import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  @Output() changeShows = new EventEmitter<boolean>();
  validateForm!: FormGroup;
  userSubmitArray: string[] = [];
  show = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnDestroy(): void {
    console.log('客服功能销毁了');
  }

  close(): void {
    this.changeShows.emit(false);
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  sendMessage(msg: string): void {
    this.userSubmitArray.push(msg);
    setTimeout(() => {
      this.validateForm.get('question')?.setValue(null);
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      question: [null],
    });
    this.scrollToBottom();
  }

}
