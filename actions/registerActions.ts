'use server';

import { authOptions } from '@/auth';
import { adminDb } from '@/firebase-admin';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export async function generatePortalLink() {
  const session = await getServerSession(authOptions);
  const host = headers().get('host');

  if (!session?.user.id) return console.error('No user Id found');
  const {
    user: { id },
  } = session;

  const returnUrl =
    process.env.NODE_ENV === 'development' ? `http://${host}/register` : `https://${host}/register`;

  const doc = await adminDb.collection('customers').doc(id).get();
  if (!doc.data) return console.error('No customer record found with userId: ', id);

  const stripeId = doc.data()!.stripeId;
  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: returnUrl,
  });

  redirect(stripeSession.url);
}
