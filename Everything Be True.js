function truthCheck(collection, pre) {
 
  return collection // for every collection,
    .every(function (el) {
    
    return el
      .hasOwnProperty(pre) && Boolean(el[pre]);
  });

}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");
