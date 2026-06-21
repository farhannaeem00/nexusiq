const express = require('express');
const {
  createDashboard,
  getDashboards,
  getDashboard,
  updateDashboard,
  deleteDashboard,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/',    createDashboard);
router.get('/',     getDashboards);
router.get('/:id',  getDashboard);
router.put('/:id',  updateDashboard);
router.delete('/:id', deleteDashboard);

module.exports = router;