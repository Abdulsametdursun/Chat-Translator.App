'use client';

import { useEffect, useState } from 'react';
import { useLanguageStore } from '@/store/store';
import { Message } from '@/lib/converters/Message';

function TranslatedMessage({ message }: { message: Message }) {
  const { language } = useLanguageStore();
  const [translated, setTranslated] = useState<string>(message.input);

  useEffect(() => {
    if (!message?.input || !language) return;

    console.log('🔍 Detected:', message.detectedLanguage, '| Target:', language);

    if (message.detectedLanguage === language) {
      setTranslated(message.input);
      return;
    }

    async function fetchTranslation() {
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          body: JSON.stringify({
            text: message.input,
            targetLanguage: language,
          }),
        });

        const data = await res.json();
        setTranslated(data.translatedText || message.input);
      } catch (err) {
        console.error('Translation failed', err);
        setTranslated(message.input);
      }
    }

    fetchTranslation();
  }, [message, message?.input, message?.detectedLanguage, language]);

  return <span>{translated || message.input}</span>;
}

export default TranslatedMessage;
