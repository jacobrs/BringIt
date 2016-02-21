$(document).on('ready', function(){
	$('#login-username, #login-password').keypress(function(e){
		var key = e.which ? e.which : e.keyCode;

		if(key == 13){
			logIn();
		}
	});

	$('#login-password').keypress(function(e){
		var key = e.which ? e.which : e.keyCode;

		if(key == 13){
			logIn();
		}
	});

	$('#username, #email, #fname, #lname, #password').keypress(function(e){
		var key = e.which ? e.which : e.keyCode;

		if(key == 13){
			signUp();
		}
	});
});

var signingUp = false;

function signUp(){
	if(!signingUp){
		signingUp = true;

		$('#register-result').slideUp(500, function(){
			$('#regbtn').html("<i class='fa fa-spin fa-spinner' style='font-size: 0.75em;'></i>");

			var error = false;

			$('#registration').children().children().each(function(div){
				if($(this).hasClass("has-error")){
					$(this).removeClass("has-error");
				}
			});

			$.ajax({
				method: "POST",
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

						$('#regbtn').html("Get Started");
					}else{
						// Login
						$('#register-result').removeClass("alert-danger");
						$('#register-result').addClass("alert-success");

						$('#register-result').html("Redirecting...");

						window.location = "app";
					}
				},
				error: function(e){
					//console.log(e);
				},
				complete: function(){
					$('#register-result').slideDown(500, function(){
						signingUp = false;
					});
				}
			});
		});
	}
}

var loggingIn = false;

function logIn(){
	if(!loggingIn){
		loggingIn = true;
		var width = $('#loginbtn').outerWidth();
		$('#loginbtn').html("<i class='fa fa-spin fa-spinner' style='font-size: 0.75em;'></i>").css('width', width);

		var error = false;

		$('#login').children().each(function(div){
			if($(this).hasClass("has-error")){
				$(this).removeClass("has-error");
			}
		});

		$.ajax({
			method: "POST",
			url: "./user/login",
			dataType: "json",
			data: {
				username: $('#login-username').val(),
				password: $('#login-password').val()
			},
			success: function(data){
				if(data.error !== undefined){
					var errorOutput = "";

					if(data.errorType == "both"){
						$("#login-username").parent().addClass("has-error");
						$("#login-password").parent().addClass("has-error");
					}else if(data.errorType == "username"){
						$("#login-username").parent().addClass("has-error");
					}else{
						$("#login-password").parent().addClass("has-error");
					}

					$('#login-result').removeClass("alert-success");
					$('#login-result').addClass("alert-danger");

					$('#login-result').html(data.error);

					$('#loginbtn').html("Sign In");

					$('#login-result').show().css('display', 'inline');
				}else{
					// Login
					$('#login-result').hide();
					$('#login-result').removeClass("alert-danger");
					$('#login-result').addClass("alert-success");

					$('#login-result').html("Redirecting...");

					loggingIn = false;

					window.location = "app";
				}
			},
			error: function(e){
				//console.log(e);
			},
			complete: function(){
				loggingIn = false;
			}
		});
	}
}
