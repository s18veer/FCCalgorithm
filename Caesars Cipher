function rot13(encodedStr) {
  var codeArr = encodedStr.split("");  // String to Array
  var decodedArr = []; //  Result
  
  var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  
  for (var i = 0;i < codeArr.length; i++){
    if (alphabet.indexOf(codeArr[i]) === -1){
      decodedArr.push(codeArr[i]);
    } 
    
    else {
      for (var j = 0; j < alphabet.length; j++) {
        if (codeArr[i] === alphabet[j]) {
          decodedArr.push(alphabet[j + 13]);
        }
      }
    }
  }
  
  
  return decodedArr.join(""); // Array to String
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");
