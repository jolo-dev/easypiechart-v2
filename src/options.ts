export interface EasyPieOptions {
    barColor?: string;
    trackColor?: string;
    scaleColor?: string;
    scaleLength?: number;
    lineCap?: string;
    lineWidth?: number;
    size?: number;
    rotate?: number;
    animate?: { duration: number, enabled: boolean };
    renderer?: string | null;
    easing?: CallableFunction;
    onStart?: CallableFunction;
    onStep?: CallableFunction;
    onStop?: CallableFunction;
}

export const defaultOptions: Required<EasyPieOptions> = {
    barColor: '#ef1e25',
    trackColor: '#f9f9f9',
    scaleColor: '#dfe0e0',
    scaleLength: 5,
    lineCap: 'round',
    lineWidth: 3,
    size: 110,
    rotate: 0,
    animate: { duration: 1000, enabled: true },
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