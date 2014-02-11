(function($) {

	var parent = $("#small-header").parent();

	$(window).scroll(function() {
		if (window.pageYOffset > 150 && parent.is(":visible")) {
			$("#small-header").slideDown(200);
			$(".navbar").addClass("small-header-down");
			//show the fake header
		} else {
			//hide the header
			$(".navbar").removeClass("small-header-down");
			$("#small-header").slideUp(200);
		}
	});

})(jQuery);