const Dataset = require('../models/Dataset');
const axios   = require('axios');

// ── Parse CSV content ─────────────────────────────────
const parseCSV = (content) => {
  const lines   = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    const row    = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row);
  }

  return { headers, rows };
};

// ── Detect column data types ──────────────────────────
const detectDataTypes = (headers, rows) => {
  const types = {};
  headers.forEach(header => {
    const values  = rows.map(r => r[header]).filter(v => v !== '');
    const numeric = values.every(v => !isNaN(parseFloat(v)));
    const dates   = values.every(v => !isNaN(Date.parse(v)));

    if (numeric) types[header] = 'number';
    else if (dates) types[header] = 'date';
    else types[header] = 'text';
  });
  return types;
};

// ── POST /api/datasets/upload ─────────────────────────
const uploadDataset = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a CSV file' });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Please provide a dataset name' });
    }

    const content  = req.file.buffer.toString('utf-8');
    const { headers, rows } = parseCSV(content);

    if (headers.length === 0 || rows.length === 0) {
      return res.status(400).json({ message: 'CSV file is empty or invalid' });
    }

    const dataTypes  = detectDataTypes(headers, rows);
    const sampleData = rows.slice(0, 10);

    const dataset = await Dataset.create({
      userId:     req.user._id,
      name,
      fileName:   req.file.originalname,
      columns:    headers,
      rowCount:   rows.length,
      sampleData,
      fullData:   rows,
      dataTypes,
    });

    res.status(201).json({
      success: true,
      data: {
        id:        dataset._id,
        name:      dataset.name,
        fileName:  dataset.fileName,
        columns:   dataset.columns,
        rowCount:  dataset.rowCount,
        dataTypes: dataset.dataTypes,
        sample:    sampleData,
      },
    });

  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/datasets ─────────────────────────────────
const getDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find(
      { userId: req.user._id },
      { fullData: 0 }
    ).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count:   datasets.length,
      data:    datasets,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/datasets/:id ─────────────────────────────
const getDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findOne({
      _id:    req.params.id,
      userId: req.user._id,
    });

    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        id:        dataset._id,
        name:      dataset.name,
        fileName:  dataset.fileName,
        columns:   dataset.columns,
        rowCount:  dataset.rowCount,
        dataTypes: dataset.dataTypes,
        sample:    dataset.sampleData,
        fullData:  dataset.fullData,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE /api/datasets/:id ──────────────────────────
const deleteDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findOneAndDelete({
      _id:    req.params.id,
      userId: req.user._id,
    });

    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Dataset deleted successfully',
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── POST /api/datasets/:id/query ──────────────────────
const queryDataset = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: 'Please provide a question' });
    }

    const dataset = await Dataset.findOne({
      _id:    req.params.id,
      userId: req.user._id,
    });

    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    // Send to AI engine
    const aiResponse = await axios.post(
      `${process.env.AI_ENGINE_URL}/ai/query`,
      {
        question,
        dataset_id:  dataset._id.toString(),
        columns:     dataset.columns,
        sample_data: dataset.sampleData,
        full_data:   dataset.fullData,
      }
    );

    res.status(200).json({
      success: true,
      data:    aiResponse.data.data,
    });

  } catch (error) {
    console.error('Query error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── POST /api/datasets/:id/forecast ──────────────────
const forecastDataset = async (req, res) => {
  try {
    const { date_column, value_column, periods } = req.body;

    if (!date_column || !value_column) {
      return res.status(400).json({
        message: 'Please provide date_column and value_column'
      });
    }

    const dataset = await Dataset.findOne({
      _id:    req.params.id,
      userId: req.user._id,
    });

    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    const aiResponse = await axios.post(
      `${process.env.AI_ENGINE_URL}/ai/forecast`,
      {
        dataset_id:   dataset._id.toString(),
        date_column,
        value_column,
        data:         dataset.fullData,
        periods:      periods || 6,
      }
    );

    res.status(200).json({
      success: true,
      data:    aiResponse.data.data,
    });

  } catch (error) {
    console.error('Forecast error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── POST /api/datasets/:id/churn ──────────────────────
const churnDataset = async (req, res) => {
  try {
    const { customer_id_col, date_col, value_col } = req.body;

    if (!customer_id_col) {
      return res.status(400).json({
        message: 'Please provide customer_id_col'
      });
    }

    const dataset = await Dataset.findOne({
      _id:    req.params.id,
      userId: req.user._id,
    });

    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    const aiResponse = await axios.post(
      `${process.env.AI_ENGINE_URL}/ai/churn`,
      {
        dataset_id:      dataset._id.toString(),
        data:            dataset.fullData,
        customer_id_col,
        date_col:        date_col  || null,
        value_col:       value_col || null,
      }
    );

    res.status(200).json({
      success: true,
      data:    aiResponse.data.data,
    });

  } catch (error) {
    console.error('Churn error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadDataset,
  getDatasets,
  getDataset,
  deleteDataset,
  queryDataset,
  forecastDataset,
  churnDataset,
};