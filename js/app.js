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

					console.log($input.prop('checked'));
				if( $input.prop('checked') === false && $this.hasClass('calc_stepper-package-default') === false ){
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
// (($) => {
// 	$('.clients_slider .is-slick-slider').slick({
// 		slidesToShow: 4,
// 		slidesToScroll: 1,
// 		autoplay: true,
// 		dots: false,
// 		prevArrow: false,
// 		nextArrow: false
// 	});
// })(jQuery);
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



// (($) => {

// 	$('body').on('mousemove', '.button.is-bg-move, button.is-bg-move', (e) => {
// 		let button = e.target;

// 		const x = e.pageX - $(button).offset().left;
// 		const y = e.pageY - $(button).offset().top;

// 			$(button).css({'--x': x+'px', '--y': y+'px' });
// 	});

// })(jQuery);
(($) => {

	let focusANDEnterField = function () {

		$('input, textarea').focus(function() {
			let get_family = $(this).parent();
			$(get_family).addClass('focus');
		});

		$('input, textarea').focusout(function() {
				let get_family = $(this).parents('.input_box');

				$(get_family).removeClass('focus');

				if ($(this).val().trim().length === 0) {

						$(get_family).removeClass('enter');
				} else {
						$(get_family).addClass('enter');
				}
		});

		$('input').focusout();
};

focusANDEnterField();

	$('.view-checkbox').on('change', (e) => {

		let $this = $(e.currentTarget)
			, targetData =  $this.data('target')
			, $viewElement = $(targetData);

			if( $this.prop('checked') !== false ){
				$viewElement.slideDown();
				return;
			}

			$viewElement.slideUp();
	});

})(jQuery);
(($) => {
	//Init Datepicker
	$('.datepicker').datepicker({
		dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
		monthNamesShort: [ "Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"],
		monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
		showOtherMonths: true,
		onSelect: function() {
			//Auto swich months
			let $datepicker = $(this);

			$datepicker.datepicker( "setDate", new Date($datepicker.datepicker( "getDate" )) );
		},
		selectOtherMonths: true,
		language: 'ru',
		dateFormat: 'd M yy',
		autoclose: false,
		minDate: 0,
		nextText: '',
		prevText: '',
		firstDay: 1
	});

//scroll for time picker
	$('.timepicker-bot-col').mCustomScrollbar({
		autoHideScrollbar: false,
		alwaysShowScrollbar: 1,
		autoExpandScrollbar: false,
		autoDraggerLength: true,
		scrollInertia: 250,
		setHeight: 265,
		mouseWheel: {
			enable: true,
			scrollAmount: 110,
			deltaFactor: 110,
			normalizeDelta: true
		}
	});

//Timepicker logic
let TPlistItemClass = '.timepicker-list-item'
	, TPlistClass = '.timepicker-list'
	, TPlistActiveClass = 'active'
	, TPHourListClass = 'timepicker-hour_list'
	, TPMinutelistClass = 'timepicker-minute_list'
	, TPHourOutputClass = '.timepicker-top-content-hours'
	, TPMinuteOutputClass = '.timepicker-top-content-minutes'

	, TPClass = '.timepicker';

$('body').on('click', TPlistItemClass, (e)=>{
	let $item = $(e.currentTarget)
		, $parent = $item.parent(TPlistClass);

	$parent.find(TPlistItemClass).removeClass(TPlistActiveClass);
	$item.addClass(TPlistActiveClass);

	timepickeActionHandler($item, $parent);
});

let timepickeActionHandler = ($item, $parent) => {
	let val = $item.data('val')
		, $timepicker = $item.parents(TPClass)
		, $hoursOut = $timepicker.find(TPHourOutputClass)
		, $minutesOut = $timepicker.find(TPMinuteOutputClass);

	if($parent.hasClass(TPHourListClass)){
		$hoursOut.html(val);
		$timepicker.data('hours', val); //set data hours
		return;
	}

	$timepicker.data('minutes', val); //set data minutes
	$minutesOut.html(val);
};

let setTimepickerValue = ($timepicker, data) => {
	let $hoursOut = $timepicker.find(TPHourOutputClass)
		, $minutesOut = $timepicker.find(TPMinuteOutputClass)
		, $TPHourList = $timepicker.find('.' + TPHourListClass)
		, $TPMinutelist = $timepicker.find('.' + TPMinutelistClass)
		, hours = data.hours || '0'
		, minutes = data.minutes || '00';

	$timepicker.find(TPlistItemClass).removeClass(TPlistActiveClass); //remove active classes

	//set active tems
	$TPHourList.find('.timepicker-list-item[data-val="' + hours + '"]').addClass(TPlistActiveClass);
	$TPMinutelist.find('.timepicker-list-item[data-val="' + minutes + '"]').addClass(TPlistActiveClass);

	//set in output
	$hoursOut.html(hours);
	$minutesOut.html(minutes);
};


//Popup logic
	let showInputPopup = ($popup, data) => {
		let $datepicker = $popup.find('.datepicker')
		, $timepicker = $popup.find('.timepicker')
		, popupOffset = $popup.offset().top
		, windowScroll = $(window).scrollTop()
		, popupPos = popupOffset - windowScroll;

		if ($popup.hasClass("is-show")) {
			return;
		}

		if($datepicker.length){
			$datepicker.datepicker("setDate", new Date(data.date));
		}

		if($timepicker.length){
			setTimepickerValue($timepicker, data);
		}

		setTimeout(function(){
			if (popupPos < 90) {
				$popup.addClass('is-show-bot');
			} else {
				$popup.removeClass('is-show-bot');
			}
		}, 150);
		setTimeout(function(){

			$popup.parent().addClass('focus-popup');
			$popup.addClass('is-show');
		}, 200);
	};

	let hideAllInputPopups = () => {
		$('.input_popup').removeClass('is-show').parent().removeClass('focus-popup');
		setTimeout(function(){
			$('.input_popup').removeClass('is-show-bot');
		}, 100);
	};

	let hideInputPopup = ($popup) => {
		$popup.removeClass('is-show');
		setTimeout(function(){
			$popup.removeClass('is-show-bot');
			}, 100);
		$popup.parent().removeClass('focus-popup');
		if ($.isFunction($.fn.valid) ? 1 : 0) {
			$popup.parents('.input_box').find('input').valid();
		}
	};

	let setValFromPicker = ($input, $popup) => {
		let $datepicker = $popup.find('.datepicker')
		, $timepicker = $popup.find('.timepicker');

		if($datepicker.length) {
			let date = $datepicker.datepicker( "getDate" );

			$input.val($datepicker.val());
			$input.data('date', date);
		}

		if($timepicker.length) {
			let hoursVal = $timepicker.data('hours') || '0'
				, minutesVal =  $timepicker.data('minutes') || '00';

			$input.val(hoursVal + ' : ' + minutesVal);
			$input.data('hours', hoursVal);
			$input.data('minutes', minutesVal);
		}

		$popup.parent().addClass('enter'); //set is field not empty
	};

	$('body').on('click', '.has_input_popup', (e)=>{
		let $popup = $(e.currentTarget).find('.input_popup');
		if( !$popup.hasClass('is-show') && !$(e.target).hasClass('input_popup-control') ){
			hideAllInputPopups();
			showInputPopup($popup, $(e.target).data());
		}
	});

	$('body').on('click', (e) => {
		var $target = $(e.target);
		if ($target.closest('.has_input_popup').length === 0 && !$target.hasClass('ui-icon')) {
			hideAllInputPopups();
		}
	});

	$('body').on('click', '.input_popup-cancel', (e)=>{
		let $popup = $(e.target).parents('.input_popup');
		hideInputPopup($popup);
	});

	$('body').on('click', '.input_popup-confirm', (e)=>{
		let $popup = $(e.target).parents('.input_popup')
		, $input = $popup.parent().find('input');
		setValFromPicker($input, $popup);
		hideInputPopup($popup);
	});

})(jQuery);
(($) => {
	$('.select-custom').niceSelect();
})(jQuery);
(($) => {
	let initHeader = () => {
		$(window).scroll(function() {
			let _top = parseInt($(window).height() / 2)
				, _scroll = parseInt($(window).height() / 3);

			if ($(window).scrollTop() >= _scroll ) {
				$('#header').addClass('is-scroll');
				$('.select_city').removeClass('open');
			} else {
				$('#header').removeClass('is-scroll');
			}

			if ($(window).scrollTop() >= _top) {
				$('#header').addClass('is-fixed');
			} else {
				$('#header').removeClass('is-fixed');
			}
		});
	};

	initHeader();

	//init menu open
	let $body = $('body')
		, $menuButton = $('.toggle-menu-button')
		, menuShowClass = 'is-menu-show';

	$menuButton.on('click', function() {
		$body.toggleClass(menuShowClass);
	});


	$(document).click( function(event){
		if( $(event.target).closest('.header').length )
			return;
		$body.removeClass(menuShowClass);
	});

})(jQuery);

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

