(function() {
    var jumboHeight = $('.jumbotron').outerHeight();
    var lead = $(".jumbotron div.sub");
    var header = $(".jumbotron h1");
    var scrolled = 0;

    function parallax() {

        if (scrolled < jumboHeight) {
            var percentScrolled = 1- (scrolled * 1.9)/jumboHeight;
            header.css({
                "transform" : 'translate(' + scrolled + 'px,0' + ")",
                "opacity" : percentScrolled.toFixed(2)
            });
            lead.css("transform", 'translate(0,' + scrolled + 'px' + ")");

        }
        requestAnimationFrame(parallax);
    }
    requestAnimationFrame(parallax);

    $(window).scroll(function(e){
        scrolled = $(window).scrollTop();
        if (scrolled <0) {
            scrolled = 0;
        }
        scrolled = Math.floor(scrolled);
    });
})();
