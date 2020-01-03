export declare class EasyPieChart {
    private defaultOptions;
    private options;
    private renderer;
    private currentValue;
    private element;
    private percent;
    constructor(el: HTMLElement, options: {
        [index: string]: any;
    } | null);
    private update;
    private disableAnimation;
    private enableAnimation;
}
