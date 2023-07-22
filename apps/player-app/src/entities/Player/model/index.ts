/**
 * Module contains `Player` store model.
 * @module src/entities/Player/model
 */
import type { Maybe, Nullable } from '@sandbox/types';
import type {
    BitrateInfo,
    MediaPlayerClass,
    MediaPlayerSettingClass,
    MediaType,
    PlaybackTimeUpdatedEvent,
    QualityChangeRenderedEvent
} from 'dashjs';
import { MediaPlayer } from 'dashjs';

import { getLogger, withLocalStore } from '@/shared';

import { DEFAULT_PLAYBACK_RATE, DEFAULT_VOLUME, MAX_VOLUME_RATE, MIN_VOLUME_RATE, PlayState } from '../constants';
import { type CreatePlayerParams, type VolumeData, createPlayer, getVolumeData } from '../lib';

export type PlayerConfig = {
    autoplay: boolean;
    displayUTCTimeCodes: boolean;
    loopPlayback: boolean;
    url: string;
};

export type PlayerInstance = MediaPlayerClass;

type AvailableBitrates = Partial<Record<MediaType, Array<BitrateInfo>>>;
type CurrentBitrates = Partial<Record<MediaType, BitrateInfo>>;

export type SetPlayerParams = Omit<CreatePlayerParams, 'autoplay'> & {
    playbackConfig?: Partial<PlayerConfig>;
};

export type PlaybackListeners = {
    onPlayEnd?: () => void;
    onPlayError?: () => void;
    onPlayPause?: () => void;
    onPlayStart?: () => void;
    onPlaybackTimeUpdate?: (event: PlaybackTimeUpdatedEvent) => void;
};

export type CreateParams = {
    listeners?: PlaybackListeners,
    playbackConfig?: Partial<PlayerConfig>;
    playerSettings?: MediaPlayerSettingClass;
    url: string;
    video?: HTMLVideoElement;
};

export type PlayerState = {
    availableBitrates: AvailableBitrates;
    availableVideoBitrates: Array<BitrateInfo>;
    config: PlayerConfig;
    currentBitrates: CurrentBitrates;
    currentVideoBitrate: Nullable<BitrateInfo>;
    duration?: number;
    isReady: boolean;
    isSeeking: boolean;
    listeners: PlaybackListeners;
    playState: PlayState;
    player: Nullable<PlayerInstance>;
    video: Nullable<HTMLVideoElement>;
    volume: number;
    volumeData: VolumeData;
};

export type PlayerActions = {
    create: (params: CreateParams) => void;
    dispose: () => void;
    doDispose: () => void;
    doPause: () => Maybe<boolean>;
    onPlayEnd: () => void;
    onPlayError: () => void;
    onPlayPause: () => void;
    onPlayStart: () => void;
    onPlayStop: () => void;
    onPlaybackNotAllowed: () => void;
    onQualityChanged: (eventData: QualityChangeRenderedEvent) => void;
    onSeeked: () => void;
    onSeeking: () => void;
    onStreamActivated: () => void;
    pause: () => void;
    play: () => void;
    seek: (position: number) => void;
    setPlaybackConfig: (config?: Partial<PlayerConfig>) => void;
    setPlayer: (params: SetPlayerParams) => MediaPlayerClass;
    setVideoBitrate: (qualityIndex: number) => void;
    stop: () => void;
    syncDuration: () => void;
};

export type PlayerStore = {
    actions: PlayerActions;
    state: PlayerState;
};

const {
    ERROR,
    PLAYBACK_ENDED,
    PLAYBACK_ERROR,
    PLAYBACK_NOT_ALLOWED,
    PLAYBACK_PAUSED,
    PLAYBACK_PLAYING,
    PLAYBACK_SEEKED,
    PLAYBACK_SEEKING,
    PLAYBACK_STARTED,
    PLAYBACK_TIME_UPDATED,
    QUALITY_CHANGE_RENDERED,
    // PLAYBACK_RATE_CHANGED,
    STREAM_ACTIVATED,
} = MediaPlayer.events;

const logger = getLogger('Playback store');


/**
 *  Player store constructor.
 *  @returns {Store} returns store instance.
 */
