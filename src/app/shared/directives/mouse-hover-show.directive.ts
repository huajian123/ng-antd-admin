import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMouseHoverShow]',
  standalone: true
})
export class MouseHoverShowDirective {
  @HostListener('mouseover')
  onMouseenter(): void {
    this.mouse('inline');
  }

  @HostListener('mouseout')
  onMouseLeave(): void {
    this.mouse('none');
  }

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  private mouse(dis: string): void {
    this.renderer.setStyle(this.el.nativeElement.lastChild, 'display', dis);
  }
}
