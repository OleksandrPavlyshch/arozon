(($) => {
	$( "#calc-forms" ).tabs();

	$('.main_calc-form-wrap').validate({
		debug: true
	});

	$('body').on('click', '.main-calc-action', function(event) {
		event.preventDefault();
		let $actionButton = $(this)
			, $form = $actionButton.parents('.main_calc-form-wrap')
			, formType = $form.data('form')
			, formValuesArray = $form.serializeArray()
			, $popup = $('#cost_popup');

		let config = {
			'home': 81.22
			, 'flat': 72.47
			, 'window-price': 150
			, 'type': {
				'1': 1.37
				, '2': 1
				, '3': 1
			}
		};


		let mainCalculatedValue = (values) => {
			let result = config[formType] * values.meters * config.type[values.type] + (config['window-price'] * values.windows);

			return Math.round(result);
		};


		if($form.valid()){

			let mainCalcPrice = mainCalculatedValue(formValueArrayToObj(formValuesArray));

			$.fancybox.open({
				src  : '#cost_popup',
				type : 'inline',
				opts : {
					beforeShow: function() {
						$popup.find('.cost_popup-header-price').text('~' + mainCalcPrice);
					},
					afterClose : function() {
						$popup.find('.cost_popup-header-price').text('');
					}
				}
			});
		}

	});

})(jQuery);