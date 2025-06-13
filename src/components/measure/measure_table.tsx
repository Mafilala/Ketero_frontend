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

interface Measure {
  id: string;
  name: string;
}

const MeasureTable = () => {
  const queryClient = useQueryClient();
  const [newMeasureName, setNewMeasureName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  // Fetch measure data
  const { data: measures = [] } = useQuery<Measure[]>({
    queryKey: ["measures"],
    queryFn: () => fetch("/api/measure").then((res) => res.json()),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (name: string) =>
      fetch("/api/measure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["measures"] }),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      fetch(`/api/measure`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measures"] });
      setEditingId(null);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/measure`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["measures"] }),
  });

  const handleAddMeasure = () => {
    if (newMeasureName.trim()) {
      createMutation.mutate(newMeasureName.trim());
      setNewMeasureName("");
    }
  };

  const startEditing = (id: string, name: string) => {
    setEditingId(id);
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
          {measures.map((measure) => (
            <TableRow key={measure.id}>
              <TableCell>{measure.id}</TableCell>
              <TableCell>
                {editingId === measure.id ? (
                  <Input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                ) : (
                  measure.name
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                {editingId === measure.id ? (
                  <>
                    <Button size="sm" onClick={() => saveEditing(measure.id)}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEditing(measure.id, measure.name)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(measure.id)}
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
                value={newMeasureName}
                onChange={(e) => setNewMeasureName(e.target.value)}
                placeholder="New measure name"
              />
            </TableCell>
            <TableCell className="text-right">
              <Button onClick={handleAddMeasure}>Add New</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MeasureTable;
