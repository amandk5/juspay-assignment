import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

// Example data
const dashboardData = [
  {
    title: "Customers",
    value: "3,781",
    change: "+11.01%",
    bgColor: "#e3f2fd", // Light blue background
  },
  {
    title: "Orders",
    value: "1,219",
    change: "-0.03%",
    bgColor: "#fff9c4", // Light yellow background
  },
  {
    title: "Revenue",
    value: "$695",
    change: "+15.03%",
    bgColor: "#ffffff", // White background
  },
  {
    title: "Growth",
    value: "30.1%",
    change: "+6.08%",
    bgColor: "#fff3e0", // Light orange background
  },
];

function DashboardCards({ title, value, change, bgColor, index }) {
  return (
    <Box sx={{ padding: 1 }}>
      {/* <Grid container spacing={3}>
        {dashboardData.map((item, index) => (
          <Grid key={title} item xs={12} sm={6} md={3}> */}
      <Card
        elevation={2}
        // sx={{
        //   borderRadius: 3,
        //   background: bgColor,
        //   border: index === 0 ? "2px solid #2196f3" : "1px solid #e0e0e0",
        //   minHeight: 140,
        //   minWidth: "202px",
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "space-between",
        // }}
        sx={{
          width: "202px",
          height: "112px",
          minWidth: "200px",
          borderRadius: "16px",
          angle: "0deg",
          opacity: 1,
          gap: 8,
          padding: 24,
        }}
      >
        <CardContent sx={{ padding: 0 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              marginBottom: 1,
              color: "#333333",
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            color={change.startsWith("+") ? "#4caf50" : "#f44336"}
            sx={{
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {change}
          </Typography>
        </CardContent>
      </Card>
      {/* </Grid>
        ))}
      </Grid> */}
    </Box>
  );
}

export default DashboardCards;
