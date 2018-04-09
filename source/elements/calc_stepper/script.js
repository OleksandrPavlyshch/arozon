(($) => {

	$(function(){
		let $stepper = $('#calc_stepper')
			, $stepperForm = $('.calc_stepper-form')
			, $calcStepperBlock = $('.calc_stepper-sum_block');

		$stepper.activateStepper();

		$('.calc_stepper-step-1').on('click', '.input_custom_image', (e) => {
			e.preventDefault();

			let $this = $(e.currentTarget)
				, $input = $this.find('input')
				, $step = $(e.delegateTarget)
				, $stepInputs = $step.find('input')
				, $defaultInput = $step.find('.calc_stepper-package-default').find('input')
				, $nextButton = $step.find('.button')
				, defaultText = 'пропустить'
				, nextText = 'далее';

					// console.log($input.prop('checked'));
				if( $input.prop('checked') === false && $this.hasClass('calc_stepper-package-default') === false ){
					$stepInputs.prop('checked', false);
					$input.prop('checked', 'checked');
					$nextButton.text(nextText);
					calculateCost();
					return;
				}

				$nextButton.text(defaultText);
				$stepInputs.prop('checked', false);
				$defaultInput.prop('checked', 'checked');
				calculateCost();

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

		let $costOutput =  $('.calc_stepper-sum_block-price');

		let calculateCost = () => {
			let config = {
				'base-price' : 40
				, 'package': {
					'baby': 1.37
					, 'pet': 1.37
					, 'mans': 1.37
					, 'party': 1.37
				}
				, 'place-type': {
					'apartment': 1
					, 'house': 1.15
					, 'office': 1
					, 'boutique': 1
				}
				, 'clean-type': {
					'support': 1
					, 'general': 1
					, 'after-construction': 1.27
				}
				, 'refrigerator': 100
				, 'microwave': 40
				, 'сhandelier': 0
				, 'oven': 180
				, 'wash-dishes': 0
				, 'dry-cleaning': 0
				, 'window': 150
				, 'balcony': 200
			};

			let formValues = formValueArrayToObj($stepperForm.serializeArray());


			let result = config['base-price'];

				//steps for all selected values
				result *= config.package[formValues.package] || 1;
				result *= config['place-type'][formValues['place-type']] || 1;
				result *= formValues['square-amount'] || 1;
				result *= config['clean-type'][formValues['clean-type']] || 1;

				if(formValues.refrigerator) {
					result += config.refrigerator;
				}

				if(formValues.microwave) {
					result += config.microwave;
				}

				if(formValues.сhandelier) {
					result += config.сhandelier;
				}

				if(formValues.oven) {
					result += config.oven;
				}

				if(formValues['wash-dishes']) {
					result += config['wash-dishes'];
				}

				if(formValues['dry-cleaning']) {
					result += config['dry-cleaning'];
				}

				if(formValues.window) {
					result += (config.window * formValues['window-amount']);
				}

				if(formValues.balcony) {
					result += (config.balcony * formValues['balcony-amount']);
				}

			// console.table( formValueArrayToObj($stepperForm.serializeArray()));

			$costOutput.text(Math.round(result));
		};

		$stepper.on('change', 'input', function() {

			calculateCost();
		});

		$stepper.on('stepchange', function(){
			calculateCost();
		});

		$stepper.on('step4', function(){
			$calcStepperBlock.fadeOut();
		});

		$stepper.on('step5', function(){
			$calcStepperBlock.fadeIn();
		});

	});

})(jQuery);