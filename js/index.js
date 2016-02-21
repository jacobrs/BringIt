var signingUp = false;

function signUp(){
	if(!signingUp){
		$('#register-result').slideUp(300, function(){
			$('#regbtn').html("<i class='fa fa-spin fa-spinner' style='font-size: 0.75em;'></i>");

			var error = false;

			$('#registration').children().children().each(function(div){
				if($(this).hasClass("has-error")){
					$(this).removeClass("has-error");
				}
			});

			$.ajax({
				type: "POST",
				url: "./user",
				dataType: "json",
				data: {
					username: $('#username').val(),
					email: $('#email').val(),
					fname: $('#fname').val(),
					lname: $('#lname').val(),
					password: $('#password').val() 
				},
				success: function(data){
					if(data.errors !== undefined){
						var errorOutput = "";

						for(var error in data.errors){
							$('#'+data.errors[error].errorType).parent().addClass("has-error");
							errorOutput += data.errors[error].text + "<br>";
						}

						$('#register-result').removeClass("alert-success");
						$('#register-result').addClass("alert-danger");

						$('#register-result').html(errorOutput);

						error = true;
					}else{
						// Login
						$('#register-result').removeClass("alert-danger");
						$('#register-result').addClass("alert-sucess");

						$('#register-result').html("Redirecting...");
					}
				},
				error: function(e){
					//console.log(e);
				},
				complete: function(){
					$('#register-result').slideDown(300, function(){
						signingUp = false;

						if(error){
							$('#regbtn').html("Get Started");
						}
					});
				}
			});
		});
	}
}