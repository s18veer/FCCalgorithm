function sumPrimes(num) {
  var result = [2]; 
  
  if (num < 2) 
    return false; 

  for (var i = 3; i <= num; i += 2) { 
    if (isPrime(i)) 
      result.push(i); 
  }

  return result.reduce(function(a, b) {
    return a + b;
  });
  
  
  function isPrime(n) { 
    
    for (var j = 2; j <= n / 2; j++) { 
      if (n % j === 0)
        return false;
    }
    
    return true;
  }
}

sumPrimes(10); 
