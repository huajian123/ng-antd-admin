import { Component,Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $timeout } from 'src/app/common/Time';
@Component ({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export abstract class BaseComponent implements OnInit,OnDestroy {

  abstract DisplayUrl : any;
  constructor(
    protected injector: Injector,
    protected router: Router
  ) { }

  ngOnDestroy(): void {
    this.fnDestroy();
  }

  ngOnInit(): void {
    this.fnInit();
    console.log(this.router.url);
  }

  abstract fnDestroy(): any;

  abstract fnInit(): any;

}
