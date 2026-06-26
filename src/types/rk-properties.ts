export interface Project {
  id: string;
  name: string;
  type: 'Residential Project' | 'Investment Plots' | 'Premium Township' | 'Verified Estates';
  status: 'Pre-launch' | 'Selling Fast' | 'Almost Sold Out' | 'Fully Developed';
  location: string;
  size: string;
  price: string;
  priceVal: number;
  appreciationRate: number;
  amenities: string[];
  description: string;
  highlights: string[];
  roiProjection5Yr: string;
  roiProjection10Yr: string;
  details: string;
  image: string;
  gallery?: string[];
  tag: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectInterest: string;
  category: string;
  status: 'New' | 'Interested' | 'Site Visit' | 'Negotiation' | 'Deal Won' | 'Archived';
  date: string;
  notes: string;
  budget: string;
  siteVisitDate?: string;
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
  category: 'NRI Investor' | 'Business Owner' | 'Retired Professional' | 'High-Caliber Professional' | 'Local Developer';
  initials: string;
  projectBought: string;
  appreciationObserved: string;
}

export interface CustomerSegment {
  name: string;
  painPoints: string[];
  goals: string[];
  buyingTriggers: string[];
  emotionalNeeds: string[];
  financialMotivations: string[];
  contentStrategy: string[];
  conversionStrategy: string[];
}

export interface CompetitorItem {
  name: string;
  focus: string;
  strength: string;
  vulnerability: string;
  rkDifferentiator: string;
}

export interface KeywordCluster {
  topic: string;
  keywords: string[];
  targetIntent: 'Informational' | 'Transactional' | 'Commercial';
  searchVolume: string;
}