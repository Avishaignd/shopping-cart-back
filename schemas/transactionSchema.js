const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: Object,
  products: Array
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;