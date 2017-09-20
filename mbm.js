// Monobook mobile wrapper (low content adaptability)
mw.loader.using(['mediawiki.util', 'jquery']).then(function () {
    if ( skin == 'monobook') {
        // dependencies
        importArticles({
            type: 'script',
            articles: [
                'u:dev:PersistentParameters/code.js',
                'u:dev:Colors/code.js'
            ]
        });
        var mbmbtn = mw.html.element('div', { id: 'p-mbm' }),
            mbmvpt = mw.html.element('meta', {
                         name: 'viewport',
                         content: 'user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, minimal-ui'
                     });
        $('head').append(mbmvpt);
        $('.skin-monobook').append(mbmbtn);
        $('#p-mbm').append('mbm');
        $('#p-mbm').click(function(mbmcore){
            mbmcore.preventDefault();
            $('.skin-monobook').toggleClass('mbm-on');
        });
        var navbtn = mw.html.element('div', { id: 'p-navicon' }),
            schbtn = mw.html.element('div', { id: 'p-schicon' }),
            wbgmbm = mw.html.element('div', { id: 'mbm-bg' }),
            viscls = 'is-visible',
            schcls = 'is-search',
            themembm = wgSassParams['color-buttons'],
            linkmbm = wgSassParams['color-links'],
            bodymbm = wgSassParams['color-body'],
            pagembm = wgSassParams['color-page'],
            pgopmbm = wgSassParams['page-opacity']/100,
            andmbm = mw.html.element('meta', { name: 'theme-color', content: themembm }),
            iphmbm = mw.html.element('meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' });
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
        $('#p-navicon').click(function(navmbm){
            navmbm.preventDefault();
            $('#column-one').toggleClass(viscls);
            $('#column-content').toggleClass(viscls);
            $('#footer').toggleClass(viscls);
            $('#p-search').removeClass(viscls);
            $('#column-one').removeClass(schcls);
            $('.portlet').removeClass(viscls);
        });
    // search functionality
        $('#p-schicon').click(function(schmbm){
            schmbm.preventDefault();
            $('#p-search').toggleClass(viscls);
            $('#column-one').toggleClass(schcls);
        });
        $('#searchInput').attr('placeholder','Search the ' + wgSitename);
        // wiki submenu navigation
        $('.portlet > h5').click(function(menumbm){
            menumbm.preventDefault();
            $(this).parent().toggleClass(viscls);
        });
        // wiki color theming
        mw.util.addCSS(
        '.skin-monobook.mbm-on {' +
            'background-color: ' + bodymbm + ';' +
        '}' +
        '.skin-monobook.mbm-on #column-content #mbm-bg {' +
            'background: ' + pagembm + ';' +
            'opacity: ' + pgopmbm + ';' +
        '}' +
        '.skin-monobook.mbm-on #content #firstHeading,' +
        '.skin-monobook.mbm-on #content #siteSub,' +
        '.skin-monobook.mbm-on #column-one .portlet,' +
        '.skin-monobook.mbm-on #footer {' +
            'background: ' + themembm + ';' +
        '}' +
        '.skin-monobook.mbm-on #column-one #p-logo {' +
            'border-top: 4px solid ' + themembm + ' !important;' +
        '}' +
        '.skin-monobook.mbm-on #globalWrapper a {' +
            'color: ' + linkmbm + ';' +
        '}'
        );
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
        $('.skin-monobook').addClass('mbm-on');
    }
});
