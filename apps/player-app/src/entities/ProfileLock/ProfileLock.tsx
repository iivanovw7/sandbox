/**
 * Module contains `ProfileLock` component.
 * @module src/entities/ProfileLock/ProfileLock
 */
import type { TProfile } from '@sandbox/player-app-server';
import type { Nullable } from '@sandbox/types';

import { Dialog, KeyMap, useLocale } from '@/shared';

import { PIN_LENGTH } from './constants';
import { messages } from './lib';
import { useProfileState, withProfileStore } from './model';
import { styles } from './ProfileLock.css';
import { PinField } from './ui/PinField';

export type ProfileLockProps = {
    onSuccess: () => Promise<void>;
    profile: Nullable<TProfile>;
    setProfile: (profile: Nullable<TProfile>) => void;
};

/**
 * `ProfileLockModal` component.
 * @constructor
 * @name src/entities/ProfileLock/ProfileLock
 * @method
 * @param {ProfileLockProps} props - component props.
 * @returns React component with children.
 */
export const ProfileLock = withProfileStore((props: ProfileLockProps) => {
    const { actions, state } = useProfileState();
    const { getText } = useLocale();

    const [fieldRefs, setFieldsRefs] = createSignal<HTMLInputElement[]>([]);

    /**
     * `ProfileLockModal` component
     * @param {number} pinNumberIndex - pin number index.
     * @param {string} value - pin number value.
     */
    const handlePinNumberChange = async (pinNumberIndex: number, value: string) => {
        actions.setPinNumber(pinNumberIndex, value);
        actions.setPinError(false);

        if (state.pin.join('').length === PIN_LENGTH) {
            if (await actions.onSubmit()) {
                await props.onSuccess();
            }
        }

        if (pinNumberIndex <= PIN_LENGTH - 1) {
            fieldRefs()?.[pinNumberIndex + 1]?.focus();
        }
    };

    /**
     * Keydown handler creator.
     * @param {Accessor<number>} pinNumberIndex - pin reactive getter.
     * @returns keydown event handler.
     */
    const handleKeyDown = (pinNumberIndex: Accessor<number>) => (eventData) => {
        switch (eventData.key) {
            case KeyMap.Backspace: {
                eventData.preventDefault();

                const prevFieldRef = fieldRefs()?.[pinNumberIndex() - 1];

                actions.setPinNumber(pinNumberIndex(), '');

                if (pinNumberIndex() > 0 && prevFieldRef) {
                    prevFieldRef.focus();
                    prevFieldRef.select();
                }

                break;
            }
            default: {
                break;
            }
        }
    };

    createEffect(() => {
        actions.setLock(props.profile?.lock || '');

        if (props.profile) {
            setTimeout(() => fieldRefs()[0]?.focus(), 100);
        }
    });

    return (
        <Dialog
            isModal
            withCloseButton
            classes={{
                close: styles.dialogClose,
                closeIcon: styles.dialogCloseIcon,
                closeIconBox: styles.dialogCloseIconBox,
                content: styles.dialogContent,
                paper: styles.dialogPaper
            }}
            isOpen={!! props.profile}
            onClose={() => props.setProfile(null)}
        >
            <p class={styles.dialogStatus}>
                {getText(messages.status)}
            </p>
            <h3 class={styles.dialogTitle({ error: state.isPinError })}>
                {getText(state.isPinError
                    ? messages.errorTitle
                    : messages.title)}
            </h3>
            <div class={styles.pinPad}>
                <div class={styles.pinPadContainer({ error: state.isPinError })}>
                    <For each={state.pin}>
                        {(pinNumber, pinNumberIndex) => (
                            <PinField
                                fieldRefs={fieldRefs}
                                pinNumber={pinNumber}
                                pinNumberIndex={pinNumberIndex()}
                                setFieldsRefs={setFieldsRefs}
                                onKeyDown={handleKeyDown(pinNumberIndex)}
                                onPinNumberChange={handlePinNumberChange}
                                onSetPinValidation={actions.setPinValidation}
                            />
                        )}
                    </For>
                </div>
            </div>
            <p class={styles.dialogValidation}>
                {state.pinValidation}
            </p>
        </Dialog>
    );
});
