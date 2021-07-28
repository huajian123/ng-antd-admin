import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  question = '';
  validateForm!: FormGroup;
  userSubmitArray: string[] = [];
  show = false;

  constructor(private fb: FormBuilder) {
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
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
