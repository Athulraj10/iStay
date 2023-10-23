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

var maximumUnits = function(B, T) {
    B.sort((a,b) => b[1] - a[1])
    let ans = 0
    for (let i = 0; T && i < B.length; i++) {
        let count = Math.min(B[i][0], T)
        ans += count * B[i][1], T -= count
    }
    console.log(ans)
};
let boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
maximumUnits(boxTypes,truckSize)