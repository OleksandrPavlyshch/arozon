(($) => {
	let $preloader = $('.preloader');
	let $stepper = $('#calc_stepper');
	
	//fade-preloader
	$(window).on("load", function () {
		$preloader.delay(1500).fadeOut(400, function(){
			$stepper.activateStepper();
		});
	});

})(jQuery);