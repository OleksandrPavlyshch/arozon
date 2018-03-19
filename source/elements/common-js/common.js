(($) => {

	$('.clipboard_copy').tooltip({
		disabled: true,
		position: {
			my: 'center top+10',
			at: 'center bottom'
		},
		show: {
			effect: 'drop',
			direction: 'down'
		},
		hide: {
			effect: 'drop',
			direction: 'down'
		},
		close: function() {
			$(this).tooltip('disable');
		}
	});

	var clipboard = new ClipboardJS('.clipboard_copy');
	clipboard.on('success', function(e) {
			$('.clipboard_copy').tooltip('enable').tooltip('open');
		});

	$('.share-buttons').jsSocials({
		url: 'https://github.com/OleksandrPavlyshch/arozon',
		text: 'Arozon',
		shareIn: 'popup',
		showLabel: false,
		showCount: 'inside',
		shares: [
			{
				share: 'facebook',
				logo: 'img/facebook.svg'
			},
			{
				share: 'twitter',
				logo: 'img/twitter.svg'
			},
			{
				share: 'telegram',
				logo: 'img/telegram.svg'
			}
		]
	});

	$('[data-fancybox]').fancybox({
		protect: true
	});

	$.extend( $.validator.messages, {
		required: "Обязательное поле",
		remote: "Пожалуйста, введите правильное значение.",
		email: "Пожалуйста, введите корректный адрес электронной почты.",
		url: "Пожалуйста, введите корректный URL.",
		date: "Пожалуйста, введите корректную дату.",
		dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
		number: "Пожалуйста, введите число.",
		digits: "Пожалуйста, вводите только цифры.",
		creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
		equalTo: "Пожалуйста, введите такое же значение ещё раз.",
		extension: "Пожалуйста, выберите файл с правильным расширением.",
		maxlength: $.validator.format( "Пожалуйста, введите не больше {0} символов." ),
		minlength: $.validator.format( "Пожалуйста, введите не меньше {0} символов." ),
		rangelength: $.validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
		range: $.validator.format( "Пожалуйста, введите число от {0} до {1}." ),
		max: $.validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
		min: $.validator.format( "Пожалуйста, введите число, большее или равное {0}." )
	} );

	$.validator.setDefaults({
		// debug: true,
			errorClass: 'invalid',
			validClass: "valid",
			errorPlacement: function (error, element) {
				console.log(error, element);
				 if(element.is(':radio') || element.is(':checkbox')) {
						error.insertBefore($(element).parent());
				 } else {
						error.insertBefore(element); // default error placement.
						// element.closest('label').data('error', error);
						// element.next().attr('data-error', error);
				 }
			},
			success: function (element) {
				 if(!$(element).closest('li').find('label.invalid:not(:empty)').length){
						$(element).closest('li').removeClass('wrong');
				 }
			}
	 });
	// if (validation) {

		 // When parallel stepper is defined we need to consider invisible and
		 // hidden fields
		 // if($('.stepper.parallel').length) $.validator.setDefaults({ignore:''});
	// }

})(jQuery);