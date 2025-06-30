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
import { useQueryClient } from "@tanstack/react-query";
import { useCreateUser, useDeleteUser, useGetAllUsers } from "./hooks";
import UserRows from "./rows";
import NewUser from "./newUser";
import { CreateUser } from "@/types/types";

const UserTable = () => {
  const queryClient = useQueryClient();
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false); 
  const {data: users = [], isLoading: isUsersLoading, isError: isUsersError} = useGetAllUsers() // Fetch Users   
  const createUserMutation = useCreateUser() // Create user mutation    
  const deleteUserMutation = useDeleteUser()  // Delete mutation

  
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Telegram ID</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            isUsersLoading ? (

              <TableRow>
                <TableCell className="text-center" colSpan={5}>
                  Loading...
                </TableCell>
              </TableRow>

            ): isUsersError ? (
              <TableRow>
                <TableCell className="text-center" colSpan={5}>
                  Unable to Load Users data. 
                </TableCell>
              </TableRow> 
            ) : (

              <UserRows userData={users!} handleDelete={(id: number) => {
                      deleteUserMutation.mutate(id)
                      
                  }}
              isPending={deleteUserMutation.isPending}
              />
            )
          }
          
          <TableRow>
            <TableCell colSpan={isAddingUser ? 5 : 4} className="border">
              {isAddingUser && <NewUser handleAdd={
                (newUser: CreateUser) => {
                  createUserMutation.mutate((newUser))
                }
                }
             
                isPending={createUserMutation.isPending}
                isSuccess={createUserMutation.isSuccess}
                handleAddUserState={() => {
                  setIsAddingUser(false)
                }
                }
              />}
            </TableCell>
            {!isAddingUser && <TableCell className="text-right">
                <Button onClick={() => {  
                setIsAddingUser(true)
                createUserMutation.reset()
              }}
              >
                Add New
              </Button> 
            </TableCell> }
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
