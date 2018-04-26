/* <nowiki>
 * 
 * @module                  MBM.js
 * @description             Monobook-dependent mobile wrapper for FANDOM websites.
 * @author                  Speedit
 * @version                 0.8.0
 * @license                 CC-BY-SA 3.0
 * @notes                   Unstable. Not a mobile skin, just a code experiment on adaptability.
 * 
 */
;(function (window, mw, $) {

    // Global variables, double run protection
    if ( skin !== 'monobook' || window.mbm) { return; }
    window.mbm = {
        state: false
    };

    // MBM styling
    mbm.styles = {
        init: function(colors) {
            // Generate header class
            colors.parse(colors.wikia.header).isBright() ?
                $(document.body).addClass('header-bright') :
                $(document.body).addClass('header-dark');
            // Generate derived colors
            var cc = {
                head_a: colors.parse(colors.wikia.header).rgb()
                    .replace('(','a(')
                    .replace(')', ', 0.75)'),
                opacity: mw.config.get('wgSassParams')['page-opacity']/100
            };
            // Import app styling
            mbm.styles.app = importStylesheetURI('https://rawgit.com/speeditor/mbm/master/main.css');
            // Generate inline styling
            mbm.styles.colors = mw.util.addCSS(
                '.skin-monobook.mbm-on {' +
                    'background-color: ' + colors.wikia.body + ';' +
                    'background-image: url("/wiki/Special:FilePath/Wiki-background") !important;' +
                '}' +
                '.skin-monobook.mbm-on #column-content #mbm-bg,' +
                '.skin-monobook.mbm-on #column-content textarea,' +
                '.skin-monobook.mbm-on #column-content input,' +
                '.skin-monobook.mbm-on #column-content select,' +
                '.skin-monobook.mbm-on.action-edit #column-content #wpTextbox1 {' +
                    'background-color: ' + colors.wikia.page + ';' +
                '}' +
                '.skin-monobook.mbm-on #column-content #mbm-bg {' +
                    'opacity: ' + cc.opacity + ';' +
                '}' +
                '.skin-monobook.mbm-on #column-one #p-logo,' +
                '.skin-monobook.mbm-on #column-one #p-search .pBody,' +
                '.skin-monobook.mbm-on #column-content #firstHeading,' +
                '.skin-monobook.mbm-on #column-content #siteSub,' +
                '.skin-monobook.mbm-on #column-content #contentSub,' +
                '.skin-monobook.mbm-on #column-content #contentSub2,' +
                '.skin-monobook.mbm-on #column-one .portlet,' +
                '.skin-monobook.mbm-on #footer {' +
                    'background-color: ' + colors.wikia.header + ';' +
                '}' +
                '.skin-monobook.mbm-on #column-one #p-logo {' +
                    'background-image: url("/wiki/Special:FilePath/File:Community-header-background") !important;' +
                '}' +
                '.skin-monobook.mbm-on #column-one #p-logo:after {' +
                    'background: linear-gradient(to right, ' + cc.head_a + ', ' + cc.head_a + '), linear-gradient(to left, transparent 69px, ' + colors.wikia.header + ' 163px);' +
                '}' +
                '.skin-monobook.mbm-on #column-one #p-logo a,' +
                '.skin-monobook.mbm-on #column-one #p-logo a:hover {' +
                    'background-image: url("/wiki/Special:FilePath/Wiki-wordmark.png") !important;' +
                '}' +
                '.skin-monobook.mbm-on #globalWrapper a {' +
                    'color: ' + colors.wikia.link + ';' +
                '}' +
                '.skin-monobook.mbm-on #column-one #p-personal .notifications-wiki-count {' +
                    'background-color: ' + colors.wikia.link + ';' +
                '}' +
                '.skin-monobook.mbm-on.mw-special-Upload #mw-upload-form fieldset {' +
                    'border: 1px solid ' + colors.wikia.link + ';' +
                '}').ownerNode;
            mbm.styles.colors.id = 'mbm-styles';
        }
    };

    // MBM script dependencies
    mbm.scripts = importArticles({
        type: 'script',
        articles: [
            'u:dev:PersistentParameters/code.js',
            'u:dev:Colors/code.js'
        ]
    });

    // State management handlers
    mbm.on = function() {
        if (!mbm.state) {
            // Class addition for app styling
            $('.skin-monobook').addClass('mbm-on');
            // Disabling conflicting Monobook styles
            mbm.styles.monobook = [
                $('link[href$="PortableInfoboxMonobook.scss"]')
            ].map(function($s) {
                $s.prop('disabled', true);
                return $s;
            });
            // Module activator
            mbm.modules.forEach(function(m) { mbm[m].on(); });
            // State setter
            mbm.state = true;
        }
    };
    mbm.off = function() {
        if (mbm.state) {
            // Class removal to deactivate app styling
            $('.skin-monobook').removeClass('mbm-on');
            // Reactivation of conflicting styles
            mbm.styles.monobook.forEach(function($s) {
                $s.prop('disabled', false);
            });
            // Module deactivator
            mbm.modules.forEach(function(m) { mbm[m].on(); });
            // State setter
            mbm.state = false;
        }
    };
    mbm.toggle = function() {
        !mbm.state ? mbm.on() : mbm.off();
    };

    // MBM user interface
    mbm.ui = {
        init: function() {
            if (navigator.userAgent.indexOf('Android') > -1) {
                $(document.head).append(mbm.ui.tbr_and);
            } else if (navigator.userAgent.indexOf('iPhone') > -1) {
                $(document.head).append(mbm.ui.tbr_apl);
            }
            mbm.ui.vpt = mbm.ui.el('meta', {
                name: 'viewport',
                content: (function() {
                    return [
                        'user-scalable=no',
                        'width=device-width',
                        'initial-scale=1.0',
                        'maximum-scale=1.0',
                        'user-scalable=0',
                        'minimal-ui'
                    ].join(', ');
                }())
            }).appendTo(document.head);
            mbm.ui.tbr_and = mbm.ui.el('meta', {
                name: 'theme-color',
                content: mw.config.get('wgSassParams')['color-header']
            });
            mbm.ui.tbr_apl = mbm.ui.el('meta', {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'black-translucent'
            });
            mbm.ui.btn = mbm.ui.el('div', {
                id: 'p-mbm'
            }, 'mbm').appendTo(document.body);
            mbm.ui.nav = mbm.ui.el('div', {
                id: 'p-navicon'
            }).appendTo('#p-logo');
            mbm.ui.sch = mbm.ui.el('div', {
                id: 'p-schicon'
            }).appendTo('#p-logo');
            mbm.ui.wbg = mbm.ui.el('div', {
                id: 'mbm-bg'
            }).appendTo('#column-content');
        },
        on: $.noop,
        off: $.noop,
        el: function(n, o, t) {
            return $(mw.html.element(n, o, t));
        }
    };

    // MBM view controllers
    mbm.views = {
        init: function() {
            // Delegate button handlers
            mbm.ui.btn.click(mbm.views.btn);
            mbm.ui.nav.click(mbm.views.nav);
            mbm.ui.sch.click(mbm.views.sch);
            $(window).resize(mbm.views.rd);
            // Activate view controllers
            if (mbm.init) mbm.views.on();
        },
        on: function() {
            // Set up nav menu design
            $('#searchInput').attr('placeholder', 'Search the ' + wgSitename);
            $('.portlet > h5').click(mbm.views.subnav);
            // Add class overrides for default view
            $('#column-content').addClass('is-visible');
            $('#footer').addClass('is-visible');
        },
        off: function() {
            $('#searchInput').removeAttr('placeholder');
            $('.portlet > h5').off('click', mbm.views.subnav);
            mbm.ui.nav.off('click', mbm.views.nav);
            mbm.ui.sch.off('click', mbm.views.sch);
        },
        btn: function(e) {
            e.preventDefault();
            mbm.toggle();
        },
        nav: function(e) {
            e.preventDefault();
            $('#column-one').toggleClass('is-visible');
            $('#column-content').toggleClass('is-visible');
            $('#footer').toggleClass('is-visible');
            $('#p-search').removeClass('is-visible');
            $('#column-one').removeClass('is-search');
            $('.portlet').removeClass('is-visible');
        },
        subnav: function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('is-visible');
        },
        sch: function(e) {
            e.preventDefault();
            $('#p-search').toggleClass('is-visible');
            $('#column-one').toggleClass('is-search');
        },
        rd: function(e) {
            if (mbm.init) { return; }
            var dcw = Number(window.document.documentElement.clientWidth),
                dpr = Number(window.devicePixelRatio),
                w = dcw/dpr;
            if (mbm.state && w >= 480) {
                mbm.off();
            } else if (!mbm.state && w < 480) {
                mbm.on();
            }
        }
    };

    // Content modifications
    mbm.content = {
        init: function() {
            if (mbm.init) mbm.content.on();
        },
        on: function() {
            mw.hook('wikipage.content').add(mbm.content.style.on);
            mw.hook('wikipage.content').add(mbm.content.slide.on);
        },
        off: function() {
            mw.hook('wikipage.content').remove(mbm.content.style.on);
            mw.hook('wikipage.content').remove(mbm.content.slide.on);
            mbm.content.style.off(mw.util.$content);
            mbm.content.slide.off(mw.util.$content);
        },
        style: {
            on: function($content) {
                $content.find('p > br:only-child').parent().each(function(i, p) {
                    if (p.style.display) {
                        p.setAttribute('data-display', p.style.display);
                    }
                    p.style.display = 'none';
                });
            }, 
            off: function($content) {
                $content.find('p > br:only-child').parent().each(function(i, p) {
                    if (p.style.display) {
                        p.style.display = p.getAttribute('data-display');
                    } else {
                        delete p.style.display;
                    }
                });
            }
        },
        slide: {
            on: function() {
                $(window).resize(mbm.content.slide.handler);
            }, 
            off: function() {
                $(window).off('resize', mbm.content.slide.handler);
            },
            handler: function() {   
                mw.util.$content.find('.wikia-slideshow-images').each(function(i, w) {
                    var $wrapper = $(w);
                    $wrapper.css('width', $(this).parent().width());
                    $wrapper.css('height', $(this).parent().width()*0.75);
                });
            }
        }
    };

    // Module registry
    mbm.modules = Object.keys(mbm).filter(function(m) {
        return (
            typeof mbm[m] === 'object' && // class check
            [
                'styles',
                'scripts'
            ].indexOf(m) === -1 // event-dependent modules
        );
    });

    // Script initializer
    mbm.init = (function() {
        // Delegate dependent hooks
        mw.hook('dev.colors').add(mbm.styles.init);
        // Module initializers
        mbm.modules.forEach(function(m) { mbm[m].init(); });
        // Conditionally activate script for mobile users
        var m = navigator.userAgent.indexOf('Mobi') > -1;
        if (m) mbm.on();
        return m;
    }());

}(window, mediaWiki, jQuery));
