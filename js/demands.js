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

var loggingOut = false;

function logOut(){
  if(!loggingOut){
    loggingOut = true;
    
    $('#logoutbtn').html("<i class='fa fa-spin fa-spinner' style='font-size: 0.75em;'></i>");

    $.ajax({
      type: "POST",
      url: "./user/logout",
      dataType: "json",
      success: function(data){
          // Logged out
          loggingOut = false;

          window.location = "/";
      },
      error: function(e){
        //console.log(e);
      },
      complete: function(){
        $('#logoutbtn').html("Log Out");        
      }
    });
  }
}
