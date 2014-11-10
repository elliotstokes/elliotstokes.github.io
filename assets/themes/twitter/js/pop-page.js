var jumboHeight = $('.jumbotron').outerHeight();
function parallax() {
    var scrolled = $(window).scrollTop();
    if (scrolled <0) {
		scrolled = 0;
    }
    var lead = $(".jumbotron div.sub");
    var header = $(".jumbotron h1");

    if (scrolled < jumboHeight) {
		var percentScrolled = 1- (scrolled * 1.9)/jumboHeight;
		header.css('opacity', percentScrolled);
		lead.css("transform", 'translate(0,' + scrolled + 'px' + ")");
    }
}

$(window).scroll(function(e){
    parallax();
});