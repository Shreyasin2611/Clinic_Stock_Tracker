import { Alert, Box, CircularProgress } from "@mui/material";

export default function DataState({ loading, error, children }) {
  if (loading) {
    return (
      <Box
        role="status"
        aria-label="Loading"
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Could not load the data. {error}</Alert>;
  }

  return children;
}