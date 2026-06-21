const express  = require('express');
const multer   = require('multer');
const {
  uploadDataset,
  getDatasets,
  getDataset,
  deleteDataset,
  queryDataset,
  forecastDataset,
  churnDataset,
} = require('../controllers/datasetController');
const { protect } = require('../middleware/auth');

const router  = express.Router();

// ── Multer setup (memory storage) ────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'text/csv' ||
      file.originalname.endsWith('.csv')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  },
});

// ── All routes require auth ───────────────────────────
router.use(protect);

router.post('/upload',          upload.single('file'), uploadDataset);
router.get('/',                 getDatasets);
router.get('/:id',              getDataset);
router.delete('/:id',           deleteDataset);
router.post('/:id/query',       queryDataset);
router.post('/:id/forecast',    forecastDataset);
router.post('/:id/churn',       churnDataset);

module.exports = router;