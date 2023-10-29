import asyncHandler from "express-async-handler";
import Booking from "../../models/BookHostelModel/BookHostelModel.js";
import { mongoose } from "mongoose";

export const sellerAggregateRevenue = asyncHandler(async (sellerId) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 8);
  const result = Booking.aggregate([
    {
      $match: {
        seller: new mongoose.Types.ObjectId(sellerId),
        date: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);
  return result;
});

export const sellerRevenueAmount = asyncHandler(
  async (sellerId) => await Booking.aggregate([
      {
        $match: {
          seller: new mongoose.Types.ObjectId(sellerId),
          cancelled: false,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ])
);
export const sellerTotal = asyncHandler(
  async (sellerId) => await Booking.aggregate([
      {
        $match: {
          seller: new mongoose.Types.ObjectId(sellerId),
          // cancelled: false,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ])
);
