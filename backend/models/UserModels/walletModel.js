import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transaction_id: {
    type: String,
    required: true,
  },
  closing_balance: {
    type: Number,
    required: true,
  },
  booking_date: {
    type: Date,
    required: true,
  },
  hostel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
    required: true,
  },
});

const walletSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  booking_amount: {
    type: Number,
    required: true,
    default: 0,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  transactions: [transactionSchema], 
});

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
