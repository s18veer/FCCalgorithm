function uniteUnique(arr1, arr2, arr3) {
  
   var sortedUnion;
 
   var args = Array.prototype.slice.call(arguments);
  
   sortedUnion = args.reduce(function(previousArray,currentArray){
  
    return previousArray.concat(currentArray.filter(function(i){
      
      return previousArray.indexOf(i) === -1;
      
    }));
     
  });

   return sortedUnion;  
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
