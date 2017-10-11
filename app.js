// Monobook Mobile main script
// Main loader script for importing
mw.loader.using(['mediawiki.util', 'jquery']).then(function () {
    if ( skin !== 'monobook') { return }

    // == interface ==
    mw.hook('dev.colors').add(function(module) {
        dev.colors.css(
        '.skin-monobook.mbm-on {' +
            'background-color: $body;' +
            'background-image: url("/wiki/Special:FilePath/Wiki-background") !important;' +
        '}' +
        '.skin-monobook.mbm-on #column-content #mbm-bg,' +
        '.skin-monobook.mbm-on #column-content textarea,' +
        '.skin-monobook.mbm-on #column-content input,' +
        '.skin-monobook.mbm-on #column-content select,' +
        '.skin-monobook.mbm-on.action-edit #column-content #wpTextbox1 {' +
            'background-color: $page;' +
        '}' +
        '.skin-monobook.mbm-on #column-content #mbm-bg {' +
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
        '.skin-monobook.mbm-on #column-one #p-logo a,' +
        '.skin-monobook.mbm-on #column-one #p-logo a:hover {' +
            'background-image: url("/wiki/Special:FilePath/Wiki-wordmark.png") !important;' +
        '}' +
        '.skin-monobook.mbm-on #globalWrapper a {' +
            'color: $link;' +
        '}' +
        '.skin-monobook.mbm-on.mw-special-Upload #mw-upload-form fieldset {' +
            'border: 1px solid $link;' +
        '}')
        if (navigator.userAgent.indexOf('Android') > -1) {
            $('head').append(mw.html.element('meta', { name: 'theme-color', content: dev.colors.wikia.header }));
        } else if (navigator.userAgent.indexOf('iPhone') > -1) {
            $('head').append(mw.html.element('meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }));
        }
    });

    // === dependencies ===
    importArticles({
        type: 'script',
        articles: [
            'u:dev:PersistentParameters/code.js',
            'u:dev:Colors/code.js'
        ]
    });
    
    // == initialisation ==
    importScriptURI('https://rawgit.com/speeditor/mbm/master/core.js');
    importStylesheetURI('https://rawgit.com/speeditor/mbm/page-fixes/main.css');

});
