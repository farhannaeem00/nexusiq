'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Brain, LayoutDashboard, Database,
  MessageSquare, TrendingUp, Users,
  BarChart2, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { href: '/dashboard',          icon: <LayoutDashboard size={18} />, label: 'Overview' },
  { href: '/dashboard/datasets', icon: <Database size={18} />,        label: 'Datasets' },
  { href: '/dashboard/chat',     icon: <MessageSquare size={18} />,   label: 'Ask AI' },
  { href: '/dashboard/forecast', icon: <TrendingUp size={18} />,      label: 'Forecast' },
  { href: '/dashboard/churn',    icon: <Users size={18} />,           label: 'Churn' },
  { href: '/dashboard/builder',  icon: <BarChart2 size={18} />,       label: 'Builder' },
];

export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router                    = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-950">
      <div className="w-8 h-8 border-4 border-indigo-500
                      border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800
                        flex flex-col shrink-0">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-800">
          <Link href="/dashboard"
            className="flex items-center gap-2">
            <Brain className="text-indigo-400" size={22} />
            <span className="text-lg font-bold">NexusIQ</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                         text-gray-400 hover:text-white hover:bg-gray-800
                         transition text-sm font-medium">
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-gray-800">
          <div className="px-3 py-2 mb-2">
            <p className="text-sm font-semibold text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            <span className="inline-block mt-1 text-xs bg-indigo-500/10
                             text-indigo-400 px-2 py-0.5 rounded-full
                             border border-indigo-500/20 capitalize">
              {user?.plan} plan
            </span>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl
                       text-gray-400 hover:text-red-400 hover:bg-red-400/5
                       transition text-sm font-medium">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}