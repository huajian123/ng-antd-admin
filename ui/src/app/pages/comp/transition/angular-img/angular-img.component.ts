import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-angular-img',
  templateUrl: './angular-img.component.html',
  styleUrls: ['./angular-img.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AngularImgComponent {}
