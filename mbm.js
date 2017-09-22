// Monobook mobile wrapper (WIP)
mw.loader.using(['mediawiki.util', 'jquery']).then(function () {
    if ( skin !== 'monobook') { return }
    // dependencies
    window.mbmstate = false;
    var mbmbtn = mw.html.element('div', { id: 'p-mbm' }, 'mbm');
        mbmvpt = mw.html.element('meta', {
                     name: 'viewport',
                     content: 'user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, minimal-ui'
                 });
    $('head').append(mbmvpt);
    $('.skin-monobook').append(mbmbtn);
    $('#p-mbm').click(function(toggle) {
        toggle.preventDefault();
        window.mbmstate = window.mbmstate ? false : true;
        $('.skin-monobook').toggleClass('mbm-on');
    });
    if (navigator.userAgent.indexOf('Android') > -1) {
        $('head').append(mw.html.element('meta', { name: 'theme-color', content: dev.colors.wikia.header }));
    } else if (navigator.userAgent.indexOf('iPhone') > -1) {
        $('head').append(mw.html.element('meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }));
    }
    // variables & UI
    var navbtn = mw.html.element('div', { id: 'p-navicon' }),
        schbtn = mw.html.element('div', { id: 'p-schicon' }),
        wbgmbm = mw.html.element('div', { id: 'mbm-bg' }),
        viscls = 'is-visible',
        schcls = 'is-search';
    // toolbar buttons
    $('#p-logo').append(navbtn);
    $('#p-logo').append(schbtn);
    $('#column-content').append(wbgmbm);
    // toolbar initialization
    $('head').append(andmbm);
    if ($('#content').css('color').isBright) { $('head').append(iphmbm); }
    $('#column-content').addClass(viscls);
    $('#footer').addClass(viscls);
    // wiki navigation menu
    $('#p-navicon').click(function(navmbm) {
        navmbm.preventDefault();
        $('#column-one').toggleClass(viscls);
        $('#column-content').toggleClass(viscls);
        $('#footer').toggleClass(viscls);
        $('#p-search').removeClass(viscls);
        $('#column-one').removeClass(schcls);
        $('.portlet').removeClass(viscls);
    });
    // search functionality
    $('#p-schicon').click(function(schmbm) {
        schmbm.preventDefault();
        $('#p-search').toggleClass(viscls);
        $('#column-one').toggleClass(schcls);
    });
    $('#searchInput').attr('placeholder','Search the ' + wgSitename);
    // wiki submenu navigation
    $('.portlet > h5').click(function(menumbm) {
        menumbm.preventDefault();
        $(this).parent().toggleClass(viscls);
    });
    // wiki color theming
    mw.hook('dev.colors').add(function(module) {
        dev.colors.css(
        '.skin-monobook.mbm-on {' +
            'background-color: $body;' +
        '}' +
        '.skin-monobook.mbm-on #column-content #mbm-bg {' +
            'background: $page ;' +
            'opacity: ' + wgSassParams['page-opacity']/100 + ';' +
        '}' +
        '.skin-monobook.mbm-on #content #firstHeading,' +
        '.skin-monobook.mbm-on #content #siteSub,' +
        '.skin-monobook.mbm-on #column-one .portlet,' +
        '.skin-monobook.mbm-on #footer {' +
            'background: $header;' +
        '}' +
        '.skin-monobook.mbm-on #column-one #p-logo {' +
            'border-top: 4px solid $header !important;' +
        '}' +
        '.skin-monobook.mbm-on #globalWrapper a {' +
            'color: $link;' +
        '}')
    });
    // content adaptability
    $('p > br:only-child').parent().remove();
    $(window).resize(function() {
        if ($('.wikia-slideshow-images').length) {
            $('.wikia-slideshow-images').each(function(mbmslideshow) {
                $(this).css('width', $(this).parent().width());
                $(this).css('height', $(this).parent().width()*0.75);
            });
        }
    });
    // initialisation
    importArticles({
        type: 'script',
        articles: [
            'u:dev:PersistentParameters/code.js',
            'u:dev:Colors/code.js'
        ]
    });
    if (navigator.userAgent.indexOf('Mobi') > -1) {
        $('.skin-monobook').addClass('mbm-on');
    }
});
