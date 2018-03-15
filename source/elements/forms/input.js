(($) => {

$('.datepicker-mod').datepicker({
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
	firstDay: 1,
	showAnim: "fadeIn",
	beforeShow: function () {
		$(this).parent().append($('#ui-datepicker-div').addClass('datepicker-popup'));
		$(this).parent().parent().addClass('focus-date');
	},
	onSelect: function () {
		$('.datepicker').focusout();
		$(this).parent().parent().removeClass('focus-date');
		// $('#popup-book-a-table .mob-datepicker').removeClass('open');
	},
	onClose: function () {
		$(this).parent().parent().removeClass('focus-date');
		// $('#popup-book-a-table .mob-datepicker').removeClass('open');
	}
});

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
	if($datepicker) {
		let date = $datepicker.datepicker( "getDate" )
			, day = date.getDate()
			, month = date.getMonth() + 1
			, year = date.getFullYear();

		$input.val($datepicker.val());
		$input.data('date', year + '-' + month + '-' + day);
	}


	// let value = $popup.find('.timepicker').val() || $popup.find('.datepicker').val();


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

	let focusANDEnterField = function () {

		$('input, textarea').focus(function() {
			let get_family = $(this).parent().parent();
			$(get_family).addClass('focus');
		});

		$('input, textarea').focusout(function() {
				let get_family = $(this).parent().parent();

				$(get_family).removeClass('focus');

				if ($(this).val().trim().length === 0) {

						$(get_family).removeClass('enter');
				} else {
						$(get_family).addClass('enter');
				}
		});

		$('input').focusout();
};

let changeCount = function () {

		let minCount = 1
			, maxCount = 999;

		// $('.count-input').change(function() {
		// 		setStyle($(this));
		// });

		function setStyle($count, min, max) {
			let num = $count.val()
				, minVal = min || minCount
				, maxVal = max || maxCount
				, $countDown = $count.parent().find('.count-down')
				, $countUp = $count.parent().find('.count-up');

				if (num > minVal && num < maxVal) {
						$countDown.addClass('active');
						$countUp.addClass('active');
				} else if (num == minVal) {
						$countUp.addClass('active');
						$countDown.removeClass('active');
				} else if (num == maxVal) {
						$countDown.addClass('active');
						$countUp.removeClass('active');
				}
		}

		$('.wrapp-count').on('click', function(e) {
			let $countInput = $(this).find('.count-input')
				, minVal = $countInput.data('minCount') || minCount
				, maxVal = $countInput.data('maxCount') || maxCount
				, countVal = $countInput.val()
				, this_count = $(e.target).attr('class');

			if (this_count.split(' ').indexOf('count-down') >= 0 && countVal > minVal) {
				countVal--;
				$countInput.val(countVal);
				setStyle($countInput, minVal, maxVal);
			}

			if (this_count.split(' ').indexOf('count-up') >= 0 && countVal < maxVal) {
				countVal++;
				$countInput.val(countVal);
				setStyle($countInput, minVal, maxVal);
			}
		});

};

focusANDEnterField();
changeCount();

})(jQuery);