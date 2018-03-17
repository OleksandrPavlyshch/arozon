(($) => {
	//Init Datepicker
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
	, $timepicker = $popup.find('.timepicker');

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

	if($datepicker.length){
		$datepicker.datepicker("setDate", new Date(data.date));
	}

	if($timepicker.length){
		setTimepickerValue($timepicker, data);
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

		if($timepicker.length) {
			let hoursVal = $timepicker.data('hours') || '0'
				, minutesVal =  $timepicker.data('minutes') || '00';

			$input.val(hoursVal + ' : ' + minutesVal);
			$input.data('hours', hoursVal);
			$input.data('minutes', minutesVal);
		}

		$popup.parent().parent().addClass('enter'); //set is field not empty
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