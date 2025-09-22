import { Card, CardContent, Typography, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Actuals",
      data: [18, 24, 20, 28, 15, 22],
      backgroundColor: "rgba(73, 155, 234, 0.4)",
      borderRadius: 8,
    },
    {
      label: "Projections",
      data: [22, 27, 23, 30, 19, 25],
      backgroundColor: "rgba(73, 155, 234, 0.7)",
      borderRadius: 8,
    }
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 30,
      ticks: {
        callback: function (value) {
          return value + "M";
        }
      },
      grid: {
        color: '#e1e7ed',
      }
    },
    x: {
      grid: { display: false }
    }
  },
  barPercentage: 0.6,
  categoryPercentage: 0.7,
};

function ProjectionsVsActualsChart() {
  return (
    <Card sx={{
    //   border: "2px solid #fde047", // yellow border
      borderRadius: 2,
      boxShadow: 0,
    }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Projections vs Actuals
        </Typography>
        <Box height={220}>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProjectionsVsActualsChart;
