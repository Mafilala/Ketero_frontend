export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData?: string;
        version?: string;
        platform?: string;
        colorScheme?: 'light' | 'dark';
        themeParams?: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
          header_bg_color?: string;
        };
        isExpanded?: boolean;
        isClosingConfirmationEnabled?: boolean;
        showAlert: (message: string, callback?: () => void) => void;

        expand: () => void;
        close: () => void;
        ready: () => void;
        sendData: (data: string) => void;
        onEvent: (eventType: string, handler: () => void) => void;
        offEvent: (eventType: string, handler: () => void) => void;
        };
    };
  }
}

