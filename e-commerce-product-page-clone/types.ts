export interface Review {
  id: number;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpfulVotes: number;
  author: string;
  images: string[];
}

export interface SimpleProduct {
  id: string;
  name: string;
  image: string;
  originalPrice?: number;
  currentPrice: number;
  installments?: {
    count: number;
    value: number;
  };
  coupon?: string;
  freeShipping?: boolean;
}

export interface Breadcrumb {
    name: string;
    link?: string;
}

export interface StoreMetric {
  icon: 'sales' | 'service' | 'delivery';
  value?: string;
  description: string;
}

export interface StoreInfo {
  name: string;
  officialStore: string;
  logo: string;
  level: string;
  levelDescription: string;
  reputationColors: string[];
  metrics: StoreMetric[];
}

export interface DescriptionSection {
    title: string;
    content: string | string[];
}

export interface Product {
  id: string;
  name: string;
  images: string[];
  status: string;
  sold: number;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  currentPrice: number;
  dealOfTheDay?: boolean;
  installments: {
    count: number;
    value: number;
  };
  shipping: {
    free: boolean;
    eta: string;
  };
  stock: number;
  sellerProducts: SimpleProduct[];
  highlights: string[];
  characteristics: {
      category: string;
      specs: {
          label: string;
          value: string;
      }[];
  }[];
  storeInfo: StoreInfo;
  description: DescriptionSection[];
  reviews: Review[];
  relatedProducts: SimpleProduct[];
  breadcrumbs: Breadcrumb[];
}