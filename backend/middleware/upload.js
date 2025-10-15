const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("📄 Incoming file ->", file); 
    const isXml =
      file.mimetype === "text/xml" ||
      file.mimetype === "application/xml" ||
      file.originalname.endsWith(".xml");
    if (isXml) cb(null, true);
    else cb(new Error("Only XML files are allowed!"));
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
