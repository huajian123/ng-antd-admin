import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-angular-img',
  templateUrl: './angular-img.component.html',
  styleUrls: ['./angular-img.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularImgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
