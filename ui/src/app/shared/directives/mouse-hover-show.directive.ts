import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMouseHoverShow]',
  standalone: true,
  host: {
    '(mouseover)': 'onMouseenter()',
    '(mouseout)': 'onMouseLeave()'
  }
})
export class MouseHoverShowDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  onMouseenter(): void {
    this.mouse('inline');
  }

  onMouseLeave(): void {
    this.mouse('none');
  }

  private mouse(dis: string): void {
    this.renderer.setStyle(this.el.nativeElement.lastChild, 'display', dis);
  }
}
