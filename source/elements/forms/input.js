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



	


})(jQuery);