/**
 * Module contains application `withRouter` HOC.
 * @module src/app/providers/withRouter
 */

import { Router } from '@solidjs/router';

/**
 * Application router HOC.
 * @constructor
 * @param Cmp - represents child component.
 * @returns component with children.
 */
export const withRouter = (Cmp: Component) => (props) => (
    <Router>
        <Cmp {...props} />
    </Router>
);
