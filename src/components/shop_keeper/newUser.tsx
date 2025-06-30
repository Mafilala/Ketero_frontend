import { CreateUser } from "@/types/types"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {Loader2} from "lucide-react"

interface NewUserInterface {
   handleAdd: (newUser: CreateUser) => void;
   isPending: boolean;
   handleAddUserState: () => void
   isSuccess: boolean

}

const NewUser = ({ handleAdd, isPending, handleAddUserState, isSuccess }: NewUserInterface) => {
  const [userState, setUserState] = useState<CreateUser>({
    name: '',
    telegram_id: '',
    role: 'shopkeeper',
  })

  const isActive = userState.telegram_id && userState.name

  const handleChange = (field: keyof CreateUser) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setUserState(prev => ({
      ...prev,
      [field]: field === 'telegram_id' ? Number(value) : value,
    }))
  }

  useEffect(() => {
    if (isSuccess) {
      handleAddUserState()
    }
  }, [isSuccess])

  return (
    <div className="space-y-2">
      <Input placeholder="Name" value={userState.name} onChange={handleChange('name')} />
      <div className="flex justify-between">
        <Input
          type="number"
          placeholder="Telegram ID"
          value={userState.telegram_id}
          onChange={handleChange('telegram_id')}
        />
        <Button
          onClick={() => handleAdd(userState)}
          disabled={!isActive}
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Add"}
        </Button>
      </div>
    </div>
  )
}

export default NewUser
