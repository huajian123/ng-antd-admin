import { Directive, ElementRef, HostBinding, Input, numberAttribute, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: '.psm__progress-bar',
  standalone: true
})
export class PSMProgressBarDirective implements OnChanges {
  @Input({ transform: numberAttribute })
  numberOfProgressBarItems: number | undefined;

  @Input({ transform: numberAttribute })
  passwordStrength: number | undefined;

  @Input()
  colors: string[] = [];

  @HostBinding('attr.aria-valuemin') minProgressVal = 0;

  @HostBinding('attr.aria-valuemax') maxProgressVal = 100;

  @HostBinding('attr.aria-valuenow') currentProgressVal = 0;

  @HostBinding('attr.data-strength') dataPasswordStrength = 0;

  progressBar: HTMLDivElement;

  private defaultColors = ['darkred', 'orangered', 'orange', 'yellowgreen', 'green'];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLDivElement>
  ) {
    this.progressBar = this.el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['numberOfProgressBarItems']) {
      this.setProgressBarItems();
    }

    this.setProgressBar();
  }

  setProgressBarItems(): void {
    const progressBarItemContainer = this.progressBar.querySelector('.psm__progress-bar-items');
    const width = 100 / this.numberOfProgressBarItems!;

    progressBarItemContainer!.childNodes.forEach(item => {
      this.renderer.removeChild(progressBarItemContainer, item);
    });

    Array(this.numberOfProgressBarItems)
      .fill(1)
      .forEach(_ => {
        const progressBarItem = this.renderer.createElement('div');
        this.renderer.addClass(progressBarItem, 'psm__progress-bar-item');
        this.renderer.setStyle(progressBarItem, 'width', `${width}%`);
        this.renderer.appendChild(progressBarItemContainer, progressBarItem);
      });
  }

  setProgressBar(): void {
    const progressBarOverlayWidth = this.getFillMeterWidth(this.passwordStrength as number);
    const progressBarOverlayWidthInPx = `${progressBarOverlayWidth}%`;

    const progressLevelBasedOnItems = (progressBarOverlayWidth / 100) * this.numberOfProgressBarItems!;
    const progressBarOverlayColor = this.getMeterFillColor(progressLevelBasedOnItems);

    this.dataPasswordStrength = this.passwordStrength || 0;
    this.currentProgressVal = progressBarOverlayWidth;

    const overlayElement = this.progressBar.querySelector<HTMLDivElement>('.psm__progress-bar-overlay');

    if (overlayElement) {
      this.renderer.setStyle(overlayElement, 'width', progressBarOverlayWidthInPx);

      this.renderer.setStyle(overlayElement, 'background-color', progressBarOverlayColor);
    }
  }

  getFillMeterWidth(strength: number): number {
    if (strength === null || strength === undefined) {
      return 0;
    }

    const strengthInPercentage = strength !== null ? ((strength + 1) / 5) * 100 : 0;

    const roundedStrengthInPercentage = this.getRoundedStrength(strengthInPercentage, 100 / this.numberOfProgressBarItems!);
    return roundedStrengthInPercentage;
  }

  getMeterFillColor(progressLevel: number): string {
    if (!progressLevel || progressLevel <= 0 || (progressLevel > this.colors.length && progressLevel > this.defaultColors.length)) {
      return this.colors[0] ? this.colors[0] : this.defaultColors[0];
    }

    const index = progressLevel - 1;

    return this.colors[index] ? this.colors[index] : this.defaultColors[index];
  }

  private getRoundedStrength(strength: number, roundTo: number): number {
    return Math.round(strength / roundTo) * roundTo;
  }
}
