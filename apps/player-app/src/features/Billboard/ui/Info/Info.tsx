/**
 * Module contains trending billboard info component.
 * @module src/features/Billboard/ui/Info/Info
 */
import type { TBillboard } from '@sandbox/player-app-server';
import type { Pixels } from '@sandbox/types';
import { defaultTo, pipe } from 'ramda';
import { useElementSize } from 'solidjs-use';

import { Icon, Img, round } from '@/shared';

import { styles } from './Info.css';
import { InfoLinks } from './infoLinks';

export type InfoProps = {
    billboard: TBillboard;
    isMetaFolded: boolean;
};

const HEIGHT: Pixels = 50;
const SCALE = 0.6;

type TGetHeight = (target?: number) => number;

const getOffset: TGetHeight = pipe(defaultTo(HEIGHT), round);

/**
 * Billboard info component.
 * @method
 * @returns Component with children.
 * @constructor
 */
export const Info = (props: InfoProps) => {
    const [titleRef, setTitleRef] = createSignal<HTMLDivElement>();
    const [infoRef, setInfoRef] = createSignal<HTMLDivElement>();

    const { height: titleHeight } = useElementSize(titleRef);
    const { height: infoHeight } = useElementSize(infoRef);

    const titleOffset = () => (getOffset(titleHeight()) * SCALE) + infoHeight();

    return (
        <div class={styles.info}>
            <div class={styles.metaLayer}>
                <div
                    ref={setTitleRef}
                    class={styles.titleWrapper({ isMetaFolded: props.isMetaFolded })}
                    style={{
                        transform: props.isMetaFolded
                            ? `scale(${SCALE}) translate3d(0px, ${titleOffset()}px, 0px)`
                            : 'scale(1) translate3d(0px, 0px, 0px)'
                    }}
                >
                    <Img
                        noFallback
                        alt={props.billboard.title}
                        class={styles.logo}
                        imageClass={styles.logoImage}
                        src={props.billboard.logo}
                    />
                </div>
                <div
                    ref={setInfoRef}
                    class={styles.infoWrapper({
                        isMetaFolded: props.isMetaFolded
                    })}
                    style={{
                        transform: props.isMetaFolded
                            ? `translate3d(0px, ${getOffset(infoHeight())}px, 0px)`
                            : 'translate3d(0px, 0px, 0px)'
                    }}
                >
                    <div class={styles.infoWrapperFade({
                        isMetaFolded: props.isMetaFolded
                    })}>
                        <div class={styles.supplementalMessage}>
                            <Icon
                                class={styles.supplementalIcon}
                                name="top10"
                            />
                                #1 in Movies Today
                        </div>
                        <div class={styles.synopsisFadeContainer}>
                            {props.billboard.description}
                        </div>
                    </div>
                </div>
                <InfoLinks />
            </div>
        </div>
    );
};
