(($) => {


$('.datepicker').datepicker({
	dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
	monthNamesShort: [ "Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"],
	monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
	showOtherMonths: true,
	selectOtherMonths: true,
	language: 'ru',
	dateFormat: 'd M yy',
	autoclose: false,
	minDate: 0,
	nextText: '',
	prevText: '',
	firstDay: 1
});

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


let showInputPopup = ($popup, data) => {
	if ($popup.hasClass("is-show")) {
		return;
	}
	let popupOffset = $popup.offset().top
		, windowScroll = $(window).scrollTop()
		, popupPos = popupOffset - windowScroll;

	if (popupPos < 90) {
		$popup.addClass('is-show-bot');
	} else {
		$popup.removeClass('is-show-bot');
	}

	if($popup.find('.datepicker')){
		$popup.find('.datepicker').datepicker("setDate", new Date(data.date));
	}

	$popup.parent().parent().addClass('focus-popup');
	$popup.addClass('is-show');
};

let hideInputPopup = ($popup) => {
	$popup.removeClass('is-show');
	setTimeout(function(){
		$popup.removeClass('is-show-bot');
		},300);
	$popup.parent().parent().removeClass('focus-popup');
};

let setValFromPicker = ($input, $popup) => {
	let $datepicker = $popup.find('.datepicker')
	, $timepicker = $popup.find('.timepicker');
	if($datepicker.length) {
		let date = $datepicker.datepicker( "getDate" )
			, day = date.getDate()
			, month = date.getMonth() + 1
			, year = date.getFullYear();

		$input.val($datepicker.val());
		$input.data('date', year + '-' + month + '-' + day);
	}
};

$('body').on('click', '.has_input_popup', (e)=>{
	let $popup = $(e.target).parent().find('.input_popup');
	showInputPopup($popup, $(e.target).data());
});

$('body').on('click', '.input_popup-cancel', (e)=>{
	let $popup = $(e.target).parents('.input_popup');
	hideInputPopup($popup);
});

$('body').on('click', '.input_popup-confirm', (e)=>{
	let $popup = $(e.target).parents('.input_popup')
	, $input = $popup.parent().find('.has_input_popup');
	setValFromPicker($input, $popup);
	hideInputPopup($popup);
});
})(jQuery);