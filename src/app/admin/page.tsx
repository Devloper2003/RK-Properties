'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  Mail,
  Settings,
  Search,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Menu,
  ChevronRight,
  UserPlus,
  TrendingUp,
  Building,
  Eye,
  FileText,
  Loader2,
  RefreshCw,
  StickyNote,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// ─── Types ───────────────────────────────────────────────────────

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectInterest: string;
  category: string;
  status: string;
  notes: string | null;
  budget: string | null;
  siteVisitDate: string | null;
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  location: string;
  size: string;
  price: string;
  priceVal: number;
  appreciationRate: number;
  amenities: string;
  description: string;
  highlights: string;
  roiProjection5Yr: string;
  roiProjection10Yr: string;
  details: string;
  image: string;
  tag: string;
  createdAt: string;
}

interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalProjects: number;
  totalSubscribers: number;
  leadsByStatus: { status: string; count: number }[];
  recentLeads: Lead[];
  leadsByProject: { project: string; count: number }[];
}

interface SiteSettings {
  bannerText: string;
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
  companyAddress: string;
}

type TabId = 'dashboard' | 'leads' | 'projects' | 'newsletter' | 'settings';

// ─── Status Colors ────────────────────────────────────────────────

const statusColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  Interested: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'Site Visit': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  Negotiation: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  'Deal Won': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Archived: 'bg-gray-100 text-gray-800 dark:bg-gray-800/40 dark:text-gray-400',
};

const projectStatusColors: Record<string, string> = {
  'Pre-launch': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  'Selling Fast': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'Almost Sold Out': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  'Fully Developed': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
};

const LEAD_STATUSES = ['New', 'Interested', 'Site Visit', 'Negotiation', 'Deal Won', 'Archived'];
const PROJECT_STATUSES = ['Pre-launch', 'Selling Fast', 'Almost Sold Out', 'Fully Developed'];
const PROJECT_TYPES = ['Residential Project', 'Investment Plots', 'Premium Township', 'Verified Estates'];

