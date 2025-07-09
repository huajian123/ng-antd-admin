import { BreakpointObserver } from '@angular/cdk/layout';
import { Directive, inject, input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

/*屏幕宽度小于某个宽度时不显示的组件*/
@Directive({
  selector: '[appScreenLessHidden]',
  standalone: true
})
export class ScreenLessHiddenDirective implements OnInit {
  appScreenLessHidden = input('', { transform: this.appendPx });

  private breakpointObserver = inject(BreakpointObserver);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  private show(matched: boolean): void {
    matched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
  }

  appendPx(value: number): string {
    return `${value}px`;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([`(max-width: ${this.appScreenLessHidden()})`]).subscribe(result => {
      if (result.matches) {
        this.show(false);
      } else {
        this.show(true);
      }
    });
  }
}
