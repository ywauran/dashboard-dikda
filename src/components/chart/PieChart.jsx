import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { data } from "../../utils/data";
import { sumActivatedNotActivated } from "../../utils/count";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [totalActivated, totalNotActivated] = sumActivatedNotActivated(data);

  const chartData = {
    labels: ["Sudah Aktivasi", "Belum Aktivasi"],
    datasets: [
      {
        data: [totalActivated, totalNotActivated],
        backgroundColor: ["#C81E1E", "#1A56DB"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom", // You can change the position to "top", "left", "right", etc.
        labels: {
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map(function (label, i) {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                const total = dataset.data.reduce(
                  (acc, current) => acc + current
                );
                const percentage = ((value / total) * 100).toFixed(2) + "%";
                return {
                  text: `${label}: ${percentage}`,
                  fillStyle: dataset.backgroundColor[i],
                  hidden: isNaN(dataset.data[i]) || dataset.data[i] === 0,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
