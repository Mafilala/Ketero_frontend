'use client';

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";


interface OrderDetailsProps {
  dueDate: Date | null;
  setDueDate: (date: Date | null) => void;
  orderNote: string;
  setOrderNote: (note: string) => void;
  style: string;
  setStyle: (style: string) => void;
  fabric: string;
  setFabric: (fabric: string) => void;
  color: string;
  setColor: (color: string) => void;
  price: string;
  setPrice: (price: string) => void;
  paid: string;
  setPaid: (paid: string) => void;
}

const OrderDetails = ({
  dueDate,
  setDueDate,
  orderNote,
  setOrderNote,
  style,
  setStyle,
  fabric,
  setFabric,
  color,
  setColor,
  price,
  setPrice,
  paid,
  setPaid,
}: OrderDetailsProps) => {
  const [activeTab, setActiveTab] = useState<"specs" | "pricing">("specs");
  
  return (
    <Card className="border rounded p-2 shadow-sm"
      style={{
        backgroundColor: 'var(--tg-secondary-bg-color)',
        color: 'var(--tg-text-color)'
      }}

    >
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "specs"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("specs")}
        >
          Specifications
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "pricing"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("pricing")}
        >
          Pricing
        </button>
      </div>

      {activeTab === "specs" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-1">
            <div>
              <Input
                id="style"
                type="number"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="Style code"
                className="rounded"
              />
            </div>
            <div>
              <Input
                id="fabric"
                type="number"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                placeholder="Fabric code"
                className="rounded"

              />
            </div>
            <div>
              <Input
                id="color"
                type="number"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Color code"
                className="rounded"
              />
            </div>
          </div>

          <div>
            <DatePicker
              id="dueDate"
              selected={dueDate}
              onChange={setDueDate}
              minDate={new Date()}
              className="w-full px-3 py-2 border rounded-md"
              placeholderText="Select a due date"
            />
          </div>

          <div>
            <Textarea
              id="orderNote"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="note..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Total Price</Label>
              <div className="relative">
                                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="paid">Amount Paid</Label>
              <div className="relative">
                <Input
                  id="paid"
                  type="number"
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
                  placeholder="0.00"
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="">Balance Due:</span>
              <span className="font-medium">
                {(parseFloat(price || "0") - parseFloat(paid || "0")).toFixed(2)}
              </span>
            </div>
            <div className="w-full rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${(parseFloat(paid || "0") / parseFloat(price || "1")) * 100}%`,
                  maxWidth: '100%'
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-sm ">
              <span>Paid: {parseFloat(paid || "0").toFixed(2)}</span>
              <span>Total: {parseFloat(price || "0").toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default OrderDetails;
