
function addTogether() {
  var sum=null;
  for(var i=0;i<arguments.length;i++){   
    if(typeof arguments[i]!=="number")
      return undefined;
    sum+=arguments[i];
  }
  if(arguments.length===2) return sum;
  var temp=arguments[0];
  return function(temp){    
       return addTogether(sum,arguments[0]);       
  };
}

//addTogether(2,3);
//addTogether(2)([3]);
addTogether(2)(3);
