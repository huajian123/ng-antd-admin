import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ThemeService} from "../../core/services/store/theme.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Directive({
  selector: '[appLayoutHeadBg]'
})
export class LayoutHeadBgDirective implements OnInit, OnDestroy {
  private destory$ = new Subject<void>();
  constructor(private el: ElementRef, private themesService: ThemeService, private renderer2: Renderer2) {
  }

  ngOnInit(): void {
    this.themesService.getThemesMode().pipe(takeUntil(this.destory$)).subscribe(res => {
      if (res.mode === "top") {
        setTimeout(() => {
          this.renderer2.addClass(this.el.nativeElement, 'animate-03');
        })
      } else {
        this.renderer2.removeClass(this.el.nativeElement, 'animate-03');
      }
    })
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
