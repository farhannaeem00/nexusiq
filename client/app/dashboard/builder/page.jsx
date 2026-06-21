'use client';

import { useEffect, useState } from 'react';
import {
  BarChart2, Plus, Trash2,
  Save, Play, LayoutDashboard
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const COLORS = [
  '#6366f1', '#8b5cf6', '#3b82f6',
  '#10b981', '#f59e0b', '#ef4444',
];

const ChartWidget = ({ widget }) => {
  const { chartType, data, title } = widget;

  if (!data || data.length === 0) return (
    <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
      No data yet
    </div>
  );

  const commonProps = {
    data,
    margin: { top: 5, right: 10, left: 0, bottom: 5 },
  };

  switch (chartType) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={10} />
            <YAxis stroke="#6b7280" fontSize={10} />
            <Tooltip contentStyle={{
              background: '#111827', border: '1px solid #374151',
              borderRadius: '8px', color: '#fff',
            }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );

    case 'line':
      return (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={10} />
            <YAxis stroke="#6b7280" fontSize={10} />
            <Tooltip contentStyle={{
              background: '#111827', border: '1px solid #374151',
              borderRadius: '8px', color: '#fff',
            }} />
            <Line type="monotone" dataKey="value"
              stroke="#6366f1" strokeWidth={2}
              dot={{ fill: '#6366f1', r:3 }} />
          </LineChart>
        </ResponsiveContainer>
      );

    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name"
              cx="50%" cy="50%" outerRadius={70}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{
              background: '#111827', border: '1px solid #374151',
              borderRadius: '8px', color: '#fff',
            }} />
          </PieChart>
        </ResponsiveContainer>
      );

    case 'area':
      return (
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={10} />
            <YAxis stroke="#6b7280" fontSize={10} />
            <Tooltip contentStyle={{
              background: '#111827', border: '1px solid #374151',
              borderRadius: '8px', color: '#fff',
            }} />
            <Area type="monotone" dataKey="value"
              stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      );

    default:
      return null;
  }
};

