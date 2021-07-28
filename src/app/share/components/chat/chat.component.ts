import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewChecked, OnDestroy, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
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

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  close(): void {
    this.changeShows.emit(false);
  }

  scrollToBottom(): void {
    try {
      console.log('这里会一直调用，如果不需要客服功能，直接把这个chat组件删除掉，避免性能浪费');
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  submitDesc(value: string): void {
    this.userSubmitArray.push(value);
    this.validateForm.get('question')?.reset();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      question: [null],
    });
    this.scrollToBottom();
  }

}
