const Dashboard = require('../models/Dashboard');

// ── POST /api/dashboards ──────────────────────────────
const createDashboard = async (req, res) => {
  try {
    const { name, widgets } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Dashboard name required' });
    }
    const dashboard = await Dashboard.create({
      userId:  req.user._id,
      name,
      widgets: widgets || [],
    });
    res.status(201).json({ success: true, data: dashboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/dashboards ───────────────────────────────
const getDashboards = async (req, res) => {
  try {
    const dashboards = await Dashboard.find(
      { userId: req.user._id }
    ).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count:   dashboards.length,
      data:    dashboards,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/dashboards/:id ───────────────────────────
const getDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({
      _id:    req.params.id,
      userId: req.user._id,
    });
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }
    res.status(200).json({ success: true, data: dashboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── PUT /api/dashboards/:id ───────────────────────────
const updateDashboard = async (req, res) => {
  try {
    const { name, widgets } = req.body;
    const dashboard = await Dashboard.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name, widgets },
      { new: true }
    );
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }
    res.status(200).json({ success: true, data: dashboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE /api/dashboards/:id ────────────────────────
const deleteDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOneAndDelete({
      _id:    req.params.id,
      userId: req.user._id,
    });
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Dashboard deleted',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createDashboard,
  getDashboards,
  getDashboard,
  updateDashboard,
  deleteDashboard,
};