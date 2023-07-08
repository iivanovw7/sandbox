/**
 * Module contains `Input` component.
 * @module src/shared/ui/elements/Input/Input
 */
import { TextField } from '@kobalte/core';
import type { TextFieldInputProps, TextFieldRootProps } from '@kobalte/core/dist/types/text-field';
import type { Maybe } from '@sandbox/types';

import type { FieldValidationResult } from '#/common';

import { useLocale } from '../../../hooks';
import { type Validate, isNumber } from '../../../utils';

export type InputProps = {
    caption?: string;
    classes?: {
        container?: string;
        control?: string;
        helper?: string;
        input?: string;
        inputBox?: string;
        inputControl?: string;
        label?: string;
    },
    control?: JSXElement;
    /** @default false */
    hasWarning?: boolean;
    inputProps?: TextFieldInputProps;
    label?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate?: Validate<any>;
    value?: Maybe<number | string>;
} & Pick<TextFieldRootProps, 'onChange' | 'onFocusOut'>;

const EMPTY_VALIDATION_ERROR = {
    messageDescriptor: '',
};

/**
 * Creates `Input` component.
 * @name src/shared/ui/elements/Input
 * @method
 * @param {InputProps} props - contains component props.
 * @returns Component with children.
 * @constructor
 */
export const Input = (props: InputProps) => {
    const { getText } = useLocale();

    const [validationError, setValidationError] = createSignal<FieldValidationResult>(
        EMPTY_VALIDATION_ERROR
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const hasValidationError = () => validationError().messageDescriptor;

    createEffect(() => {
        if (props.validate) {
            setValidationError(props.validate(props.value) || EMPTY_VALIDATION_ERROR);
        }
    });

    return (
        <TextField.Root
            class={props.classes?.container}
            validationState={hasValidationError()
                ? 'invalid'
                : 'valid'}
            value={
                isNumber(props.value)
                    ? String(props.value)
                    : props.value ?? ''
            }
            onChange={props.onChange}
            onFocusOut={props.onFocusOut}
        >
            <div class={props.classes?.inputBox}>
                <TextField.Label
                    class={props.classes?.label}
                    data-has-text={!! props.value}
                >
                    {props.label}
                </TextField.Label>
                <TextField.Input
                    class={props.classes?.input}
                    data-warning={props.hasWarning}
                    {...props.inputProps}
                />
                {props.control && (
                    <div class={props.classes?.inputControl}>
                        {props.control}
                    </div>
                )}
            </div>
            <TextField.ErrorMessage
                class={props.classes?.helper}
            >
                <Show fallback="" when={hasValidationError()}>
                    {getText(
                        validationError().messageDescriptor,
                        validationError()?.values
                    )}
                </Show>
            </TextField.ErrorMessage>
        </TextField.Root>
    );
};
