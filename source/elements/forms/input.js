(($) => {

	let focusANDEnterField = function () {

		$('input, textarea').focus(function() {
			let get_family = $(this).parent();
			$(get_family).addClass('focus');
		});

		$('input, textarea').focusout(function() {
				let get_family = $(this).parent();

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