export const createPlayerStore = (): PlayerStore => {

    const [state, setState] = createStore<PlayerState>({
        availableBitrates: {},
        get availableVideoBitrates(): Array<BitrateInfo> {
            return this.availableBitrates.video || [];
        },
        config: {
            autoplay: false,
            displayUTCTimeCodes: false,
            loopPlayback: false,
            url: '',
        },
        currentBitrates: {},
        get currentVideoBitrate() {
            return this.currentBitrates.video || null;
        },
        duration: 0,
        get isReady() {
            return !! this.player?.isReady();
        },
        isSeeking: false,
        listeners: {},
        playState: PlayState.stop,
        player: null,
        video: null,
        get volume() {
            return getVolumeData(this.volumeData.volume).volume;
        },
        volumeData: getVolumeData(DEFAULT_VOLUME)
    });

    /**
     *  Current player volume level.
     *  @returns {number} volume level.
     */
    const getVolume = () => (state.player?.getVolume() || 0) * MAX_VOLUME_RATE;

    /**
     * Bitrates list sync.
     * Updates list of all available stream bitrates.
     * @param {MediaType} key - media type key.
     */
    const collectAvailableBitrates = (key: MediaType) => {
        setState(produce((s) => {
            s.availableBitrates[key] = state.player?.getBitrateInfoListFor(key) || [];
        }));
    };

    /**
     *  Player disposer.
     */
    const doDispose = () => {
        if (state.player) {
            onPlayStop();
            state.player?.reset();
            state.player?.destroy();
        }
    };

    /**
     *  Player pause function.
     *  @returns flag indicating whether video was paused.
     */
    const doPause = () => {
        state.player?.pause();

        return state.player?.isPaused();
    };

    /**
     *  Player stream end handler.
     *  Restarts playback if loop option is enabled.
     */
    const onPlayEnd = () => {
        setState({
            playState: PlayState.stop
        });

        if (state.config.loopPlayback) {
            seek(0);
            play();
        }

        state.listeners.onPlayEnd?.();
    };

    /**
     *  Playback error event handler.
     */
    const onPlayError = () => {
        setState({
            playState: PlayState.error
        });

        state.listeners.onPlayError?.();
    };

    /**
     *  Playback start handler, syncs duration.
     */
    const onPlayStart = () => {
        if (state.playState !== PlayState.play) {
            setState({
                playState: PlayState.play
            });
        }

        state.listeners.onPlayStart?.();

        syncDuration();
    };

    /**
     *  Initial stream activation callback.
     */
    const onStreamActivated = () => {
        collectAvailableBitrates('video');
        syncActiveBitrate('video');
        syncVolume();
        syncDuration();
        setVolume(DEFAULT_VOLUME);
    };

    /**
     *  Syncs playback state on play stopped.
     */
    const onPlayStop = () => {
        if (state.playState !== PlayState.stop) {
            setState({
                playState: PlayState.stop
            });
        }
    };

    const onPlaybackNotAllowed = () => {
        const { config, player, video } = state;

        if (video && player?.isReady()) {
            logger.info('Playback did not start due to auto play restrictions. Reloading.');
            video.muted = true;
            player?.initialize(video, config.url);
        }
    };

    const onPlayPause = () => {
        setState({
            playState: PlayState.pause
        });

        state.listeners.onPlayPause?.();
    };

    const doSetVolume = (newVolume: number) => {
        if (newVolume < MIN_VOLUME_RATE) {
            newVolume = MIN_VOLUME_RATE;
        }
        else if (newVolume > MAX_VOLUME_RATE) {
            newVolume = MAX_VOLUME_RATE;
        }

        state.player?.setVolume(newVolume / MAX_VOLUME_RATE);

        return state.player?.getVolume() === newVolume / MAX_VOLUME_RATE;
    };

    const onSeeking = () => {
        setState({
            isSeeking: true
        });
    };

    const onSeeked = () => {
        setState({
            isSeeking: false
        });
    };

    const onPlaybackTimeUpdate = (eventData: PlaybackTimeUpdatedEvent) => {
        state.listeners.onPlaybackTimeUpdate?.(eventData);
    };

    const onQualityChanged = ({ newQuality }: QualityChangeRenderedEvent) => {
        const quality = state.availableBitrates.video?.find(({ qualityIndex }) => qualityIndex === newQuality);

        if (quality) {
            setState(produce((s) => {
                s.currentBitrates['video'] = quality;
            }));
        }

        syncActiveBitrate('video');
    };

    const play = () => {
        state.player?.play();
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const stop = () => {
        state.player?.play();
    };

    const pause = () => {
        if (doPause()) {
            onPlayPause();
        }
    };

    const seek = (position: number) => {
        state.player?.seek(position);
    };

    const setVideoBitrate = (qualityIndex: number) => {
        const config = { streaming: { abr: { autoSwitchBitrate: { video: false } } } };

        if (qualityIndex >= 0) {
            state.player?.updateSettings(config);
            state.player?.setQualityFor('video', qualityIndex, true);
        }
        else {
            config.streaming.abr.autoSwitchBitrate.video = true;
            state.player?.updateSettings(config);
        }

        syncActiveBitrate('video');
    };

    /**
     *  Updates volume value.
     */
    const setVolume = (newVolume: number) => {
        if (doSetVolume(newVolume)) {
            setState({
                volumeData: {
                    ...getVolumeData(newVolume),
                    volume: newVolume
                },
            });
        }
    };

    /**
     *  Updates playback config object.
     */
    const setPlaybackConfig = (newConfig?: Partial<PlayerConfig>) => {
        setState(({ config }) => ({
            config: {
                ...config,
                ...newConfig
            },
        }));
    };

    /**
     *  Saves player ref into the store.
     *  @param {SetPlayerParams} params - playback params.
     *  @returns dashjs player instance.
     */
    const setPlayer = (params: SetPlayerParams) => {
        const {
            playbackConfig,
            playerSettings,
            url,
            video
        } = params;

        const player = createPlayer({
            autoplay: playbackConfig?.autoplay,
            playerSettings,
            url,
            video
        });

        if (video) {
            player?.attachView(video);
        }

        player?.setPlaybackRate(DEFAULT_PLAYBACK_RATE);

        setState(({ config }) => ({
            config: {
                ...config,
                url
            },
            player,
            video,
        }));

        return player;
    };

    /**
     *  Syncs state duration with playback duration.
     */
    const syncDuration = () => {
        if (state.player) {
            setState({
                duration: state.player?.duration()
            });
        }
    };

    /**
     *  Syncs state volume with playback volume.
     */
    const syncVolume = () => {
        setState({
            volumeData: getVolumeData(getVolume())
        });
    };

    /**
     *  Syncs active bitrate after it was changed.
     *  @param {MediaType} key - media type.
     */
    const syncActiveBitrate = (key: MediaType) => {
        const index = state.player?.getQualityFor(key);
        const quality = state.availableBitrates[key]?.find(({ qualityIndex }) => qualityIndex === index);

        if (quality) {
            setState(produce((s) => {
                s.currentBitrates[key] = quality;
            }));
        }
    };

    const actions: PlayerActions = {
        create(params: CreateParams) {
            const {
                listeners,
                playbackConfig,
                playerSettings,
                url,
                video
            } = params;

            const player = setPlayer({
                playbackConfig,
                playerSettings,
                url,
                video
            });

            player.on(PLAYBACK_NOT_ALLOWED, onPlaybackNotAllowed);
            player.on(PLAYBACK_PLAYING, onPlayStart);
            player.on(PLAYBACK_STARTED, onPlayStart);
            player.on(PLAYBACK_PAUSED, onPlayPause);
            player.on(PLAYBACK_ENDED, onPlayEnd);
            player.on(PLAYBACK_ERROR, onPlayError);
            // TODO: Enable later if needed for complex player functionality.
            // player.on(PLAYBACK_RATE_CHANGED, this.onPlayBackRateChange);
            player.on(STREAM_ACTIVATED, onStreamActivated);
            player.on(QUALITY_CHANGE_RENDERED, onQualityChanged);
            player.on(ERROR, onPlayError);
            player.on(PLAYBACK_SEEKING, onSeeking);
            player.on(PLAYBACK_SEEKED, onSeeked);
            player.on(PLAYBACK_ENDED, onPlayEnd);
            player.on(PLAYBACK_STARTED, onPlayStart);
            player.on(PLAYBACK_PAUSED, onPlayPause);
            player.on(PLAYBACK_ERROR, onPlayError);
            player.on(PLAYBACK_TIME_UPDATED, onPlaybackTimeUpdate);

            setState({ listeners });
        },
        dispose() {
            const player = state.player;

            if (player) {
                player.off(PLAYBACK_NOT_ALLOWED, onPlaybackNotAllowed);
                player.off(PLAYBACK_PLAYING, onPlayStart);
                player.off(PLAYBACK_STARTED, onPlayStart);
                player.off(PLAYBACK_PAUSED, onPlayPause);
                player.off(PLAYBACK_ENDED, onPlayEnd);
                player.off(PLAYBACK_ERROR, onPlayError);
                // player.off(PLAYBACK_RATE_CHANGED, this.onPlayBackRateChange);
                player.off(STREAM_ACTIVATED, onStreamActivated);
                player.off(QUALITY_CHANGE_RENDERED, onQualityChanged);
                player.off(ERROR, onPlayError);
                player.off(PLAYBACK_SEEKING, onSeeking);
                player.off(PLAYBACK_SEEKED, onSeeked);
                player.off(PLAYBACK_ENDED, onPlayEnd);
                player.off(PLAYBACK_STARTED, onPlayStart);
                player.off(PLAYBACK_PAUSED, onPlayPause);
                player.off(PLAYBACK_ERROR, onPlayError);
                player.off(PLAYBACK_TIME_UPDATED, onPlaybackTimeUpdate);

                doDispose();
            }
        },
        doDispose,
        doPause,
        onPlayEnd,
        onPlayError,
        onPlayPause,
        onPlayStart,
        onPlayStop,
        onPlaybackNotAllowed,
        onQualityChanged,
        onSeeked,
        onSeeking,
        onStreamActivated,
        pause,
        play,
        seek,
        setPlaybackConfig,
        setPlayer,
        setVideoBitrate,
        stop,
        syncDuration
    };

    return {
        actions,
        state
    };
};

export const [usePlayerState, withPlayerStore] = withLocalStore<PlayerStore>(
    createPlayerStore
);
