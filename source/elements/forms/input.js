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
		firstDay: 1,
		showAnim: "fadeIn",
		showOptions: { direction: "top" },
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