/**
 * Module contains platform utilities.
 * @module src/shared/utils/getPlatform
 */

export type NavigatorUAData = {
    brands: Array<{ brand: string; version: string }>;
    mobile: boolean;
    platform: string;
};

/**
 * Module contains platform related utils.
 * @module src/shared/utils/getPlatform
 */

/**
 *  Gets current platform.
 *  @returns {string} platform name.
 */
export const getPlatform = (): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uaData = (navigator as any).userAgentData as
            | NavigatorUAData
            | undefined;

    if (uaData?.platform) {
        return uaData.platform;
    }

    return navigator.platform;
};

/**
 *  Gets current userAgent.
 *  @returns {string} userAgent name.
 */
export const getUserAgent = (): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uaData = (navigator as any).userAgentData as
            | NavigatorUAData
            | undefined;

    if (uaData && Array.isArray(uaData.brands)) {
        return uaData.brands
            .map(({ brand, version }) => `${brand}/${version}`)
            .join(' ');
    }

    return navigator.userAgent;
};


