test('Create a canvas', () => {
    const EasyPieChart = require("../src/easyPieChart");
    // Set up our document body
    document.body.innerHTML =
    '<div class="chart" id="canvas-chart" data-percent="80"></div>';
    
    const canvas = new EasyPieChart(document.getElementById("canvas-chart"), {
        barColor: '#69c',
        scaleColor: '#00378b',
        lineWidth: 10
    });
    expect(canvas).not.toBeNull();
});