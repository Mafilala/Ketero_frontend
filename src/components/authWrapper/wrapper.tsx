'use client'

import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useVerifyTg } from './hooks'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children}: AuthWrapperProps) {
  const searchParams = useSearchParams()

  const queryObj = useMemo(() => {
    const obj: Record<string, string> = {}
    for (const [key, value] of searchParams.entries()) {
      obj[key] = value
    }
    return obj
  }, [searchParams])

  const shouldSkip =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('telegram_verified') === 'true'

  const { data, isLoading  } = useVerifyTg(shouldSkip, queryObj)

  useEffect(() => {
    if (data?.verified) {
      sessionStorage.setItem('telegram_verified', 'true')
    }
  }, [data])

    if (shouldSkip || data?.verified) {
      return <>{children}</>
    }

    if (isLoading) {
      return (
        <div className="h-screen flex items-center justify-center flex-col">
          <Loader2 className="animate-spin h-6 w-6 mb-2" />
          <p className="text-sm text-muted-foreground">Verifying Telegram user...</p>
        </div>
      )
    }

    return (
      <div className="h-screen flex items-center justify-center flex-col gap-2">
        <p className="text-red-500 font-semibold">Unauthorized</p>
        <p className="text-sm text-muted-foreground">Please access this page via Telegram bot.</p>
        <Button onClick={() => location.reload()}>Retry</Button>
      </div>
    )
}
