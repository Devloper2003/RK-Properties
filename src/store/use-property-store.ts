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
  mobileMenuOpen: boolean;
  mounted: boolean;
  recentlyViewed: string[];

  // Actions
  setProjects: (projects: Project[]) => void;
  setSelectedProjectForContact: (name: string) => void;
  setSelectedCategoryFilter: (filter: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setMounted: (mounted: boolean) => void;
  addLead: (leadData: Omit<Lead, 'id' | 'date'>) => Promise<void>;
  scrollToId: (id: string) => void;
  addRecentlyViewed: (projectId: string) => void;
}

export const usePropertyStore = create<PropertyStoreState>((set) => ({
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
  mobileMenuOpen: false,
  mounted: false,
  recentlyViewed: (() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('rk_recently_viewed');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return [];
  })(),

  setProjects: (projects) => {
    set({ projects });
    if (typeof window !== 'undefined') {
      localStorage.setItem('rk_projects_v1', JSON.stringify(projects));
    }
  },

  setSelectedProjectForContact: (name) => set({ selectedProjectForContact: name }),

  setSelectedCategoryFilter: (filter) => set({ selectedCategoryFilter: filter }),

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  setMounted: (mounted) => set({ mounted }),

  addLead: async (leadData) => {
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
  },

  addRecentlyViewed: (projectId) => {
    set((state) => {
      const filtered = state.recentlyViewed.filter(id => id !== projectId);
      const updated = [projectId, ...filtered].slice(0, 4);
      if (typeof window !== 'undefined') {
        localStorage.setItem('rk_recently_viewed', JSON.stringify(updated));
      }
      return { recentlyViewed: updated };
    });
  }
}));