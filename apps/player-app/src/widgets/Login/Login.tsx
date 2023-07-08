/**
 * Module login form.
 * @module src/features/Login/Login
 */
import { Img, Link, useLocale } from '@/shared';

import Logo from '../../../assets/img/logo-v7.png?w=200&png&imagetools';

import { FOOTER_LINKS } from './constants';
import { messages } from './lib';
import { styles } from './Login.css';
import { withLoginStore } from './model';
import { Form } from './ui';

/**
 * Login form component.
 * @method
 * @name src/features/Login/Login
 * @param {ProfileProps} props - contains component props.
 * @returns Component with children.
 * @constructor
 */
export const Login = withLoginStore(() => {
    const { getText } = useLocale();

    return (
        <div class={styles.page}>
            <div class={styles.background} />
            <div class={styles.header}>
                <Img
                    alt="Netflix"
                    class={styles.logo}
                    imageClass={styles.logoImage}
                    src={Logo}
                />
            </div>
            <div class={styles.body}>
                <Form />
            </div>
            <div class={styles.footerWrapper}>
                <div class={styles.divider} />
                <div class={styles.footer}>
                    <p class={styles.footerTop}>
                        {getText(messages.footerCall)}
                    </p>
                    <ul class={styles.footerLinks}>
                        <For each={FOOTER_LINKS}>
                            {(linkItem) => (
                                <li class={styles.footerLinkItem}>
                                    <Link
                                        class={styles.footerLink}
                                        target="_blank"
                                        text={linkItem.label}
                                        textClass={styles.footerLinkText}
                                    />
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            </div>
        </div>
    );
});
