import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

const breadcrumbs = [
  {
    label: "Dashboard",
    to: "/",
    sx: { cursor: "pointer" },
    color: "inherit",
  },
  {
    label: "Default",
    to: "/",
    sx: { color: "text.primary", cursor: "pointer" },
    color: "inherit",
  },
];

export default function Path({ color }) {
  const navigate = useNavigate();
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((crumb, idx) => (
          <Link
            key={crumb.label}
            underline="hover"
            color={crumb.color}
            onClick={() => navigate(crumb.to)}
            sx={{ ...crumb.sx, color: color === "light" ? "black" : "white" }}
          >
            {crumb.label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
