<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="cmsmasters_html">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

    @include('layouts.seo.seo_page')

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Fira+Sans:300%7CArimo:regular&#038;subset=latin%2Clatin-ext'
          type='text/css' media='all'/>
    <link rel='stylesheet' href='//fonts.googleapis.com/css?family=Arimo%3A400%2C400italic%2C700%2C700italic%7CFira+Sans%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&#038;ver=5.4'
          type='text/css' media='all'/>




    <script type='text/javascript' src='/plugins/LayerSlider/static/layerslider/js/greensock.js?ver=1.19.0'></script>
    <script type='text/javascript' src='/denta/js/jquery/jquery.js?ver=1.12.4-wp'></script>
    <script type='text/javascript' src='/denta/js/jquery/jquery-migrate.min.js?ver=1.4.1'></script>
    <script type='text/javascript'
            src='/plugins/LayerSlider/static/layerslider/js/layerslider.kreaturamedia.jquery.js?ver=6.10.0'></script>
    <script type='text/javascript'
            src='/plugins/LayerSlider/static/layerslider/js/layerslider.transitions.js?ver=6.10.0'></script>

    <script type='text/javascript'
            src='/plugins/cookie-law-info/public/js/cookie-law-info-public.js?ver=1.8.7'></script>
    <script type='text/javascript' src='/plugins/revslider/public/assets/js/revolution.tools.min.js?ver=6.0'></script>
    <script type='text/javascript' src='/plugins/revslider/public/assets/js/rs6.min.js?ver=6.1.5'></script>
    <script type='text/javascript' src='/denta/js/debounced-resize.min.js?ver=1.0.0'></script>
    <script type='text/javascript' src='/denta/js/modernizr.min.js?ver=1.0.0'></script>
    <script type='text/javascript' src='/denta/js/respond.min.js?ver=1.0.0'></script>
    <script type='text/javascript' src='/denta/js/jquery.iLightBox.min.js?ver=2.2.0'></script>



    <link rel='shortlink' href='https://care-steps.com/'/>

    <script type="text/javascript">function setREVStartSize(t) {
            try {
                var h, e = document.getElementById(t.c).parentNode.offsetWidth;
                if (e = 0 === e || isNaN(e) ? window.innerWidth : e, t.tabw = void 0 === t.tabw ? 0 : parseInt(t.tabw), t.thumbw = void 0 === t.thumbw ? 0 : parseInt(t.thumbw), t.tabh = void 0 === t.tabh ? 0 : parseInt(t.tabh), t.thumbh = void 0 === t.thumbh ? 0 : parseInt(t.thumbh), t.tabhide = void 0 === t.tabhide ? 0 : parseInt(t.tabhide), t.thumbhide = void 0 === t.thumbhide ? 0 : parseInt(t.thumbhide), t.mh = void 0 === t.mh || "" == t.mh || "auto" === t.mh ? 0 : parseInt(t.mh, 0), "fullscreen" === t.layout || "fullscreen" === t.l) h = Math.max(t.mh, window.innerHeight); else {
                    for (var i in t.gw = Array.isArray(t.gw) ? t.gw : [t.gw], t.rl) void 0 !== t.gw[i] && 0 !== t.gw[i] || (t.gw[i] = t.gw[i - 1]);
                    for (var i in t.gh = void 0 === t.el || "" === t.el || Array.isArray(t.el) && 0 == t.el.length ? t.gh : t.el, t.gh = Array.isArray(t.gh) ? t.gh : [t.gh], t.rl) void 0 !== t.gh[i] && 0 !== t.gh[i] || (t.gh[i] = t.gh[i - 1]);
                    var r, a = new Array(t.rl.length), n = 0;
                    for (var i in t.tabw = t.tabhide >= e ? 0 : t.tabw, t.thumbw = t.thumbhide >= e ? 0 : t.thumbw, t.tabh = t.tabhide >= e ? 0 : t.tabh, t.thumbh = t.thumbhide >= e ? 0 : t.thumbh, t.rl) a[i] = t.rl[i] < window.innerWidth ? 0 : t.rl[i];
                    for (var i in r = a[0], a) r > a[i] && 0 < a[i] && (r = a[i], n = i);
                    var d = e > t.gw[n] + t.tabw + t.thumbw ? 1 : (e - (t.tabw + t.thumbw)) / t.gw[n];
                    h = t.gh[n] * d + (t.tabh + t.thumbh)
                }
                void 0 === window.rs_init_css && (window.rs_init_css = document.head.appendChild(document.createElement("style"))), document.getElementById(t.c).height = h, window.rs_init_css.innerHTML += "#" + t.c + "_wrapper { height: " + h + "px }"
            } catch (t) {
                console.log("Failure at Presize of Slider:" + t)
            }
        };</script>

</head>
<body class="home page-template-default page page-id-505">


