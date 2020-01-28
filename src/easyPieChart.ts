import { CanvasRenderer } from './canvasRenderer';
import { Renderer } from './renderer';
import { SVGRenderer } from './svgRenderer';

interface DefaultOptions {
    barColor?: string;
    trackColor?: string;
    scaleColor?: string;
    scaleLength?: number;
    lineCap?: string;
    lineWidth?: number;
    size?: number;
    rotate?: number;
    animate?: number
    renderer?: string | null;
    easing?: CallableFunction;
    onStart?: CallableFunction;
    onStep?: CallableFunction;
    onStop?: CallableFunction;
}

export class EasyPieChart {
    private defaultOptions: { [index: string]: any } = {
        barColor: '#ef1e25',
        trackColor: '#f9f9f9',
        scaleColor: '#dfe0e0',
        scaleLength: 5,
        lineCap: 'round',
        lineWidth: 3,
        size: 110,
        rotate: 0,
        animate: 1000,
        renderer: null,
        easing: (_x: number, t: number, b: number, c: number, d: number) => {
            t = t / (d / 2);
            if (t < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        onStart: (_from: number, _to: number) => {
            return;
        },
        onStep: (_from: number, _to: number, _currentValue: number) => {
            return;
        },
        onStop: (_from: number, _to: number) => {
            return;
        }
    };
    private options: any;
    private renderer: Renderer;
    private currentValue: number = 0;
    private element: HTMLElement;
    private percent: string | number;
    constructor(el: HTMLElement, options: { [index: string]: any } | null) {
        this.element = el;
        if (options !== null) {
            // merge user options into default options
            for (var i in options) {
                if (this.defaultOptions.hasOwnProperty(i)) {
                    this.defaultOptions[i] = options[i];
                }
            }
        }
        this.options = this.defaultOptions;

        this.element.setAttribute('style', 'position: relative;display: inline-block;text-align: center;')
        this.element.style.width = this.options.size + 'px';
        this.element.style.height = this.options.size + 'px';
        this.percent = (el.dataset.percent !== undefined) ? el.dataset.percent : '';

        const span = document.createElement('span');
        let content = this.element.appendChild(span);
        content.setAttribute('style', 'line-height: 110px; z-index: 2;');
        content.textContent = this.percent;

        if (this.options.renderer === 'SVG') {
            this.renderer = new SVGRenderer(this.element, this.options);
        } else {
            // Canvas is default
            this.renderer = new CanvasRenderer(this.element, this.options);
        }

        // process earlier animate option to avoid bc breaks
        if (typeof (this.options.animate) === 'number') {
            this.options.animate = {
                duration: this.options.animate,
                enabled: true
            };
        }

        if (typeof (this.options.animate) === 'boolean' && !this.options.animate) {
            this.options.animate = {
                duration: 1000,
                enabled: this.options.animate
            };
        }
        // initial draw
        this.renderer.draw(this.currentValue);
        // initial update
        if (el.dataset && this.percent) {
            this.update(parseFloat(this.percent));
        } else if (el.getAttribute && el.getAttribute('data-percent')) {
            this.update(parseFloat(el.getAttribute('data-percent')!));
        }
    }

    /**
	 * Update the value of the chart
	 * @param  {number} newValue Number between 0 and 100
	 * @return {object}          Instance of the plugin for method chaining
	 */
    private update(newValue: number) {
        if (this.options.animate.enabled) {
            this.renderer.animate(this.currentValue, newValue);
        } else {
            this.renderer.draw(newValue);
        }
        this.currentValue = newValue;
        return this;
    }

    /**
	 * Disable animation
	 * @return {object} Instance of the plugin for method chaining
	 */
    private disableAnimation() {
        this.options.animate.enabled = false;
        return this;
    }

    /**
	 * Enable animation
	 * @return {object} Instance of the plugin for method chaining
	 */
    private enableAnimation() {
        this.options.animate.enabled = true;
        return this;
    }
}

