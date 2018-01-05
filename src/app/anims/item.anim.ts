import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';


export const itemAnim = trigger('item', [
    state('in', style({ 'border-left-width': '3px' })),
    state('out', style({ 'border-left-width': '8px' })),
])