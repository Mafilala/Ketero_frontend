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

interface Clothing {
  id: string;
  name: string;
}

const ClothingTable = () => {
  const queryClient = useQueryClient();
  const [newClothingName, setNewClothingName] = useState("");
  const [editingId, setEdittingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  // Fetch clothing data
  const { data: clothings = [] } = useQuery<Clothing[]>({
    queryKey: ["clothings"],
    queryFn: () => fetch("/api/clothing").then(res => res.json()),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (name: string) =>
      fetch("/api/clothing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clothings"] }),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      fetch(`/api/clothing`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id, name }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clothings"] });
      setEdittingId(null);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/clothing`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body:   JSON.stringify({id})
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clothings"] }),
  });

  const handleAddClothing = () => {
    if (newClothingName.trim()) {
      createMutation.mutate(newClothingName.trim());
      setNewClothingName("");
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
          {clothings.map(clothing => (
            <TableRow key={clothing.id}>
              <TableCell>{clothing.id}</TableCell>
              <TableCell>
                {editingId === clothing.id ? (
                  <Input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                ) : (
                  clothing.name
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                {editingId === clothing.id ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => saveEditing(clothing.id)}
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
                      onClick={() => startEditing(clothing.id, clothing.name)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(clothing.id)}
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
                value={newClothingName}
                onChange={(e) => setNewClothingName(e.target.value)}
                placeholder="New clothing name"
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

export default ClothingTable;
