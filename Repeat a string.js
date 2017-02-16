
function repeatStringNumTimes(str, num) {
  // repeat For Dharm 
  
  if(num<=0){
    return "";
  }else if(num>1){
    var res=str;
    for(var i=1;i<num;i++){
      res+=str;
    }
    return res;
  }
  return str;
}

repeatStringNumTimes("abc", 3);
