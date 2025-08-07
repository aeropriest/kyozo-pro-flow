import { PricingCardData } from '../types';

export const pricingData: PricingCardData[] = [
  {
    title: 'Starter',
    subtitle: 'Perfect for individuals',
    price: '$19',
    priceDescription: 'per month',
    features: [
      '5 projects',
      '10GB storage',
      'Basic support',
      'Email support',
      'API access',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    subtitleColor: 'blue-400',
  },
  {
    title: 'Pro',
    subtitle: 'For growing teams',
    price: '$49',
    priceDescription: 'per month',
    features: [
      'Unlimited projects',
      '100GB storage',
      'Priority support',
      '24/7 support',
      'Advanced analytics',
      'API access',
    ],
    gradient: 'from-purple-500 to-pink-500',
    subtitleColor: 'purple-400',
  },
];
