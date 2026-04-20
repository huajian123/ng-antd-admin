import { booleanAttribute, Directive, DOCUMENT, ElementRef, inject, input } from '@angular/core';

const RIPPLE_STYLE_ID = 'app-ripple-styles';

@Directive({
  selector: '[appRipple]',
  host: {
    '(click)': 'onClick($event)'
  }
})
export class RippleDirective {
  readonly color = input('rgba(0,0,0,0.15)');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly unbounded = input(false, { transform: booleanAttribute });

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly doc = inject(DOCUMENT);

  constructor() {
    this.injectStyles();
  }

  onClick(event: MouseEvent): void {
    if (this.disabled()) return;

    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = this.unbounded() ? rect.width / 2 - size / 2 : event.clientX - rect.left - size / 2;
    const y = this.unbounded() ? rect.height / 2 - size / 2 : event.clientY - rect.top - size / 2;

    const ripple = this.doc.createElement('span');
    ripple.className = 'app-ripple-element';
    Object.assign(ripple.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`,
      background: this.color()
    });

    host.style.position = host.style.position || 'relative';
    host.style.overflow = this.unbounded() ? 'visible' : 'hidden';
    host.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  private injectStyles(): void {
    if (this.doc.getElementById(RIPPLE_STYLE_ID)) return;
    const style = this.doc.createElement('style');
    style.id = RIPPLE_STYLE_ID;
    style.textContent = `
      @keyframes ripple-effect {
        to { transform: scale(4); opacity: 0; }
      }
      .app-ripple-element {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-effect 0.6s linear;
        pointer-events: none;
      }
    `;
    this.doc.head.appendChild(style);
  }
}
