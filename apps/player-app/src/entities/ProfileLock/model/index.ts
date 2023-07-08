/**
 * Module contains `ProfileLock` store model.
 * @module src/entities/ProfileLock/model
 */
import type { Voidable } from '@sandbox/types';
import { equals, take } from 'ramda';

import { getLogger, makeApiRequest, wait, withLocalStore } from '@/shared';

import { DEFAULT_PIN, PIN_LENGTH } from '../constants';
import { validateUnlockModalData } from '../lib';

export type ProfileLockState = {
    isPinError: boolean;
    lock: Array<string>;
    pin: Array<string>;
    pinValidation: string;
};

export type ProfileLockActions = {
    onSubmit: () => Promise<Voidable<boolean>>;
    resetFiled: () => void;
    setLock: (newLock: string) => void;
    setPinError: (value: boolean) => void;
    setPinNumber: (index: number, value: string) => void;
    setPinValidation: (value?: string) => void;
};

type CreateProfileLockStore = {
    actions: ProfileLockActions;
    state: ProfileLockState
};

const logger = getLogger('Profile lock store');

/**
 *  Profile lock store constructor.
 *  @returns {Store} returns store instance.
 */
export const createProfileLockStore = (): CreateProfileLockStore => {
    const [state, setState] = createStore<ProfileLockState>({
        isPinError: false,
        lock: [...DEFAULT_PIN],
        pin: [...DEFAULT_PIN],
        pinValidation: '',
    });

    /**
     * Compares lock value and current pin, returns boolean value.
     * @returns {boolean} true is pin is correct.
     */
    const isCorrect = () => equals(state.lock, state.pin);

    const actions: ProfileLockActions = {

        /**
         *  Submits current pin code to verify result.
         *  @returns async submit request.
         */
        onSubmit: async () => makeApiRequest({
            onRequestError: (errorData: unknown) => {
                logger.error(errorData);
            },
            onValidationError: ({ errors: [error] }) => {
                setState({
                    pinValidation: error
                });
            },
            request: async () => {
                validateUnlockModalData({
                    pin: state.pin.join('')
                });

                setState(produce((s) => {
                    s.isPinError = ! isCorrect();

                    if (! isCorrect()) {
                        s.pin = [...DEFAULT_PIN];
                        s.pinValidation = '';
                    }
                }));

                return wait(isCorrect());
            },
        }),
        /** Resets pin field. */
        resetFiled: () => {
            setState({
                isPinError: false,
                pin: [...DEFAULT_PIN],
                pinValidation: '',
            });
        },
        /**
         *  Sets new lock string.
         *  @param {string} newLock - lock string.
         */
        setLock: (newLock: string) => {
            setState({
                isPinError: false,
                lock: take(PIN_LENGTH, newLock.split('')),
                pin: [...DEFAULT_PIN],
                pinValidation: '',
            });
        },
        /**
         *  Sets pin code error.
         *  @param {boolean} value - pin error value.
         */
        setPinError: (value: boolean) => {
            setState({
                isPinError: value
            });
        },
        /**
         *  Sets pin value.
         *  @param {number} index - pin input index.
         *  @param {string} value - pin input value.
         */
        setPinNumber: (index: number, value: string) => {
            setState(produce((s) => {
                s.pin[index] = value;
                s.pinValidation = '';
            }));
        },
        /**
         *  Sets pin validation string.
         *  @param {boolean} value - validation string.
         */
        setPinValidation: (value = '') => {
            setState({
                pinValidation: value
            });
        },
    };

    return {
        actions,
        state
    };
};

export const [useProfileState, withProfileStore] = withLocalStore<CreateProfileLockStore>(
    createProfileLockStore
);
