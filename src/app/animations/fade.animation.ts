import { animate, animateChild, AnimationQueryOptions, group, query, style, transition, trigger } from '@angular/animations';

const options: AnimationQueryOptions = {
    optional: true
};

/** 淡入淡出动画 */
export const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [
        style({
            transform: 'scale3d(1.075, 1.075, 1)',
            opacity: 0,
        }),
        animate('250ms ease-out', style({
            transform: 'scale3d(1, 1, 1)',
            opacity: 1
        })),
    ]),
    transition(':leave', [
        animate('250ms ease-out', style({
            transform: 'scale3d(0.95, 0.95, 1)',
            opacity: 0
        }))
    ])
]);

/** 渐隐渐显路由动画 */
export const fadeRouteAnimation = trigger('fadeRouteAnimation', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }),
            animateChild(),
        ], options),
        query(':enter', [
            style({ opacity: 0 })
        ], options),
        group([
            query(':leave', [
                animate('5s ease-in', style({ opacity: 0 }))
            ], options),
            query(':enter', [
                animate('5s ease-in', style({ opacity: 1 }))
            ], options)
        ]),
    ])
]);