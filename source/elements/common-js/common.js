(($) => {
	$('.clipboard_copy').tooltip({
		disabled: true,
		position: {
			my: "center top+10",
			at: "center bottom"
		},
		show: {
			effect: "drop",
			direction: "down"
		},
		hide: {
			effect: "drop",
			direction: "down"
		},
		close: function() {
			$(this).tooltip('disable');
		}
	});

	var clipboard = new ClipboardJS('.clipboard_copy');
	clipboard.on('success', function(e) {
			$('.clipboard_copy').tooltip('enable').tooltip('open');
		});

})(jQuery);