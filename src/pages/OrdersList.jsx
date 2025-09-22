import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Menu,
  Button,
  Grid,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Search,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  FilterList,
} from "@mui/icons-material";
import {
  setStatusFilter,
  setSearchTerm,
  updateOrderStatus,
} from "../store/ordersSlice";

// DRY: Status options and color mapping
const statusOptions = ["All", "Pending", "Processing", "Shipped", "Completed"];

const statusColorMap = {
  Completed: "success",
  Pending: "warning",
  Processing: "info",
  Shipped: "primary",
};

const getStatusColor = (status) => statusColorMap[status] || "default";

// DRY: Render Chip for status
const StatusChip = ({ status }) => (
  <Chip label={status} color={getStatusColor(status)} size="small" />
);

// DRY: Render order amount
const AmountTypography = ({ amount }) => (
  <Typography variant="subtitle2" fontWeight="bold">
    ${amount.toFixed(2)}
  </Typography>
);

// DRY: Render items as comma separated
const ItemsTypography = ({ items }) => (
  <Typography variant="body2" color="text.secondary">
    {items.join(", ")}
  </Typography>
);

// DRY: Render order details grid
const OrderDetailsGrid = ({ order }) => (
  <Box sx={{ pt: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" color="text.secondary">
          Customer
        </Typography>
        <Typography variant="body1" gutterBottom>
          {order.customer}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" color="text.secondary">
          Order Date
        </Typography>
        <Typography variant="body1" gutterBottom>
          {order.date}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" color="text.secondary">
          Status
        </Typography>
        <StatusChip status={order.status} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" color="text.secondary">
          Total Amount
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ${order.amount.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">
          Items
        </Typography>
        <Typography variant="body1">{order.items.join(", ")}</Typography>
      </Grid>
    </Grid>
  </Box>
);

const OrdersList = () => {
  const dispatch = useDispatch();
  const { filteredOrders, statusFilter, searchTerm } = useSelector(
    (state) => state.orders
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const { theme } = useSelector((state) => state.themes);

  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleViewOrder = () => {
    setViewDialogOpen(true);
    handleMenuClose();
  };

  const handleChangeStatus = () => {
    setNewStatus(selectedOrder?.status || "");
    setStatusDialogOpen(true);
    handleMenuClose();
  };

  const handleStatusUpdate = () => {
    if (selectedOrder && newStatus) {
      dispatch(updateOrderStatus({ id: selectedOrder.id, status: newStatus }));
    }
    setStatusDialogOpen(false);
    setNewStatus("");
  };

  // DRY: DataGrid columns
  const columns = useMemo(
    () => [
      {
        field: "orderNumber",
        headerName: "Order #",
        width: 130,
        renderCell: (params) => (
          <Typography variant="subtitle2" fontWeight="bold">
            {params.value}
          </Typography>
        ),
      },
      {
        field: "customer",
        headerName: "Customer",
        width: 150,
      },
      {
        field: "date",
        headerName: "Date",
        width: 120,
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        renderCell: (params) => <StatusChip status={params.value} />,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 120,
        align: "right",
        headerAlign: "right",
        renderCell: (params) => <AmountTypography amount={params.value} />,
      },
      {
        field: "items",
        headerName: "Items",
        width: 200,
        renderCell: (params) => <ItemsTypography items={params.value} />,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleMenuClick(e, params.row);
            }}
            size="small"
          >
            <MoreVert />
          </IconButton>
        ),
      },
    ],
    [handleMenuClick]
  );

  // DRY: DataGrid rows
  const rows = useMemo(
    () =>
      filteredOrders.map((order) => ({
        ...order,
        id: order.id,
      })),
    [filteredOrders]
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: "100px",
        width: "90%",
        px: 3,
        pl: 8,
        bgcolor: theme === "light" ? "#fafafa" : "#303030",
      }}
    >
      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search orders or customers..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Filter by Status"
                  onChange={(e) => dispatch(setStatusFilter(e.target.value))}
                  startAdornment={<FilterList sx={{ mr: 1 }} />}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredOrders.length} orders
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Orders DataGrid */}
      <Card>
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
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewOrder}>
          <Visibility sx={{ mr: 1 }} fontSize="small" />
          View Details
        </MenuItem>
        <MenuItem onClick={handleChangeStatus}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Change Status
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete Order
        </MenuItem>
      </Menu>

      {/* View Order Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
        <DialogContent>
          {selectedOrder && <OrderDetailsGrid order={selectedOrder} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
      >
        <DialogTitle>Change Order Status</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Update the status for order {selectedOrder?.orderNumber}
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel>New Status</InputLabel>
            <Select
              value={newStatus}
              label="New Status"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {statusOptions
                .filter((status) => status !== "All")
                .map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusUpdate} variant="contained">
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdersList;
