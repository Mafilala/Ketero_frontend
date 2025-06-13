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

interface Clothing {
  id: string;
  name: string;
}

interface Measure {
  id: string;
  name: string;
}

const ClothingMeasuresManager = () => {
  const queryClient = useQueryClient();
  const [selectedClothing, setSelectedClothing] = useState<string>("");
  const [newMeasureId, setNewMeasureId] = useState<string>("");

  // Fetch all clothing items
  const { data: clothings = [] } = useQuery<Clothing[]>({
    queryKey: ["clothings"],
    queryFn: () => fetch("/api/clothing").then(res => res.json()),
  });

  // Fetch all measures
  const { data: allMeasures = [] } = useQuery<Measure[]>({
    queryKey: ["allMeasures"],
    queryFn: () => fetch("/api/measure").then(res => res.json()),
  });

  // Fetch measures for selected clothing item
  const { data: currentMeasures = [] } = useQuery<Measure[]>({
    queryKey: ["clothingMeasures", selectedClothing],
    queryFn: () => 
      fetch(`/api/clothing_measures?clothingId=${selectedClothing}`)
        .then(res => res.json()),
    enabled: !!selectedClothing,
  });
  
  // Add new measure mutation
  const addMeasureMutation = useMutation({
    mutationFn: (measureId: string) =>
      fetch("/api/clothing_measures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          clothingId: selectedClothing, 
          measureId 
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["clothingMeasures", selectedClothing] 
      });
      setNewMeasureId("");
    },
  });

  // Remove measure mutation
  const removeMeasureMutation = useMutation({
    mutationFn: (measureId: string) =>
      fetch("/api/clothing_measures", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          clothingId: selectedClothing, 
          measureId 
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["clothingMeasures", selectedClothing] 
      });
    },
  });

  // Get measures not already added to this clothing
  const availableMeasures = allMeasures.filter(
    measure => !currentMeasures.some(m => m.id === measure.id)
  );

  const handleAddMeasure = () => {
    if (newMeasureId) {
      addMeasureMutation.mutate(newMeasureId);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Manage Clothing Measures</h2>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedClothing}
            onValueChange={setSelectedClothing}
          >
            <SelectTrigger className="w-[300px] bg-gray-50">
              <SelectValue placeholder="Select a clothing item" />
            </SelectTrigger>
            <SelectContent>
              {clothings.map(clothing => (
                <SelectItem key={clothing.id} value={clothing.id}>
                  {clothing.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedClothing && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Current Measures for {
              clothings.find(c => c.id === selectedClothing)?.name
            }
          </h3>
          
          <Table className="border rounded-lg">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="font-semibold text-gray-800">Measure Name</TableHead>
                <TableHead className="text-right font-semibold text-gray-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMeasures.map(measure => (
                <TableRow key={`${measure.id}-${measure.name}`} className="hover:bg-gray-50">
                  <TableCell className="py-3">{measure.name}</TableCell>
                  <TableCell className="text-right py-3">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeMeasureMutation.mutate(measure.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {currentMeasures.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-4 text-gray-500">
                    No measures added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium mb-3 text-gray-700">Add New Measure</h4>
            <div className="flex space-x-2">
              <Select
                value={newMeasureId}
                onValueChange={setNewMeasureId}
                disabled={availableMeasures.length === 0}
              >
                <SelectTrigger className="w-[300px] bg-white">
                  <SelectValue placeholder="Select measure to add" />
                </SelectTrigger>
                <SelectContent>
                  {availableMeasures.map(measure => (
                    <SelectItem key={measure.id} value={measure.id}>
                      {measure.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleAddMeasure}
                disabled={!newMeasureId}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Measure
              </Button>
            </div>
            {availableMeasures.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                No available measures to add
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothingMeasuresManager;
