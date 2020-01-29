import { CanvasRenderer } from './canvasRenderer';
import { Renderer } from './renderer';
import { SVGRenderer } from './svgRenderer';
import { EasyPieOptions, defaultOptions } from './options';

export class EasyPieChart {
    private options: EasyPieOptions;
    private renderer: Renderer;
    private currentValue: number = 0;
    private element: HTMLElement;
    private percent: string | number;
    constructor(el: HTMLElement, options: EasyPieOptions) {
        this.element = el;
        // merge user options into default options
        this.options = { ...defaultOptions, ...options };

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
        if (this.options.animate) {
            this.renderer.animate(this.currentValue, newValue);
        } else {
            this.renderer.draw(newValue);
        }
        this.currentValue = newValue;
        return this;
    }

}

