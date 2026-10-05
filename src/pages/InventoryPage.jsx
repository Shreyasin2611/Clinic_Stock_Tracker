import { useParams } from "react-router-dom";

export default function InventoryPage() {
  const { tab } = useParams();
  return <h1>Manage inventory: {tab}</h1>;
}