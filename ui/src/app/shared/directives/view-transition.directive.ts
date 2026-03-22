import { Directive, inject, input, computed } from '@angular/core';
import { ViewTransitionService } from '@core/services/common/view-transition.service';

@Directive({
  selector: '[appViewTransition]',
  host: { '[style.view-transition-name]': 'viewTransitionName()' }
})
export class ViewTransitionDirective {
  private readonly viewTranistionService = inject(ViewTransitionService);

  readonly name = input.required<string>({ alias: 'appViewTransition' });
  readonly id = input.required<number>();

  protected readonly viewTransitionName = computed(() => {
    const currentTransition = this.viewTranistionService.currentTransition();

    const apply = Number(currentTransition?.to.firstChild?.queryParams['id']) === this.id() || Number(currentTransition?.from.firstChild?.queryParams['id']) === this.id();
    return apply ? this.name() : 'none';
  });
}
