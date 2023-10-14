var buildArray = function(nums) {
    const result = new Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
      result[i] = nums[nums[i]];
    }
   return result
  };
const arr=[5,0,7,2,6,1]
console.log(buildArray(arr))