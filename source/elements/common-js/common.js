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

	// counters
	$('.count-input').each(function () {

		$(this).number({
			'minus' : 'count-down',
			'plus' : 'count-up',
			'btnTag' : 'span'
		});

	});


	var clipboard = new ClipboardJS('.clipboard_copy');
	clipboard.on('success', function(e) {
			$('.clipboard_copy').tooltip('enable').tooltip('open');
		});

	$('.share-buttons').jsSocials({
		url: 'https://github.com/OleksandrPavlyshch/arozon',
		text: 'Arozon',
		shareIn: 'popup',
		// showLabel: false,
		showCount: false,
		shares: [
			{
				share: 'facebook',
				logo: 'img/facebook.svg',
				label: '62'
			},
			{
				share: 'twitter',
				logo: 'img/twitter.svg',
				label: '62'
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
			errorClass: 'invalid',
			validClass: "valid",
			errorPlacement: function (error, element) {
				let $parent = $(element).parent();
				 if(element.is(':radio') || element.is(':checkbox')) {
						error.insertBefore($parent);
				 } else {
						error.insertBefore(element); // default error placement.
						$parent.addClass('invalid');
				 }
			},
			success: function (element) {
				let $parent = $(element).parent();
				// console.log($parent);
				$parent.removeClass('invalid');
				if(!$(element).closest('li').find('label.invalid:not(:empty)').length){
						$(element).closest('li').removeClass('wrong');
				}
			}
	 });

	$('[name=phone]').mask('+(38) 000 000 00 00');


})(jQuery);
// transform array to obj
	let formValueArrayToObj = (arr) => {
		let obj = {};

		arr.map(function(elem) {
			obj[elem.name] = elem.value;
		});

		return obj;
	};

