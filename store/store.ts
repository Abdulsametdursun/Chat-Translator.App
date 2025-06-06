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

  getLanguages: (_isPro: boolean) => {
    // All languages enabled for all users
    // 🔒 In production, restrict for non-Pro users:
    // if (_isPro) return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];
    // return Object.keys(LanguagesSupportedMap).slice(0, 2) as LanguagesSupported[];
    return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];
  },

  getNotSupportedLanguages: (_isPro: boolean) => {
    // No language shown as locked
    // 🔒 In production, show restricted languages to non-Pro users:
    // if (_isPro) return [];
    // return Object.keys(LanguagesSupportedMap).slice(2) as LanguagesSupported[];
    return [];
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
    // Always return false (no Pro access)
    // 🔒 In production, enable this check:
    // const subscription = get().subscription;
    // return subscription?.status === 'active' && subscription?.role === 'pro';
    return false;
  },
}));
