import { component$ } from '@builder.io/qwik';
import { LuAtSign, LuSend } from '@qwikest/icons/lucide';

import { CardFrame, CardLink, DATA } from '@/shared';

const { cards: { contacts }, social } = DATA;

export type TContactsCardProps = {
    ref?: Signal<Element | undefined>;
};

export const ContactsCard = component$((props: TContactsCardProps) => (
    <CardFrame
        ref={props.ref}
        class={[
            'bg-transparent h-80',
            'relative order-6 p-0 col-start-9 col-end-13']}>
        <div class="flex flex-col justify-between p-0">
            <div class="flex flex-col items-start gap-2">
                <h3
                    class={[
                        'title-chip',
                        'text-white text-2xl',
                        'mt-3 text-gray-900 dark:text-gray-200']}>
                    {contacts.title}
                </h3>
                <p class="text-xl mt-4 text-gray-600 dark:text-gray-500">
                    {contacts.subtitle}
                </p>
            </div>
            <div class="flex flex-row items-start gap-2 mt-4">
                <CardLink href={social.email}>
                    <LuAtSign class="w-7 h-7 text-gray-900 dark:text-gray-200" />
                </CardLink>
                <CardLink href={social.telegram}>
                    <LuSend class="w-7 h-7 text-gray-900 dark:text-gray-200" />
                </CardLink>
            </div>
        </div>
    </CardFrame>
));
