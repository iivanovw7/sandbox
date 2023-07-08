/**
 * Module contains `ProfileUnlock` pin field component.
 * @module src/entities/ProfileLock/PinField/PinField
 */
import { TextField } from '@kobalte/core';
import type { AnyFunction } from '@sandbox/types';

import { isNumeric } from '@/shared';

import { PIN_VALIDATION_ERROR } from '../../lib';

import { styles } from './PinField.css';

export type PinFieldProps = {
    fieldRefs: Accessor<HTMLInputElement[]>;
    onKeyDown: (eventData: Event) => void;
    onPinNumberChange: (pinNumberIndex: number, value: string) => Promise<void> | void;
    onSetPinValidation: (value: string) => void;
    pinNumber: string;
    pinNumberIndex: number;
    setFieldsRefs: Setter<HTMLInputElement[]>;
};

/**
 * `PinField` component.
 * @constructor
 * @name src/entities/ProfileLock/PinField/PinField
 * @method
 * @param {ProfileLockProps} props - component props.
 * @returns Component with children.
 */
export const PinField = (props: PinFieldProps) => {
    /**
     * Input type handler
     * @param {string} value - new input value.
     */
    const handleInput = async (value: string) => {
        if (isNumeric(value)) {
            await props.onPinNumberChange(props.pinNumberIndex, value);
        }
        else {
            props.onSetPinValidation(PIN_VALIDATION_ERROR);
        }
    };

    /**
     * Input ref setter.
     * @param {HTMLInputElement} ref - element ref.
     */
    const setInputRef = (ref: HTMLInputElement) => {
        const refs = props.fieldRefs();

        refs[props.pinNumberIndex] = ref;

        props.setFieldsRefs(refs);
    };

    return (
        <TextField.Root
            aria-label={`PIN Entry Input ${props.pinNumberIndex + 1}.`}
            tab-index={0}
            value={props.pinNumber === ''
                ? props.pinNumber
                : '•'}
            onChange={handleInput as AnyFunction}
            onKeyDown={(e) => props.onKeyDown?.(e)}
        >
            <TextField.Input
                ref={setInputRef}
                autofocus={props.pinNumberIndex === 0}
                class={styles.pinField}
                maxLength={1}
                type="tel"
            />
        </TextField.Root>
    );
};
