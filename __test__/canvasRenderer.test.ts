import { EasyPieChart } from "../src/easyPieChart";

describe('Easy-Pie-Chart', () => {
  let instance: EasyPieChart;
  document.body.innerHTML = '<div class="chart" id="canvas-chart" data-percent="100"></div>';
  const element = document.getElementById('canvas-chart');

  test("Create an EasyPieChart", () => {
    setTimeout(() => {
      instance = new EasyPieChart(element, {
        barColor: "#69c",
        scaleColor: "#00378b",
        lineWidth: 10
      });
      expect(instance).toBeInstanceOf(EasyPieChart);
    }, 1000);
  });
});

