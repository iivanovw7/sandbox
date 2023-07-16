/**
 * Module contains `Login` store model.
 * @module src/features/Login/model
 */

import type { TBasicApiError } from '@sandbox/player-app-server';

import {
    ErrorCodeMap,
    type ErrorData,
    type Validate,
    authStore,
    getErrorCode,
    getLogger,
    makeApiRequest,
    noop,
    withLocalStore
} from '@/shared';

import { validateFormData, validateFormField } from '../lib/validation';

type LoginFormValidation = {
    password: Validate<'password'>;
    username: Validate<'username'>;
};

export type LoginForm = {
    password: string;
    username: string;
};

export type LoginFormErrors = Record<keyof LoginForm, boolean>;

export type LoginState = {
    errors: LoginFormErrors;
    form: LoginForm;
    isLoading: boolean;
    validation: LoginFormValidation;
};

export type LoginActions = {
    enableFieldValidation: (key: keyof LoginForm) => void;
    enableValidation: () => void;
    setFormValue: <Key extends keyof LoginForm>(
        key: Key,
        value: LoginForm[Key]
    ) => void;
    submitForm: () => Promise<void>;
};

type CreateLoginStore = {
    actions: LoginActions;
    state: LoginState
};

const logger = getLogger('Login store');

const EMPTY_FORM: LoginForm = {
    password: '',
    username: ''
};

const INITIAL_FORM_ERRORS: LoginFormErrors = {
    password: false,
    username: false
};

const INITIAL_VALIDATION: LoginFormValidation = {
    password: noop,
    username: noop
};

/**
 *  Login store constructor.
 *  @returns {Store} returns store instance.
 */
const createLoginStore = (): CreateLoginStore => {
    const [state, setState] = createStore<LoginState>({
        errors: INITIAL_FORM_ERRORS,
        form: EMPTY_FORM,
        isLoading: false,
        validation: INITIAL_VALIDATION
    });

    const setLoading = (isLoading: boolean) => {
        setState({
            isLoading
        });
    };

    const setFormError = (key: keyof LoginForm) => {
        setState({
            errors: {
                ...INITIAL_FORM_ERRORS,
                [key]: true
            }
        });
    };

    const resetFormErrors = () => {
        setState({
            errors: INITIAL_FORM_ERRORS
        });
    };

    const enableValidation = () => {
        setState({
            validation: {
                password: validateFormField('password'),
                username: validateFormField('username'),
            }
        });
    };

    const setFormValue = (key, value) => {
        setState(produce((s) => {
            s.form[key] = value;
        }));
    };

    const actions: LoginActions = {
        enableFieldValidation: (key: keyof LoginForm) => {
            setState({
                validation: {
                    ...state.validation,
                    [key]: validateFormField(key),
                }
            });
        },
        enableValidation,
        setFormValue,
        submitForm: async () => {
            await makeApiRequest({
                onRequestError: (error) => {
                    const data = (error as TBasicApiError<null>)?.response?.data;
                    const code = getErrorCode(data as ErrorData);

                    if (code === ErrorCodeMap.BASIC_API_NOT_FOUND) {
                        setFormError('username');
                    }

                    if (code === ErrorCodeMap.BASIC_API_FORBIDDEN) {
                        setFormError('password');
                    }

                    logger.error(data);

                    setFormValue('password', '');
                },
                request: async () => {
                    enableValidation();

                    const { validatedData: { password, username } } = validateFormData(state.form);

                    await authStore.actions.login({
                        password,
                        username
                    });

                    resetFormErrors();
                },
                setLoading
            });
        }
    };

    return {
        actions,
        state
    };
};

export const [useLoginState, withLoginStore] = withLocalStore<CreateLoginStore>(
    createLoginStore
);
