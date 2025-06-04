import { create } from 'zustand';
import { Subscription } from '@/types/Subscription';

export type LanguagesSupported = 'en' | 'de' | 'fr' | 'es' | 'ja' | 'ru' | 'tr';

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: 'English',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  ja: 'Japanese',
  ru: 'Russian',
  tr: 'Turkish',
};

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: 'en',
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    // If the user is pro, return all supported languages
    if (isPro) return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

    // If not pro, return only the first two languages
    return Object.keys(LanguagesSupportedMap).slice(0, 2) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return []; // No unsupported languages for "pro" users
    return Object.keys(LanguagesSupportedMap).slice(2) as LanguagesSupported[]; // Excluding the first two supported languages
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
  isPro: () => boolean;
}

export const useSubscriptionStore = create<SubscriptionState>()((set, get) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
  isPro: () => {
    const subscription = get().subscription;
    if (!subscription) return false;
    return subscription.status === 'active' && subscription.role === 'pro';
  },
}));
