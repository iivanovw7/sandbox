/**
 * Module contains trending billboard.
 * @module src/features/Billboard/Billboard
 */
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { apply, pluck } from 'ramda';
import { type Fn, useAsyncState, useEventListener, useTimeout } from 'solidjs-use';

import { type PlaybackListeners, Player, type PlayerRef } from '@/entities/Player';
import { EventMap, billboardApi, config, noop } from '@/shared';

import { styles, variables } from './Billboard.css';
import { EMPTY_BILLBOARD } from './constants';
import { Info } from './ui';

const { billboard: billboardConfig } = config.ui;

/**
 * Billboard component.
 * @constructor
 * @method
 * @name src/features/Billboard/Billboard
 * @returns Component with children.
 */
export const Billboard = () => {
    const [isMetaFolded, setMetaFolded] = createSignal(false);
    const [player, setPlayer] = createSignal<PlayerRef>({
        availableVideoBitrates: [],
        dispose: noop,
        isReady: false,
        pause: noop,
        play: noop,
        seek: noop,
        setVideoBitrate: noop,
        stop: noop
    });

    let cleanupPointerMove: Fn;

    const playBillboard = () => {
        if (player().isReady) {
            player().seek(billboard().startTime);
            player().play();
        }
    };

    const { isPending: isAutoplayScheduled, start: scheduleAutoplay, stop: cancelAutoplay } = useTimeout(
        billboardConfig.playDelay,
        {
            callback: playBillboard,
            controls: true,
        }
    );

    const { state: billboard } = useAsyncState(
        billboardApi.getBillboard().then((res) => res.result),
        EMPTY_BILLBOARD
    );

    const schedulePlay = () => {
        if (! isAutoplayScheduled()) {
            cleanupPointerMove?.();
            scheduleAutoplay();
        }
    };

    const handlePlayEnd = () => setMetaFolded(false);
    const handlePlayStart = () => setMetaFolded(true);

    const handlePlaybackTimeUpdate: PlaybackListeners['onPlaybackTimeUpdate'] = ({ time }) => {
        if (time && time >= billboard().endTime) {
            player().pause();
        }
    };

    createEffect(() => {
        const bitrates = player().availableVideoBitrates;

        if (bitrates.length && player().isReady) {
            player().setVideoBitrate(
                apply(Math.max, pluck('qualityIndex', bitrates))
            );
        }
    }, [player().isReady]);

    onMount(() => {
        cancelAutoplay();
        cleanupPointerMove = useEventListener(
            window,
            EventMap.POINTERMOVE,
            schedulePlay
        );
    });

    onCleanup(() => {
        cancelAutoplay();
        cleanupPointerMove?.();
        player().dispose();
    });

    return (
        <div class={styles.container}>
            <div class={styles.row}>
                <div
                    class={styles.pane}
                    style={assignInlineVars({
                        [variables.poster]: `url(${String(billboard().poster)}`
                    })}>
                    <Show when={billboard().url}>
                        <Player
                            ref={setPlayer}
                            class={styles.video}
                            containerClass={styles.player({
                                isMetaFolded: isMetaFolded()
                            })}
                            playbackConfig={{
                                autoplay: false
                            }}
                            url={billboard().url}
                            onPlayEnd={handlePlayEnd}
                            onPlayError={handlePlayEnd}
                            onPlayPause={handlePlayEnd}
                            onPlayStart={handlePlayStart}
                            onPlaybackTimeUpdate={handlePlaybackTimeUpdate} />
                    </Show>
                    <div class={styles.fillContainer}>
                        <Info
                            billboard={billboard()}
                            isMetaFolded={isMetaFolded()} />
                    </div>
                </div>
            </div>
        </div>
    );
};
