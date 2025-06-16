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
      root.setProperty('--tg-hint-color', theme.hint_color ?? '#707579');
      root.setProperty('--tg-link-color', theme.link_color ?? '#3390ec');
      root.setProperty('--tg-secondary-bg-color', theme.secondary_bg_color ?? '##f4f4f5');
      }
  }, []);
}

