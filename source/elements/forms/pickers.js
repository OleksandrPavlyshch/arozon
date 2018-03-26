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
		}, 250);
		setTimeout(function(){

			$popup.parent().addClass('focus-popup');
			$popup.addClass('is-show');
		}, 300);
	};

	let hideAllInputPopups = () => {
		$('.input_popup').removeClass('is-show').parent().removeClass('focus-popup');
		setTimeout(function(){
			$('.input_popup').removeClass('is-show-bot');
		}, 200);
	};

	let hideInputPopup = ($popup) => {
		$popup.removeClass('is-show');
		setTimeout(function(){
			$popup.removeClass('is-show-bot');
			}, 200);
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