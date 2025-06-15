'use client';

import { useEffect } from 'react';

export default function useTelegramTheme() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    // Wait until Telegram is ready before calling showAlert
    tg.ready();

    const root = document.documentElement.style;
    const theme = tg.themeParams;

    if (theme) {
      root.setProperty('--tg-bg-color', theme.bg_color ?? '#ffffff');
      root.setProperty('--tg-text-color', theme.text_color ?? '#000000');
      root.setProperty('--tg-button-color', theme.button_color ?? '#2ea6ff');
      root.setProperty('--tg-button-text-color', theme.button_text_color ?? '#ffffff');

      }
  }, []);
}

