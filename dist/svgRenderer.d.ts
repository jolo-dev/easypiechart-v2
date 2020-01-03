import { Renderer } from "./renderer";
export declare class SVGRenderer extends Renderer {
    private _svgNS;
    private _hasScale;
    private arc;
    private svg;
    constructor(el: HTMLElement, options: any);
    private createElement;
    clear(): void;
    protected drawScale(): void;
    draw(percent: number): void;
}
