/**
 * Module contains `Page` component.
 * @module src/shared/ui/components/Page/Page
 */
import { styles } from './Page.css';
import { Content, ContentType } from './ui';

export type PageProps = {
    children?: JSXElement;
};

/**
 * Page component.
 * @method
 * @name src/shared/ui/components/Page/Page
 * @param {ErrorScreenProps} props - represents component properties.
 * @constructor
 * @returns Component with children.
 */
export const Page = (props: PageProps) => (
    <div class={styles.page}>
        {props.children}
    </div>
);

Page.Content = Content;
Page.ContentType = ContentType;
