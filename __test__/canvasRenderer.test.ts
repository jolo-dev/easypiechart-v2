import { EasyPieChart } from "../src/easyPieChart";

describe('Easy-Pie-Chart', () => {
  let instance: EasyPieChart;

  test("Create a default EasyPieChart", () => {
    document.body.innerHTML = '<div class="chart" id="canvas-chart" data-percent="100"></div>';
    const element = document.getElementById('canvas-chart');
    setTimeout(() => {
      instance = new EasyPieChart(element, null);
      expect(instance).toBeInstanceOf(EasyPieChart);
    }, 1000);
  });

  test("Create an SVG EasyPieChart", () => {
    document.body.innerHTML = '<div class="chart" id="svg-chart" data-percent="100"></div>';
    const element = document.getElementById('svg-chart');
    setTimeout(() => {
      instance = new EasyPieChart(element, {
        barColor: "#69c",
        scaleColor: "#00378b",
        lineWidth: 10,
        renderer: 'SVG'
      });
      expect(instance.renderer).toMatch('SVG');
    }, 1000);
  });
});

