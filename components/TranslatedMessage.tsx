'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useLanguageStore, LanguagesSupportedMap } from '@/store/store';

interface TranslatedMessageProps {
  text: string;
  senderId: string;
}

export default function TranslatedMessage({ text, senderId }: TranslatedMessageProps) {
  const [translatedText, setTranslatedText] = useState<string>('');
  const language = useLanguageStore((state) => state.language);
  const { data: session } = useSession();

  const isSender = session?.user?.id === senderId;

  useEffect(() => {
    if (isSender) {
      setTranslatedText(text);
      return;
    }

    const translate = async () => {
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            targetLanguage: LanguagesSupportedMap[language],
          }),
        });

        const data = await res.json();
        setTranslatedText(data.translatedText);
      } catch (error) {
        setTranslatedText('(Translation failed)');
      }
    };

    translate();
  }, [text, language, isSender]);

  return <span>{translatedText || '...'}</span>;
}
