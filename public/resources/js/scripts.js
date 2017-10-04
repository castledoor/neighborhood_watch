
// checks ip and gets city and state
// not used for coordinates because it only
// pulls coodinates with 4 decimal places.

$.get("https://ipinfo.io", function(response) {
    $("#location").append(response.city + ",\ " + response.region);

}, "jsonp");

var interval = setInterval(function(){
  if ($(".images").length <= 0 ){
    $('#preload').css("display", "block");
} else {
     
     $('#preload').css("display", "none");
     clearInterval(interval);
}
}, 50);

// gets coordinates and injects them into API call

$(function() {
	navigator.geolocation.getCurrentPosition(function(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	// test coords
	// var lat = 52.520008;
	// var lon = 13.404954;
	var access_token = config.ACCESS_TOKEN;
     $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        cache: false,
        url: 'https://api.instagram.com/v1/media/search?lat='+ lat +'&lng='+ lon + '&access_token='+ access_token,
        success: function(data) {
            for(var i = 0; i < 15; i++) {
                $('#images-container').append('<a class="images" target="_blank" href="' + data.data[i].link + '"><img src="' + data.data[i].images.standard_resolution.url+ '"></a>');
            }
        }
    });
});
});


// example instagram call
// https://api.instagram.com/v1/media/search?lat=52.520008&lng=13.404954&access_token=5282788.ba4c844.63c79cfa7a8b4fc3b358250d7c89d112
