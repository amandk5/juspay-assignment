import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

// Sample table data
const rows = [
  {
    id: 1,
    name: "ASOS Ridley High Waist",
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    id: 2,
    name: "Marco Lightweight Shirt",
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
  },
  {
    id: 3,
    name: "Half Sleeve  Shirt",
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
  },
  {
    id: 4,
    name: "Lightweight Jacket",
    price: 20,
    quantity: 184,
    amount: 3680.0,
  },
  { id: 5, name: "Marco Shoes", price: 79.49, quantity: 64, amount: 1965.81 },
];

const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 2,
    sortable: false,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => (
      <span style={{ fontWeight: 500 }}>{params.value}</span>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    sortable: false,
    align: "left",
    renderCell: ({ value }) => `$${value.toFixed(2)}`,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
    sortable: false,
    align: "left",
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    sortable: false,
    align: "left",
    renderCell: ({ value }) =>
      "$" + value.toLocaleString(undefined, { minimumFractionDigits: 2 }),
  },
];

export default function TopSellingProducts() {
  return (
    <>
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        textAlign={"left"}
      >
        Top Selling Products
      </Typography>
      <Box
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
            color: "#b0b8c9",
          },
          "& .MuiDataGrid-row": { fontSize: 17, minHeight: 38, maxHeight: 40 },
          "& .MuiDataGrid-cell": { color: "#232323" },
        }}
      >
        <DataGrid
          // autoHeight
          rows={rows}
          columns={columns}
          hideFooter
          disableSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          rowHeight={44}
          headerHeight={38}
        />
      </Box>
    </>
  );
}
