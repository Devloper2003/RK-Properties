import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RK Properties | Admin Panel',
  description: 'Enterprise CMS for RK Properties',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white antialiased">
      {children}
    </div>
  );
}
