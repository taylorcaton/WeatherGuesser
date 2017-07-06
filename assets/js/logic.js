var locList = ["", 
  "Charlotte, NC", 
  "Death Valley, CA", 
  "Kathmandu, Nepal", 
  "Orlando, FL",
  "Oymyakon, Russia",
  "Dallol, Ethiopia",
  "Middelfart, Denmark",
]
var currentLoc = 0;
var geocoder;
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 0, lng: 0},

  });

  geocoder = new google.maps.Geocoder();

  // document.getElementById('submit').addEventListener('click', function() {
  //   geocodeAddress(geocoder, map);
  // });
}


function geocodeAddress(geocoder, resultsMap) {
  var address = getLoc();
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function nextLoc(){
  currentLoc++;
}

function getLoc(){
  return locList[currentLoc];
}

function updatePage(){
  $("#locName").html("What is it currently like in " + getLoc() + "?");
}

function checkAnswer(low, high){
  if(temp >= low && temp < high){
    console.log("correct!");
    swal(
      'Correct!',
      'The temperature in ' + locList[currentLoc] + " is " + temp +  "\xB0F",
      'success'
    )
  }else{
    console.log("wrong!");
    swal(
      'Nope!',
      'The temperature in ' + locList[currentLoc] + " is " + temp +  "\xB0F",
      'error'
    )
  }
}

function reset(){
  currentLoc = 0;
  nextLoc();
  geocodeAddress(geocoder, map);
  getWeather(getLoc());
  updatePage();
}

$(document).on("click", "#start", function(){
  reset();
});

$(document).on("click", ".swal2-buttonswrapper", function(){

  if(currentLoc === locList.length-1){
    reset();
  }else{

    nextLoc();
    geocodeAddress(geocoder, map);
    getWeather(getLoc());
    updatePage();
  }
});

$(document).on("click", ".guess", function(){

  var guessHigh = $(this).attr("data-deg-high");
  var guessLow = $(this).attr("data-deg-low");
  console.log(guessHigh + " " + guessLow);

  checkAnswer(guessLow, guessHigh);

  if((currentLoc + 1) == locList.length){
    console.log("end game here");
  }

});


