import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

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

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private mouse(dis: string): void {
    this.renderer.setStyle(this.el.nativeElement.lastChild, 'display', dis);
  }
}
