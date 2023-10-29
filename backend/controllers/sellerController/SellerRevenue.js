import asyncHandler from 'express-async-handler'
import Booking from '../../models/BookHostelModel/BookHostelModel.js';
import { mongoose } from 'mongoose';

export const sellerAggregateRevenue = asyncHandler(async (sellerId) => {
  console.log(sellerId)
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
