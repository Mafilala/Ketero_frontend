
'use client'

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Loader2Icon } from "lucide-react"

interface buttonInterface {
  setClientId: (id: number) => void
  setOpen: (open: boolean) => void
  handleArchive : () => void
  clientId: number
  filter: string
  handleOrder : () => void
  isUpdating: boolean
}

export function ActionButton(props: buttonInterface) {
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const {clientId, filter, setOpen, setClientId, handleArchive, handleOrder, isUpdating} = props;
  const handleView = () => {
    setClientId(clientId)
    setOpen(true)
    handleOrder()
    
  }
    return (
    <div className="inline-flex rounded-md shadow-sm max-w-14">
      { isDefault ? (
          <Button onClick={handleView} className = "px-1 rounded"
 
          style={{
            backgroundColor: 'var(--tg-button-color)',
            color: 'var(--tg-button-text-color)'
          }}

        >
            View 
          </Button>
      ): (
        <Button onClick={handleArchive}
          style={{
            backgroundColor: 'red',
            color: 'var(--tg-button-text-color)'
          }}
            className = "px-1 rounded"
        >{isUpdating?(
            <>
              <Loader2Icon className="animate-spin" />
                {filter === "6" ? "Restoring" : "Archiving"}
            </>
            ):(

            (filter === "6") ? "Restore" : "Archive")
         }
        </Button>
      )
      }
      <Button variant="secondary" className="rounded-l-none px-0  " onClick={() => setIsDefault(prev => !prev)}
        style={{
            backgroundColor: 'var(--tg-secondary-bg-color)',
            color: 'var(--tg-hint-color)'
          }}

      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  )
}
