import { Component,ChangeDetectionStrategy, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../system/base/base.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent extends BaseComponent {
  DisplayUrl: any;
  constructor(
    protected override  injector: Injector,
    protected override router: Router,
  ) {
    super(injector,router);
   }

  title = "";

  fnInit() {
    console.log("da vao day");
    this.title = "nampham";
    console.log(this.title);
  }

  fnDestroy(){
    console.log("");
  }
}
