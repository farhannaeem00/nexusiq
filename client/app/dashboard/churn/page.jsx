'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Users, Play, AlertTriangle, CheckCircle } from 'lucide-react';
import {
  PieChart, Pie, Cell,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const riskConfig = {
  high: {
    bg:    'bg-red-500/10 border-red-500/20',
    badge: 'bg-red-500/10 text-red-400',
    icon:  <AlertTriangle className="text-red-400 shrink-0" size={14} />,
  },
  medium: {
    bg:    'bg-yellow-500/10 border-yellow-500/20',
    badge: 'bg-yellow-500/10 text-yellow-400',
    icon:  <AlertTriangle className="text-yellow-400 shrink-0" size={14} />,
  },
  low: {
    bg:    'bg-green-500/10 border-green-500/20',
    badge: 'bg-green-500/10 text-green-400',
    icon:  <CheckCircle className="text-green-400 shrink-0" size={14} />,
  },
};

export default function Churn() {
  const searchParams              = useSearchParams();
  const [datasets, setDatasets]   = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [dataset, setDataset]     = useState(null);
  const [customerCol, setCustomerCol] = useState('');
  const [valueCol, setValueCol]   = useState('');
  const [result, setResult]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [filter, setFilter]       = useState('all');

  useEffect(() => {
    api.get('/datasets')
      .then(r => {
        setDatasets(r.data.data);
        const paramId = searchParams.get('dataset');
        if (paramId) {
          setSelectedId(paramId);
          loadDataset(paramId);
        } else if (r.data.data.length > 0) {
          setSelectedId(r.data.data[0]._id);
          loadDataset(r.data.data[0]._id);
        }
      })
      .catch(console.error);
  }, []);

  const loadDataset = async (id) => {
    try {
      const { data } = await api.get(`/datasets/${id}`);
      setDataset(data.data);
      setCustomerCol('');
      setValueCol('');
      setResult(null);
    } catch {
      toast.error('Failed to load dataset');
    }
  };

  const handleDatasetChange = (id) => {
    setSelectedId(id);
    loadDataset(id);
  };

  const handleChurn = async () => {
    if (!customerCol)
      return toast.error('Please select a customer ID column');

    setLoading(true);
    try {
      const { data } = await api.post(
        `/datasets/${selectedId}/churn`,
        {
          customer_id_col: customerCol,
          value_col:       valueCol || null,
        }
      );
      setResult(data.data);
      toast.success('Churn analysis complete!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Churn analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const filtered = result?.predictions?.filter(p =>
    filter === 'all' ? true : p.risk_level === filter
  ) || [];

  const pieData = result ? [
    { name: 'High Risk',   value: result.high_risk,   color: '#ef4444' },
    { name: 'Medium Risk', value: result.medium_risk, color: '#eab308' },
    { name: 'Low Risk',    value: result.low_risk,    color: '#22c55e' },
  ] : [];

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="text-red-400" size={24} />
          Customer Churn Prediction
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Identify customers at risk of leaving
        </p>
      </div>

      {/* Config */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800
                      p-6 mb-6">
        <h2 className="font-bold text-white mb-4">Configure Analysis</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Dataset</label>
            <select
              value={selectedId}
              onChange={e => handleDatasetChange(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white
                         text-sm rounded-xl px-3 py-2.5 focus:outline-none
                         focus:ring-2 focus:ring-red-500">
              {datasets.map(d => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Customer ID Column *
            </label>
            <select
              value={customerCol}
              onChange={e => setCustomerCol(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white
                         text-sm rounded-xl px-3 py-2.5 focus:outline-none
                         focus:ring-2 focus:ring-red-500">
              <option value="">Select column</option>
              {dataset?.columns?.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Value Column (optional)
            </label>
            <select
              value={valueCol}
              onChange={e => setValueCol(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white
                         text-sm rounded-xl px-3 py-2.5 focus:outline-none
                         focus:ring-2 focus:ring-red-500">
              <option value="">Select column</option>
              {dataset?.columns?.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleChurn}
          disabled={loading || !customerCol}
          className="mt-4 flex items-center gap-2 bg-red-600 text-white
                     px-6 py-2.5 rounded-xl hover:bg-red-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition font-medium text-sm">
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white
                              border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Play size={16} /> Run Analysis
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Stats + Pie Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            {/* Stats */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="font-bold text-white mb-4">Risk Summary</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3
                                bg-red-500/10 border border-red-500/20
                                rounded-xl">
                  <span className="text-sm text-red-400 font-medium">
                    🔴 High Risk
                  </span>
                  <span className="text-xl font-black text-red-400">
                    {result.high_risk}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3
                                bg-yellow-500/10 border border-yellow-500/20
                                rounded-xl">
                  <span className="text-sm text-yellow-400 font-medium">
                    🟡 Medium Risk
                  </span>
                  <span className="text-xl font-black text-yellow-400">
                    {result.medium_risk}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3
                                bg-green-500/10 border border-green-500/20
                                rounded-xl">
                  <span className="text-sm text-green-400 font-medium">
                    🟢 Low Risk
                  </span>
                  <span className="text-xl font-black text-green-400">
                    {result.low_risk}
                  </span>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="font-bold text-white mb-4">Risk Distribution</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} dataKey="value"
                    nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background:   '#111827',
                      border:       '1px solid #374151',
                      borderRadius: '8px',
                      color:        '#fff',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insight */}
          {result.insight && (
            <div className="bg-red-500/5 border border-red-500/20
                            rounded-2xl p-4 mb-6">
              <p className="text-sm text-red-300">⚠️ {result.insight}</p>
            </div>
          )}

          {/* Customer Table */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white">Customer Risk List</h2>
              <div className="flex gap-1 bg-gray-800 rounded-xl p-1">
                {['all', 'high', 'medium', 'low'].map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium
                                transition capitalize
                      ${filter === f
                        ? 'bg-red-600 text-white'
                        : 'text-gray-400 hover:text-white'
                      }`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {filtered.slice(0, 20).map((customer, i) => {
                const cfg = riskConfig[customer.risk_level] || riskConfig.low;
                return (
                  <div key={i}
                    className={`flex items-center justify-between p-3
                                rounded-xl border ${cfg.bg}`}>
                    <div className="flex items-center gap-2">
                      {cfg.icon}
                      <span className="text-sm font-medium text-white">
                        {customer.customer}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">
                        {customer.recommendation}
                      </span>
                      <span className={`text-xs font-bold px-2 py-1
                                        rounded-full ${cfg.badge}`}>
                        {customer.churn_probability}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}