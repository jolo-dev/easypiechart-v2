/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/easyPieChart.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvasRenderer.ts":
/*!*******************************!*\
  !*** ./src/canvasRenderer.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
var CanvasRenderer = (function (_super) {
    __extends(CanvasRenderer, _super);
    function CanvasRenderer(el, options) {
        var _this = _super.call(this, options) || this;
        _this._canvas = document.createElement('canvas');
        _this._ctx = _this._canvas.getContext('2d');
        el.appendChild(_this._canvas);
        _this._canvas.setAttribute('style', 'position: absolute;top: 0;left: 0;');
        if (window.devicePixelRatio > 1) {
            _this._canvas.style.width = _this._canvas.style.height = [_this.options.size, 'px'].join('');
            _this._canvas.width = _this._canvas.height = _this.options.size * _this.scaleBy;
            _this._ctx.scale(_this.scaleBy, _this.scaleBy);
        }
        _this._ctx.translate(_this.options.size / 2, _this.options.size / 2);
        _this._ctx.rotate((-1 / 2 + _this.options.rotate / 180) * Math.PI);
        _this._cachedBackground = _this._ctx.getImageData(0, 0, _this.options.size * _this.scaleBy, _this.options.size * _this.scaleBy);
        return _this;
    }
    CanvasRenderer.prototype.drawCircle = function (color, lineWidth, percent) {
        percent = Math.min(Math.max(-1, percent || 0), 1);
        var isNegative = percent <= 0 ? true : false;
        this._ctx.beginPath();
        this._ctx.arc(0, 0, this.radius, 0, Math.PI * 2 * percent, isNegative);
        this._ctx.strokeStyle = color;
        this._ctx.lineWidth = lineWidth;
        this._ctx.stroke();
    };
    CanvasRenderer.prototype.drawScale = function () {
        var offset;
        var length;
        var width = 1;
        this._ctx.lineWidth = 1;
        this._ctx.fillStyle = this.options.scaleColor;
        this._ctx.save();
        for (var i = 24; i > 0; --i) {
            if (i % 6 === 0) {
                length = this.options.scaleLength * 1.2;
                offset = 0;
                width = 3;
            }
            else {
                length = this.options.scaleLength * 0.6;
                offset = this.options.scaleLength - length;
                width = 1;
            }
            this._ctx.fillRect(-this.options.size / 2 + offset, 0, length, width);
            this._ctx.rotate(Math.PI / 12);
        }
        this._ctx.restore();
    };
    CanvasRenderer.prototype.clear = function () {
        this._ctx.clearRect(this.options.size / -2, this.options.size / -2, this.options.size, this.options.size);
    };
    CanvasRenderer.prototype.draw = function (percent) {
        this._ctx.lineCap = this.options.lineCap;
        var color;
        if (typeof (this.options.barColor) === 'function') {
            color = this.options.barColor(percent);
        }
        else {
            color = this.options.barColor;
        }
        this.drawScale();
        this.drawCircle(color, this.options.lineWidth, percent / 100);
    };
    Object.defineProperty(CanvasRenderer.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        set: function (value) {
            this._canvas = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasRenderer.prototype, "ctx", {
        get: function () {
            return this._ctx;
        },
        set: function (value) {
            this._ctx = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasRenderer.prototype, "cachedBackground", {
        get: function () {
            return this._cachedBackground;
        },
        set: function (value) {
            this._cachedBackground = value;
        },
        enumerable: true,
        configurable: true
    });
    return CanvasRenderer;
}(renderer_1.Renderer));
exports.CanvasRenderer = CanvasRenderer;


/***/ }),

/***/ "./src/easyPieChart.ts":
/*!*****************************!*\
  !*** ./src/easyPieChart.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canvasRenderer_1 = __webpack_require__(/*! ./canvasRenderer */ "./src/canvasRenderer.ts");
