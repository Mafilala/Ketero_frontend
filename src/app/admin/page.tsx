'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ClothingTable from '@/components/clothing/clothing_table';
import ClothingTypeTable from '@/components/clothing_type/main_table';
import MeasureTable from '@/components/measure/measure_table';
import StatusTable from '@/components/status/status_table';
import ClothingTypePartsManager from '@/components/clothing_type_parts/clothing_type_parts_table';
import ClothingMeasuresManager from '@/components/clothing_measures/clothing_measures_table';
import UserTable from '@/components/shop_keeper/main';

const AdminDashboardContent = () => {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'dashboard';

  return (
    <div className="flex-1 flex flex-col items-center">
      <h1>Admin Dashboard</h1>
      <div className="flex-1 flex flex-col items-center">
        {view === 'dashboard' && <div>Dashboard Content</div>}
        {view === 'clothing' && <ClothingTable />}
        {view === 'clothing_type' && <ClothingTypeTable />}
        {view === 'measure' && <MeasureTable />}
        {view === 'status' && <StatusTable />}
        {view === 'parts' && <ClothingTypePartsManager />}
        {view === 'clothing_measures' && <ClothingMeasuresManager />}
        {view === 'users' && <UserTable />}
      </div>
    </div>
  );
};

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}

