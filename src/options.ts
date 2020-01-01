interface Options {
    barColor: string,
    trackColor: string,
    scaleColor: string,
    scaleLength: number,
    lineCap: string,
    lineWidth: number,
    size: number,
    rotate: number,
    animate: number,
    renderer: string | null,
    easing(_x:number, t:number, b:number, c:number, d:number) : number,
    onStart(_from:number, _to:number) : void,
    onStep(_from:number, _to:number, _currentValue:number) : void,
    onStop(_from:number, _to:number) : void
}