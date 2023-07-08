/**
 * Module contains login form.
 * @module src/features/Login/ui/Form/Form
 */
import type { AnyFunction } from '@sandbox/types';
import { useActiveElement } from 'solidjs-use';

import { Button, type InputProps, LinkButton, type LinkButtonProps, useLocale } from '@/shared';

import { messages } from '../../lib';
import { type LoginForm, useLoginState } from '../../model';
import { FormField } from '../FormField';
import { FormFooter } from '../FormFooter';

import { styles } from './Form.css';

type PasswordInputType = 'password' | 'text';

/**
 * Form component.
 * @method
 * @name src/features/Login/ui/Form/Form
 * @returns Component with children.
 * @constructor
 */
export const Form = () => {
    const { getText } = useLocale();
    const { actions, state } = useLoginState();

    const activeElement = useActiveElement();
    const [passwordInputRef, setPasswordInputRef] = createSignal<HTMLInputElement>();
    const [passwordType, setPasswordType] = createSignal<PasswordInputType>('password');

    const handlePasswordChange: LinkButtonProps['onClick'] = (eventData) => {
        eventData.preventDefault();

        setPasswordType(passwordType() === 'password'
            ? 'text'
            : 'password');
    };

    const handleChange = (key): InputProps['onChange'] => (value: string) => {
        actions.setFormValue(key, value);
    };

    const handleFocusOut = (key: keyof LoginForm): InputProps['onFocusOut'] => () => {
        if (activeElement() !== passwordInputRef()) {
            actions.enableFieldValidation(key);
        }
    };

    const handleSubmit = async (eventData) => {
        eventData.preventDefault();

        await actions.submitForm();
    };

    return (
        <form
            class={styles.form}
            onSubmit={handleSubmit as AnyFunction}
        >
            <h1 class={styles.title}>
                {getText(messages.formSignIn)}
            </h1>
            <Switch>
                <Match when={state.errors.username}>
                    <div class={styles.formWarningText}>
                        {getText(messages.formWarningUsername)}
                    </div>
                </Match>
                <Match when={state.errors.password}>
                    <div class={styles.formWarningText}>
                        {getText(messages.formWarningPassword)}
                    </div>
                </Match>
            </Switch>
            <FormField
                hasWarning={state.errors.username}
                inputProps={{
                    autocomplete: 'username',
                    type: 'email',
                }}
                label={getText(messages.formUsernamePlaceholder)}
                validate={state.validation.username}
                value={state.form.username}
                onChange={handleChange('username')}
                onFocusOut={handleFocusOut('username')}
            />
            <FormField
                control={
                    <LinkButton
                        class={styles.passwordShowButton}
                        dataId="password-show"
                        text={passwordType() === 'password'
                            ? 'SHOW'
                            : 'HIDE'}
                        onClick={handlePasswordChange}
                    />
                }
                hasWarning={state.errors.password}
                inputProps={{
                    autocomplete: 'current-password',
                    ref: setPasswordInputRef,
                    type: passwordType(),
                }}
                label={getText(messages.formPasswordPlaceholder)}
                validate={state.validation.password}
                value={state.form.password}
                onChange={handleChange('password')}
                onFocusOut={handleFocusOut('password')}
            />
            <Button
                class={styles.submit}
                isLoading={state.isLoading}
                loaderClass={styles.submitLoader}
                text={getText(messages.formSignIn)}
                textClass={styles.submitText}
            />
            <FormFooter />
        </form>
    );
};
