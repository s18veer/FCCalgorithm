function palindrome(str) {
  // Step 1. 
  var regLowStr = str.replace(/[\W_]/g, '').toLowerCase(); //or var regLowStr = str.replace(/[^A-Za-z0-9_]/g, '').toLowerCase();
  
  // Step 2.
  var reverseStr = regLowStr.split('').reverse().join('');
  
  // Step 3. 
  return reverseStr === regLowStr;
}

palindrome("eye");
