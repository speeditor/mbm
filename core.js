// Monobook Mobile core script
// == global variables ==
window.mbm = {
    state: false,
    style:  $('link[href$="PortableInfoboxMonobook.scss"]'),
    on: function() {
        $('.skin-monobook').addClass('mbm-on');
        mbm.style.detach();
        mbm.state = true;
    },
    off: function() {
        $('.skin-monobook').removeClass('mbm-on');
        $('meta[name="ResourceLoaderDynamicStyles"]').before(mbm.style);
        mbm.state = false;
    },
    toggle: function(status) {
        if (typeof status !== 'undefined') {
            status ? mbm.on() : mbm.off();
        } else {
            !mbm.state ? mbm.on() : mbm.off();
        }
    },
    init: (function() {
        if (navigator.userAgent.indexOf('Mobi') > -1) {
            mbm.on();
        }
    }())
};

// == user interface ==
var mbmbtn = mw.html.element('div', { id: 'p-mbm' }, 'mbm');
$('.skin-monobook').append(mbmbtn);

// == responsive design ==
var mbmvpt = mw.html.element('meta', {
                 name: 'viewport',
                 content: 'user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, minimal-ui'
             });
$('head').append(mbmvpt);
$('#p-mbm').click(function(toggle) {
    toggle.preventDefault();
    window.mbm.state = window.mbm.state ? false : true;
    $('.skin-monobook').toggleClass('mbm-on');
});

// == interface elements ==
var navbtn = mw.html.element('div', { id: 'p-navicon' }),
    schbtn = mw.html.element('div', { id: 'p-schicon' }),
    wbgmbm = mw.html.element('div', { id: 'mbm-bg' }),
    viscls = 'is-visible',
    schcls = 'is-search';
// === toolbar buttons ===
$('#p-logo').append(navbtn);
$('#p-logo').append(schbtn);
$('#column-content').append(wbgmbm);
// == toolbar initialization ===
$('#column-content').addClass(viscls);
$('#footer').addClass(viscls);

// == interactivity ==
// === wiki navigation menu ===
$('#p-navicon').click(function(navmbm) {
    navmbm.preventDefault();
    $('#column-one').toggleClass(viscls);
    $('#column-content').toggleClass(viscls);
    $('#footer').toggleClass(viscls);
    $('#p-search').removeClass(viscls);
    $('#column-one').removeClass(schcls);
    $('.portlet').removeClass(viscls);
});
// === search functionality ===
$('#p-schicon').click(function(schmbm) {
    schmbm.preventDefault();
    $('#p-search').toggleClass(viscls);
    $('#column-one').toggleClass(schcls);
});
$('#searchInput').attr('placeholder','Search the ' + wgSitename);
// === wiki submenu navigation ===
$('.portlet > h5').click(function(menumbm) {
    menumbm.preventDefault();
    $(this).parent().toggleClass(viscls);
});

// == content adaptability ==
$('p > br:only-child').parent().remove();
$(window).resize(function() {
    if ($('.wikia-slideshow-images').length) {
        $('.wikia-slideshow-images').each(function(mbmslideshow) {
            $(this).css('width', $(this).parent().width());
            $(this).css('height', $(this).parent().width()*0.75);
        });
    }
});
