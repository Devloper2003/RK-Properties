'use client';

import { create } from 'zustand';
import { Project, Lead } from '@/types/rk-properties';
import { propertiesData } from '@/data/propertyData';

interface PropertyStoreState {
  // Data
  projects: Project[];
  selectedProjectForContact: string;
  selectedCategoryFilter: string;

  // UI State
  isBlueprintOpen: boolean;
  mobileMenuOpen: boolean;
  mounted: boolean;

  // Actions
  setProjects: (projects: Project[]) => void;
  setSelectedProjectForContact: (name: string) => void;
  setSelectedCategoryFilter: (filter: string) => void;
  setIsBlueprintOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setMounted: (mounted: boolean) => void;
  addLead: (leadData: Omit<Lead, 'id' | 'date'>) => Promise<void>;
  scrollToId: (id: string) => void;
}

export const usePropertyStore = create<PropertyStoreState>((set, get) => ({
  // Initialize projects from localStorage or default data
  projects: (() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('rk_projects_v1');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return propertiesData;
  })(),

  selectedProjectForContact: '',
  selectedCategoryFilter: 'All',
  isBlueprintOpen: false,
  mobileMenuOpen: false,
  mounted: false,

  setProjects: (projects) => {
    set({ projects });
    if (typeof window !== 'undefined') {
      localStorage.setItem('rk_projects_v1', JSON.stringify(projects));
    }
  },

  setSelectedProjectForContact: (name) => set({ selectedProjectForContact: name }),

  setSelectedCategoryFilter: (filter) => set({ selectedCategoryFilter: filter }),

  setIsBlueprintOpen: (open) => set({ isBlueprintOpen: open }),

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  setMounted: (mounted) => set({ mounted }),

  addLead: async (leadData) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Math.floor(Math.random() * 89999 + 10000)}`,
      date: new Date().toISOString()
    };

    // Save to database
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
    } catch (e) {
      console.error('Failed to save lead to database', e);
    }
  },

  scrollToId: (id) => {
    set({ mobileMenuOpen: false });
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}));