var clockWedges = 24;

document.addEventListener("DOMContentLoaded", function(e) {
  var page = document.getElementById('page')
  var wheelbox = document.getElementById('wheel-box')
  var locationbox = document.getElementById('locations')
  var wheel = document.getElementById('wheel')
  var radius = 150;
  var r = radius;

  var timeSlices = [
    {
      className: 'awake-hours',
      start: 7,
      end: 23
    },
    {
      className: 'work-hours',
      start: 9,
      end: 17
    },
    {
      className: 'social-hours',
      start: 8,
      end: 22
    }
  ]

  timeSlices.forEach(function (slice) {
    r = radius-10

    var x1 = Math.floor(r * Math.sin(slice.start * -2 * Math.PI/clockWedges + Math.PI + 3/clockWedges));
    var y1 = Math.floor(r * Math.cos(slice.start * -2 * Math.PI/clockWedges + Math.PI + 3/clockWedges));
    var x2 = Math.floor(r * Math.sin(slice.end * -2 * Math.PI/clockWedges + Math.PI + 3/clockWedges));
    var y2 = Math.floor(r * Math.cos(slice.end * -2 * Math.PI/clockWedges + Math.PI + 3/clockWedges));

    var timeslice = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var largeArcFlag = slice.end - slice.start > clockWedges/2? 1:0

    // var arc = 'M x1 y1    A r r 0 largeArcFlag 1 x2 y2    L 0 0 Z'
    var arc = 'M ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 ' + largeArcFlag + ' 1 ' + x2 + ' ' + y2 + ' L 0 0 Z'

    timeslice.setAttribute('d', arc)
    timeslice.setAttribute('class', slice.className)
    wheel.appendChild(timeslice)
  })

  for (var i=0; i < clockWedges; i++) {
    r = radius
    var theta = i * -2*Math.PI/clockWedges + Math.PI;
    var x = Math.floor((r-40) * Math.sin(theta));
    var y = Math.floor((r-40) * Math.cos(theta));
    var x1 = Math.floor(r * Math.sin(theta));
    var y1 = Math.floor(r * Math.cos(theta));
    var x2 = Math.floor((r-20) * Math.sin(theta));
    var y2 = Math.floor((r-20) * Math.cos(theta));
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    // console.log(line);
    line.setAttribute('x1', x1)
    line.setAttribute('y1', y1)
    line.setAttribute('x2', x2)
    line.setAttribute('y2', y2)

    var hourText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    hourText.setAttribute('x', x)
    hourText.setAttribute('y', y)
    hourText.innerHTML = i

    // wheel.appendChild(line)
    wheel.appendChild(hourText)
  }

  var locations = [
    {
      name: "montreal",
      hour: 5
    },
    {
      name: "san francisco",
      hour: 2
    },
    {
      name: "berlin",
      hour: 10
    }
  ]

  
