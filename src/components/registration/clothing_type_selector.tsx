'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ClothingType } from "@/types/types";

const ClothingTypeSelector = ({ 
  clothingTypes, 
  selectedClothingType, 
  setSelectedClothingType,
  clothingTypeName
}: {
  clothingTypes: ClothingType[]; 
  selectedClothingType: string;
  setSelectedClothingType: (value: string) => void;
  clothingTypeName: string;
}) => (
  <div className="mb-8 w-1/2">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Clothing Type</h3>
    <div className="grid grid-cols-1 gap-4">
        <Select value={selectedClothingType} onValueChange={setSelectedClothingType}>
          <SelectTrigger className="w-full rounded">
            <SelectValue placeholder="Select a clothing type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-50 z-10 rounded">
            {clothingTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> 
    </div>
  </div>
);

export default ClothingTypeSelector;
