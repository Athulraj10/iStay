import mongoose from 'mongoose'
import Booking from '../../models/BookHostelModel/BookHostelModel.js';

const aggregateBookingWithHostel = async (booking_id) => {
    try {
        const result = await Booking.aggregate([
          {
            $match: { _id: new mongoose.Types.ObjectId(booking_id) },
          },
          {
            $lookup: {
              from: "hostels",
              localField: "hostel",
              foreignField: "_id",
              as: "hostelDetails",
            },
          },
          {
            $unwind: "$hostelDetails",
          },
          {
            $lookup: {
              from: "sellers",
              localField: "hostelDetails.seller",
              foreignField: "_id",
              as: "sellerDetails",
            },
          },
          {
            $unwind: "$sellerDetails",
          },
          {
            $group: {
              _id: "$_id",
              user: { $first: "$user" },
              cancelled: { $first: "$cancelled" },
              date: { $first: "$date" },
              hostel: { $first: "$hostel" },
              paymentMethod: { $first: "$paymentMethod" },
              paymentVia: { $first: "$paymentVia" },
              totalAmount: { $first: "$totalAmount" },
              hostelDetails: { $first: "$hostelDetails" },
              sellerDetails: { $first: "$sellerDetails" },
            },
          },
          // {
          //   $sort: {
          //     createdAt: -1, // Sort by lastUpdated field in descending order (latest first)
          //   },
          // }
        ]);
        return result;
      } catch (error) {
        console.error(error);
      }
};

export default
  aggregateBookingWithHostel
