import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import AlertBanner from "./AlertBanner";

export default function PageLayout() {
  return (
    <>
      <Navbar />
            <AlertBanner />
      <Box component="main" sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}