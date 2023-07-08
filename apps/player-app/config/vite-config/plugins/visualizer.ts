/**
 * Module file volume analysis.
 * @module config/vite-config/plugins/visualizer.ts
 */

import visualizer from 'rollup-plugin-visualizer';
import { type PluginOption } from 'vite';

/**
 * Bundle visualizer configuration.
 * @returns {Object} visualizer instance.
 */
export const configVisualizerConfig = () => {
    return visualizer({
        filename: './build/visualizer/stats.html',
        template: 'sunburst',
    }) as PluginOption;
};
