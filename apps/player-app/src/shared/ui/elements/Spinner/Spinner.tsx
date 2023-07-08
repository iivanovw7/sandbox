/**
 * Module contains `Spinner` component.
 * @module scr/shared/ui/elements/Spinner/Spinner
 */

export type SpinnerProps = {
    children?: JSXElement | JSXElement[];
    class?: string;
    containerClass?: string;
    ref?: Accessor<HTMLDivElement | undefined>;
};

/**
 * Creates `Spinner` component.
 * @constructor
 * @name src/shared/ui/elements/Spinner
 * @method
 * @param {object} props - contains component props.
 * @returns Component with children.
 */
export const Spinner = (props: SpinnerProps) => {
    return (
        <div ref={props.ref} class={props.containerClass}>
            <svg
                class={props.class}
                fill="none"
                height="200"
                preserveAspectRatio="xMidYMid meet"
                view-box="0 0 200 200"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="spinner-second-half">
                        <stop offset="0%" stop-color="currentColor" stop-opacity="0" />
                        <stop offset="100%" stop-color="currentColor" stop-opacity="0.5" />
                    </linearGradient>
                    <linearGradient id="spinner-first-half">
                        <stop offset="0%" stop-color="currentColor" stop-opacity="1" />
                        <stop offset="100%" stop-color="currentColor" stop-opacity="0.5" />
                    </linearGradient>
                </defs>
                <g stroke-width="8">
                    <path d="M 4 100 A 96 96 0 0 1 196 100" stroke="url(#spinner-second-half)" />
                    <path d="M 196 100 A 96 96 0 0 1 4 100" stroke="url(#spinner-first-half)" />
                    <path
                        d="M 4 100 A 96 96 0 0 1 4 98"
                        stroke="currentColor"
                        stroke-linecap="round"
                    />
                </g>
                <animateTransform
                    attributeName="transform"
                    dur="900ms"
                    from="0 0 0"
                    repeatCount="indefinite"
                    to="360 0 0"
                    type="rotate"
                />
            </svg>
            {props.children}
        </div>
    );
};