var svgRenderer_1 = __webpack_require__(/*! ./svgRenderer */ "./src/svgRenderer.ts");
var EasyPieChart = (function () {
    function EasyPieChart(el, options) {
        this.defaultOptions = {
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
            easing: function (_x, t, b, c, d) {
                t = t / (d / 2);
                if (t < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            onStart: function (_from, _to) {
                return;
            },
            onStep: function (_from, _to, _currentValue) {
                return;
            },
            onStop: function (_from, _to) {
                return;
            }
        };
        this.currentValue = 0;
        this.element = el;
        if (options !== null) {
            for (var i in options) {
                if (this.defaultOptions.hasOwnProperty(i)) {
                    this.defaultOptions[i] = options[i];
                }
            }
        }
        this.options = this.defaultOptions;
        this.element.setAttribute('style', 'position: relative;display: inline-block;text-align: center;');
        this.element.style.width = this.options.size + 'px';
        this.element.style.height = this.options.size + 'px';
        this.percent = (el.dataset.percent !== undefined) ? el.dataset.percent : '';
        var span = document.createElement('span');
        var content = this.element.appendChild(span);
        content.setAttribute('style', 'line-height: 110px; z-index: 2;');
        content.textContent = this.percent;
        if (this.options.renderer === 'SVG') {
            this.renderer = new svgRenderer_1.SVGRenderer(this.element, this.options);
        }
        else {
            this.renderer = new canvasRenderer_1.CanvasRenderer(this.element, this.options);
        }
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
        this.renderer.draw(this.currentValue);
        if (el.dataset && this.percent) {
            this.update(parseFloat(this.percent));
        }
        else if (el.getAttribute && el.getAttribute('data-percent')) {
            this.update(parseFloat(el.getAttribute('data-percent')));
        }
    }
    EasyPieChart.prototype.update = function (newValue) {
        if (this.options.animate.enabled) {
            this.renderer.animate(this.currentValue, newValue);
        }
        else {
            this.renderer.draw(newValue);
        }
        this.currentValue = newValue;
        return this;
    };
    EasyPieChart.prototype.disableAnimation = function () {
        this.options.animate.enabled = false;
        return this;
    };
    EasyPieChart.prototype.enableAnimation = function () {
        this.options.animate.enabled = true;
        return this;
    };
    return EasyPieChart;
}());
exports.EasyPieChart = EasyPieChart;


/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Renderer = (function () {
    function Renderer(options) {
        this.options = options;
        this._scaleBy = 1;
        if (window.devicePixelRatio > 1) {
            this._scaleBy = window.devicePixelRatio;
        }
        this._radius = (this.options.size - this.options.lineWidth) / 2;
        if (this.options.scaleColor && this.options.scaleLength) {
            this._radius -= this.options.scaleLength + 2;
        }
        Date.now = Date.now || function () {
            return +(new Date());
        };
    }
    Renderer.prototype.animate = function (from, to) {
        var _this = this;
        var reqAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }());
        var startTime = Date.now();
        this.options.onStart(from, to);
        var animation = function () {
            var process = Math.min(Date.now() - startTime, _this.options.animate.duration);
            var currentValue = _this.options.easing(_this, process, from, to - from, _this.options.animate.duration);
            _this.draw(currentValue);
            _this.options.onStep(from, to, currentValue);
            if (process >= _this.options.animate.duration) {
                _this.options.onStop(from, to);
            }
            else {
                reqAnimationFrame(animation);
            }
        };
        reqAnimationFrame(animation);
    };
    Object.defineProperty(Renderer.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "scaleBy", {
        get: function () {
            return this._scaleBy;
        },
        set: function (value) {
            this._scaleBy = value;
        },
        enumerable: true,
        configurable: true
    });
    return Renderer;
}());
exports.Renderer = Renderer;


/***/ }),

