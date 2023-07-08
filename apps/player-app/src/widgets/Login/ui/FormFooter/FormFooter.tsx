/**
 * Module contains login FormFooter field.
 * @module src/features/Login/ui/FormFooter/FormField
 */
import { Link, LinkButton, useLocale } from '@/shared';

import { messages } from '../../lib';

import { styles } from './FormFooter.css';

/**
 * FormFooter component.
 * @method
 * @name src/features/Login/ui/FormFooter/FormFooter
 * @returns Component with children.
 * @constructor
 */
export const FormFooter = () => {
    const { getText } = useLocale();

    const [showMore, setShowMore] = createSignal(false);

    return (
        <div class={styles.footer}>
            <div class={styles.footerSignup}>
                <span>
                    {getText(messages.formSignUp)}
                </span>
                <Link
                    class={styles.footerSignupLink}
                    text={getText(messages.formSignUpButton)}
                />
            </div>
            <div class={styles.footerTermsOfUse}>
                {getText(messages.formTermsOfUse)}
                <LinkButton
                    class={styles.footerLink({ showMore: showMore() })}
                    text={getText(messages.footerShowMore)}
                    onClick={(eventData) => {
                        eventData.preventDefault();
                        setShowMore(true);
                    }}
                />
            </div>
            <div class={styles.footerTermsOfUseMore({ showMore: showMore() })}>
                {getText(messages.formTermsOsUseMore)}
            </div>
        </div>
    );
};
