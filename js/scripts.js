var placeSearch, autocomplete;

function initMap() {

  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.

  console.log(autocomplete);
  autocomplete.addListener('place_changed', fillInAddress);

  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 45.5024270, lng: -73.5722630},
    zoom: 10
  });
}
