var idtoclick= document.getElementById("clickscreen");

var toAnimate = document.getElementById("toAnimate");

idtoclick.addEventListener("click", function (event) {
  toAnimate.style.backgroundPosition = "0px -200px";
  document.getElementById("textToAnimate").style.bottom = "40px"

  if(document.getElementById("textToAnimate").style.bottom === "40px") {
     document.getElementById("textToAnimate").style.opacity = 0;
  
  setTimeout(function () {
          document.getElementById("win10pass").style.visibility = "visible";
  },100)
    
  }
  
  document.getElementById("test").addEventListener("mousedown", function () {
    document.getElementById("test2").type = "text";
  });
  document.getElementById("test").addEventListener("mouseup", function () {
    document.getElementById("test2").type = "password";
  });
});