export default function Builder() {
  const [datasets, setDatasets]       = useState([]);
  const [dashboards, setDashboards]   = useState([]);
  const [selectedDash, setSelectedDash] = useState(null);
  const [dashName, setDashName]       = useState('');
  const [loading, setLoading]         = useState(false);
  const [saving, setSaving]           = useState(false);

  // New widget form
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [widgetForm, setWidgetForm]       = useState({
    datasetId: '',
    question:  '',
    title:     '',
    chartType: 'bar',
  });
  const [querying, setQuerying]   = useState(false);
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [dsRes, dbRes] = await Promise.all([
        api.get('/datasets'),
        api.get('/dashboards'),
      ]);
      setDatasets(dsRes.data.data);
      setDashboards(dbRes.data.data);
    } catch {
      toast.error('Failed to load data');
    }
  };

  const handleCreateDashboard = async () => {
    if (!dashName) return toast.error('Enter a dashboard name');
    try {
      const { data } = await api.post('/dashboards', {
        name: dashName, widgets: []
      });
      setDashboards(prev => [data.data, ...prev]);
      setSelectedDash(data.data);
      setDashName('');
      toast.success('Dashboard created!');
    } catch {
      toast.error('Failed to create dashboard');
    }
  };

  const handleQueryWidget = async () => {
    if (!widgetForm.datasetId || !widgetForm.question)
      return toast.error('Select dataset and enter question');

    setQuerying(true);
    try {
      const { data } = await api.post(
        `/datasets/${widgetForm.datasetId}/query`,
        { question: widgetForm.question }
      );
      setPreviewData(data.data);
      toast.success('Data fetched!');
    } catch {
      toast.error('Query failed');
    } finally {
      setQuerying(false);
    }
  };

  const handleAddWidget = () => {
    if (!previewData) return toast.error('Run query first');
    if (!widgetForm.title) return toast.error('Enter widget title');

    const newWidget = {
      id:        Date.now(),
      type:      'chart',
      title:     widgetForm.title,
      chartType: widgetForm.chartType,
      question:  widgetForm.question,
      data:      previewData.chart_data || [],
    };

    setSelectedDash(prev => ({
      ...prev,
      widgets: [...(prev.widgets || []), newWidget],
    }));

    setShowAddWidget(false);
    setWidgetForm({ datasetId: '', question: '', title: '', chartType: 'bar' });
    setPreviewData(null);
    toast.success('Widget added!');
  };

  const handleRemoveWidget = (widgetId) => {
    setSelectedDash(prev => ({
      ...prev,
      widgets: prev.widgets.filter(w => w.id !== widgetId),
    }));
  };

  const handleSaveDashboard = async () => {
    if (!selectedDash) return;
    setSaving(true);
    try {
      await api.put(`/dashboards/${selectedDash._id}`, {
        name:    selectedDash.name,
        widgets: selectedDash.widgets,
      });
      toast.success('Dashboard saved!');
      fetchAll();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const selectClass = `w-full bg-gray-800 border border-gray-700 text-white
    text-sm rounded-xl px-3 py-2.5 focus:outline-none
    focus:ring-2 focus:ring-indigo-500`;

  const inputClass = `w-full px-4 py-3 rounded-xl bg-gray-800
    border border-gray-700 text-white text-sm
    focus:outline-none focus:ring-2 focus:ring-indigo-500
    transition placeholder-gray-500`;

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart2 className="text-purple-400" size={24} />
          Dashboard Builder
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Build custom dashboards with AI-powered charts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-4">

          {/* Create Dashboard */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
            <h2 className="font-bold text-white text-sm mb-3">
              New Dashboard
            </h2>
            <div className="flex flex-col gap-2">
              <input
                value={dashName}
                onChange={e => setDashName(e.target.value)}
                placeholder="Dashboard name"
                className="w-full px-3 py-2 rounded-xl bg-gray-800
                           border border-gray-700 text-white text-sm
                           focus:outline-none focus:ring-2
                           focus:ring-indigo-500 placeholder-gray-500"
              />
              <button onClick={handleCreateDashboard}
                className="w-full bg-indigo-600 text-white py-2 rounded-xl
                           hover:bg-indigo-700 transition text-sm font-medium
                           flex items-center justify-center gap-2">
                <Plus size={14} /> Create
              </button>
            </div>
          </div>

          {/* Dashboard List */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
            <h2 className="font-bold text-white text-sm mb-3">
              My Dashboards
            </h2>
            {dashboards.length === 0 ? (
              <p className="text-gray-500 text-xs text-center py-4">
                No dashboards yet
              </p>
            ) : (
              <div className="flex flex-col gap-1">
                {dashboards.map(dash => (
                  <button key={dash._id}
                    onClick={() => setSelectedDash(dash)}
                    className={`text-left px-3 py-2 rounded-xl text-sm
                                transition
                      ${selectedDash?._id === dash._id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}>
                    <p className="font-medium truncate">{dash.name}</p>
                    <p className="text-xs opacity-70">
                      {dash.widgets?.length || 0} widgets
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="lg:col-span-3">

          {!selectedDash ? (
            <div className="bg-gray-900 rounded-2xl border border-gray-800
                            p-16 text-center">
              <LayoutDashboard size={48}
                className="mx-auto text-gray-700 mb-4" />
              <p className="text-gray-500 text-sm">
                Create or select a dashboard to start building
              </p>
            </div>
          ) : (
            <>
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white text-lg">
                  {selectedDash.name}
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => setShowAddWidget(true)}
                    className="flex items-center gap-2 bg-indigo-600
                               text-white px-4 py-2 rounded-xl
                               hover:bg-indigo-700 transition text-sm">
                    <Plus size={16} /> Add Widget
                  </button>
                  <button onClick={handleSaveDashboard} disabled={saving}
                    className="flex items-center gap-2 bg-green-600
                               text-white px-4 py-2 rounded-xl
                               hover:bg-green-700 transition text-sm
                               disabled:opacity-50">
                    <Save size={16} />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>

              {/* Add Widget Form */}
              {showAddWidget && (
                <div className="bg-gray-900 rounded-2xl border
                                border-indigo-500/30 p-5 mb-4">
                  <h3 className="font-bold text-white mb-4">
                    Add New Widget
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        Dataset
                      </label>
                      <select
                        value={widgetForm.datasetId}
                        onChange={e => setWidgetForm({
                          ...widgetForm, datasetId: e.target.value
                        })}
                        className={selectClass}>
                        <option value="">Select dataset</option>
                        {datasets.map(d => (
                          <option key={d._id} value={d._id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        Chart Type
                      </label>
                      <select
                        value={widgetForm.chartType}
                        onChange={e => setWidgetForm({
                          ...widgetForm, chartType: e.target.value
                        })}
                        className={selectClass}>
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                        <option value="pie">Pie Chart</option>
                        <option value="area">Area Chart</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-xs text-gray-400 mb-1 block">
                      Widget Title
                    </label>
                    <input
                      value={widgetForm.title}
                      onChange={e => setWidgetForm({
                        ...widgetForm, title: e.target.value
                      })}
                      placeholder="e.g. Revenue by Product"
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="text-xs text-gray-400 mb-1 block">
                      Ask AI
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={widgetForm.question}
                        onChange={e => setWidgetForm({
                          ...widgetForm, question: e.target.value
                        })}
                        placeholder="What is the revenue by product?"
                        className={inputClass}
                      />
                      <button onClick={handleQueryWidget} disabled={querying}
                        className="bg-indigo-600 text-white px-4 rounded-xl
                                   hover:bg-indigo-700 disabled:opacity-50
                                   transition shrink-0 flex items-center gap-2
                                   text-sm">
                        {querying
                          ? <div className="w-4 h-4 border-2 border-white
                                            border-t-transparent rounded-full
                                            animate-spin" />
                          : <Play size={16} />
                        }
                      </button>
                    </div>
                  </div>

                  {/* Preview */}
                  {previewData && (
                    <div className="bg-gray-800 rounded-xl p-3 mb-3">
                      <p className="text-xs text-gray-400 mb-2">Preview:</p>
                      <p className="text-sm text-white mb-2">
                        {previewData.answer}
                      </p>
                      {previewData.chart_data?.length > 0 && (
                        <ChartWidget widget={{
                          chartType: widgetForm.chartType,
                          data:      previewData.chart_data,
                          title:     widgetForm.title,
                        }} />
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button onClick={() => {
                      setShowAddWidget(false);
                      setPreviewData(null);
                    }}
                      className="flex-1 py-2 rounded-xl border border-gray-700
                                 text-gray-400 hover:text-white transition text-sm">
                      Cancel
                    </button>
                    <button onClick={handleAddWidget} disabled={!previewData}
                      className="flex-1 py-2 rounded-xl bg-indigo-600 text-white
                                 hover:bg-indigo-700 disabled:opacity-50
                                 transition text-sm font-semibold">
                      Add Widget
                    </button>
                  </div>
                </div>
              )}

              {/* Widgets Grid */}
              {selectedDash.widgets?.length === 0 ? (
                <div className="bg-gray-900 rounded-2xl border border-gray-800
                                p-12 text-center">
                  <BarChart2 size={36}
                    className="mx-auto text-gray-700 mb-3" />
                  <p className="text-gray-500 text-sm">
                    No widgets yet. Click "Add Widget" to start.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDash.widgets.map(widget => (
                    <div key={widget.id}
                      className="bg-gray-900 rounded-2xl border
                                 border-gray-800 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-white text-sm">
                          {widget.title}
                        </p>
                        <button
                          onClick={() => handleRemoveWidget(widget.id)}
                          className="text-gray-600 hover:text-red-400
                                     transition p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <ChartWidget widget={widget} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}