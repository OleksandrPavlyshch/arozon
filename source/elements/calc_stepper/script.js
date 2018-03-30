(($) => {

	$(function(){
		$('#calc_stepper').activateStepper();
		
		$('.calc_stepper-step-1').on('click', '.input_custom_image', (e) => {
			e.preventDefault();
			let $this = $(e.currentTarget)
				, $input = $this.find('input')
				, $step = $(e.delegateTarget)
				, $stepInputs = $step.find('input')
				, $nextButton = $step.find('.button')
				, defaultText = 'пропустить'
				, nextText = 'далее';

				if( $input.prop('checked') === false ){
					console.log('test');
					console.log($input.prop('checked'));
					$stepInputs.prop('checked', false);
					$input.prop('checked', 'checked');
					$nextButton.text(nextText);
					return;
				}


				$nextButton.text(defaultText);
				$stepInputs.prop('checked', false);

		});

	});

})(jQuery);