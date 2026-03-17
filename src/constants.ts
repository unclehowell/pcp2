export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'FCA' | 'Court' | 'Consumer';
  slug: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'FCA Launches Investigation into Car Finance Commissions',
    excerpt: 'The Financial Conduct Authority has announced a major probe into historical discretionary commission arrangements.',
    date: '2024-01-11',
    category: 'FCA',
    slug: 'fca-investigation-announcement'
  },
  {
    id: '2',
    title: 'Court of Appeal Rules in Favor of Consumers in Landmark Case',
    excerpt: 'A significant ruling has cleared the way for thousands of motorists to claim compensation for mis-sold PCP deals.',
    date: '2024-02-15',
    category: 'Court',
    slug: 'court-of-appeal-ruling'
  },
  {
    id: '3',
    title: 'How to Spot if Your Car Finance Was Mis-sold',
    excerpt: 'Many consumers are unaware they were overcharged. Here are the key red flags to look out for in your contract.',
    date: '2024-03-01',
    category: 'Consumer',
    slug: 'how-to-spot-mis-selling'
  }
];

export interface ClaimFormData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone: string;
  email: string;
  addresses: {
    buildingNumber: string;
    thoroughfare: string;
    townOrCity: string;
    postcode: string;
  };
}
