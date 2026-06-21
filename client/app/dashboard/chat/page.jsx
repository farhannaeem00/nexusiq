'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  MessageSquare, Send, Database,
  BarChart2, Brain
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

const COLORS = [
  '#6366f1', '#8b5cf6', '#3b82f6',
  '#10b981', '#f59e0b', '#ef4444',
];

const ChartRenderer = ({ type, data, title }) => {
  if (!data || data.length === 0) return null;

  const commonProps = {
    data,
    margin: { top: 5, right: 10, left: 10, bottom: 5 },
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: '#111827', border: '1px solid #374151',
                borderRadius: '8px', color: '#fff',
              }}
            />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: '#111827', border: '1px solid #374151',
                borderRadius: '8px', color: '#fff',
              }}
            />
            <Line type="monotone" dataKey="value"
              stroke="#6366f1" strokeWidth={2}
              dot={{ fill: '#6366f1', r: 4 }} />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name"
              cx="50%" cy="50%" outerRadius={100} label>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#111827', border: '1px solid #374151',
                borderRadius: '8px', color: '#fff',
              }}
            />
            <Legend />
          </PieChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: '#111827', border: '1px solid #374151',
                borderRadius: '8px', color: '#fff',
              }}
            />
            <Area type="monotone" dataKey="value"
              stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
          </AreaChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 mt-3">
      {title && (
        <p className="text-sm font-semibold text-white mb-3">{title}</p>
      )}
      <ResponsiveContainer width="100%" height={250}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default function Chat() {
  const searchParams            = useSearchParams();
  const [datasets, setDatasets] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const bottomRef               = useRef(null);

  const EXAMPLE_QUESTIONS = [
    'What is the total revenue by product?',
    'Show me monthly revenue trend',
    'Which region has the highest sales?',
    'What is the average order value?',
  ];

  useEffect(() => {
    api.get('/datasets')
      .then(r => {
        setDatasets(r.data.data);
        const paramId = searchParams.get('dataset');
        if (paramId) setSelectedId(paramId);
        else if (r.data.data.length > 0) setSelectedId(r.data.data[0]._id);
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAsk = async (q = question) => {
    if (!q.trim())   return toast.error('Please enter a question');
    if (!selectedId) return toast.error('Please select a dataset');

    const userMsg = { role: 'user', content: q };
    setMessages(prev => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      const { data } = await api.post(
        `/datasets/${selectedId}/query`,
        { question: q }
      );

      const aiMsg = {
        role:      'ai',
        content:   data.data.answer,
        insight:   data.data.insight,
        chartType: data.data.chart_type,
        chartData: data.data.chart_data,
        chartTitle: data.data.chart_title,
        hasChart:  data.data.has_chart,
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      toast.error('AI query failed. Try again.');
      setMessages(prev => [...prev, {
        role:    'ai',
        content: 'Sorry, I could not process that question. Please try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-800
                      flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Brain className="text-indigo-400" size={22} />
            Ask AI
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Ask questions about your data in plain English
          </p>
        </div>

        {/* Dataset Selector */}
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white
                     text-sm rounded-xl px-4 py-2.5 focus:outline-none
                     focus:ring-2 focus:ring-indigo-500 min-w-48">
          <option value="">Select dataset</option>
          {datasets.map(d => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6">

        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center
                          h-full text-center">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl
                            flex items-center justify-center mb-4">
              <MessageSquare className="text-indigo-400" size={32} />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Ask anything about your data
            </h2>
            <p className="text-gray-400 text-sm mb-6 max-w-md">
              Select a dataset and ask a question. AI will analyze the data
              and return charts and insights.
            </p>

            {/* Example Questions */}
            <div className="flex flex-col gap-2 w-full max-w-md">
              {EXAMPLE_QUESTIONS.map((q, i) => (
                <button key={i}
                  onClick={() => handleAsk(q)}
                  disabled={!selectedId}
                  className="text-left text-sm text-indigo-400 bg-indigo-500/5
                             hover:bg-indigo-500/10 border border-indigo-500/20
                             px-4 py-2.5 rounded-xl transition
                             disabled:opacity-40 disabled:cursor-not-allowed">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages List */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {messages.map((msg, i) => (
            <div key={i}
              className={`flex ${msg.role === 'user'
                ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl rounded-2xl px-4 py-3
                ${msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-900 border border-gray-800 text-white'
                }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>

                {msg.insight && (
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <p className="text-xs text-indigo-300">
                      💡 {msg.insight}
                    </p>
                  </div>
                )}

                {msg.hasChart && msg.chartData?.length > 0 && (
                  <ChartRenderer
                    type={msg.chartType}
                    data={msg.chartData}
                    title={msg.chartTitle}
                  />
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-900 border border-gray-800
                              rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full
                                  animate-bounce" />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full
                                  animate-bounce [animation-delay:0.1s]" />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full
                                  animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="px-8 py-5 border-t border-gray-800">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !loading && handleAsk()}
            placeholder={selectedId
              ? 'Ask anything about your data...'
              : 'Select a dataset first...'}
            disabled={!selectedId || loading}
            className="flex-1 px-4 py-3 rounded-xl bg-gray-900
                       border border-gray-800 text-white text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition placeholder-gray-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={() => handleAsk()}
            disabled={!selectedId || !question.trim() || loading}
            className="bg-indigo-600 text-white px-5 py-3 rounded-xl
                       hover:bg-indigo-700 disabled:opacity-40
                       disabled:cursor-not-allowed transition">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}