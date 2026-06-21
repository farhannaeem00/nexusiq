'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Database, Upload, Trash2,
  Plus, FileText, Eye
} from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [name, setName]         = useState('');
  const [showForm, setShowForm] = useState(false);
  const fileRef                 = useRef(null);

  useEffect(() => { fetchDatasets(); }, []);

  const fetchDatasets = async () => {
    try {
      const { data } = await api.get('/datasets');
      setDatasets(data.data);
    } catch {
      toast.error('Failed to load datasets');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files[0];

    if (!file) return toast.error('Please select a CSV file');
    if (!name)  return toast.error('Please enter a dataset name');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    setUploading(true);
    try {
      const { data } = await api.post('/datasets/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Dataset uploaded successfully!');
      setDatasets(prev => [data.data, ...prev]);
      setName('');
      setShowForm(false);
      if (fileRef.current) fileRef.current.value = '';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this dataset?')) return;
    try {
      await api.delete(`/datasets/${id}`);
      setDatasets(prev => prev.filter(d => (d._id || d.id) !== id));
      toast.success('Dataset deleted');
    } catch {
      toast.error('Failed to delete dataset');
    }
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Datasets</h1>
          <p className="text-gray-400 text-sm mt-1">
            Upload and manage your CSV data files
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white
                     px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition
                     font-medium text-sm">
          <Plus size={18} /> Upload Dataset
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <div className="bg-gray-900 rounded-2xl border border-gray-800
                        p-6 mb-6">
          <h2 className="font-bold text-white mb-4">Upload New Dataset</h2>
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Dataset Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Sales Q4 2024"
                className="w-full px-4 py-3 rounded-xl bg-gray-800
                           border border-gray-700 text-white text-sm
                           focus:outline-none focus:ring-2
                           focus:ring-indigo-500 transition
                           placeholder-gray-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                ref={fileRef}
                className="w-full px-4 py-3 rounded-xl bg-gray-800
                           border border-gray-700 text-white text-sm
                           focus:outline-none transition file:mr-4
                           file:py-1 file:px-3 file:rounded-lg
                           file:border-0 file:text-xs file:bg-indigo-600
                           file:text-white hover:file:bg-indigo-700"
              />
            </div>

            <div className="bg-indigo-500/5 border border-indigo-500/20
                            rounded-xl p-3">
              <p className="text-xs text-indigo-300">
                💡 CSV must have headers in the first row.
                Max file size: 10MB.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-700
                           text-gray-400 hover:text-white transition text-sm">
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600
                           text-white hover:bg-indigo-700
                           disabled:opacity-50 transition text-sm
                           font-semibold flex items-center justify-center gap-2">
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white
                                    border-t-transparent rounded-full
                                    animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} /> Upload
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Datasets List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-indigo-500
                          border-t-transparent rounded-full animate-spin" />
        </div>
      ) : datasets.length === 0 ? (
        <div className="bg-gray-900 rounded-2xl border border-gray-800
                        p-16 text-center">
          <Database size={48} className="mx-auto text-gray-700 mb-4" />
          <h3 className="font-semibold text-gray-300 mb-2">
            No datasets yet
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Upload your first CSV file to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-indigo-600
                       text-white px-6 py-2.5 rounded-xl
                       hover:bg-indigo-700 transition font-medium text-sm">
            <Plus size={16} /> Upload Dataset
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {datasets.map(dataset => {
            const datasetId = dataset._id || dataset.id;

            return (
            <div key={datasetId}
              className="bg-gray-900 rounded-2xl border border-gray-800
                         p-6 hover:border-indigo-500/30 transition">

              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl
                                  flex items-center justify-center">
                    <FileText className="text-indigo-400" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{dataset.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {dataset.fileName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(datasetId)}
                  className="text-gray-600 hover:text-red-400 transition p-1">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-4 mb-4">
                <div className="bg-gray-800 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-400">Rows</p>
                  <p className="font-bold text-white text-sm">
                    {dataset.rowCount?.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-400">Columns</p>
                  <p className="font-bold text-white text-sm">
                    {dataset.columns?.length}
                  </p>
                </div>
              </div>

              {/* Columns */}
              <div className="flex flex-wrap gap-1 mb-4">
                {dataset.columns?.slice(0, 5).map(col => (
                  <span key={col}
                    className="text-xs bg-gray-800 text-gray-400
                               px-2 py-0.5 rounded-full">
                    {col}
                  </span>
                ))}
                {dataset.columns?.length > 5 && (
                  <span className="text-xs text-gray-500">
                    +{dataset.columns.length - 5} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/chat?dataset=${datasetId}`}
                  className="flex-1 flex items-center justify-center gap-2
                             bg-indigo-600 text-white py-2 rounded-xl
                             hover:bg-indigo-700 transition text-xs
                             font-semibold">
                  Ask AI
                </Link>
                <Link
                  href={`/dashboard/forecast?dataset=${datasetId}`}
                  className="flex-1 flex items-center justify-center gap-2
                             bg-gray-800 text-gray-300 py-2 rounded-xl
                             hover:bg-gray-700 transition text-xs
                             font-semibold">
                  Forecast
                </Link>
                <Link
                  href={`/dashboard/churn?dataset=${datasetId}`}
                  className="flex-1 flex items-center justify-center gap-2
                             bg-gray-800 text-gray-300 py-2 rounded-xl
                             hover:bg-gray-700 transition text-xs
                             font-semibold">
                  Churn
                </Link>
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  );
}
