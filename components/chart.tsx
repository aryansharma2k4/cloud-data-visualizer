import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = ({
  data,
  chartType = "bar",
  options = {},
}: {
  data: any;
  chartType?: "bar" | "line" | "pie";
  options?: any;
}) => {
  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <Line data={data} options={options} />;
      case "pie":
        return <Pie data={data} options={options} />;
      case "bar":
      default:
        return <Bar data={data} options={options} />;
    }
  };

  return <div style={{ width: "100%", height: "300px" }}>{renderChart()}</div>;
};