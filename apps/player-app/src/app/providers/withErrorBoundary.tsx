/**
 * Module contains application `withErrorBoundary` HOC.
 * @module src/app/providers/withErrorBoundary
 */
import { ErrorFallback } from '@/pages';

/**
 * Application error fallback HOC.
 * @constructor
 * @param Cmp - represents child component.
 * @returns component with children.
 */
export const withErrorBoundary = (Cmp: Component) => (props) => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <Cmp {...props} />
    </ErrorBoundary>
);
