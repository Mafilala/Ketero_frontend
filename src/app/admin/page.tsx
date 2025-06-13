'use client' 
import { useSearchParams } from "next/navigation";
import ClothingTable from "@/components/clothing/clothing_table";
import ClothingTypeTable from "@/components/clothing_type/main_table";
import { Client } from "@/types/types";
import { useEffect, useState } from "react";
import MeasureTable from "@/components/measure/measure_table";
import StatusTable from "@/components/status/status_table";
import ClothingTypePartsManager from "@/components/clothing_type_parts/clothing_type_parts_table";
import ClothingMeasuresManager from "@/components/clothing_measures/clothing_measures_table";
const AdminDashboard = () => {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "dashboard";
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
      const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients');
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error('Failed to fetch clients:', err);
    };
  }
    fetchClients();
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center">
      <h1>
      Admin DashBoard
      </h1>
      <div className="flex-1 flex flex-col items-center">
          {view === "dashboard" && <div>Dashboard Content</div>}
          {view === "clothing" && <ClothingTable />}
          {view === "clothing_type" && <ClothingTypeTable/>}
          {view === "measure" && <MeasureTable/>}
          {view === "status" && <StatusTable />}
          {view === "parts" && <ClothingTypePartsManager />}
          {view === "clothing_measures" && <ClothingMeasuresManager />}
      </div>
    </div>
  )
}

export default AdminDashboard;

