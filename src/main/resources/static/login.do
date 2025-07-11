<!DOCTYPE html><html lang="en" class=" ltr " data-doctype="true" dir="ltr" ontouchend="CustomEvent.fireAll('body_clicked', event);"><head><script>document.addEventListener('click', function (event) {
				CustomEvent.fireAll('body_clicked', event);
			});
			document.hasBodyClickedTrigger = 'true';</script><script type="text/javascript"></script><title>Travelport PROD</title><meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"></meta><meta http-equiv="cache-control" content="public"></meta><meta name="viewport" content="initial-scale=1.0"></meta><script type="text/javascript" data-description="globals population">
	window.NOW = window.NOW || {};
	var g_loadTime = new Date();
	var lastActivity = new Date();
	var g_lang = 'en';
	var g_system_lang = 'en';
	var g_enhanced_activated = 'true';
	  var g_popup_timeout = parseInt(100);
	var g_export_warn_threshold = parseInt(10000);
	  var g_event_handler_ids = {};
	var g_event_handlers = [];
	var g_event_handlers_onLoad = [];
	var g_event_handlers_onSubmit = [];
	var g_event_handlers_onChange = [];
	var g_event_handlers_onCellEdit = {};
	var g_event_handlers_localCache = {};
	var g_event_handlers_queryTracking = true;
	var g_user_date_time_format = "MM-dd-yyyy HH:mm:ss";
	var g_user_date_format = "MM-dd-yyyy";
	var g_user_decimal_separator = ".";
	var g_user_grouping_separator = ",";
	var g_glide_list_separator = ", ";
	var g_allow_field_dependency_for_templates = ("true" === "true");
	var g_tz_offset = -14400000;
	  var g_tz_user_offset = true;
	var g_first_day_of_week = parseInt(1, 10);
	var g_date_picker_first_day_of_week = parseInt(0, 10);
	  var g_full_calendar_edit = true;
	var g_submitted = false;
	var g_max_table_length = 80;
	var g_fontSizePreference = "";
	var g_fontSize = "10pt";
	// use to be the sys_property glide.ui.js_error_notify, hard coded for PRB603998
	var g_jsErrorNotify = "true";
	var g_cancelPreviousTransaction = true;
	var g_text_direction = "ltr";
	var g_glide_list_filter_max_length =  parseInt("0", 10);
	var g_accessibility = false;
	var g_accessibility_tooltips = false;
	var g_accessibility_tooltip_duration = parseInt("10", 10);
	var g_accessibility_visual_patterns = false;
	var g_accessibility_screen_reader_table = false;
	var g_accessibility_date_format = false;
	var g_detail_row = false;
	var g_builddate = "02-11-2025_1733";
	// default values to be used in absence of user preferences are hard coded below
	// as well as in keyboardShortcuts.js and keyboard_preference_changer.xml
	window.g_keyboard_shortcuts = {};
	window.g_keyboard_shortcuts.allow_in_input_fields = false;
	window.g_keyboard_shortcuts.enabled = true;
	window.g_keyboard_shortcuts.global_search = {};
	window.g_keyboard_shortcuts.global_search.enabled = true;
	window.g_keyboard_shortcuts.global_search.key_combination = 'ctrl+alt+g';
	window.g_keyboard_shortcuts.main_frame = {};
	window.g_keyboard_shortcuts.main_frame.enabled = true;
	window.g_keyboard_shortcuts.main_frame.key_combination = 'ctrl+alt+p';
	window.g_keyboard_shortcuts.navigator_toggle = {};
	window.g_keyboard_shortcuts.navigator_toggle.enabled = true;
	window.g_keyboard_shortcuts.navigator_toggle.key_combination = 'ctrl+alt+c';
	window.g_keyboard_shortcuts.navigator_filter = {};
	window.g_keyboard_shortcuts.navigator_filter.enabled = true;
	window.g_keyboard_shortcuts.navigator_filter.key_combination = 'ctrl+alt+f';
	window.g_keyboard_shortcuts.impersonator = {}
	window.g_keyboard_shortcuts.impersonator.enabled = true;
	window.g_keyboard_shortcuts.impersonator.key_combination = 'ctrl+alt+i';
	// The `g_concourse_onmessage_enforce_same_origin` and `g_concourse_onmessage_enforce_same_origin_whitelist` variables
    // do not appear to be used anywhere other than the CustomEventManager, but leaving these for backwards compatability
	var g_concourse_onmessage_enforce_same_origin = 'true'.toLowerCase() === 'true';
	var g_concourse_onmessage_enforce_same_origin_whitelist = '';
	window.g_load_functions = [];
	window.g_render_functions = [];
	window.g_late_load_functions = [];
	window.g_tiny_url = {};
	window.g_tiny_url.use_tiny = 'true' === 'true';
	window.g_tiny_url.min_length = parseInt('1024');
	
	
	var g_ck = 'dfdc25a3933c2a540426b6ea6aba106ad813d779f62820ccbdcf9788f9060e3ee17c1eaf';
	

	
	var g_acWaitTime = parseInt(250);
	

	var g_autoRequest = '';

	try {
		window.NOW.dateFormat = JSON.parse("{\"timeAgo\": false, \"dateBoth\": false}");
	} catch (e) {
		window.NOW.dateFormat = {timeAgo: false, dateBoth: false};
	}

	window.NOW.dateFormat.dateStringFormat = "MM-dd-yyyy";
	window.NOW.dateFormat.timeStringFormat = "HH:mm:ss";
	window.NOW.shortDateFormat = false;
	window.NOW.listTableWrap = true;
	window.NOW.compact = false;
  	window.NOW.templateToggle = false;
	window.NOW.tabbed = true;
	window.NOW.permalink = true;
	window.NOW.useSimpleStorage = true;
	window.NOW.httpRequestCompressionThreshold = 40000;
	window.NOW.httpRequestCompressionLevel = -1;
	window.NOW.httpRequestCompressionMemoryLevel = -1;
	window.NOW.httpRequestCompressionExcludeUrls = 'xmlhttp.do'.split(',');
	window.NOW.deferAmbConnection = false;
	window.NOW.deferredAmbConnectionTimeout = 10000;
	window.NOW.simpleStorageSynch = "e389b046937826140426b6ea6aba1082";
	window.NOW.language =  'en';
	window.NOW.listOpenInAppTab = false;
	window.NOW.floatingScrollbars = 'false'.toLowerCase() === 'true';
	
	window.NOW.user = {};
	window.NOW.user.preferences = [];
	window.NOW.user.roles = '';
	window.NOW.user.allRoles = '';
	window.NOW.user.userID = '5136503cc611227c0183e96598c4f706';
	window.NOW.user.departmentID = 'db3246d9db33f09060294b4913961963';
	window.NOW.user.firstName = '';
	window.NOW.user.lastName = 'Guest';
	window.NOW.user.name = 'guest';
  	window.NOW.user.isImpersonating = false;
	window.NOW.batch_glide_ajax_requests = 'true' === 'true';
	window.NOW.batch_glide_ajax_requests_max_time_in_queue = ~~'50';
	window.NOW.batch_glide_ajax_disable_time = ~~'1000';

	window.NOW.currency = {};
	window.NOW.currency.code = 'USD';
	window.NOW.locale = {};
	window.NOW.locale.code = 'en_US';

	window.NOW.attachment = {};
	
	window.NOW.attachment.overflow_limit =  parseInt('3', 10);
	window.NOW.isPolarisEnabled = "true";
	window.NOW.polaris_page_info ={"canUsePolarisCSS":true,"canUsePolarisTemplates":true,"jvar_form_name":"login"};</script><script data-comment="GlideUser initialization">(function() {
		 g_render_functions.push(setGlideUser);
		function setGlideUser() {
			if (window.g_user || !window.GlideUser)
		return;

		window.g_user = new GlideUser(NOW.user.name,
			  NOW.user.firstName,
			  NOW.user.lastName,
			  NOW.user.roles,
			  NOW.user.userID,
			  NOW.user.departmentID);
		window.g_user.setRoles(NOW.user.allRoles, true);
		}
	})();</script><script data-comment="Fiscal schedule constants">window.NOW.filter_globals = "[[\"This fiscal month\", \"javascript:gs.beginningOfThisSchedulePeriod(\'0ca8ae11d7222100738dc0da9e6103e3\',\'This fiscal month\')\", \"javascript:gs.endOfThisSchedulePeriod(\'0ca8ae11d7222100738dc0da9e6103e3\',\'This fiscal month\')\", \"javascript:gs.endOfThisSchedulePeriod(\'0ca8ae11d7222100738dc0da9e6103e3\',\'This fiscal month\')\"], [\"Last fiscal month\", \"javascript:gs.beginningOfLastSchedulePeriod(\'0ca8ae11d7222100738dc0da9e6103e3\',\'Last fiscal month\')\", \"javascript:gs.endOfLastSchedulePeriod(\'0ca8ae11d7222100738dc0da9e6103e3\',\'Last fiscal month\')\", \"javascript:gs.endOfLastSchedulePeriod(\'0ca8ae11d7222100738dc0da9e6103e3\',\'Last fiscal month\')\"], [\"Next fiscal month\", \"javascript:gs.beginningOfNextSchedulePeriod(\'0ca8ae11d7222100738dc0da9e6103e3\',\'Next fiscal month\')\", \"javascript:gs.endOfNextSchedulePeriod(\'0ca8ae11d7222100738dc0da9e6103e3\',\'Next fiscal month\')\", \"javascript:gs.endOfNextSchedulePeriod(\'0ca8ae11d7222100738dc0da9e6103e3\',\'Next fiscal month\')\"], [\"Last 3 fiscal months\", \"javascript:gs.beginningOfSchedulePeriodsAgo(3, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Last 3 fiscal months\')\", \"javascript:gs.endOfSchedulePeriodsAgo(1, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Last 3 fiscal months\')\", \"javascript:gs.beginningOfSchedulePeriodsAgo(3, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Last 3 fiscal months\')\"], [\"Last 12 fiscal months\", \"javascript:gs.beginningOfSchedulePeriodsAgo(12, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Last 12 fiscal months\')\", \"javascript:gs.endOfSchedulePeriodsAgo(1, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Last 12 fiscal months\')\", \"javascript:gs.beginningOfSchedulePeriodsAgo(12, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Last 12 fiscal months\')\"], [\"Next 3 fiscal months\", \"javascript:gs.beginningOfSchedulePeriodsAgo(-1, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Next 3 fiscal months\')\", \"javascript:gs.endOfSchedulePeriodsAgo(-3, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Next 3 fiscal months\')\", \"javascript:gs.endOfSchedulePeriodsAgo(-3, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Next 3 fiscal months\')\"], [\"Next 12 fiscal months\", \"javascript:gs.beginningOfSchedulePeriodsAgo(-1, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Next 12 fiscal months\')\", \"javascript:gs.endOfSchedulePeriodsAgo(-12, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Next 12 fiscal months\')\", \"javascript:gs.endOfSchedulePeriodsAgo(-12, \'0ca8ae11d7222100738dc0da9e6103e3\',\'Next 12 fiscal months\')\"], [\"This fiscal quarter\", \"javascript:gs.beginningOfThisSchedulePeriod(\'b198ae11d7222100738dc0da9e6103d7\',\'This fiscal quarter\')\", \"javascript:gs.endOfThisSchedulePeriod(\'b198ae11d7222100738dc0da9e6103d7\',\'This fiscal quarter\')\", \"javascript:gs.endOfThisSchedulePeriod(\'b198ae11d7222100738dc0da9e6103d7\',\'This fiscal quarter\')\"], [\"Last fiscal quarter\", \"javascript:gs.beginningOfLastSchedulePeriod(\'b198ae11d7222100738dc0da9e6103d7\',\'Last fiscal quarter\')\", \"javascript:gs.endOfLastSchedulePeriod(\'b198ae11d7222100738dc0da9e6103d7\',\'Last fiscal quarter\')\", \"javascript:gs.endOfLastSchedulePeriod(\'b198ae11d7222100738dc0da9e6103d7\',\'Last fiscal quarter\')\"], [\"Last 4 fiscal quarters\", \"javascript:gs.beginningOfSchedulePeriodsAgo(4, \'b198ae11d7222100738dc0da9e6103d7\',\'Last 4 fiscal quarters\')\", \"javascript:gs.endOfSchedulePeriodsAgo(1, \'b198ae11d7222100738dc0da9e6103d7\',\'Last 4 fiscal quarters\')\", \"javascript:gs.beginningOfSchedulePeriodsAgo(4, \'b198ae11d7222100738dc0da9e6103d7\',\'Last 4 fiscal quarters\')\"], [\"Next fiscal quarter\", \"javascript:gs.beginningOfNextSchedulePeriod(\'b198ae11d7222100738dc0da9e6103d7\',\'Next fiscal quarter\')\", \"javascript:gs.endOfNextSchedulePeriod(\'b198ae11d7222100738dc0da9e6103d7\',\'Next fiscal quarter\')\", \"javascript:gs.endOfNextSchedulePeriod(\'b198ae11d7222100738dc0da9e6103d7\',\'Next fiscal quarter\')\"], [\"Next 4 fiscal quarters\", \"javascript:gs.beginningOfSchedulePeriodsAgo(-1, \'b198ae11d7222100738dc0da9e6103d7\',\'Next 4 fiscal quarters\')\", \"javascript:gs.endOfSchedulePeriodsAgo(-4, \'b198ae11d7222100738dc0da9e6103d7\',\'Next 4 fiscal quarters\')\", \"javascript:gs.endOfSchedulePeriodsAgo(-4, \'b198ae11d7222100738dc0da9e6103d7\',\'Next 4 fiscal quarters\')\"], [\"This fiscal year\", \"javascript:gs.beginningOfThisSchedulePeriod(\'3f682e11d7222100738dc0da9e610353\',\'This fiscal year\')\", \"javascript:gs.endOfThisSchedulePeriod(\'3f682e11d7222100738dc0da9e610353\',\'This fiscal year\')\", \"javascript:gs.endOfThisSchedulePeriod(\'3f682e11d7222100738dc0da9e610353\',\'This fiscal year\')\"], [\"Last fiscal year\", \"javascript:gs.beginningOfLastSchedulePeriod(\'3f682e11d7222100738dc0da9e610353\',\'Last fiscal year\')\", \"javascript:gs.endOfLastSchedulePeriod(\'3f682e11d7222100738dc0da9e610353\',\'Last fiscal year\')\", \"javascript:gs.endOfLastSchedulePeriod(\'3f682e11d7222100738dc0da9e610353\',\'Last fiscal year\')\"], [\"Next fiscal year\", \"javascript:gs.beginningOfNextSchedulePeriod(\'3f682e11d7222100738dc0da9e610353\',\'Next fiscal year\')\", \"javascript:gs.endOfNextSchedulePeriod(\'3f682e11d7222100738dc0da9e610353\',\'Next fiscal year\')\", \"javascript:gs.endOfNextSchedulePeriod(\'3f682e11d7222100738dc0da9e610353\',\'Next fiscal year\')\"]]" || "[]";</script><script data-description="NOW glide web analytics siteid and url">window.snWebaConfig = window.snWebaConfig || {};
		// glide web analytics config
		window.snWebaConfig.siteId = "0";
		window.snWebaConfig.trackerURL = "";
		window.snWebaConfig.webaScriptPath = "/scripts/piwik-3.1.1/thirdparty/piwik.min.js";
		window.snWebaConfig.ambClient = (window.g_ambClient) ? window.g_ambClient : ((window.amb)? window.amb.getClient(): "");
		window.snWebaConfig.subscribed = false;</script><script type="text/javascript" src="/ConditionalFocus.jsdbx?v=02-11-2025_1733&amp;c=30_772"></script><link href="favicon.ico?v=5" rel="shortcut icon"></link><script type="text/javascript" src="/scripts/doctype/xperf_timing.jsx?v=02-11-2025_1733"></script><link type="text/css" rel="stylesheet" href="/styles/css_includes_doctype_polaris.cssx?v=02-11-2025_1733&amp;c=1099b046937826140426b6ea6aba108a&amp;theme=Polaris"></link><script>window.NOW = window.NOW || {};
		 NOW.isUsingPolaris = true;</script><script type="text/javascript" src="/scripts/polaris_theme_refresh_observer.jsx?v=02-11-2025_1733"></script><link type="text/css" rel="stylesheet" href="/styles/polarisberg/css_includes_polarisberg.cssx?v=02-11-2025_1733&amp;c=1099b046937826140426b6ea6aba108a&amp;theme=Polaris"></link><script>NOW.exclude_dark_theme = "false";</script><link type="text/css" rel="stylesheet" href="/polarisberg_theme_variables.do?c=falseDsVmhmwFPov1P64PKrPq7UQeTwU%3D" id="polarisberg_theme_variables"></link><script>NOW.xperf.cssEnd = NOW.xperf.now();
			NOW.xperf.scriptBegin = NOW.xperf.now();</script><script src="/legacy_date_time_choices_processor.do?lang=en"></script><script type="text/javascript" src="/scripts/doctype/js_includes_doctype.jsx?v=02-11-2025_1733&amp;lp=Thu_Feb_20_14_51_34_UTC_2025&amp;c=30_772"></script><script type="text/javascript" src="/scripts/js_includes_customer.jsx?v=02-11-2025_1733&amp;lp=Thu_Feb_20_14_51_34_UTC_2025&amp;c=30_772"></script><script type="text/javascript" src="/scripts/doctype/history_across_tabs.jsx?v=02-11-2025_1733"></script><script type="text/javascript" src="/scripts/doctype/js_includes_legacy.jsx?v=02-11-2025_1733&amp;lp=Thu_Feb_20_14_51_34_UTC_2025&amp;c=30_772"></script><script type="text/javascript" data-comment="navpage layout preferences, onfocus observation">/**
	* Every window needs to observe these events.
	*/
	if (Prototype.Browser.IE && !isMSIE9) {
		document.onfocusout = function() { CustomEvent.fireTop(GlideEvent.WINDOW_BLURRED, window); };
		document.onfocusin = function() { CustomEvent.fireTop(GlideEvent.WINDOW_FOCUSED, window); };
	} else {
		Event.observe(window, 'blur', function() { CustomEvent.fireTop(GlideEvent.WINDOW_BLURRED, window); });
		Event.observe(window, 'focus', function() { CustomEvent.fireTop(GlideEvent.WINDOW_FOCUSED, window); });
	}</script><script type="text/javascript">g_swLoadTime = new StopWatch(g_loadTime);

    if (window.CustomEvent){
        CustomEvent.fireAll("ck_updated", "dfdc25a3933c2a540426b6ea6aba106ad813d779f62820ccbdcf9788f9060e3ee17c1eaf");
	    CustomEvent.fireTop("navigation.complete", window);
	}

    addLoadEvent( function() {

		if (isValidTouchDevice())
			addTouchScrollClassToBody();

      if (typeof g_ck != 'undefined') {
        CustomEvent.observe("ck_updated", function(ck) { g_ck = ck; });
        CustomEvent.fireAll("ck_updated", "dfdc25a3933c2a540426b6ea6aba106ad813d779f62820ccbdcf9788f9060e3ee17c1eaf");}try {
              var helpico = getTopWindow().document.getElementById("help_ico");

              if (helpico) {
                var urlname=window.location.pathname.split("?");
                var search_str = window.location.search;
                
                // if this is a form, extract the record's sys_id...
                var sys_id_loc = search_str.search(/sys_id=[0-9a-f]{32}/i);
                var sys_id_str = (sys_id_loc != -1) ? search_str.substr(sys_id_loc, 39) : null;
                
                // make the URL to our context help processor...
                var url_search = "?sysparm_url=" + urlname[0];
                if (sys_id_loc != -1)
                   url_search += "&" + sys_id_str;

               	helpico.href="context_help.do" + url_search;                	
              }
            } catch (exception) {}

      synchCache();
      pageLoaded();
    });
    
    function synchCache() {
      try {
        var w = getTopWindow();
        if (w.g_cache_message)
          w.g_cache_message.stamp("e389b046937826140426b6ea6aba1082");
  
        if (w.g_cache_td)
          w.g_cache_td.stamp("f8b702af93b86a540426b6ea6aba1085");
      } catch(e) {}
    }

    function isValidTouchDevice() {
		var navigator = window.navigator || {};
		var devices;
		try {
			devices = 'iPad,Android'.split(',');
		} catch(ex) {
			devices = [];
		}
		return devices.some(function(item) {return item.trim() === navigator.platform;});
	}

	function addTouchScrollClassToBody() {
		if ('ontouchstart' in window ||
				(navigator.maxTouchPoints !== 'undefined' && navigator.maxTouchPoints > 0) ||
				(navigator.msMaxTouchPoints !== 'undefined' && navigator.msMaxTouchPoints > 0)) {
			if (typeof document.body != undefined) {
				document.body.classList.add('touch_scroll');
			}
		}
	}
  </script><!--googleoff: all--><noscript>This site requires JavaScript to be enabled</noscript> <!--googleon: all--><script type="text/javascript" src="/scripts/app.guided_tours/js_guided_tours_includes.jsx?v=02-11-2025_1733"></script><script>NOW.xperf.scriptEnd = NOW.xperf.now();
				NOW.xperf.parseEnd = NOW.xperf.now();</script></head><body class="       windows chrome        -polaris " data-formName="login"><span class="sr-only"><div id="html_page_aria_live_polite" role="region" aria-relevant="additions text" aria-atomic="false" aria-live="polite"></div><div id="html_page_aria_live_assertive" role="region" aria-relevant="additions text" aria-atomic="false" aria-live="assertive"></div></span><div data-form-title="Log in"></div><style>input::-ms-reveal,
		input::-ms-clear {
		display: none;
	}</style><script type="text/javascript" src="/LDAPAuthClientUtils.jsdbx?v=02-11-2025_1733&amp;c=30_772"></script><div class="login-wrapper"><style>:root {}</style><div class="parallax-element pe1"><svg xmlns="http://www.w3.org/2000/svg" width="2196" height="674" viewBox="0 0 2196 674" fill="none" role="presentation"><path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M1738.95 55.6263C1691.94 45.9433 1645.38 31.4743 1597.38 30.7873C1522.14 29.7093 1477.88 75.6373 1423.32 119.52C1207.15 293.394 -103.202 -52.2238 6.79528 549.824C34.9769 704.077 251.926 680.791 356.682 654.824C431.531 636.27 511.776 615.093 582.338 583.926C657.42 550.76 718.462 526.964 802.943 527.216C964.304 527.698 1126.39 580.764 1284.75 549.824C1375.46 532.101 1457.72 488 1538.77 445.481C1622.56 401.532 1706.18 366.488 1796.5 339.183C1941.31 295.402 2251.49 312.479 2186.4 88.6746C2128.82 -109.2 1931.5 95.2798 1738.95 55.6263Z" fill="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="1295" y1="226" x2="1373" y2="788.038" gradientUnits="userSpaceOnUse"><stop class="gradient0" stop-opacity="0"></stop><stop offset="0.145833" class="gradient0" stop-opacity="0"></stop><stop offset="1" class="gradient1"></stop></linearGradient></defs></svg></div><div class="parallax-element pe2"><img src="/images/polarisberg/login-stars-tier1.svg" role="presentation"></img></div><div class="parallax-element pe3"><img src="/images/polarisberg/login-stars-tier2.svg" role="presentation"></img></div><div class="parallax-element pe4"><img src="/images/polarisberg/login-stars-tier3.svg" role="presentation"></img></div><script>const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (!mediaQuery || mediaQuery.matches) {
            // No animations
        } else {
            document.addEventListener('mousemove', parallax);
        }

        if (mediaQuery) {
            mediaQuery.addEventListener('change', () => {
                if (mediaQuery.matches) {
                    document.removeEventListener('mousemove', parallax);
                } else {
                    document.addEventListener('mousemove', parallax);
                }
            });
        }

        const pe1 = document.querySelector('.pe1');
        const pe2 = document.querySelector('.pe2');
        const pe3 = document.querySelector('.pe3');
        const pe4 = document.querySelector('.pe4');

        function parallax(e) {
            const _w = window.innerWidth/2;
            const _h = window.innerHeight/2;
            const _mouseX = e.clientX;
            const _mouseY = e.clientY;

            // Higher fractions equate to faster movement
            const speedMultiplier = [.00025, .0005, .001, .002];

            // Tier 1 being the background and the higher tiers are "closer" to the user
            const tier1 = 'translateX(-' + (50 - (_mouseX - _w) * speedMultiplier[0]) + '%) translateY(-' + (50 - (_mouseY - _h) * speedMultiplier[0]) + '%)';
            const tier2 = 'translateX(-' + (50 - (_mouseX - _w) * speedMultiplier[1]) + '%) translateY(-' + (50 - (_mouseY - _h) * speedMultiplier[1]) + '%)';
            const tier3 = 'translateX(-' + (50 - (_mouseX - _w) * speedMultiplier[2]) + '%) translateY(-' + (50 - (_mouseY - _h) * speedMultiplier[2]) + '%)';
            const tier4 = 'translateX(-' + (50 - (_mouseX - _w) * speedMultiplier[3]) + '%) translateY(-' + (50 - (_mouseY - _h) * speedMultiplier[3]) + '%)';

            pe1.style.transform = tier1;
            pe2.style.transform = tier2;
            pe3.style.transform = tier3;
            pe4.style.transform = tier4;
        }</script><div class="login-container"><div id="output_messages" class="outputmsg_container outputmsg_hide"><button type="button" aria-label="Close Messages" id="close-messages-btn" class="btn btn-icon close icon-cross" onclick="GlideUI.get().onCloseMessagesButtonClick(this); return false;"></button><div class="outputmsg_div" aria-live="polite" role="region" data-server-messages="false"></div></div><script>addRenderEvent(function() {CustomEvent.fire('glide_optics_inspect_update_watchfield', '');});

			var accessibilityEnabled = Boolean(false);
			var hasMessages = false;
			if (accessibilityEnabled && hasMessages) {
				$j(function() {
					$j('#output_messages .btn.btn-icon.close').focus();
				});
			}</script><div class="login-logo"><img id="mainBannerImage16" src="" style="height: 32px" alt="Travelport PROD"></img><span class="sr-only">ServiceNow Home Page</span></div><div class="login-card "><svg xmlns="http://www.w3.org/2000/svg" class="planet" width="354" height="144" viewBox="0 0 354 144" fill="none" role="presentation"><path d="M298.586 49.1975C265.598 46.6581 244.333 59.7046 212.284 62.7579C187.5 65.1159 171.903 49.5502 148.106 46.376C145.195 45.983 7.74778 50.044 0 49.1975V5C45.631 16.1463 63.9827 10.5927 112.094 19.8837C155.741 28.3126 211.147 33.2155 227.341 30.142C242.307 27.3003 258.332 24.8516 275.391 24.116C293.365 23.3401 309.438 24.1361 323.634 19.8837C330.059 17.959 344.279 10.5222 354 5V49.1975C314.804 50.9207 335.953 52.0795 298.586 49.1975Z" fill="#EDEEF8"></path><path d="M170.69 19.6798C171.623 19.6798 172.38 18.9232 172.38 17.9898C172.38 17.0564 171.623 16.2998 170.69 16.2998C169.757 16.2998 169 17.0564 169 17.9898C169 18.9232 169.757 19.6798 170.69 19.6798Z" fill="#9C7BFE"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M223.127 34.6947C221.961 34.4427 220.811 35.1837 220.559 36.3497C220.307 37.5157 221.048 38.6657 222.214 38.9177C223.38 39.1697 224.53 38.4287 224.782 37.2627C225.034 36.0967 224.294 34.9467 223.127 34.6947Z" fill="#FF5730"></path><path d="M12.7798 25.2301C13.7132 25.2301 14.4698 24.4735 14.4698 23.5401C14.4698 22.6067 13.7132 21.8501 12.7798 21.8501C11.8465 21.8501 11.0898 22.6067 11.0898 23.5401C11.0898 24.4735 11.8465 25.2301 12.7798 25.2301Z" fill="#53CDE4"></path><path d="M25.2604 7.22977C25.8734 7.22977 26.3704 6.7328 26.3704 6.11977C26.3704 5.50673 25.8734 5.00977 25.2604 5.00977C24.6474 5.00977 24.1504 5.50673 24.1504 6.11977C24.1504 6.7328 24.6474 7.22977 25.2604 7.22977Z" fill="#F9726D"></path><path d="M111.19 16.54C109.24 16.54 107.65 14.95 107.65 13C107.65 11.05 109.24 9.45996 111.19 9.45996C113.14 9.45996 114.73 11.05 114.73 13C114.73 14.95 113.14 16.54 111.19 16.54ZM111.19 10.46C109.79 10.46 108.65 11.6 108.65 13C108.65 14.4 109.79 15.54 111.19 15.54C112.59 15.54 113.73 14.4 113.73 13C113.73 11.6 112.59 10.46 111.19 10.46Z" fill="#F9726D"></path><path d="M97.9218 75.7592C141.497 96.8041 224.676 57.293 294.575 64.328C302.752 65.151 323.274 72.8584 331.563 72.2061C336.582 71.8147 343.403 74.1584 354 69V28.2196C326.623 37.7836 227.879 46.5448 198.71 39.5398C77.916 10.5319 75.6348 28.621 0 28.069L0.00011829 64.328C34.5242 64.0972 64.2043 59.4713 97.9218 75.7592Z" fill="#CDCFEC"></path><path d="M305.49 47.29C306.07 47.29 306.54 46.84 306.54 46.27C306.54 45.71 306.07 45.25 305.49 45.25C304.91 45.25 304.44 45.7 304.44 46.27C304.44 46.84 304.91 47.29 305.49 47.29Z" class="mountain-secondary"></path><path d="M330.542 15.163C331.734 15.8858 332.114 17.4379 331.391 18.6297C330.669 19.8215 329.116 20.2018 327.925 19.4791C326.733 18.7563 326.353 17.2042 327.075 16.0124C327.798 14.8206 329.35 14.4403 330.542 15.163Z" fill="#F1A357"></path><path d="M62.9561 45.9483C63.9006 46.5211 64.2019 47.751 63.6292 48.6955C63.0564 49.64 61.8265 49.9413 60.882 49.3686C59.9375 48.7958 59.6362 47.5659 60.2089 46.6214C60.7817 45.6769 62.0116 45.3756 62.9561 45.9483Z" fill="#9CE4DB"></path><path d="M44.0298 39.525C44.4593 38.8166 44.2333 37.8942 43.525 37.4646C42.8166 37.0351 41.8941 37.2611 41.4646 37.9694C41.035 38.6778 41.261 39.6002 41.9694 40.0298C42.6777 40.4594 43.6002 40.2334 44.0298 39.525Z" class="mountain-secondary"></path><path d="M0 58.8805V144H354V60.329L344.697 57.4082H291.888L254.168 45L154.839 54.9262L91.9712 45L32.8773 63.6123L0 58.8805Z" class="mountain-primary"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M344.7 57.41L309.757 66.0873L327.378 72H236L291.89 57.4101L344.7 57.41Z" class="mountain-secondary"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M91.9252 45V57.4546L126 65L33 63.6819L91.9252 45Z" class="mountain-secondary"></path></svg><svg xmlns="http://www.w3.org/2000/svg" class="planet planet-lg" width="531" height="140" viewBox="0 0 531 140" fill="none" role="presentation"><path d="M506.078 44.1975C450.165 41.6581 414.124 54.7046 359.803 57.7579C317.797 60.1159 291.361 44.5502 251.028 41.376C246.093 40.983 13.1318 45.044 0 44.1975V0C77.3408 11.1463 108.445 5.5927 189.989 14.8837C263.967 23.3126 357.877 28.2155 385.323 25.142C410.69 22.3003 437.85 19.8516 466.765 19.116C497.229 18.3401 524.471 19.1361 548.533 14.8837C559.422 12.959 583.524 5.52217 600 0V44.1975C533.566 45.9207 569.412 47.0795 506.078 44.1975Z" fill="#EDEEF8"></path><path d="M554.956 20.4483C555.901 21.0211 556.202 22.251 555.629 23.1955C555.056 24.14 553.826 24.4413 552.882 23.8686C551.938 23.2958 551.636 22.0659 552.209 21.1214C552.782 20.1769 554.012 19.8756 554.956 20.4483Z" fill="#9CE4DB"></path><path d="M45.69 7.1798C46.6234 7.1798 47.38 6.42317 47.38 5.4898C47.38 4.55644 46.6234 3.7998 45.69 3.7998C44.7566 3.7998 44 4.55644 44 5.4898C44 6.42317 44.7566 7.1798 45.69 7.1798Z" fill="#FF5730"></path><path d="M165.969 70.7592C239.825 91.8041 380.806 52.293 499.28 59.328C513.14 60.151 547.922 67.8584 561.972 67.2061C570.478 66.8147 582.039 69.1584 600 64V23.2196C553.598 32.7836 386.236 41.5448 336.796 34.5398C132.061 5.53192 128.195 23.621 0 23.069L0.000200491 59.328C58.5156 59.0972 108.821 54.4713 165.969 70.7592Z" fill="#CDCFEC"></path><path d="M575.78 28.7301C576.713 28.7301 577.47 27.9735 577.47 27.0401C577.47 26.1067 576.713 25.3501 575.78 25.3501C574.846 25.3501 574.09 26.1067 574.09 27.0401C574.09 27.9735 574.846 28.7301 575.78 28.7301Z" fill="#53CDE4"></path><path d="M333.69 15.1798C334.623 15.1798 335.38 14.4232 335.38 13.4898C335.38 12.5564 334.623 11.7998 333.69 11.7998C332.757 11.7998 332 12.5564 332 13.4898C332 14.4232 332.757 15.1798 333.69 15.1798Z" fill="#9C7BFE"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M372.127 30.1947C370.961 29.9427 369.811 30.6837 369.559 31.8497C369.307 33.0157 370.048 34.1657 371.214 34.4177C372.38 34.6697 373.53 33.9287 373.782 32.7627C374.034 31.5967 373.294 30.4467 372.127 30.1947Z" fill="#FF5730"></path><path d="M135.78 20.7301C136.713 20.7301 137.47 19.9735 137.47 19.0401C137.47 18.1067 136.713 17.3501 135.78 17.3501C134.846 17.3501 134.09 18.1067 134.09 19.0401C134.09 19.9735 134.846 20.7301 135.78 20.7301Z" fill="#53CDE4"></path><path d="M148.26 2.72977C148.873 2.72977 149.37 2.2328 149.37 1.61977C149.37 1.00673 148.873 0.509766 148.26 0.509766C147.647 0.509766 147.15 1.00673 147.15 1.61977C147.15 2.2328 147.647 2.72977 148.26 2.72977Z" fill="#F9726D"></path><path d="M250.19 12.04C248.24 12.04 246.65 10.45 246.65 8.49996C246.65 6.54996 248.24 4.95996 250.19 4.95996C252.14 4.95996 253.73 6.54996 253.73 8.49996C253.73 10.45 252.14 12.04 250.19 12.04ZM250.19 5.95996C248.79 5.95996 247.65 7.09996 247.65 8.49996C247.65 9.89996 248.79 11.04 250.19 11.04C251.59 11.04 252.73 9.89996 252.73 8.49996C252.73 7.09996 251.59 5.95996 250.19 5.95996Z" fill="#F9726D"></path><path d="M32.6504 31.46C31.8248 31.46 31.1504 30.7855 31.1504 29.96C31.1504 29.1344 31.8248 28.46 32.6504 28.46C33.4759 28.46 34.1504 29.1344 34.1504 29.96C34.1504 30.7855 33.4759 31.46 32.6504 31.46Z" stroke="#F1A357"></path><path d="M436.49 34.79C437.07 34.79 437.54 34.34 437.54 33.77C437.54 33.21 437.07 32.75 436.49 32.75C435.91 32.75 435.44 33.2 435.44 33.77C435.44 34.34 435.91 34.79 436.49 34.79Z" class="mountain-secondary"></path><path d="M493.542 2.66304C494.734 3.38579 495.114 4.93787 494.391 6.12971C493.669 7.32155 492.116 7.70182 490.925 6.97907C489.733 6.25632 489.353 4.70423 490.075 3.5124C490.798 2.32056 492.35 1.94029 493.542 2.66304Z" fill="#F1A357"></path><path d="M185.956 41.4483C186.901 42.0211 187.202 43.251 186.629 44.1955C186.056 45.14 184.826 45.4413 183.882 44.8686C182.938 44.2958 182.636 43.0659 183.209 42.1214C183.782 41.1769 185.012 40.8756 185.956 41.4483Z" fill="#9CE4DB"></path><path d="M167.03 35.025C167.459 34.3166 167.233 33.3942 166.525 32.9646C165.817 32.5351 164.894 32.7611 164.465 33.4694C164.035 34.1778 164.261 35.1002 164.969 35.5298C165.678 35.9594 166.6 35.7334 167.03 35.025Z" class="mountain-secondary"></path><path d="M0 54.3805V139.5H600V55.829L590.697 52.9082H537.888L500.168 40.5L405.827 49.9277L377.168 40.5L353.164 42.8988L337.971 40.5L319.755 46.2374L282.827 49.9277L254.168 40.5L230.164 42.8988L214.971 40.5L196.755 46.2374L154.839 50.4262L91.9712 40.5L32.8773 59.1123L0 54.3805Z" class="mountain-primary"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M590.7 52.91L555.757 61.6773L573.378 67.59H482L537.89 52.91L590.7 52.91Z" class="mountain-secondary"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M91.97 40.5L92.0452 53.9546L126.12 61.5L32.88 59.11L91.97 40.5Z" class="mountain-secondary"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M377.17 40.5L385.5 52.5L370 63.5L401.5 57.4L405.83 49.8L377.17 40.5Z" class="mountain-secondary"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M282.83 49.93L288.17 55.76L278.5 67L303.5 60L319.76 46.24L282.83 49.93Z" class="mountain-secondary"></path></svg><div class="login-form"><FORM name="loginPage" id="loginPage" action="login.do" method="post"><input name="sysparm_ck" id="sysparm_ck" type="hidden" value="dfdc25a3933c2a540426b6ea6aba106ad813d779f62820ccbdcf9788f9060e3ee17c1eaf"></input><h1 class="sr-only row">Log in</h1><div class="login-form-field"><label class="control-label" for="user_name">User name</label><input type="text" class="form-control" id="user_name" name="user_name" value="" autocomplete="off"></input></div><div class="login-form-field"><label class="control-label" for="user_password">Password</label><p id="btnDescription" class="sr-only" aria-live="polite">"Password hidden</p><div class="input-group password-group"><input class="form-control" type="password" id="user_password" name="user_password" autocomplete="off"></input><span class="input-group-btn"><button id="mask_icon" type="button" class="btn btn-default icon-preview input-group-append mask_btn sn-tooltip-basic" onClick="renderMaskIcon(this)" aria-label="Show Password" data-original-title="Show password"></button></span></div></div><button name="not_important" id="sysverb_login" class="btn btn-primary" type="submit" onclick="loginPage.sys_action.value=this.id;">Log in</button><input type="hidden" id="ni.nolog.user_password" name="ni.nolog.user_password" value="true"></input><input type="hidden" id="ni.noecho.user_name" name="ni.noecho.user_name" value="true"></input><input type="hidden" id="ni.noecho.user_password" name="ni.noecho.user_password" value="true"></input><input type="hidden" id="screensize" name="screensize" value=""></input><input type="hidden" id="sys_action" name="sys_action" value="none"></input></FORM></div><div class="login-card-footer sn-flexbox"><a class="btn btn-link" href="login_locate_sso.do">Login with SSO</a><a class="btn btn-link" href="/$pwd_reset.do?sysparm_url=ss_default">Forgot Password ?</a></div></div><div class="login-form"></div></div><div class="login-container"></div></div><script language="javascript">(function() {
			// focus user name on page load
			gel('user_name').focus();

			if (screen) {
				var w = screen.width;
				var h = screen.height
				var d = document.getElementById("screensize");
				if (d)
					d.value = w + "x" + h;
			}
		})();
		
		function renderMaskIcon(element) {
			var passwordEle = document.getElementById("user_password");
			var maskEle = document.getElementById("mask_icon");
			var btnDescription = document.getElementById("btnDescription");
			var isPasswordType = passwordEle.type === 'password';
			maskEle.classList.toggle('active', isPasswordType);
			maskEle.setAttribute("data-original-title", (isPasswordType) ? "Hide password" : "Show password");
			element.setAttribute("aria-label", (isPasswordType) ? "Hide password" : "Show password");			
			passwordEle.type  = (isPasswordType) ? 'text' : 'password';
			btnDescription.textContent = (isPasswordType)? "Password shown" : "Password hidden";
		}</script><script src="/uxasset/externals/service-worker/loader.jsdbx?uxpcb=1744301096481&amp;sysparm_substitute=false"></script><script>window.onerror = function() {}
			function getLinkElementGenerator(asValue, withCrossOrigin) {
				return function (url) {
					if (!url)
						return;

					var link = document.createElement('link');
					link.setAttribute('rel', 'preload');
					link.setAttribute('as', asValue);
					link.setAttribute('href', url);

					if (withCrossOrigin)
						link.setAttribute('crossorigin', true);

					return link;
				}
			}
			function buildScriptElement(url) {
				if (!url)
					return;

				var script = document.createElement('script');
				script.src = url;
				return script;
			}
			var tectonicVarWrapperState = {};
			var fontAssets = '/uxta/68f8ed5853546010b846ddeeff7b127c.assetx,/uxta/f93a299853546010b846ddeeff7b12b5.assetx,/uxta/c69aa99853546010b846ddeeff7b1256.assetx,/uxta/a232a471c7102010d447c17cf4c2604d.assetx,/uxta/5872a471c7102010d447c17cf4c2604b.assetx,/uxta/7382e471c7102010d447c17cf4c260b2.assetx,/uxta/b0c2a871c7102010d447c17cf4c260a3.assetx,/uxta/b4932c71c7102010d447c17cf4c26086.assetx,/uxta/f434a4b1c7102010d447c17cf4c26030.assetx,/uxta/eab360b1c7102010d447c17cf4c2603f.assetx,/uxta/1a9967bab7b0201041aa9aedce11a932.assetx,/uxta/c79c3863771220104fdc5ed999106188.assetx,/uxta/bf5ac16b771220104fdc5ed999106179.assetx,/uxta/f19a856b771220104fdc5ed9991061aa.assetx,/uxta/79aa856b771220104fdc5ed9991061a5.assetx,/uxta/fcba856b771220104fdc5ed9991061af.assetx,/uxta/a8ca096b771220104fdc5ed99910612b.assetx,/uxta/649bcd6b771220104fdc5ed9991061e1.assetx,/uxta/26ffc05d770130104fdc5ed999106112.assetx,/uxta/c630145d770130104fdc5ed999106141.assetx'.split(',');
			var mswDisabledValue = "false";
			var disabled = mswDisabledValue === 'true' ? true : false;
			var serviceWorkers = JSON.parse("[{\"scope\":\"/\",\"serviceWorkerUrl\":\"/uxsw/scope/root.js?uxpcb=1744289783507\"}]");
			var cacheBuster = "1744289783507";
			var SERVICE_WORKER_MANAGER_CONFIG = {disabled, serviceWorkers};
			if (window.serviceWorkerManager) window.serviceWorkerManager.init(SERVICE_WORKER_MANAGER_CONFIG);
			var assetBundleEnabled = "true" === 'true';
			var prefetchedAssetsOverrideStr = "";
			var defaultPrefetchedAssetsStr = "/uxab/ui-core-bundle.jsdbx?uxpcb=1744289783507&sysparm_use_cache_buster=true,/uxab/uxf-bundle.jsdbx?uxpcb=1744289783507&sysparm_use_cache_buster=true,/uxab/nds-bundle.jsdbx?uxpcb=1744289783507&sysparm_use_cache_buster=true,/uxab/shell-bundle.jsdbx?uxpcb=1744289783507&sysparm_use_cache_buster=true,/uxab/list-form-bundle.jsdbx?uxpcb=1744289783507&sysparm_use_cache_buster=true,/uxab/par-bundle.jsdbx?uxpcb=1744289783507&sysparm_use_cache_buster=true";
			var prefetchedAssets = (prefetchedAssetsOverrideStr || defaultPrefetchedAssetsStr).split(',');
			prefetchedAssets.unshift('/uxasset/set-cache-buster/' + cacheBuster + '.js');
			var prefetchedUxfEntities = [];
			var staticPageFragmentUrls = '/uxpf/en/f51912f4c700201072b211d4d8c26010.jsdbx?uxpcb=1744297504477,/uxpf/en/76a83a645b122010b913030a1d81c780.jsdbx?uxpcb=1744297504477,/uxpf/en/1239fbd6070c20105fca5d1aead300ff.jsdbx?uxpcb=1744297504477,/uxpf/en/13ecfe155b630010b913cbd59b81c7d6.jsdbx?uxpcb=1744297504477,/uxpf/en/67ee2538534501108135ddeeff7b121b.jsdbx?uxpcb=1744297504477,/uxpf/en/e6a5f515c3a350101d590cf06e40dd00.jsdbx?uxpcb=1744297504477,/uxpf/en/8e8e0691c3e350101d590cf06e40dd2d.jsdbx?uxpcb=1744297504477,/uxpf/en/c276387cc331101080d6d3658940ddd2.jsdbx?uxpcb=1744297504477,/uxpf/en/7db00e99c3a350101d590cf06e40ddb0.jsdbx?uxpcb=1744297504477,/uxpf/en/b53fcaf4dd5f1010f8775c733bdb408a.jsdbx?uxpcb=1744297504477,/uxpf/en/d4d3a42dc7202010099a308dc7c2602b.jsdbx?uxpcb=1744297504477,/uxpf/en/c708b3c2f8266110f8779039584d84aa.jsdbx?uxpcb=1744297504477,/uxpf/en/f21402898d211110fa9bc3c32d6e489e.jsdbx?uxpcb=1744297504477,/uxpf/en/cdd6e57585381110fa9bb4bfe235f6d3.jsdbx?uxpcb=1744297504477,/uxpf/en/117e784453631010df5dddeeff7b12e6.jsdbx?uxpcb=1744297504477,/uxpf/en/f4f8ee12dba886108aae6d8d13961993.jsdbx?uxpcb=1744297504477,/uxpf/en/7660be88c32b10101d590cf06e40dd1c.jsdbx?uxpcb=1744297504477,/uxpf/en/2c08111d0fc21010036a83fa68767ef6.jsdbx?uxpcb=1744297504477,/uxpf/en/c9aa942f4dcb5410f8778930f4cba003.jsdbx?uxpcb=1744297504477,/uxpf/en/558adc930f0210107d20409dc4767e84.jsdbx?uxpcb=1744297504477,/uxpf/en/a04c00820f901010a326b6ade7767ef9.jsdbx?uxpcb=1744297504477,/uxpf/en/e1d7f01fc7622010fedf0bcbe2c2608b.jsdbx?uxpcb=1744297504477,/uxpf/en/a0c4ddc60f141010a326b6ade7767eb8.jsdbx?uxpcb=1744297504477,/uxpf/en/bae4f263537430102d05ddeeff7b1205.jsdbx?uxpcb=1744297504477,/uxpf/en/0c187e9853151010ac9bddeeff7b1270.jsdbx?uxpcb=1744297504477,/uxpf/en/305aad820f541010a326b6ade7767e76.jsdbx?uxpcb=1744297504477,/uxpf/en/740493e3773a301058119a372e5a99f6.jsdbx?uxpcb=1744297504477,/uxpf/en/b1463c8dc30301103581a5a1d840ddf7.jsdbx?uxpcb=1744297504477,/uxpf/en/d24d53f60350de7a652caf3188a46ed2.jsdbx?uxpcb=1744297504477,/uxpf/en/43c702253779b51040b3ebc734924baf.jsdbx?uxpcb=1744297504477,/uxpf/en/81d35ad443e8c290411a1e0e85b8f2ed.jsdbx?uxpcb=1744297504477,/uxpf/en/408f1118c3d30110ff85a5a1d840dd33.jsdbx?uxpcb=1744297504477,/uxpf/en/3478e8db0f0210107d20409dc4767e89.jsdbx?uxpcb=1744297504477,/uxpf/en/a2b0596cec6b9d49dd1ff9bf76b5084b.jsdbx?uxpcb=1744297504477,/uxpf/en/87884d50c3930110ff85a5a1d840dda6.jsdbx?uxpcb=1744297504477,/uxpf/en/23051643b7e03010097cb81cde11a910.jsdbx?uxpcb=1744297504477,/uxpf/en/96abe7e38d8790718022c5630a92176c.jsdbx?uxpcb=1744297504477,/uxpf/en/18ac962264404bcc0039359d184b15f3.jsdbx?uxpcb=1744297504477,/uxpf/en/55a7b4781bf21990f1a3dbd4ec4bcbc0.jsdbx?uxpcb=1744297504477,/uxpf/en/df0efa837703111029e548a0af5a99f1.jsdbx?uxpcb=1744297504477,/uxpf/en/b3e357f15b210110d78e9e7fb681c7d4.jsdbx?uxpcb=1744297504477,/uxpf/en/64189b82877a101045957d3d87cb0b9d.jsdbx?uxpcb=1744297504477,/uxpf/en/e0792c9ac7a710102cdf073703c260f3.jsdbx?uxpcb=1744297504477,/uxpf/en/c3379cde0f6710106dc9445485767eda.jsdbx?uxpcb=1744297504477,/uxpf/en/6209718dc3030110c92609c77d40dd4d.jsdbx?uxpcb=1744297504477,/uxpf/en/b4f747b377820110dc25a5ed5b5a99dd.jsdbx?uxpcb=1744297504477,/uxpf/en/05f35ba277233010035592e57b5a9964.jsdbx?uxpcb=1744297504477,/uxpf/en/11be384473bb1010d133bd49faf6a70d.jsdbx?uxpcb=1744297504477,/uxpf/en/f019a99c7363101001d32e46fbf6a71b.jsdbx?uxpcb=1744297504477,/uxpf/en/d7f8b70dff13101035be517f793bf1e0.jsdbx?uxpcb=1744297504477'.split(',');
			staticPageFragmentUrls.forEach(url => url ? prefetchedUxfEntities.push(url) : null);
			var preloadedMacroponentBundleUrls = '/uxab/f51912f4c700201072b211d4d8c26010.jsdbx?uxpcb=1744289783507FZUdRsV2Pd4ZK%2Fq8NyFHg%2FId38s%3D&sysparm_use_cache_buster=true,/uxab/76a83a645b122010b913030a1d81c780.jsdbx?uxpcb=1744289783507S%2B%2Bpz5SUQyVRWI6POkit%2FXKu%2By0%3D&sysparm_use_cache_buster=true,/uxab/1239fbd6070c20105fca5d1aead300ff.jsdbx?uxpcb=1744289783507J0j4%2F4FVQLqwt%2FB%2FHtMzn5uN43s%3D&sysparm_use_cache_buster=true,/uxab/13ecfe155b630010b913cbd59b81c7d6.jsdbx?uxpcb=17442897835070xzBWm9%2Fc8GgUxU%2BrvyvMF9n%2FKE%3D&sysparm_use_cache_buster=true,/uxab/67ee2538534501108135ddeeff7b121b.jsdbx?uxpcb=1744289783507v4cUoPgFn0hp188vMFbqNl%2B8dsw%3D&sysparm_use_cache_buster=true,/uxab/e6a5f515c3a350101d590cf06e40dd00.jsdbx?uxpcb=1744289783507YydtiysurFwUVs2CzQX8nHItDr0%3D&sysparm_use_cache_buster=true,/uxab/8e8e0691c3e350101d590cf06e40dd2d.jsdbx?uxpcb=1744289783507a6GqMg%2BLuSBeB4phdxYFPuBOyMA%3D&sysparm_use_cache_buster=true,/uxab/c276387cc331101080d6d3658940ddd2.jsdbx?uxpcb=1744289783507tOBiz6SnxGO02zTYn%2B69Y91zHQ0%3D&sysparm_use_cache_buster=true,/uxab/7db00e99c3a350101d590cf06e40ddb0.jsdbx?uxpcb=1744289783507YydtiysurFwUVs2CzQX8nHItDr0%3D&sysparm_use_cache_buster=true,/uxab/b53fcaf4dd5f1010f8775c733bdb408a.jsdbx?uxpcb=1744289783507buMsf2BtEG2flA1KvgL8G9Fox68%3D&sysparm_use_cache_buster=true,/uxab/d4d3a42dc7202010099a308dc7c2602b.jsdbx?uxpcb=1744289783507KoCEK24uzjigeWsQd%2FRevp4VOuA%3D&sysparm_use_cache_buster=true,/uxab/c708b3c2f8266110f8779039584d84aa.jsdbx?uxpcb=1744289783507PnoZQl2f73bjXTCXn%2BSW4CUVhIs%3D&sysparm_use_cache_buster=true,/uxab/f21402898d211110fa9bc3c32d6e489e.jsdbx?uxpcb=1744289783507PnoZQl2f73bjXTCXn%2BSW4CUVhIs%3D&sysparm_use_cache_buster=true,/uxab/cdd6e57585381110fa9bb4bfe235f6d3.jsdbx?uxpcb=1744289783507w41UHc%2FylRFPuL9aqx290fUkWDI%3D&sysparm_use_cache_buster=true,/uxab/117e784453631010df5dddeeff7b12e6.jsdbx?uxpcb=1744289783507n73Lh8Le5RfVYs3ymFyimB44Gh4%3D&sysparm_use_cache_buster=true,/uxab/f4f8ee12dba886108aae6d8d13961993.jsdbx?uxpcb=1744289783507buMsf2BtEG2flA1KvgL8G9Fox68%3D&sysparm_use_cache_buster=true,/uxab/7660be88c32b10101d590cf06e40dd1c.jsdbx?uxpcb=1744289783507a6GqMg%2BLuSBeB4phdxYFPuBOyMA%3D&sysparm_use_cache_buster=true,/uxab/2c08111d0fc21010036a83fa68767ef6.jsdbx?uxpcb=1744289783507cCbx8DnSOHCZi6JJu%2FrjxSRVzOQ%3D&sysparm_use_cache_buster=true,/uxab/c9aa942f4dcb5410f8778930f4cba003.jsdbx?uxpcb=1744289783507buMsf2BtEG2flA1KvgL8G9Fox68%3D&sysparm_use_cache_buster=true,/uxab/558adc930f0210107d20409dc4767e84.jsdbx?uxpcb=1744289783507GdE9sfSk2tEWgCLA63JG%2BBGoqNQ%3D&sysparm_use_cache_buster=true,/uxab/a04c00820f901010a326b6ade7767ef9.jsdbx?uxpcb=1744289783507OJLSx%2BQqzAdvSJD%2BuQAp%2Fc1ikgA%3D&sysparm_use_cache_buster=true,/uxab/e1d7f01fc7622010fedf0bcbe2c2608b.jsdbx?uxpcb=1744289783507%2FMB9jLlPHMAVE0cey05KjQ9nd%2B0%3D&sysparm_use_cache_buster=true,/uxab/a0c4ddc60f141010a326b6ade7767eb8.jsdbx?uxpcb=1744289783507SUg5ZOc6l6auhyMdZ5cJRrKXkog%3D&sysparm_use_cache_buster=true,/uxab/bae4f263537430102d05ddeeff7b1205.jsdbx?uxpcb=1744289783507dgVlgNDRnEPBGncKcsbjryD6lI8%3D&sysparm_use_cache_buster=true,/uxab/0c187e9853151010ac9bddeeff7b1270.jsdbx?uxpcb=1744289783507S3QtojEudy3YtKMdsSE2PePYrpg%3D&sysparm_use_cache_buster=true,/uxab/305aad820f541010a326b6ade7767e76.jsdbx?uxpcb=1744289783507oeCKpqJsiQAMk%2FsoE9dookEhwRg%3D&sysparm_use_cache_buster=true,/uxab/740493e3773a301058119a372e5a99f6.jsdbx?uxpcb=1744289783507%2FMB9jLlPHMAVE0cey05KjQ9nd%2B0%3D&sysparm_use_cache_buster=true,/uxab/b1463c8dc30301103581a5a1d840ddf7.jsdbx?uxpcb=1744289783507daLbbo%2Fvs4A2sE8cAQ2eBkNXVKc%3D&sysparm_use_cache_buster=true,/uxab/d24d53f60350de7a652caf3188a46ed2.jsdbx?uxpcb=1744289783507%2FynyHxHYS8CIAXd5Q9Gh6QSQV%2Fc%3D&sysparm_use_cache_buster=true,/uxab/43c702253779b51040b3ebc734924baf.jsdbx?uxpcb=17442897835070xzBWm9%2Fc8GgUxU%2BrvyvMF9n%2FKE%3D&sysparm_use_cache_buster=true,/uxab/81d35ad443e8c290411a1e0e85b8f2ed.jsdbx?uxpcb=17442897835070xzBWm9%2Fc8GgUxU%2BrvyvMF9n%2FKE%3D&sysparm_use_cache_buster=true,/uxab/408f1118c3d30110ff85a5a1d840dd33.jsdbx?uxpcb=1744289783507NprH%2FUbT1lUPiy8j88qezHW%2Bh0Y%3D&sysparm_use_cache_buster=true,/uxab/3478e8db0f0210107d20409dc4767e89.jsdbx?uxpcb=1744289783507fDmqEomNQgL24aUJC70D1GPTS9k%3D&sysparm_use_cache_buster=true,/uxab/a2b0596cec6b9d49dd1ff9bf76b5084b.jsdbx?uxpcb=1744289783507%2FynyHxHYS8CIAXd5Q9Gh6QSQV%2Fc%3D&sysparm_use_cache_buster=true,/uxab/87884d50c3930110ff85a5a1d840dda6.jsdbx?uxpcb=1744289783507oeCKpqJsiQAMk%2FsoE9dookEhwRg%3D&sysparm_use_cache_buster=true,/uxab/23051643b7e03010097cb81cde11a910.jsdbx?uxpcb=1744289783507%2FynyHxHYS8CIAXd5Q9Gh6QSQV%2Fc%3D&sysparm_use_cache_buster=true,/uxab/96abe7e38d8790718022c5630a92176c.jsdbx?uxpcb=1744289783507%2FynyHxHYS8CIAXd5Q9Gh6QSQV%2Fc%3D&sysparm_use_cache_buster=true,/uxab/18ac962264404bcc0039359d184b15f3.jsdbx?uxpcb=1744289783507%2FynyHxHYS8CIAXd5Q9Gh6QSQV%2Fc%3D&sysparm_use_cache_buster=true,/uxab/55a7b4781bf21990f1a3dbd4ec4bcbc0.jsdbx?uxpcb=1744289783507z34GmO%2FOIJeIv%2F4N3zKuEtLOkNQ%3D&sysparm_use_cache_buster=true,/uxab/df0efa837703111029e548a0af5a99f1.jsdbx?uxpcb=17442897835070xzBWm9%2Fc8GgUxU%2BrvyvMF9n%2FKE%3D&sysparm_use_cache_buster=true,/uxab/b3e357f15b210110d78e9e7fb681c7d4.jsdbx?uxpcb=1744289783507PnoZQl2f73bjXTCXn%2BSW4CUVhIs%3D&sysparm_use_cache_buster=true,/uxab/64189b82877a101045957d3d87cb0b9d.jsdbx?uxpcb=1744289783507E8QO8aFXoSljBsyzoQmyB%2FFtv%2BA%3D&sysparm_use_cache_buster=true,/uxab/e0792c9ac7a710102cdf073703c260f3.jsdbx?uxpcb=17442897835070xzBWm9%2Fc8GgUxU%2BrvyvMF9n%2FKE%3D&sysparm_use_cache_buster=true,/uxab/c3379cde0f6710106dc9445485767eda.jsdbx?uxpcb=17442897835070xzBWm9%2Fc8GgUxU%2BrvyvMF9n%2FKE%3D&sysparm_use_cache_buster=true,/uxab/6209718dc3030110c92609c77d40dd4d.jsdbx?uxpcb=17442897835070xzBWm9%2Fc8GgUxU%2BrvyvMF9n%2FKE%3D&sysparm_use_cache_buster=true,/uxab/b4f747b377820110dc25a5ed5b5a99dd.jsdbx?uxpcb=1744289783507buMsf2BtEG2flA1KvgL8G9Fox68%3D&sysparm_use_cache_buster=true,/uxab/05f35ba277233010035592e57b5a9964.jsdbx?uxpcb=1744289783507uDjOdxPzEmYWvERh0J1hOqRY6pE%3D&sysparm_use_cache_buster=true,/uxab/11be384473bb1010d133bd49faf6a70d.jsdbx?uxpcb=1744289783507U8pPZ%2BvbduHQu%2B9jNTxyDEdv0aY%3D&sysparm_use_cache_buster=true,/uxab/f019a99c7363101001d32e46fbf6a71b.jsdbx?uxpcb=1744289783507buMsf2BtEG2flA1KvgL8G9Fox68%3D&sysparm_use_cache_buster=true,/uxab/d7f8b70dff13101035be517f793bf1e0.jsdbx?uxpcb=1744289783507oeCKpqJsiQAMk%2FsoE9dookEhwRg%3D&sysparm_use_cache_buster=true'.split(',');
			preloadedMacroponentBundleUrls.forEach(url => url ? prefetchedAssets.push(url) : null);
			prefetchedUxfEntities.push("/uxsp/all.jsdbx?uxpcb=hCNYjryIuuDiYS4pRCnQTT5OK8k=");
			prefetchedUxfEntities.push("/uxgp/c86a62e2c7022010099a308dc7c26022.jsdbx?uxpcb=SW92lENS94ythuW1SfJ6cpFaeF4=&resolvedThemeId=31bf91ae07203010e03948f78ad30095");
			if (navigator.serviceWorker) {
				navigator.serviceWorker.onmessage = event => {
					if (event.data === 'SERVICE_WORKER_ACTIVATED') {
						if (assetBundleEnabled) {
							prefetchedAssets.forEach(function(url) {
								var el = buildScriptElement(url);
								if (el)
									document.head.append(el);
							});
							prefetchedUxfEntities.forEach(function(url) {
								import(url).catch(function() {});
							});
						} else {
							caches.open('now-icon-cache').then(function(iconCache) {
								prefetchedAssets.concat(prefetchedUxfEntities).forEach(function(url) {
									import(url).then(function(module) {
										var iconMatch = url.match(/\/uxasset\/externals\/@servicenow\/now-icon\/icons\/(.*)\.jsdbx/);
										var iconName = iconMatch?.[1];
										if (iconName) {
											var request = new Request('/fake-request/now-icon/' + iconName + '.json', {
												cache: 'only-if-cached',
												mode: 'same-origin',
												headers: {'Content-Type': 'application/json'}
											});
											var response = new Response(JSON.stringify(module.default), {
												status: 200,
												headers: {'Content-Type': 'application/json'}
											});
											iconCache.put(request, response);
										}
									}).catch(function() {})
								});
							});
						}
						fontAssets.map(getLinkElementGenerator('font', true))
							.forEach(function(el) {
								if (el)
									document.head.append(el);
							});
					}
				};
			}</script><div style="border:none; visibility:hidden"><form name="sys_personalize" method="GET" action="slushbucket.do"><input type="hidden" name="sysparm_referring_url" value="login.do"></input><input type="hidden" name="sysparm_view" value=""></input></form></div><script type="text/javascript" src="/scripts/ui_page_footer.jsx?v=02-11-2025_1733"></script><span style="display:none" data-comments="js_includes_last_doctype"></span><script type="text/javascript" src="/scripts/thirdparty/dom_purify/purify.jsx?v=02-11-2025_1733&amp;sysparm_substitute=false"></script><script>NOW.xperf.lastDoctypeBegin = NOW.xperf.now();</script><script type="text/javascript" src="/scripts/doctype/js_includes_last_doctype.jsx?v=02-11-2025_1733&amp;lp=Thu_Feb_20_14_51_34_UTC_2025&amp;c=30_772"></script><script type="text/javascript" src="/scripts/heisenberg/heisenberg_all.jsx?v=02-11-2025_1733"></script><script type="text/javascript" src="/scripts/js_includes_list_edit_doctype.jsx?v=02-11-2025_1733&amp;lp=Thu_Feb_20_14_51_34_UTC_2025&amp;c=30_772"></script><script type="text/javascript" src="/scripts/transaction_scope_includes.jsx?v=02-11-2025_1733"></script><script>if ('') 
			GlideTransactionScope.setTransactionScope('');
		if ('') 
			GlideTransactionScope.setRecordScope('');
		if ('') 
			GlideTransactionScope.setTransactionUpdateSet('');
		if (typeof g_form != 'undefined')
			$(g_form.getFormElement()).fire('glidescope:initialized', {gts : GlideTransactionScope});</script><span style="display:none" data-comments="requires"></span><script>NOW.xperf.lastDoctypeEnd = NOW.xperf.now();</script><span style="display:none" data-comments="db_context_menu_script"></span><script>NOW.xperf.dbContextBegin = NOW.xperf.now();</script><script>NOW.xperf.dbContextEnd = NOW.xperf.now();</script><span style="display:none" data-comments="db_context_menu_script"></span><script data-description="MessagesTag">(function() {
 var messages = new GwtMessage();
messages.set('Timing Type');
messages.set('Time Range');
messages.set('Total Time');
messages.set('{0}ms');
messages.set('{0} ms');
messages.set('Browser response time');
messages.set('Server');
messages.set('Timing details');
messages.set('{0} of {1} {2}: {3}');
messages.set('{0} of {1} Other: {2}');
messages.set('{0} of {1} {2}: {3}');
messages.set('Show Timing Breakdown');
messages.set('Browser timing detail');
messages.set('Time');
messages.set('Other');
messages.set('Timing details breakdown');
messages.set('Response time(ms): {0}');
messages.set('Network: {0}');
messages.set('Network: {0}ms');
messages.set('Server: {0}');
messages.set('Server: {0}ms');
messages.set('Browser: {0}');
messages.set('Browser: {0}ms');
messages.set('Response time','Response Time');
messages.set('Close');
messages.set('Cache/DNS/TCP');
messages.set('DOM Processing');
messages.set('Script Load/Parse');
messages.set('CSS and JS Parse');
messages.set('Form Sections');
messages.set('UI Policy - On Load');
messages.set('Client Scripts - On Load');
messages.set('Client Scripts - On Change (initial load)');
messages.set('Browser processing before onload');
messages.set('DOMContentLoaded to LoadEventEnd');
messages.set('addLoadEvent functions');
messages.set('Related Lists');
messages.set('Related Lists (sync)');
messages.set('Related Lists (async)');
messages.set('onLoad');
messages.set('Unload');
})()</script><script type="text/javascript">var g_serverTime = parseInt("49") + parseInt("0");
            var g_logClientViewRoles = "";

			// do not do this for the navigation menu
            if (window.name != 'gsft_nav') {
				 addAfterPageLoadedEvent(function() {
					 if (window.performance)
						setTimeGraph();
					 else 
						firePageTimer();
				 });
			 }
			 
			function setTimeGraph() {
				if (window.performance.timing.loadEventEnd > 0)
			 		firePageTimer();
			 	else 
			 		setTimeout(setTimeGraph, 300);
			 }
			 
			function firePageTimer() {
				 if (window.performance && performance.timing.requestStart != performance.timing.responseStart) {
				 	var p = performance.timing;

				 	CustomEvent.fire('page_timing', { name: 'SERV', ms: p.responseEnd - p.requestStart});
				 	CustomEvent.fire('page_timing', { name: 'REND', ms: (p.loadEventEnd - p.responseEnd) });
				 	CustomEvent.fire('page_timing_network', { name: 'NETW', ms: (p.responseEnd - p.navigationStart) });
				 } else {
				    CustomEvent.fire('page_timing', { name: 'SERV', ms: g_serverTime });
					CustomEvent.fire('page_timing', { name: 'REND', startTime: g_loadTime });
					CustomEvent.fire('page_timing_network', { name: 'NETW', loadTime: g_loadTime });
				 }CustomEvent.fire('page_timing_show', {
						isFixed: 'true', 
						show: '' 
					 });var o = {};
	      o.types = {};o.types['SECT'] = true;o.types['RLV2'] = true;o.types['UIOL'] = true;o.types['CSOL'] = true;
	
	      o.transaction_id = '74b7ca6b93b86a540426b6ea6aba1011';
	      o.table_name = '';
	      o.form_name = 'login';
	      o.view_id = 'Default view';
	      o.logged_in = false;
	      o.win = window;
	      CustomEvent.fire('page_timing_client', o);}
			 
            // The following line is used to set the time when we start requesting a new page
            Event.observe(window, 'beforeunload', function() {
				new CookieJar({sameSite: 'strict'}).put('g_startTime', new Date().getTime());
                CustomEvent.fireTop('request_start', document);
            });

            // simple pages fire this (stats.do, etc.)
            CustomEvent.observe('simple_page.unload', function() {
				new CookieJar({sameSite: 'strict'}).put('g_startTime', new Date().getTime());
            }); 

            // indicate we have completed the request (used by RequestManager.js for cancel widget)
            addLoadEvent(function() {
            	CustomEvent.fireTop("request_complete", window.location);
            });</script><script type="text/javascript" src="/scripts/doctype/z_last_include.jsx?v=02-11-2025_1733"></script></body><script type="text/html" id="popup_template"><div class="popup popup_form" style=""><iframe src="$src" style=""></iframe></div></script></html>