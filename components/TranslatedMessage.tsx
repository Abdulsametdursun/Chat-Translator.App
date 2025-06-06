'use client';

import { useEffect, useState } from 'react';
import { useLanguageStore } from '@/store/store';
import { useSession } from 'next-auth/react';
import { Message } from '@/lib/converters/Message';

function TranslatedMessage({ message }: { message?: Message }) {
  const { language } = useLanguageStore();
  const { data: session } = useSession();

  // 👇 useState always called with fallback default
  const [translated, setTranslated] = useState<string>('');

  useEffect(() => {
    // 👇 Only proceed if message and input exist
    if (!message || !message.input || !language) return;

    // 👇 If already in correct language, skip translation
    if (message.detectedLanguage === language) {
      setTranslated(message.input);
      return;
    }

    // 👇 Translation fetch logic
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
  }, [message?.input, message?.detectedLanguage, language]);

  if (!message) return null;

  return <span>{translated || message.input}</span>;
}

export default TranslatedMessage;
