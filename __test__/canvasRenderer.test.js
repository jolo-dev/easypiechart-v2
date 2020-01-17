import { EasyPieChart } from "./src/easyPieChart";

test("Create an EasyPieChart", () => {
  const easyPieChart = new EasyPieChart();
  expect(easyPieChart).toHaveBeenCalledTimes(1);
});
