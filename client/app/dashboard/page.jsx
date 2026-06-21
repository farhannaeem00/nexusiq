'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Database, MessageSquare,
  TrendingUp, Users, Plus,
  BarChart2, ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

export default function Dashboard() {
  const { user }              = useAuth();
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.get('/datasets')
      .then(r => setDatasets(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const quickActions = [
    {
      href:  '/dashboard/datasets',
      icon:  <Database className="text-blue-400" size={24} />,
      title: 'Upload Dataset',
      desc:  'Import CSV file',
      color: 'border-blue-500/20 hover:border-blue-500/50',
    },
    {
      href:  '/dashboard/chat',
      icon:  <MessageSquare className="text-indigo-400" size={24} />,
      title: 'Ask AI',
      desc:  'Query your data',
      color: 'border-indigo-500/20 hover:border-indigo-500/50',
    },
    {
      href:  '/dashboard/forecast',
      icon:  <TrendingUp className="text-green-400" size={24} />,
      title: 'Forecast Revenue',
      desc:  'Predict next 6 months',
      color: 'border-green-500/20 hover:border-green-500/50',
    },
    {
      href:  '/dashboard/churn',
      icon:  <Users className="text-red-400" size={24} />,
      title: 'Predict Churn',
      desc:  'Find at-risk customers',
      color: 'border-red-500/20 hover:border-red-500/50',
    },
  ];

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Here is your business intelligence overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <p className="text-3xl font-black text-indigo-400">
            {loading ? '...' : datasets.length}
          </p>
          <p className="text-gray-400 text-sm mt-1">Datasets</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <p className="text-3xl font-black text-blue-400">
            {loading ? '...' : datasets.reduce((a, d) => a + d.rowCount, 0)}
          </p>
          <p className="text-gray-400 text-sm mt-1">Total Rows</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <p className="text-3xl font-black text-green-400">
            AI
          </p>
          <p className="text-gray-400 text-sm mt-1">Powered</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <p className="text-3xl font-black text-purple-400">
            Free
          </p>
          <p className="text-gray-400 text-sm mt-1">Current Plan</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="font-bold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickActions.map(action => (
          <Link key={action.href} href={action.href}
            className={`bg-gray-900 rounded-2xl border p-5 transition
                        flex flex-col gap-3 ${action.color}`}>
            <div className="w-10 h-10 bg-gray-800 rounded-xl
                            flex items-center justify-center">
              {action.icon}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">
                {action.title}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Datasets */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-white flex items-center gap-2">
            <Database className="text-indigo-400" size={18} />
            Recent Datasets
          </h2>
          <Link href="/dashboard/datasets"
            className="text-sm text-indigo-400 hover:underline
                       flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-4 border-indigo-500
                            border-t-transparent rounded-full animate-spin" />
          </div>
        ) : datasets.length === 0 ? (
          <div className="text-center py-8">
            <Database size={36}
              className="mx-auto text-gray-700 mb-3" />
            <p className="text-gray-500 text-sm mb-4">
              No datasets yet
            </p>
            <Link href="/dashboard/datasets"
              className="inline-flex items-center gap-2 bg-indigo-600
                         text-white px-4 py-2 rounded-xl hover:bg-indigo-700
                         transition text-sm font-medium">
              <Plus size={16} /> Upload Dataset
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {datasets.slice(0, 5).map(dataset => (
              <div key={dataset._id}
                className="flex items-center justify-between p-3
                           bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500/10 rounded-lg
                                  flex items-center justify-center">
                    <Database className="text-indigo-400" size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {dataset.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {dataset.rowCount} rows ·{' '}
                      {dataset.columns?.length} columns
                    </p>
                  </div>
                </div>
                <Link href={`/dashboard/chat?dataset=${dataset._id}`}
                  className="text-xs text-indigo-400 hover:underline">
                  Ask AI →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}