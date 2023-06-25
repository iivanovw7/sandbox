import { type EffectCallback, useEffect } from 'react';

/**
 * React lifecycle hook that calls a function when the component will unmount.
 * @param {EffectCallback} effect callback.
 */
export const useEffectOnce = (effect: EffectCallback): void => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
};
