// var halvesaAreAlike = function (s){
//     s=s.toLowerCase()
//     let firstHalf = s.slice(0,s.length/2).split('')
//     let secondHalf = s.slice(firstHalf.length,s.length).split('')
//     let vowels =["a","e","i","o","u"];
//     let firstHalfCount=0;
//     let secondHalfCount=0;
//     firstHalf.forEach((word)=>{
//         if(vowels.includes(word)){
//             firstHalfCount++;
//         }
//     })
//     secondHalf.forEach((word)=>{
//         if(vowels.includes(word)){
//             secondHalfCount++
//         }
//     })
//     return firstHalfCount===secondHalfCount;
// }
// console.log(halvesaAreAlike('textBok'))

// var maximumUnits = function(B, T) {
//     B.sort((a,b) => b[1] - a[1])
//     let ans = 0
//     for (let i = 0; T && i < B.length; i++) {
//         let count = Math.min(B[i][0], T)
//         ans += count * B[i][1], T -= count
//     }
//     console.log(ans)
// };
// let boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
// maximumUnits(boxTypes,truckSize)

/**
 * Toggle User Block Status
 * This function is responsible for toggling the block status of a user.
 * It allows administrators to block or unblock a user account as needed.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the result of the user block operation.
 *
 * @throws {Error} - If any error occurs during the process, an internal server error message is returned.
 */
const blockUser = asyncHandler(async (req, res) => {
  try {
    // Retrieve user ID from the request parameters
    const id = req.params.id;

    // Check if the provided user ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: constants.INVALID_SELLER_ID });
    }

    // Query the database to find the user by ID, excluding their password field
    const user = await User.findOne({ _id: id }).select("-password");

    // If no user is found with the given ID, return a "Not Found" response
    if (!user) {
      return res.status(404).json({ message: constants.SELLER_NOT_FOUND });
    }

    // Toggle the user's block status (block/unblock)
    user.isBlock = !user.isBlock;

    // Save the updated user document
    await user.save();

    // Compose a success message based on the new block status
    const blockAction = user.isBlock ? "blocked" : "unblocked";
    const message = `User ${user.name} is ${blockAction} successfully.`;

    // Define the resulting user block status
    const status = user.isBlock;

    // Return a JSON response with the message and user status
    return res.status(200).json({ message, status });
  } catch (error) {
    console.error(error);
    // Handle and report internal server errors
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});
