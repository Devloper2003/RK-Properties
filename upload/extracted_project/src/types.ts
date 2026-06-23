export interface Project {
  id: string;
  name: string;
  type: 'Residential Project' | 'Investment Plots' | 'Premium Township' | 'Verified Estates';
  status: 'Pre-launch' | 'Selling Fast' | 'Almost Sold Out' | 'Fully Developed';
  location: string;
  size: string; // e.g. "100 - 500 Sq. Yards"
  price: string; // e.g. "₹22,000 / Sq. Yard"
  priceVal: number; // raw value for calculations
  appreciationRate: number; // e.g. 18%
  amenities: string[];
  description: string;
  highlights: string[];
  roiProjection5Yr: string;
  roiProjection10Yr: string;
  details: string;
  image: string;
  tag: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectInterest: string;
  category: string; // e.g. "NRI Investor", "Doctor", "Retired Couple"
  status: 'New' | 'Interested' | 'Site Visit' | 'Negotiation' | 'Deal Won' | 'Archived';
  date: string;
  notes: string;
  budget: string;
  siteVisitDate?: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
  slug: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Legal/Registry' | 'Investment' | 'Vrindavan Growth' | 'Project Approvals';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  category: 'NRI Investor' | 'Business Owner' | 'Retired Professional' | 'Local Developer';
  initials: string;
  projectBought: string;
  appreciationObserved: string;
}
