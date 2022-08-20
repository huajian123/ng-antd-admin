import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnInit
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PageHeaderType} from '@shared/components/page-header/page-header.component';
import {BreakpointObserver} from "@angular/cdk/layout";
import {ComponentPortal, CdkPortalOutletAttachedRef, Portal, ComponentType} from '@angular/cdk/portal';

import {StepOneComponent} from './step-one/step-one.component';
import {StepTwoComponent} from './step-two/step-two.component';
import {StepThreeComponent} from "@app/pages/page-demo/form/step/step-three/step-three.component";

type comp = StepOneComponent | StepTwoComponent | StepThreeComponent;

enum StepEnum {
  One,
  Two,
  Three
}

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent implements OnInit, AfterViewInit {
  selectedPortal!: Portal<any>;
  stepDirection: 'horizontal' | 'vertical' = 'horizontal';
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '分步表单',
    desc: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。（演示cdk传送点）',
    breadcrumb: ['首页', '表单页', '分步表单']
  };
  currentStep = 1;
  stepComponentArray: ComponentType<comp>[] = [StepOneComponent, StepTwoComponent, StepThreeComponent];
  componentPortal?: ComponentPortal<comp>;

  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {
  }

  go(step: StepEnum, ref: CdkPortalOutletAttachedRef, currentStepNum: number): void {
    this.currentStep = currentStepNum;
    ref!.destroy();
    this.goStep(step);
  }

  // 这么做完全是为了演示CDK portal的简单用法
  initComponent(ref: CdkPortalOutletAttachedRef): void {
    if (ref instanceof ComponentRef) {
      if (ref.instance instanceof StepOneComponent) {
        ref.instance.stepDirection = this.stepDirection;
        ref.instance.next.subscribe(() => {
          this.go(StepEnum.Two, ref, this.currentStep + 1)
        });
      }
      if (ref.instance instanceof StepTwoComponent) {
        ref.instance.previous.subscribe(() => {
          this.go(StepEnum.One, ref, this.currentStep - 1)
        });
        ref.instance.next.subscribe(() => {
          this.go(StepEnum.Three, ref, this.currentStep + 1)
        });
      }
      if (ref.instance instanceof StepThreeComponent) {
        ref.instance.stepDirection = this.stepDirection;
        ref.instance.next.subscribe(() => {
          this.go(StepEnum.One, ref, 1)
        });
      }
    }
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 770px)']).subscribe(result => {
      let tempDir: 'vertical' | 'horizontal' = result.matches ? 'vertical' : 'horizontal'
      if (tempDir !== this.stepDirection) {
        this.stepDirection = tempDir;
        this.cdr.markForCheck();
      }
    });
  }

  goStep(step: number): void {
    this.componentPortal = new ComponentPortal(this.stepComponentArray[step]);
    this.selectedPortal = this.componentPortal;
  }

  ngAfterViewInit(): void {
    this.goStep(StepEnum.One);
  }
}
