'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input";

import { Part } from "@/types/types";
const PartMeasurements = ({ 
  parts, 
  handleMeasureChange 
}: {
  parts: Part[];
  handleMeasureChange: (partIndex: number, measureIndex: number, value: string) => void;
}) => (
    <Card className="mb-6">
      <CardHeader>
      <CardTitle> Measurement Detail </CardTitle>  
      <CardDescription>Card Description</CardDescription>
      </CardHeader>
    <CardContent>
        {parts.map((part, partIndex) => (
        <Card key={part.clothingId} className="p-4 py-0 mb-4 border-transparent">
          <CardHeader >
            <CardTitle>{part.name}</CardTitle>
          </CardHeader>
          
          <div className="flex gap-4 mb-4">
            {part.measures.map((measure, measureIndex) => (
              <Input
                key={measure.name}
                type="number"
                value={measure.value}
                placeholder={measure.name}
                onChange={(e) =>
                  handleMeasureChange(partIndex, measureIndex, e.target.value)
                }
                className="rounded max-w-24"
              />     
            ))}
          </div>
        </Card>
      ))}
   </CardContent> 
 </Card> 
);

export default PartMeasurements;
