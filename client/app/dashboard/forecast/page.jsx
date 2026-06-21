'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TrendingUp, Play } from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function Forecast() {
  const searchParams              = useSearchParams();
  const [datasets, setDatasets]   = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [dataset, setDataset]     = useState(null);
  const [dateCol, setDateCol]     = useState('');
  const [valueCol, setValueCol]   = useState('');
  const [periods, setPeriods]     = useState(6);
  const [result, setResult]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [fetching, setFetching]   = useState(true);

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
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const loadDataset = async (id) => {
    try {
      const { data } = await api.get(`/datasets/${id}`);
      setDataset(data.data);
      setDateCol('');
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

  const handleForecast = async () => {
    if (!dateCol || !valueCol)
      return toast.error('Please select date and value columns');

    setLoading(true);
    try {
      const { data } = await api.post(
        `/datasets/${selectedId}/forecast`,
        { date_column: dateCol, value_column: valueCol, periods }
      );
      setResult(data.data);
      toast.success('Forecast generated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Forecast failed');
    } finally {
      setLoading(false);
    }
  };

  const historicalData = result?.chart_data?.filter(
    d => d.type === 'historical'
  ) || [];

  const forecastData = result?.chart_data?.filter(
    d => d.type === 'forecast'
  ) || [];

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="text-green-400" size={24} />
          Revenue Forecasting
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          ML-powered revenue prediction for the next months
        </p>
      </div>

      {/* Config Card */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800
                      p-6 mb-6">
        <h2 className="font-bold text-white mb-4">Configure Forecast</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Dataset */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Dataset
            </label>
            <select
              value={selectedId}
              onChange={e => handleDatasetChange(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white
                         text-sm rounded-xl px-3 py-2.5 focus:outline-none
                         focus:ring-2 focus:ring-green-500">
              {datasets.map(d => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Date Column */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Date Column
            </label>
            <select
              value={dateCol}
              onChange={e => setDateCol(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white
                         text-sm rounded-xl px-3 py-2.5 focus:outline-none
                         focus:ring-2 focus:ring-green-500">
              <option value="">Select column</option>
              {dataset?.columns?.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Value Column */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Value Column
            </label>
            <select
              value={valueCol}
              onChange={e => setValueCol(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white
                         text-sm rounded-xl px-3 py-2.5 focus:outline-none
                         focus:ring-2 focus:ring-green-500">
              <option value="">Select column</option>
              {dataset?.columns?.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Periods */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Forecast Periods
            </label>
            <select
              value={periods}
              onChange={e => setPeriods(parseInt(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 text-white
                         text-sm rounded-xl px-3 py-2.5 focus:outline-none
                         focus:ring-2 focus:ring-green-500">
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={12}>12 months</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleForecast}
          disabled={loading || !dateCol || !valueCol}
          className="mt-4 flex items-center gap-2 bg-green-600 text-white
                     px-6 py-2.5 rounded-xl hover:bg-green-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition font-medium text-sm">
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white
                              border-t-transparent rounded-full animate-spin" />
              Running ML Model...
            </>
          ) : (
            <>
              <Play size={16} /> Run Forecast
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <p className="text-xs text-gray-400 mb-1">Historical Total</p>
              <p className="text-2xl font-black text-white">
                {result.total_historical?.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <p className="text-xs text-gray-400 mb-1">Avg Historical</p>
              <p className="text-2xl font-black text-white">
                {result.avg_historical?.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <p className="text-xs text-gray-400 mb-1">Forecast Total</p>
              <p className="text-2xl font-black text-green-400">
                {result.total_forecast?.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl border
                            p-5 text-center
                            {result.growth_rate >= 0
                              ? 'border-green-500/20'
                              : 'border-red-500/20'}">
              <p className="text-xs text-gray-400 mb-1">Growth Rate</p>
              <p className={`text-2xl font-black ${
                result.growth_rate >= 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}>
                {result.growth_rate >= 0 ? '+' : ''}
                {result.growth_rate}%
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
            <h2 className="font-bold text-white mb-4">
              Revenue Forecast Chart
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={result.chart_data}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background:   '#111827',
                    border:       '1px solid #374151',
                    borderRadius: '8px',
                    color:        '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Insight */}
          {result.insight && (
            <div className="bg-green-500/5 border border-green-500/20
                            rounded-2xl p-4">
              <p className="text-sm text-green-300">
                💡 {result.insight}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}