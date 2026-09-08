import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  maintainAspectRatio: true,

  plugins: {
    legend: {
      position: "top",
    },

    title: {
      display: true,
      text: "Holdings",
    },
  },

  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export function VerticalGraph({ data }) {
  return (
    <div className="chart-container">
      <Bar options={options} data={data} />
    </div>
  );
}