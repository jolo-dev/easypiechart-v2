parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pBGv":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"rvka":[function(require,module,exports) {
var process = require("process");
var t=require("process");Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function t(t){this.options=t,this._scaleBy=1,window.devicePixelRatio>1&&(this._scaleBy=window.devicePixelRatio),this._radius=(this.options.size-this.options.lineWidth)/2,this.options.scaleColor&&this.options.scaleLength&&(this._radius-=this.options.scaleLength+2),Date.now=Date.now||function(){return+new Date}}return t.prototype.animate=function(t,e){var i=this,n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},o=Date.now();this.options.onStart(t,e);n(function s(){var a=Math.min(Date.now()-o,i.options.animate.duration),r=i.options.easing(i,a,t,e-t,i.options.animate.duration);i.draw(r),i.options.onStep(t,e,r),a>=i.options.animate.duration?i.options.onStop(t,e):n(s)})},Object.defineProperty(t.prototype,"radius",{get:function(){return this._radius},set:function(t){this._radius=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"scaleBy",{get:function(){return this._scaleBy},set:function(t){this._scaleBy=t},enumerable:!0,configurable:!0}),t}();exports.Renderer=e;
},{"process":"pBGv"}],"RoMJ":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./renderer"),i=function(e){function i(t,i){var o=e.call(this,i)||this;return o._canvas=document.createElement("canvas"),o._ctx=o._canvas.getContext("2d"),t.appendChild(o._canvas),o._canvas.setAttribute("style","position: absolute;top: 0;left: 0;"),window.devicePixelRatio>1&&(o._canvas.style.width=o._canvas.style.height=[o.options.size,"px"].join(""),o._canvas.width=o._canvas.height=o.options.size*o.scaleBy,o._ctx.scale(o.scaleBy,o.scaleBy)),o._ctx.translate(o.options.size/2,o.options.size/2),o._ctx.rotate((o.options.rotate/180-.5)*Math.PI),o._cachedBackground=o._ctx.getImageData(0,0,o.options.size*o.scaleBy,o.options.size*o.scaleBy),o}return t(i,e),i.prototype.drawCircle=function(t,e,i){var o=(i=Math.min(Math.max(-1,i||0),1))<=0;this._ctx.beginPath(),this._ctx.arc(0,0,this.radius,0,2*Math.PI*i,o),this._ctx.strokeStyle=t,this._ctx.lineWidth=e,this._ctx.stroke()},i.prototype.drawScale=function(){var t,e,i=1;this._ctx.lineWidth=1,this._ctx.fillStyle=this.options.scaleColor,this._ctx.save();for(var o=24;o>0;--o)o%6==0?(e=1.2*this.options.scaleLength,t=0,i=3):(e=.6*this.options.scaleLength,t=this.options.scaleLength-e,i=1),this._ctx.fillRect(-this.options.size/2+t,0,e,i),this._ctx.rotate(Math.PI/12);this._ctx.restore()},i.prototype.clear=function(){this._ctx.clearRect(this.options.size/-2,this.options.size/-2,this.options.size,this.options.size)},i.prototype.draw=function(t){var e;this._ctx.lineCap=this.options.lineCap,e="function"==typeof this.options.barColor?this.options.barColor(t):this.options.barColor,this.drawScale(),this.drawCircle(e,this.options.lineWidth,t/100)},Object.defineProperty(i.prototype,"canvas",{get:function(){return this._canvas},set:function(t){this._canvas=t},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"ctx",{get:function(){return this._ctx},set:function(t){this._ctx=t},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"cachedBackground",{get:function(){return this._cachedBackground},set:function(t){this._cachedBackground=t},enumerable:!0,configurable:!0}),i}(e.Renderer);exports.CanvasRenderer=i;
},{"./renderer":"rvka"}],"DZBp":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e])})(o,e)};return function(o,e){function i(){this.constructor=o}t(o,e),o.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}}();Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./renderer"),e=function(o){function e(t,e){var i=o.call(this,e)||this;return i._svgNS="http://www.w3.org/2000/svg",i._hasScale=i.options.scaleColor&&i.options.scaleLength,i._hasScale?i.radius-=i.options.scaleLength+2:i.radius=(i.options.size-i.options.lineWidth)/2,i.svg=i.createElement("svg",{version:1.1,width:i.options.size,height:i.options.size}),i.svg.setAttribute("style","position: absolute;top: 0;left: 0;"),i.options.trackColor&&i.svg.appendChild(i.createElement("circle",{cx:i.options.size/2,cy:i.options.size/2,r:i.radius,stroke:i.options.trackColor,"stroke-width":i.options.lineWidth,fill:"none"})),i._hasScale&&i.drawScale(),i.arc=i.createElement("path",{stroke:"function"==typeof i.options.barColor?i.options.barColor(0):i.options.barColor,"stroke-width":i.options.lineWidth,"stroke-linecap":i.options.lineCap,fill:"none"}),i.options.rotate&&i.arc.setAttribute("transform",["rotate(",i.options.rotate,",",i.options.size/2,",",i.options.size/2,")"].join("")),i.svg.appendChild(i.arc),t.appendChild(i.svg),i}return t(e,o),e.prototype.createElement=function(t,o){var e=document.createElementNS(this._svgNS,t);if(o)for(var i in o)o.hasOwnProperty(i)&&e.setAttribute(i,o[i]);return e},e.prototype.clear=function(){this.svg.parentNode.removeChild(this.svg)},e.prototype.drawScale=function(){for(var t=this.createElement("g",{transform:"translate(55, 55)"}),o=0;o<24;++o){var e=this.options.scaleLength,i=1;o%6!=0?e*=.6:(e*=1.2,i=3);var s=360*o/24+this.options.rotate;t.appendChild(this.createElement("path",{d:["M",0,0,"l",0,e].join(" "),stroke:this.options.scaleColor,"stroke-width":i,fill:"none",transform:["rotate("+s+") translate(0,",this.options.size/2-this.options.scaleLength,")"].join("")}))}this.svg.appendChild(t)},e.prototype.draw=function(t){var o=3.6*t,e=o*Math.PI/180,i=this.options.size/2+this.radius*Math.sin(e)-5,s=this.options.size/2-this.radius*Math.cos(e),r=this.options.lineWidth/3;this._hasScale&&(r+=this.options.scaleLength+10);var n=["M",this.options.size/2,r,"A",this.radius,this.radius,0,+(o>180),1,i,s];this.arc.setAttribute("d",n.join(" ")),"function"==typeof this.options.barColor&&this.arc.setAttribute("stroke",this.options.barColor(t))},e}(o.Renderer);exports.SVGRenderer=e;
},{"./renderer":"rvka"}],"jRVg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.defaultOptions={barColor:"#ef1e25",trackColor:"#f9f9f9",scaleColor:"#dfe0e0",scaleLength:5,lineCap:"round",lineWidth:3,size:110,rotate:0,animate:{duration:1e3,enabled:!0},renderer:null,easing:function(e,n,t,o,r){return(n/=r/2)<1?o/2*n*n+t:-o/2*(--n*(n-2)-1)+t},onStart:function(e,n){},onStep:function(e,n,t){},onStop:function(e,n){}};
},{}],"DD99":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./canvasRenderer"),r=require("./svgRenderer"),i=require("./options"),n=function(){function n(n,s){this.currentValue=0,this.element=n,this.options=e(e({},i.defaultOptions),s),this.element.setAttribute("style","position: relative;display: inline-block;text-align: center;"),this.element.style.width=this.options.size+"px",this.element.style.height=this.options.size+"px",this.percent=void 0!==n.dataset.percent?n.dataset.percent:"";var a=document.createElement("span"),h=this.element.appendChild(a);h.setAttribute("style","line-height: 110px; z-index: 2;"),h.textContent=this.percent,"SVG"===this.options.renderer?this.renderer=new r.SVGRenderer(this.element,this.options):this.renderer=new t.CanvasRenderer(this.element,this.options),this.renderer.draw(this.currentValue),n.dataset&&this.percent?this.update(parseFloat(this.percent)):n.getAttribute&&n.getAttribute("data-percent")&&this.update(parseFloat(n.getAttribute("data-percent")))}return n.prototype.update=function(e){return this.options.animate?this.renderer.animate(this.currentValue,e):this.renderer.draw(e),this.currentValue=e,this},n}();exports.EasyPieChart=n;
},{"./canvasRenderer":"RoMJ","./svgRenderer":"DZBp","./options":"jRVg"}]},{},["DD99"], null)
//# sourceMappingURL=/easyPieChart.js.map