// ─── Component ───────────────────────────────────────────────────

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsCount, setLeadsCount] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    bannerText: '',
    contactPhone: '',
    contactEmail: '',
    whatsappNumber: '',
    companyAddress: '',
  });

  // Loading states
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(false);

  // Filter states
  const [searchLead, setSearchLead] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Dialog states
  const [notesLeadId, setNotesLeadId] = useState<string | null>(null);
  const [notesContent, setNotesContent] = useState('');
  const [deleteLeadId, setDeleteLeadId] = useState<string | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [deleteSubscriberId, setDeleteSubscriberId] = useState<number | null>(null);

  // Project form
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    type: 'Residential Project',
    status: 'Pre-launch',
    location: '',
    size: '',
    price: '',
    priceVal: 0,
    appreciationRate: 18,
    amenities: '',
    description: '',
    highlights: '',
    roiProjection5Yr: '',
    roiProjection10Yr: '',
    details: '',
    image: '',
    tag: '',
  });

  // Action loading
  const [actionLoading, setActionLoading] = useState(false);

  // ─── Fetch Functions ─────────────────────────────────────────

  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats', err);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  const fetchLeads = useCallback(async (search = '', status = '') => {
    setLoadingLeads(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (status) params.set('status', status);
      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
        setLeadsCount(data.count);
      }
    } catch (err) {
      console.error('Failed to fetch leads', err);
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  const fetchSubscribers = useCallback(async () => {
    setLoadingSubscribers(true);
    try {
      const res = await fetch('/api/admin/newsletter');
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
      }
    } catch (err) {
      console.error('Failed to fetch subscribers', err);
    } finally {
      setLoadingSubscribers(false);
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    setLoadingSettings(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error('Failed to fetch settings', err);
    } finally {
      setLoadingSettings(false);
    }
  }, []);

  // ─── Initial Load ─────────────────────────────────────────────

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (activeTab === 'leads') fetchLeads();
    if (activeTab === 'projects') fetchProjects();
    if (activeTab === 'newsletter') fetchSubscribers();
    if (activeTab === 'settings') fetchSettings();
  }, [activeTab, fetchLeads, fetchProjects, fetchSubscribers, fetchSettings]);

  // ─── Action Handlers ──────────────────────────────────────────

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchLeads(searchLead, filterStatus);
      fetchStats();
    } catch (err) {
      console.error('Failed to update lead status', err);
    }
  };

  const saveLeadNotes = async () => {
    if (!notesLeadId) return;
    setActionLoading(true);
    try {
      await fetch(`/api/admin/leads/${notesLeadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesContent }),
      });
      setNotesLeadId(null);
      setNotesContent('');
      fetchLeads(searchLead, filterStatus);
    } catch (err) {
      console.error('Failed to save notes', err);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteLead = async () => {
    if (!deleteLeadId) return;
    setActionLoading(true);
    try {
      await fetch(`/api/admin/leads/${deleteLeadId}`, { method: 'DELETE' });
      setDeleteLeadId(null);
      fetchLeads(searchLead, filterStatus);
      fetchStats();
    } catch (err) {
      console.error('Failed to delete lead', err);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteProject = async () => {
    if (!deleteProjectId) return;
    setActionLoading(true);
    try {
      await fetch(`/api/admin/projects/${deleteProjectId}`, { method: 'DELETE' });
      setDeleteProjectId(null);
      fetchProjects();
      fetchStats();
    } catch (err) {
      console.error('Failed to delete project', err);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteSubscriber = async () => {
    if (!deleteSubscriberId) return;
    setActionLoading(true);
    try {
      await fetch(`/api/admin/newsletter/${deleteSubscriberId}`, { method: 'DELETE' });
      setDeleteSubscriberId(null);
      fetchSubscribers();
      fetchStats();
    } catch (err) {
      console.error('Failed to delete subscriber', err);
    } finally {
      setActionLoading(false);
    }
  };

  const openEditProject = (project: Project | null) => {
    setEditingProject(project);
    if (project) {
      setProjectForm({
        name: project.name,
        type: project.type,
        status: project.status,
        location: project.location,
        size: project.size,
        price: project.price,
        priceVal: project.priceVal,
        appreciationRate: project.appreciationRate,
        amenities: project.amenities,
        description: project.description,
        highlights: project.highlights,
        roiProjection5Yr: project.roiProjection5Yr,
        roiProjection10Yr: project.roiProjection10Yr,
        details: project.details,
        image: project.image,
        tag: project.tag,
      });
    } else {
      setProjectForm({
        name: '',
        type: 'Residential Project',
        status: 'Pre-launch',
        location: '',
        size: '',
        price: '',
        priceVal: 0,
        appreciationRate: 18,
        amenities: '',
        description: '',
        highlights: '',
        roiProjection5Yr: '',
        roiProjection10Yr: '',
        details: '',
        image: '',
        tag: '',
      });
    }
    setProjectDialogOpen(true);
  };

  const saveProject = async () => {
    setActionLoading(true);
    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject.id}`
        : '/api/admin/projects';
      const method = editingProject ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm),
      });
      if (res.ok) {
        setProjectDialogOpen(false);
        setEditingProject(null);
        fetchProjects();
        if (!editingProject) fetchStats();
      }
    } catch (err) {
      console.error('Failed to save project', err);
    } finally {
      setActionLoading(false);
    }
  };

  const saveSettings = async () => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        // saved
      }
    } catch (err) {
      console.error('Failed to save settings', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSearch = () => {
    fetchLeads(searchLead, filterStatus);
  };

  const handleStatusFilter = (val: string) => {
    setFilterStatus(val === '__all__' ? '' : val);
    fetchLeads(searchLead, val === '__all__' ? '' : val);
  };

  // ─── Sidebar Nav Items ────────────────────────────────────────

  const navItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="size-5" /> },
    { id: 'leads', label: 'Leads', icon: <Users className="size-5" /> },
    { id: 'projects', label: 'Projects', icon: <Building2 className="size-5" /> },
    { id: 'newsletter', label: 'Newsletter', icon: <Mail className="size-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="size-5" /> },
  ];

  // ─── Format Date ───────────────────────────────────────────────

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex bg-gold-50/50 dark:bg-gray-950">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-gray-950 border-r border-gold-200/50 dark:border-gold-800/30 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="p-5 border-b border-gold-200/50 dark:border-gold-800/30">
          <h1 className="text-lg font-bold text-gold-800 dark:text-gold-200 font-serif">
            RK Properties
          </h1>
          <p className="text-xs text-gold-600 dark:text-gold-500 mt-0.5">Admin Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === item.id
                  ? 'bg-gold-50 dark:bg-gold-900/30 text-gold-800 dark:text-gold-200 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gold-50/50 dark:hover:bg-gold-900/15 hover:text-gold-700 dark:hover:text-gold-300'
              }`}
            >
              {item.icon}
              {item.label}
              {activeTab === item.id && (
                <ChevronRight className="size-4 ml-auto text-gold-500" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gold-200/50 dark:border-gold-800/30">
          <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
            v1.0 &middot; Admin Panel
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gold-200/50 dark:border-gold-800/30 px-4 lg:px-8 py-3 flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gold-50 dark:hover:bg-gold-900/30 text-gold-700 dark:text-gold-300"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="size-5" />
          </button>
          <h2 className="text-lg font-semibold text-gold-800 dark:text-gold-200 capitalize">
            {activeTab}
          </h2>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                fetchStats();
                if (activeTab === 'leads') fetchLeads(searchLead, filterStatus);
                if (activeTab === 'projects') fetchProjects();
                if (activeTab === 'newsletter') fetchSubscribers();
                if (activeTab === 'settings') fetchSettings();
              }}
              className="text-gold-600 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-200"
            >
              <RefreshCw className="size-4" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 lg:p-8">
          {/* ═══════════════ DASHBOARD TAB ═══════════════ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {loadingStats ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-28 rounded-xl" />
                  ))}
                </div>
              ) : stats ? (
                <>
                  {/* Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Leads</p>
                            <p className="text-3xl font-bold text-gold-800 dark:text-gold-200 mt-1">
                              {stats.totalLeads}
                            </p>
                          </div>
                          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                            <Users className="size-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">New Leads</p>
                            <p className="text-3xl font-bold text-gold-800 dark:text-gold-200 mt-1">
                              {stats.newLeads}
                            </p>
                          </div>
                          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                            <UserPlus className="size-6 text-amber-600 dark:text-amber-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
                            <p className="text-3xl font-bold text-gold-800 dark:text-gold-200 mt-1">
                              {stats.totalProjects}
                            </p>
                          </div>
                          <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                            <Building className="size-6 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Newsletter</p>
                            <p className="text-3xl font-bold text-gold-800 dark:text-gold-200 mt-1">
                              {stats.totalSubscribers}
                            </p>
                          </div>
                          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                            <Mail className="size-6 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Leads */}
                    <Card className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base text-gold-800 dark:text-gold-200 flex items-center gap-2">
                          <Eye className="size-4" />
                          Recent Leads
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-gold-100 dark:border-gold-800/30">
                              <TableHead className="text-gold-600 dark:text-gold-400">Name</TableHead>
                              <TableHead className="text-gold-600 dark:text-gold-400">Email</TableHead>
                              <TableHead className="text-gold-600 dark:text-gold-400">Project</TableHead>
                              <TableHead className="text-gold-600 dark:text-gold-400">Status</TableHead>
                              <TableHead className="text-gold-600 dark:text-gold-400">Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {stats.recentLeads.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                                  No leads yet
                                </TableCell>
                              </TableRow>
                            ) : (
                              stats.recentLeads.map((lead) => (
                                <TableRow key={lead.id} className="border-gold-50 dark:border-gold-800/20">
                                  <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                                    {lead.name}
                                  </TableCell>
                                  <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                    {lead.email}
                                  </TableCell>
                                  <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                    {lead.projectInterest}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="secondary"
                                      className={statusColors[lead.status] || ''}
                                    >
                                      {lead.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                    {formatDate(lead.createdAt)}
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    {/* Sidebar breakdowns */}
                    <div className="space-y-6">
                      {/* Leads by Status */}
                      <Card className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base text-gold-800 dark:text-gold-200 flex items-center gap-2">
                            <TrendingUp className="size-4" />
                            Leads by Status
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2.5">
                            {stats.leadsByStatus.length === 0 ? (
                              <p className="text-gray-400 text-sm text-center py-4">No data</p>
                            ) : (
                              stats.leadsByStatus.map((item) => (
                                <div key={item.status} className="flex items-center justify-between gap-3">
                                  <Badge
                                    variant="secondary"
                                    className={statusColors[item.status] || ''}
                                  >
                                    {item.status}
                                  </Badge>
                                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {item.count}
                                  </span>
                                  <div className="flex-1">
                                    <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                      <div
                                        className="h-full rounded-full bg-gold-500 dark:bg-gold-600 transition-all"
                                        style={{
                                          width: `${stats.totalLeads > 0 ? (item.count / stats.totalLeads) * 100 : 0}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Leads by Project */}
                      <Card className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base text-gold-800 dark:text-gold-200 flex items-center gap-2">
                            <Building2 className="size-4" />
                            Leads by Project
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2.5">
                            {stats.leadsByProject.length === 0 ? (
                              <p className="text-gray-400 text-sm text-center py-4">No data</p>
                            ) : (
                              stats.leadsByProject.map((item) => (
                                <div key={item.project} className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-400 truncate mr-2">
                                    {item.project}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="bg-gold-100 text-gold-800 dark:bg-gold-900/30 dark:text-gold-300 shrink-0"
                                  >
                                    {item.count}
                                  </Badge>
                                </div>
                              ))
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* ═══════════════ LEADS TAB ═══════════════ */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Search by name, email, phone..."
                    value={searchLead}
                    onChange={(e) => setSearchLead(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="max-w-sm border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-900"
                  />
                  <Button
                    onClick={handleSearch}
                    className="bg-gold-600 hover:bg-gold-700 text-white"
                  >
                    <Search className="size-4" />
                  </Button>
                </div>
                <Select value={filterStatus || '__all__'} onValueChange={handleStatusFilter}>
                  <SelectTrigger className="w-40 border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-900">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">All Status</SelectItem>
                    {LEAD_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center">
                  <Badge variant="secondary" className="bg-gold-100 text-gold-800 dark:bg-gold-900/30 dark:text-gold-300 text-sm px-3 py-1">
                    {leadsCount} leads
                  </Badge>
                </div>
              </div>

              {/* Table */}
              <Card className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                <CardContent className="p-0">
                  <div className="overflow-x-auto max-h-[calc(100vh-280px)] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gold-100 dark:border-gold-800/30">
                          <TableHead className="text-gold-600 dark:text-gold-400">Name</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Email</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Phone</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Project</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Category</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Status</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Date</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadingLeads ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-12">
                              <Loader2 className="size-6 animate-spin mx-auto text-gold-500" />
                            </TableCell>
                          </TableRow>
                        ) : leads.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center text-gray-400 py-12">
                              No leads found
                            </TableCell>
                          </TableRow>
                        ) : (
                          leads.map((lead) => (
                            <TableRow key={lead.id} className="border-gold-50 dark:border-gold-800/20 hover:bg-gold-50/50 dark:hover:bg-gold-900/10">
                              <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                                {lead.name}
                              </TableCell>
                              <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                {lead.email}
                              </TableCell>
                              <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                {lead.phone}
                              </TableCell>
                              <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                {lead.projectInterest || '—'}
                              </TableCell>
                              <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                {lead.category || '—'}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="secondary"
                                  className={statusColors[lead.status] || ''}
                                >
                                  {lead.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                {formatDate(lead.createdAt)}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1.5">
                                  <Select
                                    value={lead.status}
                                    onValueChange={(val) => updateLeadStatus(lead.id, val)}
                                  >
                                    <SelectTrigger className="h-7 w-28 text-xs border-gold-200 dark:border-gold-800/40">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {LEAD_STATUSES.map((s) => (
                                        <SelectItem key={s} value={s}>
                                          {s}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 text-gray-400 hover:text-gold-600 dark:hover:text-gold-400"
                                    onClick={() => {
                                      setNotesLeadId(lead.id);
                                      setNotesContent(lead.notes || '');
                                    }}
                                    title="Add Notes"
                                  >
                                    <StickyNote className="size-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                                    onClick={() => setDeleteLeadId(lead.id)}
                                    title="Delete"
                                  >
                                    <Trash2 className="size-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ═══════════════ PROJECTS TAB ═══════════════ */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">
                  {projects.length} projects
                </h3>
                <Button
                  onClick={() => openEditProject(null)}
                  className="bg-gold-600 hover:bg-gold-700 text-white"
                >
                  <Plus className="size-4 mr-2" />
                  Add New Project
                </Button>
              </div>

              <Card className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                <CardContent className="p-0">
                  <div className="overflow-x-auto max-h-[calc(100vh-280px)] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gold-100 dark:border-gold-800/30">
                          <TableHead className="text-gold-600 dark:text-gold-400">Name</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Type</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Status</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Location</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Price</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Appr.</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadingProjects ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-12">
                              <Loader2 className="size-6 animate-spin mx-auto text-gold-500" />
                            </TableCell>
                          </TableRow>
                        ) : projects.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-400 py-12">
                              No projects yet. Click &quot;Add New Project&quot; to create one.
                            </TableCell>
                          </TableRow>
                        ) : (
                          projects.map((project) => (
                            <TableRow key={project.id} className="border-gold-50 dark:border-gold-800/20 hover:bg-gold-50/50 dark:hover:bg-gold-900/10">
                              <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                                {project.name}
                              </TableCell>
                              <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                {project.type}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="secondary"
                                  className={projectStatusColors[project.status] || ''}
                                >
                                  {project.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                {project.location}
                              </TableCell>
                              <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                {project.price}
                              </TableCell>
                              <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                {project.appreciationRate}%
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1.5">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 text-gray-400 hover:text-gold-600 dark:hover:text-gold-400"
                                    onClick={() => openEditProject(project)}
                                    title="Edit"
                                  >
                                    <Edit className="size-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                                    onClick={() => setDeleteProjectId(project.id)}
                                    title="Delete"
                                  >
                                    <Trash2 className="size-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ═══════════════ NEWSLETTER TAB ═══════════════ */}
          {activeTab === 'newsletter' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">
                  {subscribers.length} subscribers
                </h3>
              </div>

              <Card className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                <CardContent className="p-0">
                  <div className="overflow-x-auto max-h-[calc(100vh-280px)] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gold-100 dark:border-gold-800/30">
                          <TableHead className="text-gold-600 dark:text-gold-400">Email</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Subscribed Date</TableHead>
                          <TableHead className="text-gold-600 dark:text-gold-400">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadingSubscribers ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-12">
                              <Loader2 className="size-6 animate-spin mx-auto text-gold-500" />
                            </TableCell>
                          </TableRow>
                        ) : subscribers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-gray-400 py-12">
                              No newsletter subscribers yet.
                            </TableCell>
                          </TableRow>
                        ) : (
                          subscribers.map((sub) => (
                            <TableRow key={sub.id} className="border-gold-50 dark:border-gold-800/20 hover:bg-gold-50/50 dark:hover:bg-gold-900/10">
                              <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                                <Mail className="size-3.5 inline mr-2 text-gold-500" />
                                {sub.email}
                              </TableCell>
                              <TableCell className="text-gray-500 dark:text-gray-400 text-xs">
                                {formatDate(sub.subscribedAt)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                                  onClick={() => setDeleteSubscriberId(sub.id)}
                                  title="Delete"
                                >
                                  <Trash2 className="size-3.5" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ═══════════════ SETTINGS TAB ═══════════════ */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <Card className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
                <CardHeader>
                  <CardTitle className="text-base text-gold-800 dark:text-gold-200 flex items-center gap-2">
                    <Settings className="size-4" />
                    Site Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {loadingSettings ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-10 rounded-lg" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label className="text-gold-700 dark:text-gold-400">Banner Text</Label>
                        <Textarea
                          value={settings.bannerText}
                          onChange={(e) =>
                            setSettings({ ...settings, bannerText: e.target.value })
                          }
                          className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gold-700 dark:text-gold-400">Contact Phone</Label>
                          <Input
                            value={settings.contactPhone}
                            onChange={(e) =>
                              setSettings({ ...settings, contactPhone: e.target.value })
                            }
                            className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gold-700 dark:text-gold-400">Contact Email</Label>
                          <Input
                            value={settings.contactEmail}
                            onChange={(e) =>
                              setSettings({ ...settings, contactEmail: e.target.value })
                            }
                            className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gold-700 dark:text-gold-400">WhatsApp Number</Label>
                          <Input
                            value={settings.whatsappNumber}
                            onChange={(e) =>
                              setSettings({ ...settings, whatsappNumber: e.target.value })
                            }
                            className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                            placeholder="919115277000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gold-700 dark:text-gold-400">Company Address</Label>
                          <Textarea
                            value={settings.companyAddress}
                            onChange={(e) =>
                              setSettings({ ...settings, companyAddress: e.target.value })
                            }
                            className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button
                          onClick={saveSettings}
                          disabled={actionLoading}
                          className="bg-gold-600 hover:bg-gold-700 text-white"
                        >
                          {actionLoading ? (
                            <Loader2 className="size-4 animate-spin mr-2" />
                          ) : (
                            <Save className="size-4 mr-2" />
                          )}
                          Save Settings
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* ═══════════════ DIALOGS ═══════════════ */}

      {/* Notes Dialog */}
      <Dialog open={notesLeadId !== null} onOpenChange={() => setNotesLeadId(null)}>
        <DialogContent className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
          <DialogHeader>
            <DialogTitle className="text-gold-800 dark:text-gold-200">Lead Notes</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              Add or update notes for this lead.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={notesContent}
            onChange={(e) => setNotesContent(e.target.value)}
            className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800 min-h-[120px]"
            placeholder="Enter notes about this lead..."
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setNotesLeadId(null)}>
              Cancel
            </Button>
            <Button
              onClick={saveLeadNotes}
              disabled={actionLoading}
              className="bg-gold-600 hover:bg-gold-700 text-white"
            >
              {actionLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Save className="size-4 mr-2" />}
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Lead Confirmation */}
      <AlertDialog open={deleteLeadId !== null} onOpenChange={() => setDeleteLeadId(null)}>
        <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gold-800 dark:text-gold-200">
              Delete Lead
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this lead? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gold-200 dark:border-gold-800/40">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteLead}
              disabled={actionLoading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {actionLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Project Confirmation */}
      <AlertDialog open={deleteProjectId !== null} onOpenChange={() => setDeleteProjectId(null)}>
        <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gold-800 dark:text-gold-200">
              Delete Project
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this project? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gold-200 dark:border-gold-800/40">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteProject}
              disabled={actionLoading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {actionLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Subscriber Confirmation */}
      <AlertDialog
        open={deleteSubscriberId !== null}
        onOpenChange={() => setDeleteSubscriberId(null)}
      >
        <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gold-800 dark:text-gold-200">
              Delete Subscriber
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this subscriber? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gold-200 dark:border-gold-800/40">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteSubscriber}
              disabled={actionLoading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {actionLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Project Add/Edit Dialog */}
      <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-900 border border-gold-200/40 dark:border-gold-800/30 max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gold-800 dark:text-gold-200">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              {editingProject
                ? 'Update the project details below.'
                : 'Fill in the details to create a new project.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">Name *</Label>
              <Input
                value={projectForm.name}
                onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">Type</Label>
              <Select
                value={projectForm.type}
                onValueChange={(val) => setProjectForm({ ...projectForm, type: val })}
              >
                <SelectTrigger className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">Status</Label>
              <Select
                value={projectForm.status}
                onValueChange={(val) => setProjectForm({ ...projectForm, status: val })}
              >
                <SelectTrigger className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">Location</Label>
              <Input
                value={projectForm.location}
                onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">Size</Label>
              <Input
                value={projectForm.size}
                onChange={(e) => setProjectForm({ ...projectForm, size: e.target.value })}
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">Price (display)</Label>
              <Input
                value={projectForm.price}
                onChange={(e) => setProjectForm({ ...projectForm, price: e.target.value })}
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                placeholder="e.g. ₹25 Lakh - ₹1.2 Cr"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">Price (numeric)</Label>
              <Input
                type="number"
                value={projectForm.priceVal}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, priceVal: Number(e.target.value) })
                }
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">Appreciation Rate (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={projectForm.appreciationRate}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, appreciationRate: Number(e.target.value) })
                }
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-gold-700 dark:text-gold-400">Amenities (comma-separated)</Label>
              <Input
                value={projectForm.amenities}
                onChange={(e) => setProjectForm({ ...projectForm, amenities: e.target.value })}
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                placeholder="Clubhouse, Swimming Pool, Garden..."
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-gold-700 dark:text-gold-400">Description</Label>
              <Textarea
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                rows={3}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-gold-700 dark:text-gold-400">Highlights (comma-separated)</Label>
              <Input
                value={projectForm.highlights}
                onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                placeholder="Near ISKCON Temple, 24x7 Security..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">ROI 5 Year</Label>
              <Input
                value={projectForm.roiProjection5Yr}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, roiProjection5Yr: e.target.value })
                }
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">ROI 10 Year</Label>
              <Input
                value={projectForm.roiProjection10Yr}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, roiProjection10Yr: e.target.value })
                }
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-gold-700 dark:text-gold-400">Details</Label>
              <Textarea
                value={projectForm.details}
                onChange={(e) => setProjectForm({ ...projectForm, details: e.target.value })}
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">Image URL</Label>
              <Input
                value={projectForm.image}
                onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gold-700 dark:text-gold-400">Tag</Label>
              <Input
                value={projectForm.tag}
                onChange={(e) => setProjectForm({ ...projectForm, tag: e.target.value })}
                className="border-gold-200 dark:border-gold-800/40 bg-white dark:bg-gray-800"
                placeholder="e.g. Best Seller"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="ghost" onClick={() => setProjectDialogOpen(false)}>
              <X className="size-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={saveProject}
              disabled={actionLoading || !projectForm.name.trim()}
              className="bg-gold-600 hover:bg-gold-700 text-white"
            >
              {actionLoading ? (
                <Loader2 className="size-4 animate-spin mr-2" />
              ) : (
                <Save className="size-4 mr-2" />
              )}
              {editingProject ? 'Update Project' : 'Create Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
