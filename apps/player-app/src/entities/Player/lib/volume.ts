/**
 * Module contains volume helpers.
 * @module src/entities/Player/lib/volume
 */
import { MIN_VOLUME_RATE } from '../constants';

export type VolumeData = {
    mute: boolean;
    value: number;
    volume: number;
};

/**
 * Creates volume data object for volume level value.
 * @param {number} volume - represents video volume level.
 * @returns {VolumeData} volume data object.
 */
export const getVolumeData = (volume: number): VolumeData => ({
    mute: volume < MIN_VOLUME_RATE,
    value: volume,
    volume: volume > MIN_VOLUME_RATE
        ? volume
        : MIN_VOLUME_RATE,
});
