import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

import {
  rotateInDownLeftOnEnterAnimation,
  rollInAnimation,
  zoomInLeftAnimation,
  zoomInDownOnEnterAnimation,
  hueRotateAnimation,
  zoomInUpOnEnterAnimation,
  rubberBandAnimation,
  flashAnimation,
  fadeInOnEnterAnimation,
  rubberBandOnEnterAnimation
} from 'angular-animations';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    rotateInDownLeftOnEnterAnimation({ anchor: 'enter' }),
    zoomInDownOnEnterAnimation({ anchor: 'enterLetterAnim1' }),
    fadeInOnEnterAnimation({ anchor: 'enterLetterAnim2' }),
    zoomInUpOnEnterAnimation({ anchor: 'enterLetterAnim3' }),
    rollInAnimation({ anchor: 'letterAnim1' }),
    zoomInLeftAnimation({ anchor: 'letterAnim2' }),
    rubberBandAnimation({ anchor: 'letterAnim3' }),
    hueRotateAnimation({ anchor: 'hueLetter', duration: 5000 }),
    flashAnimation({ anchor: 'flash' }),
    rubberBandOnEnterAnimation({ anchor: 'btnEnter', delay: 12500 }),
    fadeInOnEnterAnimation({ anchor: 'btnEnterFadeIn', delay: 12500, duration: 500 })
  ]
})
export class ExperimentsComponent implements OnInit {
  text1 = '少林功夫好，真的好，少林功夫棒，真的棒...'.split('');
  text2 = '你有金刚腿，我有金刚腿，我有铁头功，嗷嗷...'.split('');
  text3 = '我拳拳虎虎生风，虎虎生风，我掌掌黯然销魂，黯然销魂...'.split('');

  animationState = false;
  hueState = false;
  flashState = false;

  constructor( private cdr: ChangeDetectorRef) {
  }

  getDelay(index: number, lenght: number) {
    if (index < lenght / 2 - 2) {
      return index * 100;
    } else {
      return lenght * 100 - index * 100;
    }
  }

  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.cdr.markForCheck();
    }, 1);
  }

  ngOnInit() {}
}
