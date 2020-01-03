export declare abstract class Renderer {
    protected options: any;
    private _scaleBy;
    private _radius;
    constructor(options: any);
    abstract clear(): void;
    abstract draw(percent: number): void;
    protected abstract drawScale(): void;
    animate(from: number, to: number): void;
    get radius(): number;
    set radius(value: number);
    get scaleBy(): number;
    set scaleBy(value: number);
}
