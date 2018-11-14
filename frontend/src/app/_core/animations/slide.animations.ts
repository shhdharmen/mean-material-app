import {
    animate,
    style,
    transition,
    trigger
} from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
    transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
    ])
]);
