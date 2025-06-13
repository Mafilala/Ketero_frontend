
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Client } from '../../types/types'

export const ClientTable = ({clients}: {clients: Client[]}) => {
   return(
     
      <Table className="">
        <TableCaption>Recent clients</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            (clients || []).map((client, idx) => 
          (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{client.full_name}</TableCell>
              <TableCell>{client.phone_number}</TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
   ) 
} 
