'use client'
import { Input } from "@/components/ui/input"

const CustomerInfoForm = ({ 
  customerName, 
  setCustomerName, 
  phoneNumber, 
  setPhoneNumber 
}: {
  customerName: string;
  setCustomerName: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
}) => (
  <div className="mb-8"
    style={{
        backgroundColor: 'var(--tg-bg-color)',
        color: 'var(--tg-text-color)'
      }}

    >
    <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
        <Input type="text" 
            placeholder="Full Name" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)}
            className="rounded"
        />
     
      
        <Input type="text" 
            placeholder="Phone" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="rounded"
        />
      
    </div>
  </div>
);

export default CustomerInfoForm;
