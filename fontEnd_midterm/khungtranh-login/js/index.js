$('document').ready(function() {
    console.log('ok');
    $('#login-form-active').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
         $("#register-form").fadeOut(100);
		//$('#register-form-active').removeClass('active');
		//$(this).addClass('active');
		//e.preventDefault();
	});
	$('#register-form-active').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
		//$('#login-form-active').removeClass('active');
		//$(this).addClass('active');
		//e.preventDefault();
	});
})
