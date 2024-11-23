import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
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
  hueRotateAnimation,
  rollInOnEnterAnimation,
  fadeInRightOnEnterAnimation,
  rotateInUpLeftOnEnterAnimation
} from 'angular-animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { AngularImgComponent } from '../angular-img/angular-img.component';

@Component({
  selector: 'app-demo-dynamic-params',
  templateUrl: './demo-dynamic-params.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInRightOnEnterAnimation({ anchor: 'enter1', translate: '100%' }),
    rollInOnEnterAnimation({ anchor: 'enter2', translate: '800px', degrees: 360, delay: 250 }),
    rotateInUpLeftOnEnterAnimation({ anchor: 'enter3' }),
    bounceAnimation(),
    flashAnimation(),
    pulseAnimation({ anchor: 'pulse' }),
    rubberBandAnimation(),
    shakeAnimation(),
    swingAnimation(),
    tadaAnimation(),
    wobbleAnimation(),
    jelloAnimation(),
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
  imports: [FormsModule, NzFormModule, NzGridModule, NzInputNumberModule, NzInputModule, AngularImgComponent, NzSelectModule, NzButtonModule, NzWaveModule]
})
export class DemoDynamicParamsComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  delay = 0;
  duration = 0;
  scale = 0;
  translate = '';
  degrees = 0;

  options = [
    {
      label: 'Attention Seekers',
      animations: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello']
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
      animations: ['collapse', 'collapseHorizontally', 'rotate', 'hueRotate']
    }
  ];
  animation = 'pulse';
  animationState = false;
  animationWithState = false;

  animate(): void {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = !this.animationState;
      this.animationWithState = !this.animationWithState;
      this.cdr.markForCheck();
    }, 1);
  }

  animationChanged(): void {
    this.setDefaultParams();
    this.animate();
  }

  setDefaultParams(): void {
    this.duration = 1000;
    this.delay = 0;
    switch (this.animation) {
      case 'bounceInDown':
      case 'bounceInUp':
      case 'bounceInLeft':
      case 'bounceInRight': {
        this.translate = '3000px';
        break;
      }
      case 'bounceOutDown':
      case 'bounceOutUp':
      case 'bounceOutLeft':
      case 'bounceOutRight': {
        this.translate = '2000px';
        break;
      }
      case 'pulse': {
        this.scale = 1.05;
        break;
      }
      case 'shake': {
        this.translate = '10px';
        break;
      }
      case 'fadeInDown':
      case 'fadeInUp':
      case 'fadeInLeft':
      case 'fadeInRight':
      case 'fadeOutDown':
      case 'fadeOutUp':
      case 'fadeOutLeft':
      case 'fadeOutRight': {
        this.translate = '100%';
        break;
      }
      case 'fadeInDownBig':
      case 'fadeInUpBig':
      case 'fadeInLeftBig':
      case 'fadeInRightBig':
      case 'fadeOutDownBig':
      case 'fadeOutUpBig':
      case 'fadeOutLeftBig':
      case 'fadeOutRightBig': {
        this.translate = '2000px';
        break;
      }
      case 'flipInX':
      case 'flipInY':
      case 'flipOutX':
      case 'flipOutY': {
        this.degrees = 90;
        break;
      }
      case 'lightSpeedIn':
      case 'lightSpeedOut': {
        this.translate = '100%';
        break;
      }
      case 'rotateInDownLeft': {
        this.degrees = -45;
        break;
      }
      case 'rotateInDownRight':
      case 'rotateInUpLeft': {
        this.degrees = 45;
        break;
      }
      case 'rotateInUpRight': {
        this.degrees = -90;
        break;
      }
      case 'rotateIn': {
        this.degrees = -200;
        break;
      }
      case 'rotateOut': {
        this.degrees = 200;
        break;
      }
      case 'rotateOutDownLeft': {
        this.degrees = 45;
        break;
      }
      case 'rotateOutDownRight':
      case 'rotateOutUpLeft': {
        this.degrees = -45;
        break;
      }
      case 'rotateOutUpRight': {
        this.degrees = 90;
        break;
      }
      case 'slideInUp':
      case 'slideInDown':
      case 'slideInLeft':
      case 'slideInRight': {
        this.translate = '100%';
        break;
      }
      case 'slideOutUp':
      case 'slideOutDown':
      case 'slideOutLeft':
      case 'slideOutRight': {
        this.translate = '100%';
        break;
      }
      case 'hinge': {
        this.duration = 2000;
        break;
      }
      case 'rollIn': {
        this.degrees = -120;
        this.translate = '-100%';
        break;
      }
      case 'rollOut': {
        this.degrees = 120;
        this.translate = '100%';
        break;
      }
      case 'collapse':
      case 'collapseHorizontally': {
        this.duration = 200;
        break;
      }
      case 'rotate': {
        this.degrees = 90;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.setDefaultParams();
  }
}
