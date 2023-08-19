import { useRef } from 'react';

/**
 * Determines first render.
 * @returns {boolean} Returns `true` if component is just mounted (on first render) and `false` otherwise.
 */
export const useFirstMountState = () => {
    const isFirst = useRef(true);

    if (isFirst.current) {
        isFirst.current = false;

        return true;
    }

    return isFirst.current;
};
