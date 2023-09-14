import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ trueLogin, falseLogin, title }) => {
  const chartData = {
    labels: ["Sudah Aktivasi", "Belum Aktivasi"],
    datasets: [
      {
        data: [trueLogin, falseLogin],
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
      title: {
        display: true,
        text: title, // Set your desired title here
        fontSize: 16, // Adjust the font size as needed
        padding: 20, // Adjust the padding as needed
      },
    },
  };

  return (
    <div>
      <h3 className="mb-6 text-lg font-semibold text-center">{title}</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
