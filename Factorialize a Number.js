
function factorialize(num) {
  if(num>1){
    return num*factorialize(num-1);
  }else if(num===0){
    return 1;
  }
  return num;
}

factorialize(5);
