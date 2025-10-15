const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  type: String,
  bank: String,
  accountNumber: String,
  address: String,
  amountOverdue: Number,
  currentBalance: Number,
  secured: Boolean
}, { _id: false });

const reportSchema = new mongoose.Schema({
  sourceFileName: String,
  basic: {
    name: String,
    mobile: String,
    pan: String,
    creditScore: Number
  },
  summary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalanceTotal: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    last7DaysEnquiries: Number
  },
  accounts: [accountSchema]
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
