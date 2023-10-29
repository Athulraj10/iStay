import asyncHandler from 'express-async-handler'
import Booking from '../../models/BookHostelModel/BookHostelModel.js';

export const sellerAggregateRevenue = asyncHandler(async (sellerId) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 8);
  const result = Booking.aggregate([
    {
      $match: {
        // seller: sellerId,
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
