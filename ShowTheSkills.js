var gage = {
  init: function(){
     
    $('.chart span').css({"width" : "0"}).parent().each(function(i){
      
      $('p', this).html($(this).attr("data-label"));
      
      var timeout = parseInt(i) * 60 + 1100;
       
      $('span', this).delay(timeout).animate({"opacity" : "1"}, 0, function(){
        
        $(this).css({"width" : $(this).parent().attr("data-level") + "%"});
      });
    });
  }
}

$(document).ready(function(){
  
  gage.init();
    
  setInterval(function() {
      gage.init();
  }, 5000);
});

