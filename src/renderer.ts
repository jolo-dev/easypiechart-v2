export abstract class Renderer {

    private _scaleBy = 1;
    private _radius: number;
    
    constructor(protected options: any){
        if (window.devicePixelRatio > 1) {
            this._scaleBy = window.devicePixelRatio;
        }
        this._radius = (this.options.size - this.options.lineWidth) / 2;
        if (this.options.scaleColor && this.options.scaleLength) {
            this._radius -= this.options.scaleLength + 2; // 2 is the distance between scale and bar
        }

        // IE polyfill for Date
        Date.now = Date.now || function() {
            return +(new Date());
        };
    }

    /**
	 * Clear the complete canvas
	 */
    abstract clear() : void;

    /**
	 * Draw the complete chart
	 * @param {number} percent Percent shown by the chart between -100 and 100
	 */
    abstract draw(percent: number) : void;

    protected abstract drawScale() : void;

    /**
	 * Animate from some percent to some other percentage
	 * @param {number} from Starting percentage
	 * @param {number} to   Final percentage
	 */
    public animate(from: number, to: number) {
        /* Callback Request animation frame wrapper with polyfill
        * @return {function} Request animation frame method or timeout fallback
        */
        var reqAnimationFrame = (function() {
            return  window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
        }());

        const startTime = Date.now();
        this.options.onStart(from, to);
        const animation = () => {
			const process = Math.min(Date.now() - startTime, this.options.animate.duration);
			let currentValue = this.options.easing(this, process, from, to - from, this.options.animate.duration);
            
            this.draw(currentValue);
			this.options.onStep(from, to, currentValue);
			if (process >= this.options.animate.duration) {
				this.options.onStop(from, to);
			} else {
                reqAnimationFrame(animation);
			}
		};
		reqAnimationFrame(animation);
    }

    /** Canvas Accessor Getter and Setter */
    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }
    
    public get scaleBy(): number {
        return this._scaleBy;
    }
    public set scaleBy(value: number) {
        this._scaleBy = value;
    }

}