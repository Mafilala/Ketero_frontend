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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ClothingType {
  id: string;
  name: string;
}

const ClothingTypeTable = () => {
  const queryClient = useQueryClient();
  const [newClothingTypeName, setNewClothingTypeName] = useState("");
  const [editingId, setEdittingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  // Fetch clothing data
  const { data: clothing_types = [] } = useQuery<ClothingType[]>({
    queryKey: ["clothing_types"],
    queryFn: () => fetch("/api/clothing_type").then(res => res.json()),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (name: string) =>
      fetch("/api/clothing_type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clothing_types"] }),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      fetch(`/api/clothing_type`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id, name }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clothing_types"] });
      setEdittingId(null);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/clothing_type`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body:   JSON.stringify({id})
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clothing_types"] }),
  });

  const handleAddClothing = () => {
    if (newClothingTypeName.trim()) {
      createMutation.mutate(newClothingTypeName.trim());
      setNewClothingTypeName("");
    }
  };

  const startEditing = (id: string, name: string) => {
    setEdittingId(id);
    setTempName(name);
  };

  const saveEditing = (id: string) => {
    updateMutation.mutate({ id, name: tempName });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clothing_types.map(clothing_type => (
            <TableRow key={clothing_type.id}>
              <TableCell>{clothing_type.id}</TableCell>
              <TableCell>
                {editingId === clothing_type.id ? (
                  <Input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                ) : (
                  clothing_type.name
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                {editingId === clothing_type.id ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => saveEditing(clothing_type.id)}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEdittingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEditing(clothing_type.id, clothing_type.name)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(clothing_type.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>
              <Input
                value={newClothingTypeName}
                onChange={(e) => setNewClothingTypeName(e.target.value)}
                placeholder="New clothing type name"
              />
            </TableCell>
            <TableCell className="text-right">
              <Button onClick={handleAddClothing}>Add New</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ClothingTypeTable;
