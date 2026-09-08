import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,

    plugins: {
      legend: {
        position: "bottom",
      },

      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Doughnut data={data} options={options} />
    </div>
  );
}