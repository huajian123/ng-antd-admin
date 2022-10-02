import { Component,ChangeDetectionStrategy, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit {


  constructor(){}

  ngOnInit(): void {
    
  }

}
