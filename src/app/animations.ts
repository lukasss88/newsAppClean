import {
  trigger,
  group,
  transition,
  animate,
  style,
  query,
} from '@angular/animations';

/**
 * Implement slide in animation for changes in route
 * between NewsComponent => NewsDetailComponent
 * and NewsDetailComponent => NewsComponent
 * as per the provided video
 */
export const slideInAnimation = trigger('routeAnimations', [
  transition('NewsComponent => NewsDetailComponent', slideTo('right')),
  transition('NewsDetailComponent => NewsComponent', slideTo('left')),
]);

function slideTo(direction: string) {
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(':leave', [animate('200ms ease', style({ [direction]: '100%' }))]),
      query(':enter', [animate('300ms ease', style({ [direction]: '0%' }))]),
    ]),
  ];
}
