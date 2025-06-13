"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ClothingType {
  id: string;
  name: string;
}

interface Clothing {
  id: string;
  name: string;
}

const ClothingTypePartsManager = () => {
  const queryClient = useQueryClient();
  const [selectedClothingType, setSelectedClothingType] = useState<string>("");
  const [newPartId, setNewPartId] = useState<string>("");

  // Fetch clothing types
  const { data: clothingTypes = [] } = useQuery<ClothingType[]>({
    queryKey: ["clothingTypes"],
    queryFn: () => fetch("/api/clothing_type").then(res => res.json()),
  });

  // Fetch all clothing items
  const { data: allClothings = [] } = useQuery<Clothing[]>({
    queryKey: ["allClothings"],
    queryFn: () => fetch("/api/clothing").then(res => res.json()),
  });

  // Fetch parts for selected clothing type
  const { data: currentParts = [] } = useQuery<Clothing[]>({
    queryKey: ["clothingTypeParts", selectedClothingType],
    queryFn: () => 
      fetch(`/api/clothing_type_parts?clothingTypeId=${selectedClothingType}`)
        .then(res => res.json()),
    enabled: !!selectedClothingType,
  });

  // Add new part mutation
  const addPartMutation = useMutation({
    mutationFn: (clothingId: string) =>
      fetch("/api/clothing_type_parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          clothingTypeId: selectedClothingType, 
          clothingId 
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["clothingTypeParts", selectedClothingType] 
      });
      setNewPartId("");
    },
  });

  // Remove part mutation
  const removePartMutation = useMutation({
    mutationFn: (clothingId: string) =>
      fetch("/api/clothing_type_parts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          clothingTypeId: selectedClothingType, 
          clothingId 
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["clothingTypeParts", selectedClothingType] 
      });
    },
  });

  // Get clothing items not already added as parts
  const availableClothings = currentParts ? allClothings.filter(
    clothing => !currentParts.some(part => part.id === clothing.id)
  ) : allClothings;

  const handleAddPart = () => {
    if (newPartId) {
      addPartMutation.mutate(newPartId);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Manage Clothing Type Parts</h2>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedClothingType}
            onValueChange={setSelectedClothingType}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a clothing type" />
            </SelectTrigger>
            <SelectContent>
              {clothingTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedClothingType && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Current Parts for {
              clothingTypes.find(t => t.id === selectedClothingType)?.name
            }
          </h3>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Part Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentParts.map(part => (
                <TableRow key={`${part.id}-${part.name}`}>
                  <TableCell>{part.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removePartMutation.mutate(part.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {currentParts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No parts added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium mb-3">Add New Part</h4>
            <div className="flex space-x-2">
              <Select
                value={newPartId}
                onValueChange={setNewPartId}
                disabled={availableClothings.length === 0}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select clothing to add as part" />
                </SelectTrigger>
                <SelectContent>
                  {availableClothings.map(clothing => (
                    <SelectItem key={clothing.id} value={clothing.id}>
                      {clothing.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleAddPart}
                disabled={!newPartId}
              >
                Add Part
              </Button>
            </div>
            {availableClothings.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                No available clothing items to add as parts
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothingTypePartsManager;
