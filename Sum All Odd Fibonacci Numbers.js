function sumFibs(num) {
  //0,1,1,3,5,13...
  var firstNum = 0;
  var secondNum = 1;
  var fib = 1;
  
  var result = 1;
  
  while (firstNum + secondNum <= num) { 
    fib = firstNum + secondNum; 
    firstNum = secondNum; 
    secondNum = fib; 
    
    if (fib % 2 !== 0) {
      result += fib; 
    }
  }
 
  
  return result;
}

sumFibs(4);
