'use client';
import {useEffect} from 'react'
import TailorOrderSystem from '@/components/registration/main_registration';
import { useTelegram } from '@/lib/telegram';
import useTelegramTheme from '@/lib/theme';

 const KeeperPage = () => {
  const tg = useTelegram();
  const theme = useTelegramTheme();
   
  useEffect(() => {
    
    if (tg) { 

    tg.ready()
    tg.expand()
    }

  }, [tg, theme])


  return (
    <div className="w-full"
      style={{
        backgroundColor: 'var(--tg-bg-color)',
        color: 'var(--tg-text-color)'
      }}

    > 
     <TailorOrderSystem /> 
    </div>
  );
}

export default KeeperPage;
