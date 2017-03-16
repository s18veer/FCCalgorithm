function time() {
    var d = new Date();
    var h = (d.getHours() + d.getMinutes()/60) / 12 * 360;
    var m = (d.getMinutes() + d.getSeconds()/60) / 60 * 360;
    var s = (d.getSeconds() + d.getMilliseconds()/1000) /60 * 360;
    $('#watch .hands .h').css('transform', 'rotate('+h+'deg)');
    $('#watch .hands .m').css('transform', 'rotate('+m+'deg)');
    $('#watch .hands .s').css('transform', 'rotate('+s+'deg)');
}

time();
setInterval(time, 10);
