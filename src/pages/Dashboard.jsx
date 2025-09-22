import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  LinearProgress,
  IconButton,
} from "@mui/material";
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
  Pending,
  CheckCircle,
  LocalShipping,
  Refresh,
} from "@mui/icons-material";
import DashboardCards from "../components/Cards";
import DashboardCard from "../components/Card";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ProjectionsVsActualsChart from "../components/ProjectionVsActualCharts";
import RevenueLineChart from "../components/RevenueLineChart";
import RevenueByLocationCard from "../components/RevenueByLocationCard";
import { DataGrid } from "@mui/x-data-grid";
import TopSellingProducts from "../components/TopSellingProducts";

const Dashboard = () => {
  const { orders } = useSelector((state) => state.orders);

  // Calculate dashboard stats
  const totalOrders = orders.length;
  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;
  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Recent orders for the activity feed
  const recentOrders = orders.slice(-5).reverse();

  const dispatch = useDispatch();
  const { filteredOrders, statusFilter, searchTerm } = useSelector(
    (state) => state.orders
  );

  const StatCard = ({ title, value, icon, color = "primary", subtitle }) => (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 2,
              bgcolor: `${color}.main`,
              color: "white",
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Processing":
        return "info";
      case "Shipped":
        return "primary";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle fontSize="small" />;
      case "Pending":
        return <Pending fontSize="small" />;
      case "Processing":
        return <Refresh fontSize="small" />;
      case "Shipped":
        return <LocalShipping fontSize="small" />;
      default:
        return null;
    }
  };

  const dashboardData = [
    {
      title: "Customers",
      value: "3,781",
      change: "+11.01%",
      icon: <TrendingUpIcon />,
      bgColor: "#E3F5FF", // Light blue background
    },
    {
      title: "Orders",
      value: "1,219",
      change: "-0.03%",
      icon: <TrendingDownIcon />,
      bgColor: "#fff9c4", // Light yellow background
    },
    {
      title: "Revenue",
      value: "$695",
      change: "+15.03%",
      icon: <TrendingUpIcon />,
      bgColor: "#ffffff", // White background
    },
    {
      title: "Growth",
      value: "30.1%",
      change: "+6.08%",
      icon: <TrendingUpIcon />,
      bgColor: "#fff3e0", // Light orange background
    },
  ];

  // Define DataGrid columns

  // name price, quantity, amount
  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        width: 130,
      },
      {
        field: "price",
        headerName: "Price",
        width: 150,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 120,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 120,
        renderCell: (params) => (
          <Chip
            label={params.value}
            color={getStatusColor(params.value)}
            size="small"
          />
        ),
      },
    ],
    [
      // handleMenuClick
    ]
  );

  // Transform orders data for DataGrid
  const rows = useMemo(
    () =>
      filteredOrders.map((order) => ({
        ...order,
        id: order.id, // DataGrid requires an 'id' field
      })),
    [filteredOrders]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          width: "100%",
        }}
      >
        <Box>
          <Box
            flex={1}
            sx={{
              display: "flex",
              width: "432px",
              gap: "28px",
              mb: 4,
            }}
          >
            <DashboardCard
              title={dashboardData[0].title}
              value={dashboardData[0].value}
              change={dashboardData[0].change}
              icon={dashboardData[0].icon}
              bgColor={dashboardData[0].bgColor}
            />
            <DashboardCard
              title={dashboardData[1].title}
              value={dashboardData[1].value}
              change={dashboardData[1].change}
              icon={dashboardData[1].icon}
              bgColor={dashboardData[1].bgColor}
            />
          </Box>
          <Box
            flex={1}
            sx={{
              display: "flex",
              width: "432px",
              gap: "28px",
            }}
          >
            <DashboardCard
              title={dashboardData[2].title}
              value={dashboardData[2].value}
              change={dashboardData[2].change}
              icon={dashboardData[2].icon}
              bgColor={dashboardData[2].bgColor}
            />
            <DashboardCard
              title={dashboardData[3].title}
              value={dashboardData[3].value}
              change={dashboardData[3].change}
              icon={dashboardData[3].icon}
              bgColor={dashboardData[3].bgColor}
            />
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <ProjectionsVsActualsChart />
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
        <Box sx={{ width: "70%" }}>
          <RevenueLineChart />
        </Box>
        <Box sx={{ width: "30%" }}>
          <RevenueByLocationCard />
        </Box>
      </Box>

      {/* Stats Cards */}
      {/* <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={<ShoppingCart />}
            color="primary"
            subtitle="All time"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            icon={<AttachMoney />}
            color="success"
            subtitle="All time"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Order Value"
            value={`$${avgOrderValue.toFixed(2)}`}
            icon={<TrendingUp />}
            color="info"
            subtitle="Per order"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Orders"
            value={completedOrders}
            icon={<CheckCircle />}
            color="success"
            subtitle={`${((completedOrders / totalOrders) * 100).toFixed(
              1
            )}% completion rate`}
          />
        </Grid>
      </Grid> */}

      {/* <Grid container spacing={3}> */}
      {/* <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Order Status Overview" />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Pending Orders</Typography>
                  <Typography variant="body2">{pendingOrders}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(pendingOrders / totalOrders) * 100}
                  color="warning"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Processing Orders</Typography>
                  <Typography variant="body2">{processingOrders}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(processingOrders / totalOrders) * 100}
                  color="info"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Shipped Orders</Typography>
                  <Typography variant="body2">{shippedOrders}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(shippedOrders / totalOrders) * 100}
                  color="primary"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Completed Orders</Typography>
                  <Typography variant="body2">{completedOrders}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(completedOrders / totalOrders) * 100}
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid> */}

      {/* Recent Activity */}
      {/* <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Recent Orders" />
            <CardContent sx={{ p: 0 }}>
              <List>
                {recentOrders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography variant="subtitle2">
                              {order.orderNumber}
                            </Typography>
                            <Chip
                              size="small"
                              label={order.status}
                              color={getStatusColor(order.status)}
                              icon={getStatusIcon(order.status)}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {order.customer} • ${order.amount.toFixed(2)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {order.date}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentOrders.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid> */}
      {/* </Grid> */}

      {/* Orders DataGrid */}
      {/* <Card>
        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: 0,
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                borderBottom: "2px solid rgba(224, 224, 224, 1)",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            slots={{
              noRowsOverlay: () => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No orders found matching your criteria.
                  </Typography>
                </Box>
              ),
            }}
          />
        </Box>
      </Card> */}
      <TopSellingProducts />
    </Box>
  );
};

export default Dashboard;
