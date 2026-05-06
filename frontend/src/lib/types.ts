export interface WPImage {
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

export interface WpPage {
  title: string;
  slug: string;
  uri: string;
  content: string;
  seo?: WPSeo;
  homepageFields?: HomepageFields;
  pricingFields?: PricingFields;
  contactFields?: ContactFields;
}

export interface WPSeo {
  title: string;
  metaDesc: string;
  focuskw: string;
  opengraphTitle: string;
  opengraphDescription: string;
  opengraphImage?: WPImage;
}

// ACF Fields
export interface HomepageFields {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaUrl: string;
  heroImage: WPImage;
  features: {
    title: string;
    description: string;
    iconName: string;
  }[];
  testimonials: {
    name: string;
    text: string;
    rating: number;
  }[];
}

export interface PricingFields {
  pricingPlans: {
    name: string;
    price: string;
    period: string;
    isPopular: boolean;
    ctaUrl: string;
    featuresList: string;
  }[];
}

export interface ContactFields {
  emailAddress: string;
  whatsappNumber: string;
  physicalAddress: string;
}

export interface GlobalOptions {
  siteLogo: WPImage;
  footerText: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

export interface WPMenu {
  name: string;
  menuItems: {
    nodes: WPMenuItem[];
  };
}

export interface WPMenuItem {
  id: string;
  label: string;
  path: string;
  url: string;
}

export interface WPPost {
  title: string;
  slug: string;
  uri: string;
  content: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: WPImage;
  };
  seo?: WPSeo;
}
