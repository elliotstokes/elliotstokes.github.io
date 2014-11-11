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

    if (window.requestAnimationFrame) {
        var jumboHeight = $('.jumbotron').outerHeight();
        var lead = $(".jumbotron div.sub");
        var header = $(".jumbotron div.header");
        var scrolled = 0;

        var parallax = function() {

            if (scrolled < jumboHeight) {
                var percentScrolled = 1- (scrolled * 1.9)/jumboHeight;
                header.css({
                    "transform" : 'translate(' + scrolled + 'px,0' + ")",
                    "opacity" : percentScrolled.toFixed(2)
                });
                lead.css("transform", 'translate(0,' + scrolled + 'px' + ")");

            }
            requestAnimationFrame(parallax);
        };

        
        requestAnimationFrame(parallax);

        $(window).scroll(function(e){
            scrolled = $(window).scrollTop();
            if (scrolled <0) {
                scrolled = 0;
            }
            scrolled = Math.floor(scrolled);
        });
    }
    
    if ($("pre.prettyprint").length>0 && window.prettyPrint) {
		prettyPrint();
    }


})(jQuery);
