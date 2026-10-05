import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: 24, padding: "0 24px", height: 64, alignItems: "center" }}>
      <strong>Clinic Stock Tracker</strong>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/inventory">Manage inventory</NavLink>
    </nav>
  );
}