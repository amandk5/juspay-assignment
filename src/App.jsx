import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import OrdersList from "./pages/OrdersList";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

function App() {
  const {theme} = useSelector((state) => state.themes);
  console.log("Current theme in App component:", theme);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: theme === "light" ? "#fafafa" : "#121212",
        }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersList />} />
          </Routes>
        </Layout>
      </Box>
    </>
  );
}

export default App;
