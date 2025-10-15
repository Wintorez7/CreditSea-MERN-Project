const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/report-controller');

router.post('/upload', upload.single('file'), controller.uploadXml);
router.get('/', controller.getReports);
router.get('/:id', controller.getReportById);

module.exports = router;
