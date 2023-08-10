import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';

import { layoutCtx } from '@/routes/layout';

import styles from './Cards.module.css';
import { ContactsCard, HelloCard, JobCard, SkillCard } from './ui';

export const Cards = component$(() => {
    const layoutState = useContext(layoutCtx);
    const helloCardRef = useSignal<HTMLElement>();
    const jobsCardRef = useSignal<HTMLElement>();
    const contactsCardRef = useSignal<HTMLElement>();

    useVisibleTask$(() => {
        layoutState.navRefs.home = helloCardRef.value || null;
        layoutState.navRefs.experience = jobsCardRef.value || null;
        layoutState.navRefs.contacts = contactsCardRef.value || null;
    });

    return (
        <div class={[
            styles.container,
            'flex flex-col gap-6',
            'md:grid md:grid-cols-[repeat(12,_1fr)] mt-8'
        ]}>
            <HelloCard ref={helloCardRef} />
            <JobCard ref={jobsCardRef} />
            <SkillCard />
            <ContactsCard ref={contactsCardRef} />
        </div>
    );
});
