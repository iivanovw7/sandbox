/**
 * Module contains utility functions related to events.
 * @module src/shared/utils/object/event
 */
import type { AnyFunction, Nullable, ValueOf } from '@sandbox/types';

type TTarget = Document | EventTarget | HTMLElement | Window;
type TEventListener = Parameters<HTMLElement['addEventListener']>;

/*
    eslint-disable
    @typescript-eslint/no-explicit-any,
*/

type TListeners = [string, AnyFunction | null, ...any];

/**
 * Contains `event` names.
 * @category Event
 * @readonly
 * @name EventMap
 * @enum {string}
 */
export const EventMap = {
    CHANGE: 'change',
    CLICK: 'click',
    KEYDOWN: 'keydown',
    MOUSEENTER: 'mouseenter',
    MOUSELEAVE: 'mouseleave',
    POINTERDOWN: 'pointerdown',
    POINTERMOVE: 'pointermove',
    RESIZE: 'resize',
    SCROLL: 'scroll',
} as const;

export type EventMap = typeof EventMap[keyof typeof EventMap];

/**
 * Adds `event` listener to a target object.
 * @function
 * @category Event
 * @param {TTarget} obj - represents target object reference.
 * @param {...*} args - event type string, listener function, options.
 */
export const onEvent = <T extends TTarget>(
    obj: Nullable<T>,
    ...args: Parameters<T['addEventListener']> | TListeners
): void => {
    if (obj?.addEventListener) {
        obj.addEventListener(...(args as TEventListener));
    }
};

/**
 * Removes `event` listener out of a target object.
 * @function
 * @category Event
 * @param {TTarget} obj - represents target object reference.
 * @param {...*} args - event type string, listener function, options.
 */
export const offEvent = <T extends TTarget>(
    obj: T | null,
    ...args: Parameters<T['removeEventListener']> | TListeners
): void => {
    if (obj?.removeEventListener) {
        obj.removeEventListener(...(args as TEventListener));
    }
};

export type CustomValueEvent<Value, EventData extends Event = Event> = Omit<EventData, 'target'> & {
    target: EventData['target'] & { value: Value };
};

/**
 * Sets custom value to event data object.
 * @param {Event} eventData - target event.
 * @param {*} value to set.
 * @returns {Event} new event.
 */
export const setEventValue = <Value, EventData extends Event>(
    eventData: EventData,
    value: Value
): CustomValueEvent<Value, EventData> => {
    return new Proxy(eventData, {
        get: (target, property) => {
            if (property === 'target') {
                return {
                    ...eventData.target,
                    value
                };
            }

            return target[property] as ValueOf<EventData>;
        }
    }) as any as CustomValueEvent<Value, EventData>;
};

/*
    eslint-enable
    @typescript-eslint/no-explicit-any,
*/
