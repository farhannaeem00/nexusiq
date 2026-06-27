require('dotenv').config();

const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const connectDB = require('./config/db');
const authRoutes      = require('./routes/auth');
const datasetRoutes   = require('./routes/datasets');
const dashboardRoutes = require('./routes/dashboards');
const { errorHandler } = require('./middleware/errorHandler');
const { apiLimiter }   = require('./middleware/rateLimiter');

const app = express();

// ── Security ──────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

// ── CORS ──────────────────────────────────────────────
app.use(cors({
  origin: '*',
  methods:        ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials:    false,
}));

app.options('*', cors());

// ── Body Parser ───────────────────────────────────────
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ── Rate Limiting ─────────────────────────────────────
app.use('/api', apiLimiter);

// ── Health Check ──────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '✅ NexusIQ API is running' });
});

// ── Routes ────────────────────────────────────────────
app.use('/api/auth',       authRoutes);
app.use('/api/datasets',   datasetRoutes);
app.use('/api/dashboards', dashboardRoutes);

// ── Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ── Start Server (local only) ─────────────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 NexusIQ server running on http://localhost:${PORT}`);
    });
  });
} else {
  connectDB();
}

module.exports = app;