import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Navbar from "./Navbar";
import AlertBanner from "./AlertBanner";
import OfflineBanner from "./OfflineBanner";

export default function PageLayout() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    function updateScrollTopVisibility() {
      setShowScrollTop(window.scrollY > 300);
    }

    updateScrollTopVisibility();
    window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollTopVisibility);
  }, []);

  return (
    <>
      <Navbar />
            <AlertBanner />
                  <OfflineBanner />
      <Box component="main" sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 3 }}>
        <Outlet />
      </Box>
      {showScrollTop && (
        <Fab
          color="primary"
          size="medium"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{ position: "fixed", right: 24, bottom: 24, zIndex: 1200 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </>
  );
}