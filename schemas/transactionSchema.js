const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: String,
  products: Array
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;