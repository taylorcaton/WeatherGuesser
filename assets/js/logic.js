var locList = ["", "UNC Charlotte Center City Campus, NC", "Death Valley, CA", "Kathmandu, Nepal"]
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
  $("#locName").html("Welcome to " + getLoc());
}

$(document).on("click", "#nextCity", function(){

  nextLoc();
  geocodeAddress(geocoder, map);
  getWeather(getLoc());
  updatePage();

});


