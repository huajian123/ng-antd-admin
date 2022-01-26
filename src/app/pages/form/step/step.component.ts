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
import {ComponentPortal, CdkPortalOutletAttachedRef, DomPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {StepOneComponent} from "@app/pages/form/step/step-one/step-one.component";
import {StepTwoComponent} from "@app/pages/form/step/step-two/step-two.component";
import {StepThreeComponent} from "@app/pages/form/step/step-three/step-three.component";
import {ComponentType} from "@angular/cdk/portal/portal";

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
  stepComponentArray: ComponentType<StepOneComponent | StepTwoComponent | StepThreeComponent>[] = [StepOneComponent, StepTwoComponent, StepThreeComponent];
  componentPortal?: ComponentPortal<StepOneComponent | StepTwoComponent | StepThreeComponent>;

  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {
  }

  // 这么做完全是为了演示CDK portal的简单用法
  initComponent(ref: CdkPortalOutletAttachedRef): void {
    if (ref instanceof ComponentRef) {
      if (ref.instance instanceof StepOneComponent) {
        ref.instance.stepDirection = this.stepDirection;
        ref.instance.next.subscribe(() => {
          this.currentStep = this.currentStep + 1;
          ref.destroy();
          this.goStep(1);
        });
      }
      if (ref.instance instanceof StepTwoComponent) {
        ref.instance.previous.subscribe(() => {
          this.currentStep = this.currentStep - 1;
          ref.destroy();
          this.goStep(0);
        });
        ref.instance.next.subscribe(() => {
          this.currentStep = this.currentStep + 1;
          ref.destroy();
          this.goStep(2);
        });
      }
      if (ref.instance instanceof StepThreeComponent) {
        ref.instance.stepDirection = this.stepDirection;
        ref.instance.next.subscribe(() => {
          this.currentStep = 1;
          ref.destroy();
          this.goStep(0);
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
   this.goStep(0);
  }
}
