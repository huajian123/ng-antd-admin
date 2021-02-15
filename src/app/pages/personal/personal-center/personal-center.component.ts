import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalCenterComponent implements OnInit {
  tagArray: string[] = ['很有想法的', '专注设计', '大长腿', '川妹子', '海纳百川'];
  inputVisible: boolean = false;
  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;
  inputValue = '';
  tabData = [
    {lable: '文章(8)', route: 'personal-article'},
    {lable: '应用(8)', route: 'personal-application'},
    {lable: '项目(8)', route: 'personal-project'},
  ];

  constructor(private router: Router) {
  }

  to(path: string): void {
    // this.router.navigateByUrl(`/default/personal/personal-center/${path}`);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tagArray.indexOf(this.inputValue) === -1) {
      this.tagArray = [...this.tagArray, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      console.log(1234);
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  ngOnInit(): void {
  }

}
