import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  bounceAnimation,
  flashAnimation,
  pulseAnimation,
  rubberBandAnimation,
  shakeAnimation,
  swingAnimation,
  tadaAnimation,
  wobbleAnimation,
  jelloAnimation,
  heartBeatAnimation,
  headShakeAnimation,
  bounceInAnimation,
  bounceInDownAnimation,
  bounceInLeftAnimation,
  bounceInRightAnimation,
  bounceInUpAnimation,
  bounceOutAnimation,
  bounceOutDownAnimation,
  bounceOutLeftAnimation,
  bounceOutRightAnimation,
  bounceOutUpAnimation,
  fadeInAnimation,
  fadeInDownAnimation,
  fadeInDownBigAnimation,
  fadeInLeftAnimation,
  fadeInLeftBigAnimation,
  fadeInRightAnimation,
  fadeInRightBigAnimation,
  fadeInUpAnimation,
  fadeInUpBigAnimation,
  fadeOutAnimation,
  fadeOutDownAnimation,
  fadeOutDownBigAnimation,
  fadeOutLeftAnimation,
  fadeOutLeftBigAnimation,
  fadeOutRightAnimation,
  fadeOutRightBigAnimation,
  fadeOutUpAnimation,
  fadeOutUpBigAnimation,
  flipAnimation,
  flipInXAnimation,
  flipInYAnimation,
  flipOutXAnimation,
  flipOutYAnimation,
  lightSpeedInAnimation,
  lightSpeedOutAnimation,
  rotateInAnimation,
  rotateInDownLeftAnimation,
  rotateInDownRightAnimation,
  rotateInUpLeftAnimation,
  rotateInUpRightAnimation,
  rotateOutAnimation,
  rotateOutDownLeftAnimation,
  rotateOutDownRightAnimation,
  rotateOutUpLeftAnimation,
  rotateOutUpRightAnimation,
  slideInDownAnimation,
  slideInLeftAnimation,
  slideInRightAnimation,
  slideInUpAnimation,
  slideOutDownAnimation,
  slideOutLeftAnimation,
  slideOutRightAnimation,
  slideOutUpAnimation,
  zoomInAnimation,
  zoomInDownAnimation,
  zoomInLeftAnimation,
  zoomInRightAnimation,
  zoomInUpAnimation,
  zoomOutAnimation,
  zoomOutDownAnimation,
  zoomOutLeftAnimation,
  zoomOutRightAnimation,
  zoomOutUpAnimation,
  hingeAnimation,
  jackInTheBoxAnimation,
  rollInAnimation,
  rollOutAnimation,
  // other
  collapseAnimation,
  collapseHorizontallyAnimation,
  rotateAnimation,
  bounceInUpOnEnterAnimation,
  hueRotateAnimation
} from 'angular-animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { AngularImgComponent } from '../angular-img/angular-img.component';

