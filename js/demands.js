function makeDemand(){
  $.ajax({
    url: "./demand",
    method: "POST",
    data: $(document.forms.demand).serialize(),
    dataType: "json"
  }).done(function (data){
    if(data.errors === undefined){

    }
  }).fail(function (data){
    console.log(data);
  });
}
