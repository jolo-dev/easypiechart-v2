import { Renderer } from "./renderer";

export class SVGRenderer extends Renderer {

    private _svgNS: string = 'http://www.w3.org/2000/svg';
    private _hasScale: boolean;
    private arc: any;
    private svg: any;
    
    constructor(el: HTMLElement, options: any){
        super(options);
        this._hasScale = (this.options.scaleColor && this.options.scaleLength); 
        if(this._hasScale){
            this.radius -= this.options.scaleLength + 2; // 2 is the distance between scale and bar
        }else{
            this.radius = (this.options.size - this.options.lineWidth) / 2;
        }
        this.svg = this.createElement('svg', {
            version: 1.1,
            width: this.options.size,
            height: this.options.size
        });

        // create track if necessary
        if (this.options.trackColor) {
            this.svg.appendChild(this.createElement('circle', {
                cx: this.options.size / 2,
                cy: this.options.size / 2,
                r: this.radius,
                stroke: this.options.trackColor,
                'stroke-width': this.options.lineWidth,
                fill: 'none'
            }));
        }

        // create scale if necessary
        if (this._hasScale) {
            this.drawScale();
        }

        // create arc (actual chart)
        this.arc = this.createElement('path', {
            stroke: typeof(this.options.barColor) === 'function' ? this.options.barColor(0) : this.options.barColor,
            'stroke-width': this.options.lineWidth,
            'stroke-linecap': this.options.lineCap,
            fill: 'none'
        });
        if (this.options.rotate) {
            this.arc.setAttribute('transform', ['rotate(', this.options.rotate, ',', this.options.size/2, ',', this.options.size/2, ')'].join(''));
        }
        this.svg.appendChild(this.arc);

        // add svg to the element
        el.appendChild(this.svg);
    }

    /**
	 * Create an element of the SVG namespace
	 * @param  {string} type       Type of the element (tag name)
	 * @param  {object} attributes Attribute list of the element
	 * @return {element}           Created element
	 */
    private createElement(type: string, attributes: {[index: string]: any}){
        var el = document.createElementNS(this._svgNS, type);

		if (attributes) {
			for (var i in attributes) {
				if (attributes.hasOwnProperty(i)) {
					el.setAttribute(i, attributes[i]);
				}
			}
		}
		return el;
    }

    clear() {
        this.svg.parentNode.removeChild(this.svg);
    }

    protected drawScale() {
        const g = this.createElement('g', {
            transform: 'translate(55, 55)'
        });
        for (let i = 0; i<24; ++i) {
            let length = this.options.scaleLength;
            let width = 1;
            // Each quarter should be bigger
            if (i%6 !== 0) {
                length *= .6;
            }else {
                length *= 1.2;
                width = 3;
            }
            const deg = 360 * i / 24 + this.options.rotate;

            g.appendChild(this.createElement('path', {
                d: ['M', 0, 0, 'l', 0, length].join(' '),
                stroke: this.options.scaleColor,
                'stroke-width': width,
                fill: 'none',
                transform: ['rotate(' + deg + ') translate(0,', this.options.size/2 - this.options.scaleLength, ')'].join('')
            }));
        }
        this.svg.appendChild(g);
    }

    draw(percent: number) {
        const deg = 3.6 * percent;
		const rad = deg * Math.PI / 180;
		const x = this.options.size / 2 + this.radius * Math.sin(rad);
		const y = this.options.size / 2 - this.radius * Math.cos(rad);
		let offsetTop = this.options.lineWidth / 3;
        
        if (this._hasScale) {
			offsetTop += this.options.scaleLength + 10;
        }
        
		const path = [
			'M',
			this.options.size / 2,
			offsetTop,
			'A',
			this.radius,
			this.radius,
			0,
			+(deg > 180),
			1,
			x,
			y
		];
		this.arc.setAttribute('d', path.join(' '));

		if (typeof(this.options.barColor) === 'function') {
			this.arc.setAttribute('stroke', this.options.barColor(percent));
		}
    }
}