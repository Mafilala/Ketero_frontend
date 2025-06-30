import {User} from "../../types/types"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
interface UserRowsInterface {
   userData: User[];
   handleDelete: (id: number) => void;
   isPending: boolean
}
const UserRows = ({userData, handleDelete, isPending}:UserRowsInterface) => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  return (
          <>
          {
          userData.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {user.name}
              </TableCell>
              <TableCell>
                {user.telegram_id}
              </TableCell>
              <TableCell>
                {user.role}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => 
                {
                  handleDelete(user.id)
                  setCurrentUserId(user.id)
                }}>
                      {(isPending && user.id === currentUserId) ? (<Loader2 className="animate-spin"/>) : "Delete"}
                 </Button>
                
              </TableCell>
            </TableRow>))
            }
          </>
          )}
export default UserRows 
