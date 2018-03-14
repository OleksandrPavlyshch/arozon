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

		$('.count-input').change(function() {
				setStyle($(this));
		});

		function setStyle($count) {
			let num = $count.val()
				, $countDown = $count.parent().find('.count-down')
				, $countUp = $count.parent().find('.count-up');

				if (num > minCount && num < maxCount) {
						$countDown.addClass('active');
						$countUp.addClass('active');
				} else if (num == minCount) {
						$countUp.addClass('active');
						$countDown.removeClass('active');
				} else if (num == maxCount) {
						$countDown.addClass('active');
						$countUp.removeClass('active');
				}
		}

		$('.wrapp-count .count-up').click(function() {
			let $countInput = $(this).parent().find('.count-input')
				, countVal = $countInput.val();

				if (countVal < maxCount) {
						countVal++;
						$countInput.val(countVal);
						setStyle($countInput);
				}
				return;
		});

		$('.wrapp-count .count-down').click(function() {
			let $countInput = $(this).parent().find('.count-input')
				, countVal = $countInput.val();

				if (countVal > minCount) {
					countVal--;
					$countInput.val(countVal);
					setStyle($countInput);
				}
				return;
		});

		// $('.wrapp-count').click(function(e) {
		// 	let $countInput = $(this).find('.count-input')
		// 		, countVal = $countInput.val();
		// 		let this_count = $(e.target).attr('class');

		// 		if (this_count.split(' ').indexOf('count-down') >= 0) {
		// 				if (countVal > minCount) {
		// 						countVal--;
		// 						$countInput.val(countVal);
		// 						setStyle($countInput);
		// 				} else {
		// 						return;
		// 				}
		// 		} else if (this_count.split(' ').indexOf('count-up') >= 0) {
		// 				if (countVal < maxCount) {
		// 						countVal++;
		// 						$countInput.val(countVal);
		// 						setStyle($countInput);
		// 				} else {
		// 						return;
		// 				}
		// 		}
		// });
};

focusANDEnterField();
changeCount();

})(jQuery);