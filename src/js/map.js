"use strict";

// Based on snazzy maps
// https://snazzymaps.com/style/151/ultra-light-with-labels

google.maps.event.addDomListener(window, 'load', init);

var map;

function init() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  var mapOptions = {
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: true,
    draggable: true,

    // How zoomed in you want the map to start at (always required)
    zoom: 9,

    // The latitude and longitude to center the map (always required)
    center: new google.maps.LatLng(55.751244, 37.018423), // Moscow

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles: [{ "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#d3d3d3" }] }, { "featureType": "transit", "stylers": [{ "color": "#808080" }, { "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" }, { "color": "#b3b3b3" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "weight": 1.8 }] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "color": "#d7d7d7" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ebebeb" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#a7a7a7" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#efefef" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#696969" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }, { "color": "#737373" }] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#d6d6d6" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, {}, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "color": "#dadada" }] }]
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.querySelector('.js-googleMap');

  // Create the Google Map using our element and options defined above
  map = new google.maps.Map(mapElement, mapOptions);

  // name, lat, lng, icon
  var markers = [['Office', 55.751244, 37.618423, 1, "<div class='contacts__map__tooltip'> <span>Александр Тодчук Studio</span> <br> Хорошевское шоссе д.80 <br> +7 (499) 195 29 91</div>"], ['Office 2', 55.851244, 37.698423, 0, "<div class='contacts__map__tooltip'> <span>Александр Тодчук Studio</span> <br> Хорошевское шоссе д.80 <br> +7 (499) 195 29 91</div>"], ['Office 3', 55.751244, 37.728423, 0, "<div class='contacts__map__tooltip'> <span>Александр Тодчук Studio</span> <br> Хорошевское шоссе д.80 <br> +7 (499) 195 29 91</div>"], ['Office 4', 55.751244, 37.528423, 0, "<div class='contacts__map__tooltip'> <span>Александр Тодчук Studio</span> <br> Хорошевское шоссе д.80 <br> +7 (499) 195 29 91</div>"], ['Office 5', 55.81244, 37.598423, 0, "<div class='contacts__map__tooltip'> <span>Александр Тодчук Studio</span> <br> Хорошевское шоссе д.80 <br> +7 (499) 195 29 91</div>"]];
  var markerIcons = ['images/svg/marker.svg', 'images/svg/marker-main.svg'];

  var infowindow = new google.maps.InfoWindow();

  for (var i = 0; i < markers.length; i++) {
    var office = markers[i];
    var marker = new google.maps.Marker({
      position: { lat: office[1], lng: office[2] },
      map: map,
      icon: markerIcons[office[3]],
      title: office[0]
    });
    var message = office[4] || "";
    google.maps.event.addListener(marker, 'click', function (e) {
      infowindow.setContent(message);
      infowindow.open(map, this);
    });
  }
  // var markers = locations.map(function(location, i) {
  //   return new google.maps.Marker({
  //     position: location,
  //     label: labels[i % labels.length]
  //   });
  // });
  //
  // // Add a marker clusterer to manage the markers.
  // var markerCluster = new MarkerClusterer(map, markers,
  //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  // }
}