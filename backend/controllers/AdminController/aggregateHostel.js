//  * Function Hostel Aggregating Function
//  * This function is responsible for get the all hostel details with sellers
// with the response to the approprite referance of seller

//  * It allows To take all hostel datas
//  *
//  * @param {return} res - Express response object.
//  * @returns {Object} - return all the hostel details with appropite values
//  *
//  * @throws {Error} - If any error occurs during the process, an internal server error message is returned.
//  */
export const aggregateAllHostels = async () => {
    try {
      const aggregatedData = await Hostel.aggregate([
        {
          $lookup: {
            from: "sellers", // The name of the Seller collection
            localField: "seller",
            foreignField: "_id",
            as: "sellerDetails",
          },
        },
        {
          $unwind: "$sellerDetails", // Deconstruct the array created by $lookup
        },
        {
          $project: {
            _id: 1,
            hostelName: 1,
            category: 1,
            images: 1,
            mainLocation: 1,
            description: 1,
            fullDetails: 1,
            contactNumber: 1,
            // mapLink: 1,
            // additionalAboutHostel: 1,
            // nearByLocation: 1,
            // restrictions: 1,
            // descriptionAboutHostel: 1,
            // guestProfile: 1,
            price: 1,
            isBlock: 1,
            // extraPrice: 1,
            // totalBedInRoom: 1,
            // bedAvailableNow: 1,
            // Wifi: 1,
            // food: 1,
            // parking: 1,
            // drinkingWater: 1,
            // Include other fields you need from the Hostel collection
            // Include seller fields you need from the Seller collection
            // For example:
            "sellerDetails.name": 1,
            "sellerDetails.email": 1,
            "sellerDetails.location": 1,
            "sellerDetails.mobile": 1,
            // Include all other fields you need
          },
        },
      ]);
      return aggregatedData;
    } catch (error) {
      console.error("Error aggregating data:", error);
    }
  };