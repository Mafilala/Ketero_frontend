'use client'
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ClientInformation from './ClientInformation';
import OrderSpecifications from './OrderSpecifications';
import MeasurementsTable from './MeasurementsTable';
import { Order, Client, ClothingType, MeasureType, OrderDetail, Part, Measure, MeasureResponse } from '@/types/types';

interface OrderDetailsModalProps {
  order: Order;
  clothingTypeName: string;
  open: boolean;
  client: Client;
  onOpenChange: (open: boolean) => void;
}

const OrderDetailsModal = ({ order, clothingTypeName, open, client, onOpenChange }: OrderDetailsModalProps) => {
  const queryClient = useQueryClient();
  const [editingPartId, setEditingPartId] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<Record<number, number>>({});

  // Fetch clothing types
  const { data: clothingTypes = [], isLoading: isClothingLoading } = useQuery<ClothingType[]>({
    queryKey: ['clothingTypes'],
    queryFn: () => fetch('/api/clothing').then(res => res.json()),
  });

  // Fetch measure types
  const { data: measureTypes = [], isLoading: isMeasureLoading } = useQuery<MeasureType[]>({
    queryKey: ['measureTypes'],
    queryFn: () => fetch('/api/measure').then(res => res.json()),
  });

  // Fetch order details
  const { data: orderDetail, isLoading: isDetailLoading } = useQuery<OrderDetail>({
    queryKey: ['orderDetail', order.id],
    queryFn: () => 
      fetch(`/api/order_detail?order_id=${order.id}`).then(res => res.json()),
    enabled: open,

  });

  // Fetch measurements
  const { data: measurements = [], isLoading: isMeasurementsLoading } = useQuery<Part[]>({
    queryKey: ['measurements', order.id],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${order.id}/measurements`);
      const measurementData: MeasureResponse[] = await res.json();
      
      // Transform to Part[] format
      const partsMap = new Map<number, Measure[]>();
      
      measurementData.forEach(item => {
        const clothingId = item.clothing_id;
        const measureId = item.measure_id;
        
        const measure: Measure = {
          id: measureId,
          name: getMeasureName(measureId) || "",
          value: item.measure
        };
        
        if (partsMap.has(clothingId)) {
          partsMap.get(clothingId)!.push(measure);
        } else {
          partsMap.set(clothingId, [measure]);
        }
      });
      
      return Array.from(partsMap, ([clothingId, measures]) => ({
        clothingId: clothingId,
        name: getClothingName(clothingId) || "",
        measures
      }));

    },
    enabled: open,
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (part: Part) => {
      const response = await fetch(`/api/orders/${order.id}/measurements`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clothing_id: part.clothingId,
          measures: part.measures.map(m => ({
            measure_id: m.id,
            value: editedValues[m.id] 
          }))
        }),
      });
      
      if (!response.ok) throw new Error('Failed to update measurements');
      return response.json();
    },
    onSuccess: () => {
      setEditingPartId(null);
    },
  });

  // Helper functions
  const getClothingName = (clothingId: number) => {
    return clothingTypes.find(t => t.id === clothingId)?.name || '';
  };

  const getMeasureName = (measureId: number) => {
    return measureTypes.find(t => t.id === measureId)?.name || '';
  };

  // Edit handlers
  const startEditing = (part: Part) => {
    setEditingPartId(part.clothingId);
    const initialValues: Record<number, number> = {};
    part.measures.forEach(measure => {
      initialValues[measure.id] = measure.value;
    });
    setEditedValues(initialValues);
  };

  const handleValueChange = (measureId: string, value: string) => {
    const key = parseInt(measureId)
    const val = value ? parseInt(value) : 0;
    setEditedValues(prev => ({
      ...prev,
      [key]: val 
    }));
  };

  const saveEdits = (part: Part) => {
    updateMutation.mutate(part);
  };

  const cancelEditing = () => {
    setEditingPartId(null);
    setEditedValues({});
  };

  // Loading state
  const isLoading = isClothingLoading || isMeasureLoading || isDetailLoading || isMeasurementsLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-gray-300 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order #{order.id} Details</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            <ClientInformation client={client} />
            
            <OrderSpecifications 
              clothingTypeName={clothingTypeName}
              orderDetail={orderDetail}
              order={order}
            />
            
            <MeasurementsTable 
              measurements={measurements}
              editingPartId={editingPartId}
              editedValues={editedValues}
              onValueChange={handleValueChange}
              onStartEdit={startEditing}
              onSaveEdit={saveEdits}
              onCancelEdit={cancelEditing}
              isSaving={false}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
