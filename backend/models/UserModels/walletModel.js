import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transaction_id: {
    type: String,
    required: false,
  },
  closing_balance: {
    type: Number,
    required: false,
  },
  booking_date: {
    type: Date,
    required: false,
  },
  hostel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
    required: false,
  },
  booking_amount: {
    type: Number,
    required: false,
    default: 0,
  },
});

const walletSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: false,
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
