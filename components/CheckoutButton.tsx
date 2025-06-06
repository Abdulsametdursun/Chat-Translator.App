'use client';

import { db } from '@/firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

import { useSubscriptionStore } from '@/store/store';
import ManageAccountButton from './ManageAccountButton';
import { useSession } from 'next-auth/react';
import LoadingSpinner from './loadingSpinner';

function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);

  const { data: session } = useSession();

  // Track subscription status — currently not used in beta
  const isLoadingSubscription = subscription === undefined;
  const isSubscribed = subscription?.status === 'active' && subscription?.role === 'pro';

  // Stripe Checkout logic (commented out for beta)
  const createCheckoutSession = async () => {
    if (!session?.user.id) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, 'customers', session.user.id, 'checkout_sessions'), {
      price: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_PRICE_ID, // Replace with your Stripe product price ID
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`An error occurred: ${error.message}`);
        setLoading(false);
      }
      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    });
  };

  return (
    <div className='flex flex-col space-y-2'>
      {/* PRO Subscription Message */}
      {/*
      {isSubscribed && (
        <>
          <hr className='mt-5' />
          <p className='pt-5 text-center text-xs text-indigo-600'>You are subscribed to PRO</p>
        </>
      )}
      */}

      <div className='mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default'>
        {/* Subscription condition check */}
        {/*
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <LoadingSpinner />
        ) : (
          <button onClick={() => createCheckoutSession()}>Sign Up</button>
        )}
        */}

        {/* 🔵 TEMPORARY: No PRO during beta, so show placeholder */}
        <span>Coming Soon</span>
      </div>
    </div>
  );
}

export default CheckoutButton;
