import { atom } from 'nanostores';

export const isScrollUp = atom(false);
export const isScrollHandlingScheduled = atom(false);
export const scrollPosition = atom(0);
export const theme = atom('light');
