(($) => {

	$(function(){
		let $stepper = $('#calc_stepper')
			, $stepperForm = $('.calc_stepper-form')
			, $calcStepperBlock = $('.calc_stepper-sum_block');

		$stepper.activateStepper();

		$('.calc_stepper-step-1').on('click', '.input_custom_image', (e) => {
			let $this = $(e.currentTarget)
				, $input = $this.find('input')
				, $step = $(e.delegateTarget)
				, $stepInputs = $step.find('input')
				, $defaultInput = $step.find('.calc_stepper-package-default').find('input')
				, $nextButton = $step.find('.button')
				, defaultText = 'пропустить'
				, nextText = 'далее';

					console.log($input.prop('checked'));
				if( $input.prop('checked') === true ){
					$stepInputs.prop('checked', false);
					$input.prop('checked', 'checked');
					$nextButton.text(nextText);
					return;
				}

				$nextButton.text(defaultText);
				$stepInputs.prop('checked', false);
				$defaultInput.prop('checked', 'checked');

		});


		// function throttle(fn, threshhold, scope) {
		// 	threshhold || (threshhold = 250);
		// 	var last,
		// 			deferTimer;
		// 	return function () {
		// 		var context = scope || this;

		// 		var now = +new Date,
		// 				args = arguments;
		// 		if (last && now < last + threshhold) {
		// 			// hold on to it
		// 			clearTimeout(deferTimer);
		// 			deferTimer = setTimeout(function () {
		// 				last = now;
		// 				fn.apply(context, args);
		// 			}, threshhold);
		// 		} else {
		// 			last = now;
		// 			fn.apply(context, args);
		// 		}
		// 	};
		// }

		function debounce(fn, delay) {
				var timer = null;
				return function () {
					var context = this, args = arguments;
					clearTimeout(timer);
					timer = setTimeout(function () {
						fn.apply(context, args);
					}, delay);
				};
			}

		if( $calcStepperBlock.length ){
			$(window).on('scroll', debounce(
				() => {
					var top = $(window).scrollTop()
							, divTop = $stepper.offset().top - 90
							, translateY = top - divTop;

					if (divTop < top) {
						$calcStepperBlock.css({'transform': 'translateY(' + translateY + 'px)'});
					} else {
						$calcStepperBlock.css({'transform': 'translateY( 0 )'});
					}

			}, 200));
		}

		let $costOutput =  $('.calc_stepper-sum_block-price')

		let s = 111;
		let calculateCost = (formValues) => {
			let config = {

			};

			console.table( $stepperForm.serializeArray());

			++s
			$costOutput.text(s);
		}

		$stepper.on('change', 'input', function(event) {

			calculateCost();
		});

		$stepper.on('step4', function(e){
			$calcStepperBlock.fadeOut();
		});

		$stepper.on('step5', function(e){
			$calcStepperBlock.fadeIn();
		});

	});

})(jQuery);