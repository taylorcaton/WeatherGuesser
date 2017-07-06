var temp;

function getWeather(location){

    var APIKey = "2d215fa962ca281d86bc23a2aa2790bd";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
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