(($) => {

	$(function(){
		$('#calc_stepper').activateStepper();
		
		$('.calc_stepper-step-1').on('click', '.input_custom_image', (e) => {
			let $this = $(e.currentTarget)
				, $input = $this.find('input')
				, $step = $(e.delegateTarget)
				, $stepInputs = $step.find('input')
				, $nextButton = $step.find('.button')
				, defaultText = 'пропустить'
				, nextText = 'далее';

				if( $input.prop('checked') === false ){
					$stepInputs.prop('checked', false);
					$input.prop('checked', 'checked');
					$nextButton.text(nextText);
					return;
				}

				$nextButton.text(defaultText);
				$stepInputs.prop('checked', false);

		});

		let $calcStepperBlock = $('.calc_stepper-sum_block')
		, $stepper = $('.stepper');

		function throttle(fn, threshhold, scope) {
			threshhold || (threshhold = 250);
			var last,
					deferTimer;
			return function () {
				var context = scope || this;

				var now = +new Date,
						args = arguments;
				if (last && now < last + threshhold) {
					// hold on to it
					clearTimeout(deferTimer);
					deferTimer = setTimeout(function () {
						last = now;
						fn.apply(context, args);
					}, threshhold);
				} else {
					last = now;
					fn.apply(context, args);
				}
			};
		}

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

						console.log('test');
						console.log(translateY);
					if (divTop < top) {
						$calcStepperBlock.velocity({'transform': 'translateY(' + translateY + 'px)'});
					} 
					else {
						$calcStepperBlock.velocity({'transform': 'translateY( 0 )'});
					}

			}, 100));

		}


	});

})(jQuery);