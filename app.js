// Monobook Mobile main script
// Main loader script for importing
mw.loader.using(['mediawiki.util', 'jquery']).then(function () {
    if ( skin !== 'monobook') { return }

    // == interface ==
    mw.hook('dev.colors').add(function(module) {
        dev.colors.parse(dev.colors.wikia.header).isBright() ?
            $(document.body).addClass('header-bright') :
            $(document.body).addClass('header-dark');
        var customColors = {
            headerAlpha: dev.colors.parse(dev.colors.wikia.header).rgb().replace('(','a(').replace(')', ', 0.75)'),
            pageOpacity: wgSassParams['page-opacity']/100
        };
        var mbmStyles = mw.util.addCSS(
            '.skin-monobook.mbm-on {' +
                'background-color: ' + dev.colors.wikia.body + ';' +
                'background-image: url("/wiki/Special:FilePath/Wiki-background") !important;' +
            '}' +
            '.skin-monobook.mbm-on #column-content #mbm-bg,' +
            '.skin-monobook.mbm-on #column-content textarea,' +
            '.skin-monobook.mbm-on #column-content input,' +
            '.skin-monobook.mbm-on #column-content select,' +
            '.skin-monobook.mbm-on.action-edit #column-content #wpTextbox1 {' +
                'background-color: ' + dev.colors.wikia.page + ';' +
            '}' +
            '.skin-monobook.mbm-on #column-content #mbm-bg {' +
                'opacity: ' + customColors.pageOpacity + ';' +
            '}' +
            '.skin-monobook.mbm-on #column-one #p-logo,' +
            '.skin-monobook.mbm-on #column-one #p-search .pBody,' +
            '.skin-monobook.mbm-on #column-one #p-personal .notifications-wiki-count,' +
            '.skin-monobook.mbm-on #column-content #firstHeading,' +
            '.skin-monobook.mbm-on #column-content #siteSub,' +
            '.skin-monobook.mbm-on #column-content #contentSub,' +
            '.skin-monobook.mbm-on #column-content #contentSub2,' +
            '.skin-monobook.mbm-on #column-one .portlet,' +
            '.skin-monobook.mbm-on #footer {' +
                'background-color: ' + dev.colors.wikia.header + ';' +
            '}' +
            '.skin-monobook.mbm-on #column-one #p-logo {' +
                'background-image: url("/wiki/Special:FilePath/File:Community-header-background") !important;' +
            '}' +
            '.skin-monobook.mbm-on #column-one #p-logo:after {' +
                'background: linear-gradient(to right, ' + customColors.headerAlpha + ', ' + customColors.headerAlpha + '), linear-gradient(to left, transparent 69px, ' + dev.colors.wikia.header + ' 163px);' +
            '}' +
            '.skin-monobook.mbm-on #column-one #p-logo a,' +
            '.skin-monobook.mbm-on #column-one #p-logo a:hover {' +
                'background-image: url("/wiki/Special:FilePath/Wiki-wordmark.png") !important;' +
            '}' +
            '.skin-monobook.mbm-on #globalWrapper a {' +
                'color: ' + dev.colors.wikia.link + ';' +
            '}' +
            '.skin-monobook.mbm-on.mw-special-Upload #mw-upload-form fieldset {' +
                'border: 1px solid ' + dev.colors.wikia.link + ';' +
            '}');
        mbmStyles.ownerNode.id = 'mbm-styles';
        if (navigator.userAgent.indexOf('Android') > -1) {
            $(document.head).append(mw.html.element('meta', { name: 'theme-color', content: dev.colors.wikia.header }));
        } else if (navigator.userAgent.indexOf('iPhone') > -1) {
            $(document.head).append(mw.html.element('meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }));
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
    importStylesheetURI('https://rawgit.com/speeditor/mbm/ui-redesigns/main.css');

});
