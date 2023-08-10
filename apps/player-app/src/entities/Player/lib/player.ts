/**
 * Module contains create player helper.
 * @module src/entities/Player/lib/player
 */
import { type MediaPlayerClass, type MediaPlayerSettingClass, MediaPlayer as mediaPlayer } from 'dashjs';

export type CreatePlayerParams = {
    autoplay?: boolean;
    playerSettings?: MediaPlayerSettingClass;
    url: string;
    video?: HTMLVideoElement;
};

/**
 * Creates new player instance.
 * @param {CreatePlayerParams} params - new player create params.
 * @returns {MediaPlayerClass} player instance.
 */
export const createPlayer = (params: CreatePlayerParams): MediaPlayerClass => {
    const {
        autoplay,
        playerSettings,
        url,
        video
    } = params;

    const player = mediaPlayer().create();

    player.initialize(video, url, autoplay);

    if (playerSettings) {
        player.updateSettings(playerSettings);
    }

    return player;
};
