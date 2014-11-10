var jumboHeight = $('.jumbotron').outerHeight();
var lead = $(".jumbotron div.sub");
var header = $(".jumbotron h1");

function parallax() {
    var scrolled = $(window).scrollTop();
    if (scrolled <0) {
		scrolled = 0;
    }

    if (scrolled < jumboHeight) {
		var percentScrolled = 1- (scrolled * 1.9)/jumboHeight;
		header.css('opacity', percentScrolled);
        header.css("transform", 'translate(' + scrolled + 'px,0' + ")");
		lead.css("transform", 'translate(0,' + scrolled + 'px' + ")");
    }
}

$(window).scroll(function(e){
    parallax();
});