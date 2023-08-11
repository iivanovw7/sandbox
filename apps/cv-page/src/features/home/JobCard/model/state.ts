import type { Nullable } from '@sandbox/types';
import { atom } from 'nanostores';

export const animation = atom<Nullable<gsap.core.Tween>>(null);
export const isLoading = atom<boolean>(true);
export const proxy = atom<Nullable<HTMLElement>>(null);
export const slideAnimation = atom<Nullable<gsap.core.Tween>>(null);
export const slideWidth = atom(0);
export const wrapWidth = atom(0);
