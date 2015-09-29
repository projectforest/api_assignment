$(function(){

  var searchForm = $(".search-city");
  var cities = $("#results");
  var forecastIcon = $("#forecast-icon");
  var forecastDescription = $("#forecast-description");
  var forecastHigh = $("#forecast-high");
  searchForm.on("submit", function(e){
    e.preventDefault();
    var city = $("#city-input").val();

    $.ajax({
      url : "http://autocomplete.wunderground.com/aq?query="+city+"",
      dataType : "jsonp",
      jsonp : "cb",
      success : function(data){
        console.log(data);
        cities.empty();
        data.RESULTS.forEach(function(city) {
          cities.append($("<p class='city-attribute'></p>").text(city.name)
            .data("data",{
              name: city.name,
              l: city.l
            })
            );
        });
      }

    });
  });

  cities.on("click", ".city-attribute", function(){
    //var temp1 = $(this);
    var temp1 = $(this);
    var api_url = "http://api.wunderground.com/api/7966fc1e9174d199/forecast/" + temp1.data("data")["l"] + ".json";
   
    $.ajax({
      url: api_url, 
      dataType: 'jsonp', 
      success: function(data) {
        console.log(data);
        var forecast_icon_description = data['forecast']['simpleforecast']['forecastday']['0']['icon'];
        //console.log(forecase_icon_description);
        var forecast_icon_url = data['forecast']['simpleforecast']['forecastday']['0']['icon_url'];
        var forecast_high = data['forecast']['simpleforecast']['forecastday']['0']['high']['celsius'];
        forecastIcon.html('<img src="' + forecast_icon_url + '">');
        forecastDescription.text(forecast_icon_description);
        forecastHigh.text(forecast_high);
      }
    });
    cities.empty();

  });
 
 
  

});