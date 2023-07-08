/**
 * Module contains login form field.
 * @module src/features/Login/ui/FormField/FormField
 */
import { Input, type InputProps } from '@/shared';

import { styles } from './FormField.css';

export type FormFieldProps = InputProps;

/**
 * FormField component.
 * @method
 * @name src/features/Login/ui/FormField/FormField
 * @param {FormFieldProps} props - contains component props.
 * @returns Component with children.
 * @constructor
 */
export const FormField = (props: FormFieldProps) => {
    return (
        <div class={styles.formElement}>
            <Input
                classes={{
                    container: styles.container,
                    helper: styles.helper,
                    input: styles.input,
                    inputBox: styles.inputBox,
                    inputControl: styles.inputControl,
                    label: styles.label,
                }}
                control={props.control}
                hasWarning={props.hasWarning}
                inputProps={props.inputProps}
                label={props.label}
                validate={props.validate}
                value={props.value}
                onChange={props.onChange}
                onFocusOut={props.onFocusOut}
            />
        </div>
    );
};
