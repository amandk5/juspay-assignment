import { Card, CardContent, Typography, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Previous Week",
      data: [12, 22, 15, 18, 25], // sample values
      borderColor: "rgba(73,155,234,0.8)",
      backgroundColor: "rgba(73,155,234,0.15)",
      pointBackgroundColor: "rgba(73,155,234,1)",
      tension: 0.6,
      fill: true,
    },
    {
      label: "Current Week",
      data: [15, 10, 14, 17, 18], // sample values
      borderColor: "#000",
      backgroundColor: "rgba(0,0,0,0.08)",
      borderDash: [0, 0, 0, 5, 5], // dashed after April
      pointBackgroundColor: "#000",
      tension: 0.6,
      fill: false,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (ctx) {
          return `${ctx.dataset.label}: ${ctx.formattedValue}M`;
        },
      },
    },
  },
  elements: {
    line: {
      borderWidth: 3,
      borderDashOffset: 8,
      capBezierPoints: true,
    },
    point: { radius: 0 },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 30,
      ticks: { callback: (value) => value + "M" },
      grid: { color: "#e1e7ed" },
    },
    x: {
      grid: { display: false },
    },
  },
};

function RevenueLineChart() {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 0 }}>
      <CardContent>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          style={{ marginBottom: 4 }}
        >
          Revenue
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 1 }}>
          <span style={{ color: "#000", fontWeight: 600 }}>
            ● Current Week <span style={{ fontWeight: 700 }}>$58,211</span>
          </span>
          <span style={{ color: "rgba(73,155,234,1)", fontWeight: 600 }}>
            ● Previous Week <span style={{ fontWeight: 700 }}>$68,768</span>
          </span>
        </Box>
        <Box
        // height={'auto'}
        >
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default RevenueLineChart;
