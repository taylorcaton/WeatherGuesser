// Here we run our AJAX call to the OpenWeatherMap API
var temp;

function getWeather(location){

    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
    "q="+location+"&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // We store all of the retrieved data inside of an object called "data"
    .done(function(data) {

        // Log the resulting object
        console.log(data);
        
        console.log("Temperature (F): " + data.main.temp);
        temp = data.main.temp;
        
        $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".description").html("<h2>" + data.weather[0].description + "</h2>");

    });
}