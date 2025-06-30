
import AuthWrapper from '@/components/authWrapper/wrapper'
import { ReactNode } from 'react'

export default function KeeperLayout({ children }: { children: ReactNode }) {
  return <AuthWrapper>{children}</AuthWrapper>
}
