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

// Existing aggregatedData array
const aggregatedData = [
  {
    _id: {
      month: 10,
      year: 2023,
    },
    totalRevenue: 5000,
  },
  {
    _id: {
      month: 9,
      year: 2023,
    },
    totalRevenue: 6000,
  },
  // Add more data for other months
];

// Array of month names
const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

// Map month numbers to month names
const result = aggregatedData.map(item => ({
  month: monthNames[item._id.month - 1], // Subtract 1 to match the array index
  year: item._id.year,
  totalRevenue: item.totalRevenue,
}));

console.log(result);





























import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("jwt_User",token,{
      httpOnly: true,
      secure:process.env.NODE_ENV !== 'development',
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;
