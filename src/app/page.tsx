'use client';

import { useEffect } from 'react';
import { useTelegram } from '@/lib/telegram';
import useTelegramTheme from '@/lib/theme';
export default function HomePage() {
  const tg = useTelegram();
  const theme = useTelegramTheme()
 
  useEffect(() => {
    
    if (tg) { 

    tg.ready()
    tg.expand()
    }

  }, [tg, theme]);

  return (
    <div className="h-full" 
      style={{
        backgroundColor: 'var(--tg-bg-color)',
        color: 'var(--tg-text-color)'
      }}
    >
      Hello, Good people 
    </div>
  );
}

