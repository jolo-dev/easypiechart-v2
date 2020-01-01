import { EasyPieChart } from './easyPieChart'

const easy = new EasyPieChart(document.getElementById("canvas-chart")!, {
    barColor: '#69c',
    scaleColor: '#00378b',
    lineWidth: 10
});

const svg = new EasyPieChart(document.getElementById("svg-chart")!, {
    renderer: "SVG",
    lineWidth: 10,
    onStep: (from: number, to: number, percent: number) => {
        document.querySelector('#svg-chart span')!.innerHTML = Math.round(percent).toString();
    }
});

