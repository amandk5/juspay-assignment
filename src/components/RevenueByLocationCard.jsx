import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

// Mock revenue data
const locations = [
  { name: "New York", value: 72 },
  { name: "San Francisco", value: 39 },
  { name: "Sydney", value: 25 },
  { name: "Singapore", value: 61 },
];

const maxValue = Math.max(...locations.map((loc) => loc.value));

function RevenueByLocationCard() {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 0 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700} mb={2}>
          Revenue by Location
        </Typography>
        <Box
          sx={{
            width: "100%",
            // border: "2px solid #fde047",
            borderRadius: 2,
            overflow: "hidden",
            mb: 2,
          }}
        >
          <img
            src="https://raw.githubusercontent.com/Warengonzaga/world-map-svg/main/map.svg" // A simple world map SVG placeholder
            alt="World Map"
            style={{
              width: "100%",
              height: "100px",
              objectFit: "cover",
              background: "#f8fafb",
            }}
          />
          {/* For real data points, overlay with absolute divs here */}
        </Box>
        {locations.map((loc) => (
          <Box key={loc.name} sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                {loc.name}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {loc.value}K
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(loc.value / maxValue) * 100}
              sx={{
                height: 5,
                borderRadius: 5,
                backgroundColor: "#f3f7fa",
                "& .MuiLinearProgress-bar": { backgroundColor: "#cde0fc" },
              }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default RevenueByLocationCard;
