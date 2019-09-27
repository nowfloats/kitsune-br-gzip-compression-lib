var ww = $('body').width();
$(document).ready(function () {
    $(".nav1 li a").each(function () {
        if ($(this).next().length > 0) {
            $(this).addClass("parent");
        }
        ;
    })
    $(".navbot li a").each(function () {
        if ($(this).next().length > 0) {
            $(this).addClass("parent");
        }
        ;
    })
    $(".toggleMenu").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("activenav");
        $(".nav1").toggle();
    });
    adjustMenu();
})
$(window).bind('resize orientationchange', function () {
    ww = document.body.clientWidth;
    adjustMenu();
});
var adjustMenu = function () {
    if (ww < 1000) {
        $(".toggleMenu").css("display", "inline-block");
        if (!$(".toggleMenu").hasClass("activenav")) {
            $(".nav1").hide();
        } else {
            $(".nav1").show();
        }
        $(".nav1 li").unbind('mouseenter mouseleave');
        $(".nav1 li a.parent").unbind('click').bind('click', function (e) {
            e.preventDefault();
            $(this).parent("li").toggleClass("hover");
        });
        $(".navbot li").unbind('mouseenter mouseleave');
        $(".navbot li a.parent").unbind('click').bind('click', function (e) {
            e.preventDefault();
            $(this).parent("li").toggleClass("hover");
        });
    }
    else if (ww >= 1000) {
        $(".toggleMenu").css("display", "none");
        $(".nav1").hide();
        $(".nav1 li").removeClass("hover");
        $(".nav1 li a").unbind('click');
        $(".nav1 li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function () {
            $(this).toggleClass('hover');
        });
    }
}
