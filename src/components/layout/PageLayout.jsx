import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";

export default function PageLayout() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}