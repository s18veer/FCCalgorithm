
function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [];
  // Only change code below this line
  var key = Object.keys(source);
  for(i=0;i<collection.length;i++){
  
    var inc = false;
    for(c=0;c<key.length;c++){
      if (collection[i].hasOwnProperty(key[c]) && collection[i][key[c]] === source[key[c]]){
        inc = true;
      }
      else{
        inc = false;
      }
    }
    if(inc){
      arr.push(collection[i]);
    }
  }
  
  // Only change code above this line
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
