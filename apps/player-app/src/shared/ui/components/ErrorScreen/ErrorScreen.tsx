/**
 * Module contains `ErrorScreen` component.
 * @module src/shared/ui/components/ErrorScreen/ErrorScreen
 */
import { useNavigate } from '@solidjs/router';

import { type ErrorData, getErrorCodeString } from '../../../utils/ErrorCodeMap';
import { Button } from '../../elements';
import { routePath } from '../../routes';

import { styles } from './ErrorScreen.css';

export type ErrorScreenProps = {
    class?: string;
    error?: ErrorData | number,
    onClick?: () => void;
    subtitle?: string;
    title?: string;
};

const MESSAGES = {
    button: 'Netflix Home',
    code: 'Error Code '
};

/**
 * Error screen component.
 * @method
 * @name src/shared/ui/components/ErrorScreen/ErrorScreen
 * @param {ErrorScreenProps} props - represents component properties.
 * @constructor
 * @returns Component with children.
 */
export const ErrorScreen = (props: ErrorScreenProps) => {
    const navigate = useNavigate();

    /**
     *  Redirect handler
     */
    const handleHomeClick = () => {
        if (props.onClick) {
            props.onClick?.();
        }
        else {
            navigate(routePath.home);
        }
    };

    return (
        <>
            <h1 class={styles.title}>
                {props.title}
            </h1>
            <div class={styles.body}>
                <p class={styles.message}>
                    {props.subtitle}
                </p>
                <Button
                    class={styles.button}
                    text={MESSAGES.button}
                    textClass={styles.buttonText}
                    onClick={handleHomeClick}
                />
            </div>
            <div class={styles.footer}>
                <span class={styles.code}>
                    {MESSAGES.code}
                    <strong class={styles.strong}>
                        {getErrorCodeString(props.error)}
                    </strong>
                </span>
            </div>
        </>
    );
};