/***/ "./src/svgRenderer.ts":
/*!****************************!*\
  !*** ./src/svgRenderer.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
var SVGRenderer = (function (_super) {
    __extends(SVGRenderer, _super);
    function SVGRenderer(el, options) {
        var _this = _super.call(this, options) || this;
        _this._svgNS = 'http://www.w3.org/2000/svg';
        _this._hasScale = (_this.options.scaleColor && _this.options.scaleLength);
        if (_this._hasScale) {
            _this.radius -= _this.options.scaleLength + 2;
        }
        else {
            _this.radius = (_this.options.size - _this.options.lineWidth) / 2;
        }
        _this.svg = _this.createElement('svg', {
            version: 1.1,
            width: _this.options.size,
            height: _this.options.size
        });
        if (_this.options.trackColor) {
            _this.svg.appendChild(_this.createElement('circle', {
                cx: _this.options.size / 2,
                cy: _this.options.size / 2,
                r: _this.radius,
                stroke: _this.options.trackColor,
                'stroke-width': _this.options.lineWidth,
                fill: 'none'
            }));
        }
        if (_this._hasScale) {
            _this.drawScale();
        }
        _this.arc = _this.createElement('path', {
            stroke: typeof (_this.options.barColor) === 'function' ? _this.options.barColor(0) : _this.options.barColor,
            'stroke-width': _this.options.lineWidth,
            'stroke-linecap': _this.options.lineCap,
            fill: 'none'
        });
        if (_this.options.rotate) {
            _this.arc.setAttribute('transform', ['rotate(', _this.options.rotate, ',', _this.options.size / 2, ',', _this.options.size / 2, ')'].join(''));
        }
        _this.svg.appendChild(_this.arc);
        el.appendChild(_this.svg);
        return _this;
    }
    SVGRenderer.prototype.createElement = function (type, attributes) {
        var el = document.createElementNS(this._svgNS, type);
        if (attributes) {
            for (var i in attributes) {
                if (attributes.hasOwnProperty(i)) {
                    el.setAttribute(i, attributes[i]);
                }
            }
        }
        return el;
    };
    SVGRenderer.prototype.clear = function () {
        this.svg.parentNode.removeChild(this.svg);
    };
    SVGRenderer.prototype.drawScale = function () {
        var g = this.createElement('g', {
            transform: 'translate(55, 55)'
        });
        for (var i = 0; i < 24; ++i) {
            var length_1 = this.options.scaleLength;
            var width = 1;
            if (i % 6 !== 0) {
                length_1 *= .6;
            }
            else {
                length_1 *= 1.2;
                width = 3;
            }
            var deg = 360 * i / 24 + this.options.rotate;
            g.appendChild(this.createElement('path', {
                d: ['M', 0, 0, 'l', 0, length_1].join(' '),
                stroke: this.options.scaleColor,
                'stroke-width': width,
                fill: 'none',
                transform: ['rotate(' + deg + ') translate(0,', this.options.size / 2 - this.options.scaleLength, ')'].join('')
            }));
        }
        this.svg.appendChild(g);
    };
    SVGRenderer.prototype.draw = function (percent) {
        var deg = 3.6 * percent;
        var rad = deg * Math.PI / 180;
        var x = this.options.size / 2 + this.radius * Math.sin(rad);
        var y = this.options.size / 2 - this.radius * Math.cos(rad);
        var offsetTop = this.options.lineWidth / 3;
        if (this._hasScale) {
            offsetTop += this.options.scaleLength + 10;
        }
        var path = [
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
        if (typeof (this.options.barColor) === 'function') {
            this.arc.setAttribute('stroke', this.options.barColor(percent));
        }
    };
    return SVGRenderer;
}(renderer_1.Renderer));
exports.SVGRenderer = SVGRenderer;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhc1JlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9lYXN5UGllQ2hhcnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zdmdSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDRFQUFzQztBQUV0QztJQUFvQyxrQ0FBUTtJQVd4Qyx3QkFBWSxFQUFlLEVBQUUsT0FBZTtRQUE1QyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQWdCakI7UUFmRyxLQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsS0FBSSxDQUFDLElBQUksR0FBRyxL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QUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQ2pELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0MsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxDQXRJZ0MsbUJBQVEsR0FzSXhDO0FBdElZLGtDQUFXIiwiZmlsZSI6ImVhc3lwaWVjaGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2Vhc3lQaWVDaGFydC50c1wiKTtcbiIsImltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vcmVuZGVyZXJcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc1JlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIFxuICAgIHByaXZhdGUgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfY3R4OiBhbnk7XG4gICAgcHJpdmF0ZSBfY2FjaGVkQmFja2dyb3VuZDogSW1hZ2VEYXRhO1xuICAgIFxuICAgIC8qKlxuICAgICAqIFJlbmRlcmVyIHRvIHJlbmRlciB0aGUgY2hhcnQgb24gYSBjYW52YXMgb2JqZWN0XG4gICAgICogQHBhcmFtIGVsIERPTSBlbGVtZW50IHRvIGhvc3QgdGhlIGNhbnZhcyAocm9vdCBvZiB0aGUgcGx1Z2luKVxuICAgICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgb2JqZWN0IG9mIHRoZSBwbHVnaW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlbDogSFRNTEVsZW1lbnQsIG9wdGlvbnM6IG9iamVjdCkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuX2N0eCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCdzdHlsZScsICdwb3NpdGlvbjogYWJzb2x1dGU7dG9wOiAwO2xlZnQ6IDA7JylcbiAgICAgICAgLy8gY2FudmFzIG9uIHJldGluYSBkZXZpY2VzXG4gICAgICAgIGlmICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCA9IHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSBbdGhpcy5vcHRpb25zLnNpemUsICdweCddLmpvaW4oJycpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMub3B0aW9ucy5zaXplICogdGhpcy5zY2FsZUJ5O1xuICAgICAgICAgICAgdGhpcy5fY3R4LnNjYWxlKHRoaXMuc2NhbGVCeSwgdGhpcy5zY2FsZUJ5KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBtb3ZlIDAsMCBjb29yZGluYXRlcyB0byB0aGUgY2VudGVyXG4gICAgICAgIHRoaXMuX2N0eC50cmFuc2xhdGUodGhpcy5vcHRpb25zLnNpemUgLyAyLCB0aGlzLm9wdGlvbnMuc2l6ZSAvIDIpO1xuICAgICAgICAvLyByb3RhdGUgY2FudmFzIC05MGRlZ1xuICAgICAgICB0aGlzLl9jdHgucm90YXRlKCgtMSAvIDIgKyB0aGlzLm9wdGlvbnMucm90YXRlIC8gMTgwKSAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLl9jYWNoZWRCYWNrZ3JvdW5kID0gdGhpcy5fY3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLm9wdGlvbnMuc2l6ZSAqIHRoaXMuc2NhbGVCeSwgdGhpcy5vcHRpb25zLnNpemUgKiB0aGlzLnNjYWxlQnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXcgYSBjaXJjbGUgYXJvdW5kIHRoZSBjZW50ZXIgb2YgdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBjb2xvciBWYWxpZCBDU1MgQ29sb3JcbiAgICAgKiBAcGFyYW0gbGluZVdpZHRoIFdpZHRoIG9mIHRoZSBsaW5lIGluIHB4XG4gICAgICogQHBhcmFtIHBlcmNlbnQgUGVyY2VudGFnZSB0byBkcmF3IChmbG9hdCBiZXR3ZWVuIC0xIGFuZCAxKVxuICAgICAqL1xuICAgIGRyYXdDaXJjbGUoY29sb3I6IHN0cmluZywgbGluZVdpZHRoOiBudW1iZXIsIHBlcmNlbnQ6IG51bWJlcikge1xuICAgICAgICBwZXJjZW50ID0gTWF0aC5taW4oTWF0aC5tYXgoLTEsIHBlcmNlbnQgfHwgMCksIDEpO1xuXHRcdGNvbnN0IGlzTmVnYXRpdmUgPSBwZXJjZW50IDw9IDAgPyB0cnVlIDogZmFsc2U7XG5cblx0XHR0aGlzLl9jdHguYmVnaW5QYXRoKCk7XG5cdFx0dGhpcy5fY3R4LmFyYygwLCAwLCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIgKiBwZXJjZW50LCBpc05lZ2F0aXZlKTtcblxuXHRcdHRoaXMuX2N0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuXHRcdHRoaXMuX2N0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cblx0XHR0aGlzLl9jdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgLyoqXG5cdCAqIERyYXcgdGhlIHNjYWxlIG9mIHRoZSBjaGFydFxuXHQgKi9cbiAgICBwcm90ZWN0ZWQgZHJhd1NjYWxlKCkge1xuICAgICAgICBsZXQgb2Zmc2V0O1xuXHRcdGxldCBsZW5ndGg7XG4gICAgICAgIGxldCB3aWR0aCA9IDE7XG5cdFx0dGhpcy5fY3R4LmxpbmVXaWR0aCA9IDE7XG5cdFx0dGhpcy5fY3R4LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5zY2FsZUNvbG9yO1xuXG5cdFx0dGhpcy5fY3R4LnNhdmUoKTtcblx0XHRmb3IgKGxldCBpID0gMjQ7IGkgPiAwOyAtLWkpIHtcblx0XHRcdGlmIChpICUgNiA9PT0gMCkge1xuXHRcdFx0XHRsZW5ndGggPSB0aGlzLm9wdGlvbnMuc2NhbGVMZW5ndGggKiAxLjI7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IDM7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZW5ndGggPSB0aGlzLm9wdGlvbnMuc2NhbGVMZW5ndGggKiAwLjY7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5vcHRpb25zLnNjYWxlTGVuZ3RoIC0gbGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdpZHRoID0gMTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2N0eC5maWxsUmVjdCgtdGhpcy5vcHRpb25zLnNpemUvMiArIG9mZnNldCwgMCwgbGVuZ3RoLCB3aWR0aCk7XG5cdFx0XHR0aGlzLl9jdHgucm90YXRlKE1hdGguUEkgLyAxMik7XG5cdFx0fVxuXHRcdHRoaXMuX2N0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG5cdCAqIENsZWFyIHRoZSBjb21wbGV0ZSBjYW52YXNcblx0ICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2N0eC5jbGVhclJlY3QodGhpcy5vcHRpb25zLnNpemUgLyAtMiwgdGhpcy5vcHRpb25zLnNpemUgLyAtMiwgdGhpcy5vcHRpb25zLnNpemUsIHRoaXMub3B0aW9ucy5zaXplKTtcbiAgICB9XG5cbiAgICAvKipcblx0ICogRHJhdyB0aGUgY29tcGxldGUgY2hhcnRcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnQgUGVyY2VudCBzaG93biBieSB0aGUgY2hhcnQgYmV0d2VlbiAtMTAwIGFuZCAxMDBcblx0ICovXG4gICAgZHJhdyhwZXJjZW50OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fY3R4LmxpbmVDYXAgPSB0aGlzLm9wdGlvbnMubGluZUNhcDtcblxuXHRcdC8vIGlmIGJhcmNvbG9yIGlzIGEgZnVuY3Rpb24gZXhlY3V0ZSBpdCBhbmQgcGFzcyB0aGUgcGVyY2VudCBhcyBhIHZhbHVlXG5cdFx0bGV0IGNvbG9yO1xuXHRcdGlmICh0eXBlb2YodGhpcy5vcHRpb25zLmJhckNvbG9yKSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y29sb3IgPSB0aGlzLm9wdGlvbnMuYmFyQ29sb3IocGVyY2VudCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbG9yID0gdGhpcy5vcHRpb25zLmJhckNvbG9yO1xuXHRcdH1cblxuICAgICAgICAvLyBkcmF3IGJhclxuICAgICAgICB0aGlzLmRyYXdTY2FsZSgpO1xuXHRcdHRoaXMuZHJhd0NpcmNsZShjb2xvciwgdGhpcy5vcHRpb25zLmxpbmVXaWR0aCwgcGVyY2VudCAvIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqIENhbnZhcyBBY2Nlc3NvciBHZXR0ZXIgYW5kIFNldHRlciAqL1xuICAgIHB1YmxpYyBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG4gICAgcHVibGljIHNldCBjYW52YXModmFsdWU6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY3R4KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdHg7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgY3R4KHZhbHVlOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjYWNoZWRCYWNrZ3JvdW5kKCk6IEltYWdlRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZWRCYWNrZ3JvdW5kO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGNhY2hlZEJhY2tncm91bmQodmFsdWU6IEltYWdlRGF0YSkge1xuICAgICAgICB0aGlzLl9jYWNoZWRCYWNrZ3JvdW5kID0gdmFsdWU7XG4gICAgfVxufSIsImltcG9ydCB7IENhbnZhc1JlbmRlcmVyIH0gZnJvbSAnLi9jYW52YXNSZW5kZXJlcic7XG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyZXInO1xuaW1wb3J0IHsgU1ZHUmVuZGVyZXIgfSBmcm9tICcuL3N2Z1JlbmRlcmVyJztcblxuZXhwb3J0IGNsYXNzIEVhc3lQaWVDaGFydCB7XG4gICAgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczoge1tpbmRleDogc3RyaW5nXTogYW55fSA9IHtcblx0XHRiYXJDb2xvcjogJyNlZjFlMjUnLFxuXHRcdHRyYWNrQ29sb3I6ICcjZjlmOWY5Jyxcblx0XHRzY2FsZUNvbG9yOiAnI2RmZTBlMCcsXG5cdFx0c2NhbGVMZW5ndGg6IDUsXG5cdFx0bGluZUNhcDogJ3JvdW5kJyxcblx0XHRsaW5lV2lkdGg6IDMsXG5cdFx0c2l6ZTogMTEwLFxuXHRcdHJvdGF0ZTogMCxcbiAgICAgICAgYW5pbWF0ZTogMTAwMCxcbiAgICAgICAgcmVuZGVyZXI6IG51bGwsXG4gICAgICAgIGVhc2luZzogKF94Om51bWJlciwgdDpudW1iZXIsIGI6bnVtYmVyLCBjOm51bWJlciwgZDpudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHQgPSB0IC8gKGQvMik7XG4gICAgICAgICAgICBpZiAodCA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLWMvMiAqICgoLS10KSoodC0yKSAtIDEpICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgb25TdGFydDogKF9mcm9tOm51bWJlciwgX3RvOm51bWJlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9LFxuICAgICAgICBvblN0ZXA6IChfZnJvbTpudW1iZXIsIF90bzpudW1iZXIsIF9jdXJyZW50VmFsdWU6bnVtYmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3RvcDogKF9mcm9tOm51bWJlciwgX3RvOm51bWJlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBwcml2YXRlIG9wdGlvbnM6IGFueTtcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjtcbiAgICBwcml2YXRlIGN1cnJlbnRWYWx1ZTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgcGVyY2VudDogc3RyaW5nIHwgbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKGVsOiBIVE1MRWxlbWVudCwgb3B0aW9uczoge1tpbmRleDogc3RyaW5nXSA6IGFueX0gfCBudWxsKXtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWw7XG4gICAgICAgIGlmKG9wdGlvbnMgIT09IG51bGwpeyAgICBcbiAgICAgICAgICAgIC8vIG1lcmdlIHVzZXIgb3B0aW9ucyBpbnRvIGRlZmF1bHQgb3B0aW9uc1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdE9wdGlvbnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0T3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuZGVmYXVsdE9wdGlvbnM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdwb3NpdGlvbjogcmVsYXRpdmU7ZGlzcGxheTogaW5saW5lLWJsb2NrO3RleHQtYWxpZ246IGNlbnRlcjsnKVxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLm9wdGlvbnMuc2l6ZSArICdweCc7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLm9wdGlvbnMuc2l6ZSArICdweCc7XG4gICAgICAgIHRoaXMucGVyY2VudCA9IChlbC5kYXRhc2V0LnBlcmNlbnQgIT09IHVuZGVmaW5lZCkgPyBlbC5kYXRhc2V0LnBlcmNlbnQgOiAnJztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICBjb250ZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnbGluZS1oZWlnaHQ6IDExMHB4OyB6LWluZGV4OiAyOycpO1xuICAgICAgICBjb250ZW50LnRleHRDb250ZW50ID0gdGhpcy5wZXJjZW50O1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZW5kZXJlciA9PT0gJ1NWRycpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgU1ZHUmVuZGVyZXIodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQ2FudmFzIGlzIGRlZmF1bHRcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgQ2FudmFzUmVuZGVyZXIodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJvY2VzcyBlYXJsaWVyIGFuaW1hdGUgb3B0aW9uIHRvIGF2b2lkIGJjIGJyZWFrc1xuXHRcdGlmICh0eXBlb2YodGhpcy5vcHRpb25zLmFuaW1hdGUpID09PSAnbnVtYmVyJykge1xuXHRcdFx0dGhpcy5vcHRpb25zLmFuaW1hdGUgPSB7XG5cdFx0XHRcdGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMuYW5pbWF0ZSxcblx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mKHRoaXMub3B0aW9ucy5hbmltYXRlKSA9PT0gJ2Jvb2xlYW4nICYmICF0aGlzLm9wdGlvbnMuYW5pbWF0ZSkge1xuXHRcdFx0dGhpcy5vcHRpb25zLmFuaW1hdGUgPSB7XG5cdFx0XHRcdGR1cmF0aW9uOiAxMDAwLFxuXHRcdFx0XHRlbmFibGVkOiB0aGlzLm9wdGlvbnMuYW5pbWF0ZVxuXHRcdFx0fTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbml0aWFsIGRyYXdcbiAgICAgICAgdGhpcy5yZW5kZXJlci5kcmF3KHRoaXMuY3VycmVudFZhbHVlKTtcbiAgICAgICAgLy8gaW5pdGlhbCB1cGRhdGVcblx0XHRpZiAoZWwuZGF0YXNldCAmJiB0aGlzLnBlcmNlbnQpIHtcblx0XHRcdHRoaXMudXBkYXRlKHBhcnNlRmxvYXQodGhpcy5wZXJjZW50KSk7XG5cdFx0fSBlbHNlIGlmIChlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmNlbnQnKSkge1xuXHRcdFx0dGhpcy51cGRhdGUocGFyc2VGbG9hdChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpISkpO1xuXHRcdH1cbiAgICB9IFxuICAgIFxuICAgIC8qKlxuXHQgKiBVcGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBjaGFydFxuXHQgKiBAcGFyYW0gIHtudW1iZXJ9IG5ld1ZhbHVlIE51bWJlciBiZXR3ZWVuIDAgYW5kIDEwMFxuXHQgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIEluc3RhbmNlIG9mIHRoZSBwbHVnaW4gZm9yIG1ldGhvZCBjaGFpbmluZ1xuXHQgKi9cbiAgICBwcml2YXRlIHVwZGF0ZShuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0ZS5lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFuaW1hdGUodGhpcy5jdXJyZW50VmFsdWUsIG5ld1ZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5kcmF3KG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IG5ld1ZhbHVlO1xuXHRcdHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICAvKipcblx0ICogRGlzYWJsZSBhbmltYXRpb25cblx0ICogQHJldHVybiB7b2JqZWN0fSBJbnN0YW5jZSBvZiB0aGUgcGx1Z2luIGZvciBtZXRob2QgY2hhaW5pbmdcblx0ICovXG4gICAgcHJpdmF0ZSBkaXNhYmxlQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW5pbWF0ZS5lbmFibGVkID0gZmFsc2U7XG5cdFx0cmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG5cdCAqIEVuYWJsZSBhbmltYXRpb25cblx0ICogQHJldHVybiB7b2JqZWN0fSBJbnN0YW5jZSBvZiB0aGUgcGx1Z2luIGZvciBtZXRob2QgY2hhaW5pbmdcblx0ICovXG4gICAgcHJpdmF0ZSBlbmFibGVBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbmltYXRlLmVuYWJsZWQgPSB0cnVlO1xuXHRcdHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlcmVyIHtcblxuICAgIHByaXZhdGUgX3NjYWxlQnkgPSAxO1xuICAgIHByaXZhdGUgX3JhZGl1czogbnVtYmVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBhbnkpe1xuICAgICAgICBpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2FsZUJ5ID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmFkaXVzID0gKHRoaXMub3B0aW9ucy5zaXplIC0gdGhpcy5vcHRpb25zLmxpbmVXaWR0aCkgLyAyO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNjYWxlQ29sb3IgJiYgdGhpcy5vcHRpb25zLnNjYWxlTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgLT0gdGhpcy5vcHRpb25zLnNjYWxlTGVuZ3RoICsgMjsgLy8gMiBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiBzY2FsZSBhbmQgYmFyXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJRSBwb2x5ZmlsbCBmb3IgRGF0ZVxuICAgICAgICBEYXRlLm5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICsobmV3IERhdGUoKSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG5cdCAqIENsZWFyIHRoZSBjb21wbGV0ZSBjYW52YXNcblx0ICovXG4gICAgYWJzdHJhY3QgY2xlYXIoKSA6IHZvaWQ7XG5cbiAgICAvKipcblx0ICogRHJhdyB0aGUgY29tcGxldGUgY2hhcnRcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnQgUGVyY2VudCBzaG93biBieSB0aGUgY2hhcnQgYmV0d2VlbiAtMTAwIGFuZCAxMDBcblx0ICovXG4gICAgYWJzdHJhY3QgZHJhdyhwZXJjZW50OiBudW1iZXIpIDogdm9pZDtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBkcmF3U2NhbGUoKSA6IHZvaWQ7XG5cbiAgICAvKipcblx0ICogQW5pbWF0ZSBmcm9tIHNvbWUgcGVyY2VudCB0byBzb21lIG90aGVyIHBlcmNlbnRhZ2Vcblx0ICogQHBhcmFtIHtudW1iZXJ9IGZyb20gU3RhcnRpbmcgcGVyY2VudGFnZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gdG8gICBGaW5hbCBwZXJjZW50YWdlXG5cdCAqL1xuICAgIHB1YmxpYyBhbmltYXRlKGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xuICAgICAgICAvKiBDYWxsYmFjayBSZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZSB3cmFwcGVyIHdpdGggcG9seWZpbGxcbiAgICAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gUmVxdWVzdCBhbmltYXRpb24gZnJhbWUgbWV0aG9kIG9yIHRpbWVvdXQgZmFsbGJhY2tcbiAgICAgICAgKi9cbiAgICAgICAgdmFyIHJlcUFuaW1hdGlvbkZyYW1lID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9KCkpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5vblN0YXJ0KGZyb20sIHRvKTtcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgcHJvY2VzcyA9IE1hdGgubWluKERhdGUubm93KCkgLSBzdGFydFRpbWUsIHRoaXMub3B0aW9ucy5hbmltYXRlLmR1cmF0aW9uKTtcblx0XHRcdGxldCBjdXJyZW50VmFsdWUgPSB0aGlzLm9wdGlvbnMuZWFzaW5nKHRoaXMsIHByb2Nlc3MsIGZyb20sIHRvIC0gZnJvbSwgdGhpcy5vcHRpb25zLmFuaW1hdGUuZHVyYXRpb24pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmRyYXcoY3VycmVudFZhbHVlKTtcblx0XHRcdHRoaXMub3B0aW9ucy5vblN0ZXAoZnJvbSwgdG8sIGN1cnJlbnRWYWx1ZSk7XG5cdFx0XHRpZiAocHJvY2VzcyA+PSB0aGlzLm9wdGlvbnMuYW5pbWF0ZS5kdXJhdGlvbikge1xuXHRcdFx0XHR0aGlzLm9wdGlvbnMub25TdG9wKGZyb20sIHRvKTtcblx0XHRcdH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVxQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdHJlcUFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG4gICAgfVxuXG4gICAgLyoqIENhbnZhcyBBY2Nlc3NvciBHZXR0ZXIgYW5kIFNldHRlciAqL1xuICAgIHB1YmxpYyBnZXQgcmFkaXVzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgcmFkaXVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWU7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBnZXQgc2NhbGVCeSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVCeTtcbiAgICB9XG4gICAgcHVibGljIHNldCBzY2FsZUJ5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVCeSA9IHZhbHVlO1xuICAgIH1cblxufSIsImltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vcmVuZGVyZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNWR1JlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuXG4gICAgcHJpdmF0ZSBfc3ZnTlM6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgcHJpdmF0ZSBfaGFzU2NhbGU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBhcmM6IGFueTtcbiAgICBwcml2YXRlIHN2ZzogYW55O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGVsOiBIVE1MRWxlbWVudCwgb3B0aW9uczogYW55KXtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2hhc1NjYWxlID0gKHRoaXMub3B0aW9ucy5zY2FsZUNvbG9yICYmIHRoaXMub3B0aW9ucy5zY2FsZUxlbmd0aCk7IFxuICAgICAgICBpZih0aGlzLl9oYXNTY2FsZSl7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyAtPSB0aGlzLm9wdGlvbnMuc2NhbGVMZW5ndGggKyAyOyAvLyAyIGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHNjYWxlIGFuZCBiYXJcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9ICh0aGlzLm9wdGlvbnMuc2l6ZSAtIHRoaXMub3B0aW9ucy5saW5lV2lkdGgpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN2ZyA9IHRoaXMuY3JlYXRlRWxlbWVudCgnc3ZnJywge1xuICAgICAgICAgICAgdmVyc2lvbjogMS4xLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMub3B0aW9ucy5zaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnMuc2l6ZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjcmVhdGUgdHJhY2sgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudHJhY2tDb2xvcikge1xuICAgICAgICAgICAgdGhpcy5zdmcuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVFbGVtZW50KCdjaXJjbGUnLCB7XG4gICAgICAgICAgICAgICAgY3g6IHRoaXMub3B0aW9ucy5zaXplIC8gMixcbiAgICAgICAgICAgICAgICBjeTogdGhpcy5vcHRpb25zLnNpemUgLyAyLFxuICAgICAgICAgICAgICAgIHI6IHRoaXMucmFkaXVzLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogdGhpcy5vcHRpb25zLnRyYWNrQ29sb3IsXG4gICAgICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IHRoaXMub3B0aW9ucy5saW5lV2lkdGgsXG4gICAgICAgICAgICAgICAgZmlsbDogJ25vbmUnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgc2NhbGUgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGlmICh0aGlzLl9oYXNTY2FsZSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3U2NhbGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSBhcmMgKGFjdHVhbCBjaGFydClcbiAgICAgICAgdGhpcy5hcmMgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7XG4gICAgICAgICAgICBzdHJva2U6IHR5cGVvZih0aGlzLm9wdGlvbnMuYmFyQ29sb3IpID09PSAnZnVuY3Rpb24nID8gdGhpcy5vcHRpb25zLmJhckNvbG9yKDApIDogdGhpcy5vcHRpb25zLmJhckNvbG9yLFxuICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IHRoaXMub3B0aW9ucy5saW5lV2lkdGgsXG4gICAgICAgICAgICAnc3Ryb2tlLWxpbmVjYXAnOiB0aGlzLm9wdGlvbnMubGluZUNhcCxcbiAgICAgICAgICAgIGZpbGw6ICdub25lJ1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yb3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuYXJjLnNldEF0dHJpYnV0ZSgndHJhbnNmb3JtJywgWydyb3RhdGUoJywgdGhpcy5vcHRpb25zLnJvdGF0ZSwgJywnLCB0aGlzLm9wdGlvbnMuc2l6ZS8yLCAnLCcsIHRoaXMub3B0aW9ucy5zaXplLzIsICcpJ10uam9pbignJykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ZnLmFwcGVuZENoaWxkKHRoaXMuYXJjKTtcblxuICAgICAgICAvLyBhZGQgc3ZnIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuc3ZnKTtcbiAgICB9XG5cbiAgICAvKipcblx0ICogQ3JlYXRlIGFuIGVsZW1lbnQgb2YgdGhlIFNWRyBuYW1lc3BhY2Vcblx0ICogQHBhcmFtICB7c3RyaW5nfSB0eXBlICAgICAgIFR5cGUgb2YgdGhlIGVsZW1lbnQgKHRhZyBuYW1lKVxuXHQgKiBAcGFyYW0gIHtvYmplY3R9IGF0dHJpYnV0ZXMgQXR0cmlidXRlIGxpc3Qgb2YgdGhlIGVsZW1lbnRcblx0ICogQHJldHVybiB7ZWxlbWVudH0gICAgICAgICAgIENyZWF0ZWQgZWxlbWVudFxuXHQgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUVsZW1lbnQodHlwZTogc3RyaW5nLCBhdHRyaWJ1dGVzOiB7W2luZGV4OiBzdHJpbmddOiBhbnl9KXtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHRoaXMuX3N2Z05TLCB0eXBlKTtcblxuXHRcdGlmIChhdHRyaWJ1dGVzKSB7XG5cdFx0XHRmb3IgKHZhciBpIGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0aWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoaSwgYXR0cmlidXRlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGVsO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc3ZnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZHJhd1NjYWxlKCkge1xuICAgICAgICBjb25zdCBnID0gdGhpcy5jcmVhdGVFbGVtZW50KCdnJywge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDU1LCA1NSknXG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTwyNDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5vcHRpb25zLnNjYWxlTGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gMTtcbiAgICAgICAgICAgIC8vIEVhY2ggcXVhcnRlciBzaG91bGQgYmUgYmlnZ2VyXG4gICAgICAgICAgICBpZiAoaSU2ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoICo9IC42O1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGxlbmd0aCAqPSAxLjI7XG4gICAgICAgICAgICAgICAgd2lkdGggPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGVnID0gMzYwICogaSAvIDI0ICsgdGhpcy5vcHRpb25zLnJvdGF0ZTtcblxuICAgICAgICAgICAgZy5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7XG4gICAgICAgICAgICAgICAgZDogWydNJywgMCwgMCwgJ2wnLCAwLCBsZW5ndGhdLmpvaW4oJyAnKSxcbiAgICAgICAgICAgICAgICBzdHJva2U6IHRoaXMub3B0aW9ucy5zY2FsZUNvbG9yLFxuICAgICAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgICAgICAgICBmaWxsOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBbJ3JvdGF0ZSgnICsgZGVnICsgJykgdHJhbnNsYXRlKDAsJywgdGhpcy5vcHRpb25zLnNpemUvMiAtIHRoaXMub3B0aW9ucy5zY2FsZUxlbmd0aCwgJyknXS5qb2luKCcnKVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ZnLmFwcGVuZENoaWxkKGcpO1xuICAgIH1cblxuICAgIGRyYXcocGVyY2VudDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRlZyA9IDMuNiAqIHBlcmNlbnQ7XG5cdFx0Y29uc3QgcmFkID0gZGVnICogTWF0aC5QSSAvIDE4MDtcblx0XHRjb25zdCB4ID0gdGhpcy5vcHRpb25zLnNpemUgLyAyICsgdGhpcy5yYWRpdXMgKiBNYXRoLnNpbihyYWQpO1xuXHRcdGNvbnN0IHkgPSB0aGlzLm9wdGlvbnMuc2l6ZSAvIDIgLSB0aGlzLnJhZGl1cyAqIE1hdGguY29zKHJhZCk7XG5cdFx0bGV0IG9mZnNldFRvcCA9IHRoaXMub3B0aW9ucy5saW5lV2lkdGggLyAzO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuX2hhc1NjYWxlKSB7XG5cdFx0XHRvZmZzZXRUb3AgKz0gdGhpcy5vcHRpb25zLnNjYWxlTGVuZ3RoICsgMTA7XG4gICAgICAgIH1cbiAgICAgICAgXG5cdFx0Y29uc3QgcGF0aCA9IFtcblx0XHRcdCdNJyxcblx0XHRcdHRoaXMub3B0aW9ucy5zaXplIC8gMixcblx0XHRcdG9mZnNldFRvcCxcblx0XHRcdCdBJyxcblx0XHRcdHRoaXMucmFkaXVzLFxuXHRcdFx0dGhpcy5yYWRpdXMsXG5cdFx0XHQwLFxuXHRcdFx0KyhkZWcgPiAxODApLFxuXHRcdFx0MSxcblx0XHRcdHgsXG5cdFx0XHR5XG5cdFx0XTtcblx0XHR0aGlzLmFyYy5zZXRBdHRyaWJ1dGUoJ2QnLCBwYXRoLmpvaW4oJyAnKSk7XG5cblx0XHRpZiAodHlwZW9mKHRoaXMub3B0aW9ucy5iYXJDb2xvcikgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRoaXMuYXJjLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5vcHRpb25zLmJhckNvbG9yKHBlcmNlbnQpKTtcblx0XHR9XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=