'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LanguagesSupported,
  LanguagesSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from '@/store/store';
import LoadingSpinner from './loadingSpinner';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function LanguageSelect() {
  const [language, setLanguage, getLanguages /*, getNotSupportedLanguages*/] = useLanguageStore(
    (state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages, // Uncomment for PRO language segmentation
    ],
  );

  const subscription = useSubscriptionStore((state) => state.subscription);
  // const isPro = subscription?.role === 'pro'; // Restore for PRO feature separation

  const pathName = usePathname();
  const isChatPage = pathName.includes('/chat');

  return (
    isChatPage && (
      <div>
        <Select onValueChange={(value: LanguagesSupported) => setLanguage(value)}>
          <SelectTrigger className='w-[150px] text-black dark:text-white'>
            <SelectValue placeholder={LanguagesSupportedMap[language]} />
          </SelectTrigger>

          <SelectContent>
            {subscription === undefined ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* BETA: Show all languages freely during beta period */}
                {getLanguages(true).map((language) => (
                  <SelectItem key={language} value={language}>
                    {LanguagesSupportedMap[language]}
                  </SelectItem>
                ))}

                {/* 
                // Uncomment below to disable and label PRO-only languages
                {getNotSupportedLanguages(isPro).map((language) => (
                  <Link href={'/register'} key={language} prefetch={false}>
                    <SelectItem
                      key={language}
                      value={language}
                      disabled
                      className='bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1'
                    >
                      {LanguagesSupportedMap[language]} (PRO)
                    </SelectItem>
                  </Link>
                ))} 
                */}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );
}

export default LanguageSelect;
