'use client';

import { create } from 'zustand';
import { Project, Lead } from '@/types/rk-properties';
import { propertiesData } from '@/data/propertyData';

export type OverlayPageId =
  | 'premium-projects'
  | 'why-vrindavan'
  | 'location'
  | 'investment-calculator'
  | 'our-strategy'
  | 'registry-faqs'
  | 'project-detail';

interface PropertyStoreState {
  // Data
  projects: Project[];
  selectedProjectForContact: string;
  selectedCategoryFilter: string;

  // UI State
  mobileMenuOpen: boolean;
  mounted: boolean;
  recentlyViewed: string[];
  activeOverlay: OverlayPageId | null;
  selectedProjectId: string | null;

  // Actions
  setProjects: (projects: Project[]) => void;
  setSelectedProjectForContact: (name: string) => void;
  setSelectedCategoryFilter: (filter: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setMounted: (mounted: boolean) => void;
  addLead: (leadData: Omit<Lead, 'id' | 'date'>) => Promise<void>;
  scrollToId: (id: string) => void;
  addRecentlyViewed: (projectId: string) => void;
  openOverlay: (pageId: OverlayPageId, projectId?: string) => void;
  closeOverlay: () => void;
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
  activeOverlay: null,
  selectedProjectId: null,

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
  },

  openOverlay: (pageId, projectId) => {
    set({
      activeOverlay: pageId,
      selectedProjectId: projectId ?? null,
      mobileMenuOpen: false,
    });
    // Track recently viewed
    if (pageId === 'project-detail' && projectId) {
      get().addRecentlyViewed(projectId);
    }
    // Scroll to top of page
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  closeOverlay: () => {
    set({ activeOverlay: null, selectedProjectId: null });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
  },
}));