
function convertToRoman(num) {
  var r=[["I","II","III","IV","V","VI","VII","VIII","IX"],["X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],["C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],["M","MM","MMM"]];
  var arr=String(num).split("");
  console.log(arr);
  var ary = arr.reverse();
  console.log(ary);
  var a=[];
  for(var i=0;i<ary.length;i++){
    a[i]=r[i][ary[i]-1];
  }
  console.log(ary);
    return a.reverse().join("");
}

convertToRoman(36);
convertToRoman(12);
