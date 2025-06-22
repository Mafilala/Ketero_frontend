"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { Part, ClothingType, Clothing, Measure } from "@/types/types";
import OrderConfirmation from "./order_confirmation";
import CustomerInfoForm from "./customer_info";
import ClothingTypeSelector from "./clothing_type_selector";
import PartMeasurements from "./part_measurements";
import OrderDetails from "./order_detail";
import { Loader2Icon } from "lucide-react"
import { Button } from '@/components/ui/button';


const TailorOrderSystem = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedClothingType, setSelectedClothingType] = useState<number | null>(null);
  const [clothingTypeName, setClothingTypeName] = useState("");
  const [parts, setParts] = useState<Part[]>([]);
  const [orderNote, setOrderNote] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false)
  const [style, setStyle] = useState("");
  const [fabric, setFabric] = useState("");
  const [color, setColor] = useState("");
  
  // New state for pricing
  const [price, setPrice] = useState("");
  const [paid, setPaid] = useState("");

  // Fetch clothing types
  const { data: clothingTypes = [] } = useQuery<ClothingType[]>({
    queryKey: ["clothingTypes"],
    queryFn: () => fetch("/api/clothing_type").then(res => res.json()),
  });

  // Fetch clothing parts when clothing type is selected
  const { data: clothingParts = [] } = useQuery<Clothing[]>({
    queryKey: ["clothingParts", selectedClothingType],
    queryFn: () => 
      fetch(`/api/clothing_type_parts?clothingTypeId=${selectedClothingType}`)
        .then(res => res.json()),
    enabled: !!selectedClothingType,
  });
  
    // Fetch measures for each clothing part
  useEffect(() => {
    if (clothingParts.length > 0) {
      const fetchMeasuresForParts = async () => {
        const partsWithMeasures = await Promise.all(
          clothingParts.map(async (part) => {
            const measures: Measure[] = await fetch(
              `/api/clothing_measures?clothingId=${part.id}`
            ).then(res => res.json());
            
            return {
              clothingId: part.id,
              name: part.name,
              measures: measures.map(m => ({ ...m })),
            };
          })
        );
        
        setParts(partsWithMeasures);
      };
      
      fetchMeasuresForParts();
    }
  }, [clothingParts, selectedClothingType]);

  // Set clothing type name when selected
  useEffect(() => {
    if (selectedClothingType && clothingTypes.length > 0) {
      const selectedType = clothingTypes.find(t => t.id === selectedClothingType);
      if (selectedType) {
        setClothingTypeName(selectedType.name);
      }
    }
  }, [selectedClothingType, clothingTypes]);

  // Handle measure value changes
  const handleMeasureChange = (partIndex: number, measureIndex: number, value: string) => {
    setParts(prev => {
      const newParts = [...prev];
      newParts[partIndex].measures[measureIndex].value = parseInt(value);
      return newParts;
    });
  };

  // Submit order
 const handleSubmitOrder = async () => {
  try {
    setIsSaving(true)
    const clientResponse = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: customerName,
        phone_number: phoneNumber
      })
    });

    if (!clientResponse.ok) {
      const errorData = await clientResponse.json();
      throw new Error(`Client creation failed: ${errorData.error || 'Unknown error'}`);
    }

    const clientData = await clientResponse.json();
    const clientId = clientData.id;

    const orderResponse = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        clothing_type_id: selectedClothingType,
        due_date: dueDate ? dueDate.toISOString() : null,
        order_note: orderNote || null
      })
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      throw new Error(`Order creation failed: ${errorData.error || 'Unknown error'}`);
    }

    const orderData = await orderResponse.json();
    const orderId = orderData.id;

    // 4. Create order details (style, fabric, color)
    const orderDetailResponse = await fetch('/api/order_detail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: orderId,
        style: parseInt(style) || 0,
        fabric: parseInt(fabric) || 0,
        color: parseInt(color) || 0
      })
    });

    if (!orderDetailResponse.ok) {
      const errorData = await orderDetailResponse.json();
      throw new Error(`Order detail creation failed: ${errorData.error || 'Unknown error'}`);
    }

    // 5. Create price details
    const priceDetailResponse = await fetch('/api/price_detail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: orderId,
        price: parseFloat(price) || 0,
        paid: parseFloat(paid) || 0
      })
    });

    if (!priceDetailResponse.ok) {
      const errorData = await priceDetailResponse.json();
      throw new Error(`Price detail creation failed: ${errorData.error || 'Unknown error'}`);
    }

    const orderMeasures = parts.flatMap(part => 
      part.measures.map(measure => ({
        order_id: parseInt(orderId),
        clothing_id: part.clothingId,
        measure_id: measure.id,
        measure: measure.value || 0
      }))
    );
      const measureResponse = await fetch('/api/order_measure', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderMeasures)
    });
    if (!measureResponse.ok) {
      const errorData = await measureResponse.json();
      throw new Error(`Measure creation failed: ${errorData.error || 'Unknown error'}`);
    }

        
    // 7. Reset form
    setIsSaving(false)
    handleReset();
    
  } catch  {
    setIsSaving(false)
    console.log("Order submission error:");
  }
}; 
  // Reset form
  const handleReset = () => {
    setCustomerName("");
    setPhoneNumber("");
    setSelectedClothingType(null);
    setClothingTypeName("");
    setParts([]);
    setOrderNote("");
    setDueDate(null);
    setOrderSubmitted(false);
    setPaid("");
    setPrice("");
    setColor("");
    setFabric("");
    setStyle("");
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold">
            Tailor Order Management
          </h1>
          <p className="text-lg ">
            Create custom orders with detailed measurements
          </p>
        </div>

        {orderSubmitted ? (
          <OrderConfirmation 
            customerName={customerName}
            phoneNumber={phoneNumber}
            clothingTypeName={clothingTypeName}
            dueDate={dueDate}
            onReset={handleReset}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">New Order</h2>
            </div>
            
            <div className="p-6">
              <CustomerInfoForm 
                customerName={customerName}
                setCustomerName={setCustomerName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
              
              <ClothingTypeSelector 
                clothingTypes={clothingTypes}
                setSelectedClothingType={setSelectedClothingType}
                clothingTypeName={clothingTypeName}
              />
              
              {parts.length > 0 && (
                <>
                  <PartMeasurements 
                    parts={parts}
                    handleMeasureChange={handleMeasureChange}
                  />
                  
                  <OrderDetails 
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    orderNote={orderNote}
                    setOrderNote={setOrderNote}
                    style={style}
                    setStyle={setStyle}
                    fabric={fabric}
                    setFabric={setFabric}
                    color={color}
                    setColor={setColor}
                    price={price}
                    setPrice={setPrice}
                    paid={paid}
                    setPaid={setPaid}
                  />
                </>
              )}
              
              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSubmitOrder}
                  disabled={!customerName || !phoneNumber || !selectedClothingType || parts.length === 0 || !dueDate}
                  style={{
                          borderColor: 'var(--tg-secondary-bg-color)',
                          backgroundColor: 'var(--tg-button-color)',
                          color: 'var(--tg-button-text-color)'

                  }}
                  size="lg"
                >
                  
                          {isSaving ? (
                        <>
                        <Loader2Icon className="animate-spin" />
                          Creating... 
                        </>
                          ) : (
                            "Create Order"
                          )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TailorOrderSystem;