@Component({
  selector: 'app-demo-main',
  templateUrl: './demo-main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    bounceInUpOnEnterAnimation({ anchor: 'enter1' }),
    bounceInUpOnEnterAnimation({ anchor: 'enter2', delay: 100 }),
    bounceInUpOnEnterAnimation({ anchor: 'enter3', delay: 200 }),
    bounceAnimation(),
    flashAnimation(),
    pulseAnimation({ anchor: 'pulse' }),
    rubberBandAnimation(),
    shakeAnimation(),
    swingAnimation(),
    tadaAnimation(),
    wobbleAnimation(),
    jelloAnimation(),
    heartBeatAnimation(),
    headShakeAnimation(),
    bounceInAnimation(),
    bounceInDownAnimation(),
    bounceInLeftAnimation(),
    bounceInRightAnimation(),
    bounceInUpAnimation(),
    bounceOutAnimation(),
    bounceOutDownAnimation(),
    bounceOutLeftAnimation(),
    bounceOutRightAnimation(),
    bounceOutUpAnimation(),
    fadeInAnimation(),
    fadeInDownAnimation(),
    fadeInDownBigAnimation(),
    fadeInLeftAnimation(),
    fadeInLeftBigAnimation(),
    fadeInRightAnimation(),
    fadeInRightBigAnimation(),
    fadeInUpAnimation(),
    fadeInUpBigAnimation(),
    fadeOutAnimation(),
    fadeOutDownAnimation(),
    fadeOutDownBigAnimation(),
    fadeOutLeftAnimation(),
    fadeOutLeftBigAnimation(),
    fadeOutRightAnimation(),
    fadeOutRightBigAnimation(),
    fadeOutUpAnimation(),
    fadeOutUpBigAnimation(),
    flipAnimation(),
    flipInXAnimation(),
    flipInYAnimation(),
    flipOutXAnimation(),
    flipOutYAnimation(),
    lightSpeedInAnimation(),
    lightSpeedOutAnimation(),
    rotateInAnimation(),
    rotateInDownLeftAnimation(),
    rotateInDownRightAnimation(),
    rotateInUpLeftAnimation(),
    rotateInUpRightAnimation(),
    rotateOutAnimation(),
    rotateOutDownLeftAnimation(),
    rotateOutDownRightAnimation(),
    rotateOutUpLeftAnimation(),
    rotateOutUpRightAnimation(),
    slideInDownAnimation(),
    slideInLeftAnimation(),
    slideInRightAnimation(),
    slideInUpAnimation(),
    slideOutDownAnimation(),
    slideOutLeftAnimation(),
    slideOutRightAnimation(),
    slideOutUpAnimation(),
    zoomInAnimation(),
    zoomInDownAnimation(),
    zoomInLeftAnimation(),
    zoomInRightAnimation(),
    zoomInUpAnimation(),
    zoomOutAnimation(),
    zoomOutDownAnimation(),
    zoomOutLeftAnimation(),
    zoomOutRightAnimation(),
    zoomOutUpAnimation(),
    hingeAnimation(),
    jackInTheBoxAnimation(),
    rollInAnimation(),
    rollOutAnimation(),
    // other
    collapseAnimation(),
    collapseHorizontallyAnimation(),
    rotateAnimation(),
    rotateAnimation({ anchor: 'rotate90', degrees: 90 }),
    hueRotateAnimation(),
    hueRotateAnimation({ anchor: 'hueButton', duration: 20000 })
  ],
  standalone: true,
  imports: [AngularImgComponent, NzSelectModule, FormsModule, NzButtonModule, NzWaveModule]
})
export class DemoMainComponent {
  options = [
    {
      label: 'Attention Seekers',
      animations: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat', 'headShake']
    },
    {
      label: 'Bouncing Entrances',
      animations: ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp']
    },
    {
      label: 'Bouncing Exits',
      animations: ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp']
    },
    {
      label: 'Fading Entrances',
      animations: ['fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig']
    },
    {
      label: 'Fading Exits',
      animations: ['fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig']
    },
    {
      label: 'Flippers',
      animations: ['flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY']
    },
    {
      label: 'Lightspeed',
      animations: ['lightSpeedIn', 'lightSpeedOut']
    },
    {
      label: 'Rotating Entrances',
      animations: ['rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight']
    },
    {
      label: 'Rotating Exits',
      animations: ['rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight']
    },
    {
      label: 'Sliding Entrances',
      animations: ['slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight']
    },
    {
      label: 'Sliding Exits',
      animations: ['slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight']
    },
    {
      label: 'Zoom Entrances',
      animations: ['zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp']
    },
    {
      label: 'Zoom Exits',
      animations: ['zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp']
    },
    {
      label: 'Specials',
      animations: ['hinge', 'jackInTheBox', 'rollIn', 'rollOut']
    },
    {
      label: 'Other',
      animations: ['collapse', 'collapseHorizontally', 'rotate', 'rotate90', 'rotate720', 'hueRotate']
    }
  ];
  animation = 'rubberBand';
  animationState = false;
  animationWithState = false;
  hueBtnState = false;

  private cdr = inject(ChangeDetectorRef);

  animate(): void {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
      this.cdr.markForCheck();
    }, 1);
  }
}
