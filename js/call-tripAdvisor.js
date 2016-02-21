var json_obj = JSON.parse(Get("http://api.tripadvisor.com/api/partner/2.0/location/155032/restaurants?key=4813D6BD17404093A080413A33FD946C"));

function Get(yourUrl){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",yourUrl,false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function get_name_string(index){
  return json_obj.data[index].name;
}

function get_address_string(index){
  return json_obj.data[index].address_obj.address_string;
}
