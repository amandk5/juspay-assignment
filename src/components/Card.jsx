import { Box, Typography } from "@mui/material";
import React from "react";

export default function DashboardCard({ title, value, change, bgColor, icon }) {
  return (
    <Box
      sx={{
        width: "202px",
        // height: "112px",
        backgroundColor: bgColor,
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontStyle: "Semi Bold",
          fontSize: "14px",
          leadingTrim: "NONE",
          lineHeight: "20px",
          letterSpacing: "0%",
          color: "#1C1C1C",
          textAlign: "left",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontStyle: "Semi Bold",
            fontSize: "24px",
            leadingTrim: "NONE",
            lineHeight: "36px",
            letterSpacing: "0%",
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          //   color={change.startsWith("+") ? "green" : "red"}
          sx={{
            fontFamily: "Inter",
            fontWeight: 400,
            fontStyle: "Regular",
            fontSize: "12px",
            leadingTrim: "NONE",
            lineHeight: "18px",
            letterSpacing: "0%",
          }}
        >
          {change}
        </Typography>
        {icon && <Box sx={{ ml: 1 }}>{icon}</Box>}
      </Box>
    </Box>
  );
}
