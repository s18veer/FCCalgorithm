function convertHTML(str) {
  var s = str.split('');
  
  for (var i = 0; i < s.length; i++) {
    switch(s[i]) {
      case '&':
        s[i] = '&amp;';
        break;
      case '<':
        s[i] = '&lt;';
        break;
      case '>':
        s[i] = '&gt;';
        break;
      case '"':
        s[i] = '&quot;';
        break;
      case "'":
        s[i] = '&apos;';
        break;     
    }
  }
  
  return s.join('');
}

convertHTML("Dolce & Gabbana");