<!-- Start Page -->
<div id="page"
     class="csstransition cmsmasters_liquid fullwidth fixed_header enable_header_top cmsmasters_heading_under_header hfeed site">

    <!-- Start Main -->
    <div id="main">

        <!-- Start Header -->
    @include("layouts.parts.header")
    <!-- Finish Header -->


        <!-- Start Middle -->
        <div id="middle">
            @yield('content')
        </div>
        <!-- Finish Middle -->
        <a href="javascript:void(0)" id="slide_top" class="cmsmasters_theme_icon_slide_top"><span></span></a>
    </div>
    <!-- Finish Main -->

    <!-- Start Footer -->
@include("layouts.parts.footer")
<!-- Finish Footer -->

</div>
<span class="cmsmasters_responsive_width"></span>
<!-- Finish Page -->

<div id="cookie-law-info-bar"><span>This website uses cookies to improve your experience. We'll assume you're ok with this, but you can opt-out if you wish. <a
            role='button' tabindex='0' class="cli_settings_button" style="margin:5px 20px 5px 20px;">Cookie settings</a><a
            role='button' tabindex='0' data-cli_action="accept" id="cookie_action_close_header"
            class="medium cli-plugin-button cli-plugin-main-button cookie_action_close_header cli_action_button"
            style="display:inline-block;  margin:5px; ">ACCEPT</a></span></div>
<div id="cookie-law-info-again" style="display:none;"><span id="cookie_hdr_showagain">Privacy & Cookies Policy</span>
</div>
<div class="cli-modal" id="cliSettingsPopup" tabindex="-1" role="dialog" aria-labelledby="cliSettingsPopup"
     aria-hidden="true">
    <div class="cli-modal-dialog" role="document">
        <div class="cli-modal-content cli-bar-popup">
            <button type="button" class="cli-modal-close" id="cliModalClose">
                <svg class="" viewBox="0 0 24 24">
                    <path
                        d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path>
                    <path d="M0 0h24v24h-24z" fill="none"></path>
                </svg>
                <span class="wt-cli-sr-only">Close</span>
            </button>
            <div class="cli-modal-body">
                <div class="cli-container-fluid cli-tab-container">
                    <div class="cli-row">
                        <div class="cli-col-12 cli-align-items-stretch cli-px-0">
                            <div class="cli-privacy-overview">
                                <h4>Privacy Overview</h4>
                                <div class="cli-privacy-content">
                                    <div class="cli-privacy-content-text">This website uses cookies to improve your
                                        experience while you navigate through the website. Out of these cookies, the
                                        cookies that are categorized as necessary are stored on your browser as they are
                                        essential for the working of basic functionalities of the website. We also use
                                        third-party cookies that help us analyze and understand how you use this
                                        website. These cookies will be stored in your browser only with your consent.
                                        You also have the option to opt-out of these cookies. But opting out of some of
                                        these cookies may have an effect on your browsing experience.
                                    </div>
                                </div>
                                <a class="cli-privacy-readmore" data-readmore-text="Show more"
                                   data-readless-text="Show less"></a></div>
                        </div>
                        <div class="cli-col-12 cli-align-items-stretch cli-px-0 cli-tab-section-container">

                            <div class="cli-tab-section">
                                <div class="cli-tab-header">
                                    <a role="button" tabindex="0" class="cli-nav-link cli-settings-mobile"
                                       data-target="necessary" data-toggle="cli-toggle-tab">
                                        Necessary
                                    </a>

                                    <span class="cli-necessary-caption">Always Enabled</span></div>
                                <div class="cli-tab-content">
                                    <div class="cli-tab-pane cli-fade" data-id="necessary">
                                        <p>Necessary cookies are absolutely essential for the website to function
                                            properly. This category only includes cookies that ensures basic
                                            functionalities and security features of the website. These cookies do not
                                            store any personal information.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="cli-tab-section">
                                <div class="cli-tab-header">
                                    <a role="button" tabindex="0" class="cli-nav-link cli-settings-mobile"
                                       data-target="non-necessary" data-toggle="cli-toggle-tab">
                                        Non-necessary
                                    </a>
                                    <div class="cli-switch">
                                        <input type="checkbox" id="wt-cli-checkbox-non-necessary"
                                               class="cli-user-preference-checkbox" data-id="checkbox-non-necessary"
                                               checked/>
                                        <label for="wt-cli-checkbox-non-necessary" class="cli-slider"
                                               data-cli-enable="Enabled" data-cli-disable="Disabled"><span
                                                class="wt-cli-sr-only">Non-necessary</span></label>
                                    </div>
                                </div>
                                <div class="cli-tab-content">
                                    <div class="cli-tab-pane cli-fade" data-id="non-necessary">
                                        <p>Any cookies that may not be particularly necessary for the website to
                                            function and is used specifically to collect user personal data via
                                            analytics, ads, other embedded contents are termed as non-necessary cookies.
                                            It is mandatory to procure user consent prior to running these cookies on
                                            your website.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="cli-modal-backdrop cli-fade cli-settings-overlay"></div>
<div class="cli-modal-backdrop cli-fade cli-popupbar-overlay"></div>
<!-- Scripts -->
@include("layouts.parts.javascript")

</body>
</html>
