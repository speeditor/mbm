// Monobook Mobile main script
// Main loader script for importing
mw.loader.using(['mediawiki.util', 'jquery']).then(function () {
    if ( skin !== 'monobook') { return }

    // == dependencies ==
    // === CSS dependencies ===
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

    // === JS dependencies ===
    importArticles({
        type: 'script',
        articles: [
            'u:dev:PersistentParameters/code.js',
            'u:dev:Colors/code.js'
        ]
    });
    
    // == initialisation ==
    importScriptURI('https://raw.github.com/speeditor/mbm/master/core.js');
    importStylesheetURI('https://raw.github.com/speeditor/mbm/master/main.css');
    if (navigator.userAgent.indexOf('Mobi') > -1) {
        $('.skin-monobook').addClass('mbm-on');
    }

});
