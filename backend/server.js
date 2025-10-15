require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000
const reportRoutes = require('./routes/report-routes.js');

// middleware
app.use(cors());
app.use(express.json());
const connectToDb = require('./database/db.js')

// database
connectToDb();

// routes
app.use('/api/reports', reportRoutes);

app.listen(PORT,() => {
    console.log(`server is lisiting at ${PORT}`)
})