function largestOfFour(arr) {
  
  var largestNumber = [0, 0, 0, 0];
  var i = 0;
  var lenI = arr.length;
  
  
  for(; i < lenI; i++) {
    
    var j = 0;
    var lenJ = arr[i].length;
  
  
    for(; j < lenJ; j++) {
      if(largestNumber[i] < arr[i][j]) { 
        largestNumber[i] = arr[i][j]; 
      }
    }
  }
  
  return largestNumber;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
