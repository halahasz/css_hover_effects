$(document).ready(function () {
	samsung_duze_gry();
});

function samsung_duze_gry() {
    
    sam_animateInit()
    
    $(document).on('click', '#samsung_m_00 #samsung_m_01 a[data-jump-to]', function (e) {
        e.preventDefault();
        var $jump_to_el = $($(this).attr('data-jump-to'));
        $('html, body').animate({
            scrollTop: $jump_to_el.offset().top
        }, 1000);
    });
}

function sam_animateInit() {

    var settings = {
        'wrapper_id': 'samsung_m_00',
        'class_animation_init': 'sam_effect',
        'class_animation_add': 'sam_effect_active'
    }

    var isInIframe = (window.location != window.parent.location) ? true : false;
    var iframeTop = 0;

    if (isInIframe) {
        var frames = parent.document.getElementsByTagName('iframe');
        var ourFrame;

        for (var i = 0; i < frames.length; i++) {
            if (frames[i].contentDocument.getElementById(settings.wrapper_id) !== 'null') {
                iframeTop = parent.window.document.getElementsByTagName('iframe')[i].offsetTop;
                break;
            }
        }
    }

    $(parent.window).scroll(function () {
        animateElement();

    });
    animateElement();

    function animateElement() {
        $('.' + settings.class_animation_init).each(function () {

            var slideIn = ($(parent.window).scrollTop() + $(parent.window).height()) - $(this).height() / 2;
            var imageBottom = $(this).offset().top + iframeTop + $(this).height();
            var isHalfShown = slideIn > $(this).offset().top + iframeTop;
            var isNotScrolledPast = $(parent.window).scrollTop() < imageBottom - $(this).height() / 2;
            if (isHalfShown && isNotScrolledPast) {

                $(this).addClass(settings.class_animation_add);
            } else {
                //$(this).removeClass(settings.class_animation_add);
            }
        });
    }
}