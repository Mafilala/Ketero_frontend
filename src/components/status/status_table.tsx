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

interface Status {
  id: string;
  name: string;
}

const StatusTable = () => {
  const queryClient = useQueryClient();
  const [newStatusName, setNewStatusName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  // Fetch status data
  const { data: statuses = [] } = useQuery<Status[]>({
    queryKey: ["statuses"],
    queryFn: () => fetch("/api/status").then(res => res.json()),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (name: string) =>
      fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["statuses"] }),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      fetch(`/api/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
      setEditingId(null);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/status`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["statuses"] }),
  });

  const handleAddStatus = () => {
    if (newStatusName.trim()) {
      createMutation.mutate(newStatusName.trim());
      setNewStatusName("");
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
          {statuses.map(status => (
            <TableRow key={status.id}>
              <TableCell>{status.id}</TableCell>
              <TableCell>
                {editingId === status.id ? (
                  <Input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                ) : (
                  status.name
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                {editingId === status.id ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => saveEditing(status.id)}
                    >
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
                      onClick={() => startEditing(status.id, status.name)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(status.id)}
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
                value={newStatusName}
                onChange={(e) => setNewStatusName(e.target.value)}
                placeholder="New status name"
              />
            </TableCell>
            <TableCell className="text-right">
              <Button onClick={handleAddStatus}>Add New</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default StatusTable;
