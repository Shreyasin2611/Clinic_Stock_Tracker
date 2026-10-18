import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: 24, padding: "0 24px", height: 64, alignItems: "center" }}>
      <strong>Clinic Stock Tracker</strong>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/inventory">Manage inventory</NavLink>
      <span style={{ marginLeft: "auto" }}>{user?.email}</span>
      <Button variant="outlined" onClick={logout}>
        Log out
      </Button>
    </nav>
  );
}