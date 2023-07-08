/**
 * Module contains `Dialog` component.
 * @module src/shared/ui/elements/Dialog/Dialog
 */
import { Dialog as BaseDialog } from '@kobalte/core';

import { Button } from '../Button';

export type DialogProps = {
    children?: JSXElement;
    classes: {
        close?: string;
        closeIcon?: string;
        closeIconBox?: string;
        content?: string;
        paper?: string;
    },
    isModal?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
    withCloseButton?: boolean;
};

/**
 * Creates `Dialog` component.
 * @constructor
 * @name src/shared/ui/elements/Dialog/Dialog
 * @method
 * @param {DialogProps} props - contains component props.
 * @returns Component with children.
 */
export const Dialog = (props: DialogProps) => (
    <BaseDialog.Root modal={props.isModal} open={props.isOpen}>
        <BaseDialog.Portal>
            <BaseDialog.Content class={props.classes.content}>
                <div class={props.classes.paper}>
                    {props.withCloseButton && (
                        <Button
                            class={props.classes.close}
                            icon={{
                                'class': props.classes.closeIconBox,
                                iconClass: props.classes.closeIcon,
                                name: 'cross',
                            }}
                            onClick={props.onClose}
                        />
                    )}
                    {props.children}
                </div>
            </BaseDialog.Content>
        </BaseDialog.Portal>
    </BaseDialog.Root>
);
