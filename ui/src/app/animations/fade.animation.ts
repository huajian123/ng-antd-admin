import { animate, style, transition, trigger } from '@angular/animations';

/** 渐隐渐显路由动画 */
export const fadeRouteAnimation = trigger('fadeRouteAnimation', [
  transition('*<=>*', [
    // css styles at start of transition
    style({ opacity: 0, 'will-change': 'transform' }),

    // animation and styles at end of transition
    animate('0.3s ease-in', style({ opacity: 1, 'will-change': 'transform' }))
  ])
]);
