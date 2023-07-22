/**
 * Module contains `Player` constants.
 * @module src/entities/Player/constants
 */
import type { Milliseconds, Percent } from '@sandbox/types';

export const DEFAULT_PLAYBACK_TIME: Milliseconds = 0;
export const DEFAULT_BUFFER_SIZE = 0;
export const DEFAULT_VOLUME = 50;
export const DEFAULT_PLAYBACK_RATE = 1;
export const AUTO_BITRATE = -1;

export const MAX_VOLUME_RATE: Percent = 100;
export const MIN_VOLUME_RATE: Percent = 0;

export const PlayState = {
    end: 5,
    error: 9,
    pause: 2,
    play: 1,
    stop: 0
} as const;

export type PlayState = typeof PlayState[keyof typeof PlayState];
