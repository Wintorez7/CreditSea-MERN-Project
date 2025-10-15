const Report = require('../models/Report');
const { parseXmlBuffer } = require('../services/xmlParser');

exports.uploadXml = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const parsedData = parseXmlBuffer(req.file);
    const report = await Report.create(parsedData);

    res.status(201).json({ success: true, id: report._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getReports = async (req, res) => {
  const reports = await Report.find().sort({ createdAt: -1 });
  res.json(reports);
};

exports.getReportById = async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) return res.status(404).json({ message: 'Report not found' });
  res.json(report);
};
