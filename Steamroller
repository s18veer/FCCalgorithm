function steamrollArray(arr) {
   return arr.reduce(function (pv, cur) {
     
    return pv.concat(Array.isArray(cur) ? steamrollArray(cur) : cur); // concat only if it's array
     
  }, []);
}

steamrollArray([1, [2], [3, [[4]]]]);
