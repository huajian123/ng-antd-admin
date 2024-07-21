
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  bounceOnEnterAnimation,
  flashOnEnterAnimation,
  pulseOnEnterAnimation,
  rubberBandOnEnterAnimation,
  shakeOnEnterAnimation,
  swingOnEnterAnimation,
  tadaOnEnterAnimation,
  wobbleOnEnterAnimation,
  jelloOnEnterAnimation,
  flipOnEnterAnimation,
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
  bounceInUpOnEnterAnimation,
  bounceOutDownOnLeaveAnimation,
  bounceInDownOnEnterAnimation,
  bounceOutUpOnLeaveAnimation,
  bounceInLeftOnEnterAnimation,
  bounceInRightOnEnterAnimation,
  bounceOutLeftOnLeaveAnimation,
  bounceOutRightOnLeaveAnimation,
  fadeInOnEnterAnimation,
  fadeInUpOnEnterAnimation,
  fadeInDownOnEnterAnimation,
  fadeInLeftOnEnterAnimation,
  fadeInRightOnEnterAnimation,
  fadeInUpBigOnEnterAnimation,
  fadeInDownBigOnEnterAnimation,
  fadeInLeftBigOnEnterAnimation,
  fadeInRightBigOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  fadeOutUpOnLeaveAnimation,
  fadeOutDownOnLeaveAnimation,
  fadeOutLeftOnLeaveAnimation,
  fadeOutRightOnLeaveAnimation,
  fadeOutUpBigOnLeaveAnimation,
  fadeOutDownBigOnLeaveAnimation,
  fadeOutLeftBigOnLeaveAnimation,
  fadeOutRightBigOnLeaveAnimation,
  flipInXOnEnterAnimation,
  flipInYOnEnterAnimation,
  flipOutXOnLeaveAnimation,
  flipOutYOnLeaveAnimation,
  lightSpeedInOnEnterAnimation,
  lightSpeedOutOnLeaveAnimation,
  rotateInOnEnterAnimation,
  rotateInUpLeftOnEnterAnimation,
  rotateInUpRightOnEnterAnimation,
  rotateInDownLeftOnEnterAnimation,
  rotateInDownRightOnEnterAnimation,
  rotateOutOnLeaveAnimation,
  rotateOutUpLeftOnLeaveAnimation,
  rotateOutUpRightOnLeaveAnimation,
  rotateOutDownLeftOnLeaveAnimation,
  rotateOutDownRightOnLeaveAnimation,
  slideInRightOnEnterAnimation,
  slideInUpOnEnterAnimation,
  slideInDownOnEnterAnimation,
  slideInLeftOnEnterAnimation,
  slideOutUpOnLeaveAnimation,
  slideOutDownOnLeaveAnimation,
  slideOutLeftOnLeaveAnimation,
  slideOutRightOnLeaveAnimation,
  zoomInOnEnterAnimation,
  zoomInUpOnEnterAnimation,
  zoomInDownOnEnterAnimation,
  zoomInLeftOnEnterAnimation,
  zoomInRightOnEnterAnimation,
  zoomOutOnLeaveAnimation,
  zoomOutUpOnLeaveAnimation,
  zoomOutDownOnLeaveAnimation,
  zoomOutLeftOnLeaveAnimation,
  zoomOutRightOnLeaveAnimation,
  hingeOnLeaveAnimation,
  jackInTheBoxOnEnterAnimation,
  rollInOnEnterAnimation,
  rollOutOnLeaveAnimation,
  expandOnEnterAnimation,
  collapseOnLeaveAnimation,
  fadeInExpandOnEnterAnimation,
  fadeOutCollapseOnLeaveAnimation,
  expandRightOnEnterAnimation,
  collapseLeftOnLeaveAnimation,
  fadeInExpandRightOnEnterAnimation,
  fadeOutCollapseLeftOnLeaveAnimation
} from 'angular-animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { AngularImgComponent } from '../angular-img/angular-img.component';
@Component({
  selector: 'app-demo-on-enter-on-leave',
  templateUrl: './demo-on-enter-on-leave.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    bounceInRightOnEnterAnimation({ anchor: 'enter1' }),
    bounceInRightOnEnterAnimation({ anchor: 'enter2', delay: 100 }),
    bounceInRightOnEnterAnimation({ anchor: 'enter3', delay: 200, animateChildren: 'none' }),
    bounceOnEnterAnimation(),
    flashOnEnterAnimation(),
    pulseOnEnterAnimation(),
    rubberBandOnEnterAnimation(),
    shakeOnEnterAnimation(),
    swingOnEnterAnimation(),
    tadaOnEnterAnimation(),
    wobbleOnEnterAnimation(),
    jelloOnEnterAnimation(),
    flipOnEnterAnimation(),
    bounceInOnEnterAnimation(),
    bounceInUpOnEnterAnimation(),
    bounceOutOnLeaveAnimation(),
    bounceOutDownOnLeaveAnimation(),
    bounceInDownOnEnterAnimation(),
    bounceOutUpOnLeaveAnimation(),
    bounceInLeftOnEnterAnimation(),
    bounceInRightOnEnterAnimation(),
    bounceOutLeftOnLeaveAnimation(),
    bounceOutRightOnLeaveAnimation(),
    fadeInOnEnterAnimation(),
    fadeInUpOnEnterAnimation(),
    fadeInDownOnEnterAnimation(),
    fadeInLeftOnEnterAnimation(),
    fadeInRightOnEnterAnimation(),
    fadeInUpBigOnEnterAnimation(),
    fadeInDownBigOnEnterAnimation(),
    fadeInLeftBigOnEnterAnimation(),
    fadeInRightBigOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    fadeOutUpOnLeaveAnimation(),
    fadeOutDownOnLeaveAnimation(),
    fadeOutLeftOnLeaveAnimation(),
    fadeOutRightOnLeaveAnimation(),
    fadeOutUpBigOnLeaveAnimation(),
    fadeOutDownBigOnLeaveAnimation(),
    fadeOutLeftBigOnLeaveAnimation(),
    fadeOutRightBigOnLeaveAnimation(),
    flipInXOnEnterAnimation(),
    flipInYOnEnterAnimation(),
    flipOutXOnLeaveAnimation(),
    flipOutYOnLeaveAnimation(),
    lightSpeedInOnEnterAnimation(),
    lightSpeedOutOnLeaveAnimation(),
    rotateInOnEnterAnimation(),
    rotateInUpLeftOnEnterAnimation(),
    rotateInUpRightOnEnterAnimation(),
    rotateInDownLeftOnEnterAnimation(),
    rotateInDownRightOnEnterAnimation(),
    rotateOutOnLeaveAnimation(),
    rotateOutUpLeftOnLeaveAnimation(),
    rotateOutUpRightOnLeaveAnimation(),
    rotateOutDownLeftOnLeaveAnimation(),
    rotateOutDownRightOnLeaveAnimation(),
    slideInRightOnEnterAnimation(),
    slideInUpOnEnterAnimation(),
    slideInDownOnEnterAnimation(),
    slideInLeftOnEnterAnimation(),
    slideOutUpOnLeaveAnimation(),
    slideOutDownOnLeaveAnimation(),
    slideOutLeftOnLeaveAnimation(),
    slideOutRightOnLeaveAnimation(),
    zoomInOnEnterAnimation(),
    zoomInUpOnEnterAnimation(),
    zoomInDownOnEnterAnimation(),
    zoomInLeftOnEnterAnimation(),
    zoomInRightOnEnterAnimation(),
    zoomOutOnLeaveAnimation(),
    zoomOutUpOnLeaveAnimation(),
    zoomOutDownOnLeaveAnimation(),
    zoomOutLeftOnLeaveAnimation(),
    zoomOutRightOnLeaveAnimation(),
    hingeOnLeaveAnimation(),
    jackInTheBoxOnEnterAnimation(),
    rollInOnEnterAnimation(),
    rollOutOnLeaveAnimation(),
    expandOnEnterAnimation({ duration: 400 }),
    collapseOnLeaveAnimation({ duration: 400 }),
    fadeInExpandOnEnterAnimation({ duration: 400 }),
    fadeOutCollapseOnLeaveAnimation({ duration: 400 }),
    expandRightOnEnterAnimation({ duration: 400 }),
    collapseLeftOnLeaveAnimation({ duration: 400 }),
    fadeInExpandRightOnEnterAnimation({ duration: 400 }),
    fadeOutCollapseLeftOnLeaveAnimation({ duration: 400 })
  ],
  standalone: true,
  imports: [NzSelectModule, FormsModule, NzButtonModule, NzWaveModule, AngularImgComponent]
})
export class DemoOnEnterOnLeaveComponent {
  options = [
    {
      label: 'Bouncing',
      animations: ['bounceIn', 'bounceInUp', 'bounceInDown', 'bounceInLeft', 'bounceInRight']
    },
    {
      label: 'Fading',
      animations: [
        'fadeInOut',
        'fadeInUpOutUp',
        'fadeInDownOutDown',
        'fadeInLeftOutRight',
        'fadeInRightOutLeft',
        'fadeInUpBigOutUpBig',
        'fadeInDownBigOutDownBig',
        'fadeInLeftBigOutRightBig',
        'fadeInRightBigOutLeftBig'
      ]
    },
    {
      label: 'Flippers',
      animations: ['flipX', 'flipY']
    },
    {
      label: 'LightSpeed',
      animations: ['lightSpeed']
    },
    {
      label: 'Rotating',
      animations: ['rotateInOut', 'rotateInOutDownLeft', 'rotateInOutDownRight', 'rotateInOutUpLeft', 'rotateInOutUpRight']
    },
    {
      label: 'Sliding',
      animations: ['slideInUpOutUp', 'slideInDownOutDown', 'slideInLeftOutRight', 'slideInRightOutLeft']
    },
    {
      label: 'Zooming',
      animations: ['zoomInOut', 'zoomInUpOutUp', 'zoomInDownOutDown', 'zoomInLeftOutRight', 'zoomInRightOutLeft']
    },
    {
      label: 'Specials',
      animations: ['jackInTheBoxOnEnterHingeOnLeave', 'rollInOut']
    },
    {
      label: 'Attention Seekers',
      animations: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'flip']
    },
    {
      label: 'Other',
      animations: ['expandCollapse', 'fadeInExpandFadeOutCollapse', 'expandRightCollapseLeft', 'fadeInExpandRightFadeOutCollapseLeft']
    }
  ];
  animation = 'bounceIn';

  state = true;

  toggleState(): void {
    this.state = !this.state;
  }
}
