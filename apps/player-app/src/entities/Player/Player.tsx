/**
 * Module contains `Player` component.
 * @module src/entities/Player
 */
import {
    type CreateParams,
    type PlaybackListeners,
    type PlayerActions,
    type PlayerState,
    usePlayerState,
    withPlayerStore
} from './model';

export type { PlaybackListeners, PlayerActions, PlayerState } from './model';

export type PlayerProps = PlaybackListeners & Omit<CreateParams, 'listeners' | 'video'> & {
    class?: string;
    containerClass?: string;
    ref?: Setter<PlayerRef>;
};

export type PlayerRef =
        & Pick<PlayerState, 'availableVideoBitrates' | 'isReady'>
        & Pick<PlayerActions, 'dispose' | 'pause' | 'play' | 'seek' | 'setVideoBitrate' | 'stop'>;

/**
 * `Player` component.
 * @constructor
 * @name src/entities/Player/Player
 * @method
 * @param {PlayerProps} props - contains component props.
 * @returns Component with children.
 */
export const Player = withPlayerStore((props: PlayerProps) => {
    const [videoRef, setVideoRef] = createSignal<HTMLVideoElement>();
    const {
        actions,
        state
    } = usePlayerState();

    createEffect(() => {
        actions.create({
            listeners: {
                onPlayEnd: props.onPlayEnd,
                onPlayError: props.onPlayError,
                onPlayPause: props.onPlayPause,
                onPlayStart: props.onPlayStart,
                onPlaybackTimeUpdate: props.onPlaybackTimeUpdate
            },
            playbackConfig: props.playbackConfig,
            url: props.url,
            video: videoRef()
        });
    }, [props.url, props.playbackConfig]);

    createEffect(() => {
        props.ref?.({
            availableVideoBitrates: state.availableVideoBitrates,
            dispose: actions.dispose,
            isReady: state.isReady,
            pause: actions.pause,
            play: actions.play,
            seek: actions.seek,
            setVideoBitrate: actions.setVideoBitrate,
            stop: actions.stop
        });
    }, [props.ref]);

    return (
        <div class={props.containerClass}>
            <video
                ref={setVideoRef}
                class={props.class}
                controls={false}
                preload="none"
                slot="media"
            >
                <track kind="captions" />
            </video>
        </div>
    );
});
