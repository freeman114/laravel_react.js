<?php 
/**
 * @package 	WordPress
 * @subpackage 	Denta
 * @version		1.0.5
 * 
 * Theme Settings Defaults
 * Created by CMSMasters
 * 
 */


/* Theme Settings General Default Values */
if (!function_exists('denta_settings_general_defaults')) {

function denta_settings_general_defaults($id = false) {
	$settings = array( 
		'general' => array( 
			'denta' . '_theme_layout' => 			'liquid', 
			'denta' . '_logo_type' => 			'image', 
			'denta' . '_logo_url' => 				'|' . get_template_directory_uri() . '/theme-vars/theme-style' . CMSMASTERS_THEME_STYLE . '/img/logo.png', 
			'denta' . '_logo_url_retina' => 		'|' . get_template_directory_uri() . '/theme-vars/theme-style' . CMSMASTERS_THEME_STYLE . '/img/logo_retina.png', 
			'denta' . '_logo_title' => 			get_bloginfo('name') ? get_bloginfo('name') : 'Denta', 
			'denta' . '_logo_subtitle' => 		'', 
			'denta' . '_logo_custom_color' => 	0, 
			'denta' . '_logo_title_color' => 		'', 
			'denta' . '_logo_subtitle_color' => 	'' 
		), 
		'bg' => array( 
			'denta' . '_bg_col' => 			'#ffffff', 
			'denta' . '_bg_img_enable' => 	0, 
			'denta' . '_bg_img' => 			'', 
			'denta' . '_bg_rep' => 			'no-repeat', 
			'denta' . '_bg_pos' => 			'top center', 
			'denta' . '_bg_att' => 			'scroll', 
			'denta' . '_bg_size' => 			'cover' 
		), 
		'header' => array( 
			'denta' . '_fixed_header' => 					1, 
			'denta' . '_header_overlaps' => 				1, 
			'denta' . '_header_top_line' => 				0, 
			'denta' . '_header_top_height' => 			'50', 
			'denta' . '_header_top_line_short_info' => 	'', 
			'denta' . '_header_top_line_add_cont' => 		'social', 
			'denta' . '_header_styles' => 				'default', 
			'denta' . '_header_mid_height' => 			'130', 
			'denta' . '_header_bot_height' => 			'70', 
			'denta' . '_header_search' => 				0, 
			'denta' . '_header_add_cont' => 				'social', 
			'denta' . '_header_add_cont_cust_html' => 	'' 
		), 
		'content' => array( 
			'denta' . '_layout' => 					'r_sidebar', 
			'denta' . '_archives_layout' => 			'r_sidebar', 
			'denta' . '_search_layout' => 			'r_sidebar', 
			'denta' . '_other_layout' => 				'r_sidebar', 
			'denta' . '_heading_alignment' => 		'center', 
			'denta' . '_heading_scheme' => 			'default', 
			'denta' . '_heading_bg_image_enable' => 	1, 
			'denta' . '_heading_bg_image' => 			'|' . get_template_directory_uri() . '/theme-vars/theme-style' . CMSMASTERS_THEME_STYLE . '/img/headline_bg.jpg', 
			'denta' . '_heading_bg_repeat' => 		'no-repeat', 
			'denta' . '_heading_bg_attachment' => 	'scroll', 
			'denta' . '_heading_bg_size' => 			'cover', 
			'denta' . '_heading_bg_color' => 			'', 
			'denta' . '_heading_height' => 			'300', 
			'denta' . '_breadcrumbs' => 				1, 
			'denta' . '_bottom_scheme' => 			'footer', 
			'denta' . '_bottom_sidebar' => 			0, 
			'denta' . '_bottom_sidebar_layout' => 	'14141414' 
		), 
		'footer' => array( 
			'denta' . '_footer_scheme' => 				'footer', 
			'denta' . '_footer_type' => 					'default', 
			'denta' . '_footer_additional_content' => 	'nav', 
			'denta' . '_footer_logo' => 					1, 
			'denta' . '_footer_logo_url' => 				'|' . get_template_directory_uri() . '/theme-vars/theme-style' . CMSMASTERS_THEME_STYLE . '/img/logo.png', 
			'denta' . '_footer_logo_url_retina' => 		'|' . get_template_directory_uri() . '/theme-vars/theme-style' . CMSMASTERS_THEME_STYLE . '/img/logo_footer_retina.png', 
			'denta' . '_footer_nav' => 					1, 
			'denta' . '_footer_social' => 				1, 
			'denta' . '_footer_html' => 					'', 
			'denta' . '_footer_copyright' => 				'Denta' . ' &copy; ' . date('Y') . ' / ' . esc_html__('All Rights Reserved', 'denta') 
		) 
	);
	
	
	if ($id) {
		return $settings[$id];
	} else {
		return $settings;
	}
}

}

/* Theme Settings Fonts Default Values */
if (!function_exists('denta_settings_font_defaults')) {

function denta_settings_font_defaults($id = false) {
	$settings = array( 
		'content' => array( 
			'denta' . '_content_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Arimo:400,400italic,700,700italic', 
				'font_size' => 			'15', 
				'line_height' => 		'25', 
				'font_weight' => 		'400', 
				'font_style' => 		'normal' 
			) 
		), 
		'link' => array( 
			'denta' . '_link_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Arimo:400,400italic,700,700italic', 
				'font_size' => 			'15', 
				'line_height' => 		'25', 
				'font_weight' => 		'400', 
				'font_style' => 		'normal', 
				'text_transform' => 	'none', 
				'text_decoration' => 	'none' 
			), 
			'denta' . '_link_hover_decoration' => 	'none' 
		), 
		'nav' => array( 
			'denta' . '_nav_title_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Fira+Sans:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic', 
				'font_size' => 			'17', 
				'line_height' => 		'24', 
				'font_weight' => 		'normal', 
				'font_style' => 		'normal', 
				'text_transform' => 	'none' 
			), 
			'denta' . '_nav_dropdown_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Fira+Sans:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic', 
				'font_size' => 			'14', 
				'line_height' => 		'24', 
				'font_weight' => 		'normal', 
				'font_style' => 		'normal', 
				'text_transform' => 	'none' 
			) 
		), 
		'heading' => array( 
			'denta' . '_h1_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Fira+Sans:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic', 
				'font_size' => 			'36', 
				'line_height' => 		'44', 
				'font_weight' => 		'300', 
				'font_style' => 		'normal', 
				'text_transform' => 	'none', 
				'text_decoration' => 	'none' 
			), 
			'denta' . '_h2_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Fira+Sans:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic', 
				'font_size' => 			'30', 
				'line_height' => 		'36', 
				'font_weight' => 		'300', 
				'font_style' => 		'normal', 
				'text_transform' => 	'none', 
				'text_decoration' => 	'none' 
			), 
			'denta' . '_h3_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Fira+Sans:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic', 
				'font_size' => 			'22', 
				'line_height' => 		'28', 
				'font_weight' => 		'300', 
				'font_style' => 		'normal', 
				'text_transform' => 	'none', 
				'text_decoration' => 	'none' 
			), 
			'denta' . '_h4_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Fira+Sans:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic', 
				'font_size' => 			'18', 
				'line_height' => 		'26', 
				'font_weight' => 		'300', 
				'font_style' => 		'normal', 
				'text_transform' => 	'none', 
				'text_decoration' => 	'none' 
			), 
			'denta' . '_h5_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Fira+Sans:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic', 
				'font_size' => 			'16', 
				'line_height' => 		'22', 
				'font_weight' => 		'300', 
				'font_style' => 		'normal', 
				'text_transform' => 	'none', 
				'text_decoration' => 	'none' 
			), 
			'denta' . '_h6_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Fira+Sans:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic', 
				'font_size' => 			'14', 
				'line_height' => 		'20', 
				'font_weight' => 		'300', 
				'font_style' => 		'normal', 
				'text_transform' => 	'none', 
				'text_decoration' => 	'none' 
			) 
		), 
		'other' => array( 
			'denta' . '_button_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Arimo:400,400italic,700,700italic', 
				'font_size' => 			'12', 
				'line_height' => 		'40', 
				'font_weight' => 		'bold', 
				'font_style' => 		'normal', 
				'text_transform' => 	'uppercase' 
			), 
			'denta' . '_small_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Arimo:400,400italic,700,700italic', 
				'font_size' => 			'11', 
				'line_height' => 		'20', 
				'font_weight' => 		'300', 
				'font_style' => 		'normal', 
				'text_transform' => 	'none' 
			), 
			'denta' . '_input_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Arimo:400,400italic,700,700italic', 
				'font_size' => 			'15', 
				'line_height' => 		'23', 
				'font_weight' => 		'300', 
				'font_style' => 		'normal' 
			), 
			'denta' . '_quote_font' => array( 
				'system_font' => 		"Arial, Helvetica, 'Nimbus Sans L', sans-serif", 
				'google_font' => 		'Fira+Sans:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic', 
				'font_size' => 			'24', 
				'line_height' => 		'36', 
				'font_weight' => 		'300', 
				'font_style' => 		'italic' 
			) 
		), 
		'google' => array( 
			'denta' . '_google_web_fonts' => array( 
				'Fira+Sans:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Fira Sans', 
				'Arimo:400,400italic,700,700italic|Arimo', 
				'Roboto:300,300italic,400,400italic,500,500italic,700,700italic|Roboto', 
				'Roboto+Condensed:400,400italic,700,700italic|Roboto Condensed', 
				'Open+Sans:300,300italic,400,400italic,700,700italic|Open Sans', 
				'Open+Sans+Condensed:300,300italic,700|Open Sans Condensed', 
				'Droid+Sans:400,700|Droid Sans', 
				'Droid+Serif:400,400italic,700,700italic|Droid Serif', 
				'PT+Sans:400,400italic,700,700italic|PT Sans', 
				'PT+Sans+Caption:400,700|PT Sans Caption', 
				'PT+Sans+Narrow:400,700|PT Sans Narrow', 
				'PT+Serif:400,400italic,700,700italic|PT Serif', 
				'Ubuntu:400,400italic,700,700italic|Ubuntu', 
				'Ubuntu+Condensed|Ubuntu Condensed', 
				'Headland+One|Headland One', 
				'Source+Sans+Pro:300,300italic,400,400italic,700,700italic|Source Sans Pro', 
				'Lato:400,400italic,700,700italic|Lato', 
				'Cuprum:400,400italic,700,700italic|Cuprum', 
				'Oswald:300,400,700|Oswald', 
				'Yanone+Kaffeesatz:300,400,700|Yanone Kaffeesatz', 
				'Lobster|Lobster', 
				'Lobster+Two:400,400italic,700,700italic|Lobster Two', 
				'Questrial|Questrial', 
				'Raleway:300,400,500,600,700|Raleway', 
				'Dosis:300,400,500,700|Dosis', 
				'Cutive+Mono|Cutive Mono', 
				'Quicksand:300,400,700|Quicksand', 
				'Montserrat:400,700|Montserrat', 
				'Cookie|Cookie' 
			) 
		) 
	);
	
	
	if ($id) {
		return $settings[$id];
	} else {
		return $settings;
	}
}

}



// WP Color Picker Palettes
if (!function_exists('cmsmasters_color_picker_palettes')) {

function cmsmasters_color_picker_palettes() {
	$palettes = array( 
		'#4a4f52', 
		'#0a6076', 
		'#828c92', 
		'#1b1e29', 
		'#f4fafd', 
		'#ffffff', 
		'#cfd4d7', 
		'#19bfd1' 
	);
	
	
	return $palettes;
}

}



// Theme Settings Color Schemes Default Colors
if (!function_exists('denta_color_schemes_defaults')) {

function denta_color_schemes_defaults($id = false) {
	$settings = array( 
		'default' => array( // content default color scheme
			'color' => 		'#4a4f52', 
			'link' => 		'#0a6076', 
			'hover' => 		'#828c92', 
			'heading' => 	'#1b1e29', 
			'bg' => 		'#f4fafd', 
			'alternate' => 	'#ffffff', 
			'border' => 	'#cfd4d7', 
			'secondary' => 	'#19bfd1' 
		), 
		'header' => array( // Header color scheme
			'mid_color' => 		'#292929', 
			'mid_link' => 		'#292929', 
			'mid_hover' => 		'#127486', 
			'mid_bg' => 		'#ffffff', 
			'mid_bg_scroll' => 	'#ffffff', 
			'mid_border' => 	'rgba(255,255,255,0)', 
			'bot_color' => 		'#292929', 
			'bot_link' => 		'#292929', 
			'bot_hover' => 		'#127486', 
			'bot_bg' => 		'rgba(255,255,255,0)', 
			'bot_bg_scroll' => 	'rgba(255,255,255,0)', 
			'bot_border' => 	'rgba(207,222,228,0.8)'
		), 
		'navigation' => array( // Navigation color scheme
			'title_link' => 			 '#292929', 
			'title_link_hover' => 		 '#127486', 
			'title_link_current' => 	 '#127486', 
			'title_link_subtitle' => 	 '#545454', 
			'title_link_bg' => 			 '#ffffff', 
			'title_link_bg_hover' => 	 'rgba(255,255,255,0)', 
			'title_link_bg_current' => 	 '#ffffff', 
			'title_link_border' => 		 'rgba(255,255,255,0)', 
			'dropdown_text' => 			 '#565656', 
			'dropdown_bg' => 			 '#ffffff', 
			'dropdown_border' => 		 'rgba(255,255,255,0)', 
			'dropdown_link' => 			 '#292929', 
			'dropdown_link_hover' => 	 '#127486', 
			'dropdown_link_subtitle' =>  '#565656', 
			'dropdown_link_highlight' => 'rgba(255,255,255,0)', 
			'dropdown_link_border' => 	 '#ffffff'
 		), 
		'header_top' => array( // Header Top color scheme
			'color' => 					 '#292929', 
			'link' => 					 '#127486', 
			'hover' => 					 '#828c92', 
			'bg' => 					 '#ffffff', 
			'border' => 				 '#d6dddf', 
			'title_link' => 			 '#292929', 
			'title_link_hover' => 		 '#127486', 
			'title_link_bg' => 			 '#ffffff', 
			'title_link_bg_hover' => 	 '#ffffff', 
			'title_link_border' => 		 '#ffffff', 
			'dropdown_bg' => 			 '#ffffff', 
			'dropdown_border' => 		 '#ffffff', 
			'dropdown_link' => 			 '#292929', 
			'dropdown_link_hover' => 	 '#127486', 
			'dropdown_link_highlight' => '#19bfd1', 
			'dropdown_link_border' => 	 'rgba(255,255,255,0)' 
		), 
		'footer' => array( // Footer color scheme
			'color' => 		'#71a1ae', 
			'link' => 		'#83b7c5', 
			'hover' => 		'#9ed7e6', 
			'heading' => 	'#71a1ae', 
			'bg' => 		'#05313d', 
			'alternate' => 	'#262626', 
			'border' => 	'rgba(255,255,255,0)', 
			'secondary' => 	'#83b7c5'
		), 
		'first' => array( // custom color scheme 1
			'color' => 		'rgba(255,255,255,0.35)', 
			'link' => 		'rgba(255,255,255,0.35)', 
			'hover' => 		'#ffffff', 
			'heading' => 	'#ffffff', 
			'bg' => 		'#262626', 
			'alternate' => 	'rgba(255,255,255,0.16)', 
			'border' => 	'rgba(255,255,255,0.2)', 
			'secondary' => 	'#f15039' 
		), 
		'second' => array( // custom color scheme 2
			'color' => 		'#ffffff', 
			'link' => 		'#5bfddd', 
			'hover' => 		'#23cbd1', 
			'heading' => 	'#ffffff', 
			'bg' => 		'#ffffff', 
			'alternate' => 	'#ffffff', 
			'border' => 	'#ffffff', 
			'secondary' => 	'#ffffff' 
		), 
		'third' => array( // custom color scheme 3
			'color' => 		'#ffffff', 
			'link' => 		'#ffffff', 
			'hover' => 		'rgba(255,255,255,0.6)', 
			'heading' => 	'#ffffff', 
			'bg' => 		'#fbfbfb', 
			'alternate' => 	'#ffffff', 
			'border' => 	'#e4e4e4', 
			'secondary' => 	'#f15039' 
		) 
	);
	
	
	if ($id) {
		return $settings[$id];
	} else {
		return $settings;
	}
}

}



// Theme Settings Elements Default Values
if (!function_exists('denta_settings_element_defaults')) {

function denta_settings_element_defaults($id = false) {
	$settings = array( 
		'sidebar' => array( 
			'denta' . '_sidebar' => 	'' 
		), 
		'icon' => array( 
			'denta' . '_social_icons' => array( 
				'cmsmasters-icon-linkedin-1|#|' . esc_html__('Linkedin', 'denta') . '|true||', 
				'cmsmasters-icon-facebook|#|' . esc_html__('Facebook', 'denta') . '|true||', 
				'cmsmasters-icon-google|#|' . esc_html__('Google', 'denta') . '|true||', 
				'cmsmasters-icon-twitter|#|' . esc_html__('Twitter', 'denta') . '|true||', 
				'cmsmasters-icon-skype-1|#|' . esc_html__('Skype', 'denta') . '|true||' 
			) 
		), 
		'lightbox' => array( 
			'denta' . '_ilightbox_skin' => 					'dark', 
			'denta' . '_ilightbox_path' => 					'vertical', 
			'denta' . '_ilightbox_infinite' => 				0, 
			'denta' . '_ilightbox_aspect_ratio' => 			1, 
			'denta' . '_ilightbox_mobile_optimizer' => 		1, 
			'denta' . '_ilightbox_max_scale' => 				1, 
			'denta' . '_ilightbox_min_scale' => 				0.2, 
			'denta' . '_ilightbox_inner_toolbar' => 			0, 
			'denta' . '_ilightbox_smart_recognition' => 		0, 
			'denta' . '_ilightbox_fullscreen_one_slide' => 	0, 
			'denta' . '_ilightbox_fullscreen_viewport' => 	'center', 
			'denta' . '_ilightbox_controls_toolbar' => 		1, 
			'denta' . '_ilightbox_controls_arrows' => 		0, 
			'denta' . '_ilightbox_controls_fullscreen' => 	1, 
			'denta' . '_ilightbox_controls_thumbnail' => 		1, 
			'denta' . '_ilightbox_controls_keyboard' => 		1, 
			'denta' . '_ilightbox_controls_mousewheel' => 	1, 
			'denta' . '_ilightbox_controls_swipe' => 			1, 
			'denta' . '_ilightbox_controls_slideshow' => 		0 
		), 
		'sitemap' => array( 
			'denta' . '_sitemap_nav' => 			1, 
			'denta' . '_sitemap_categs' => 		1, 
			'denta' . '_sitemap_tags' => 			1, 
			'denta' . '_sitemap_month' => 		1, 
			'denta' . '_sitemap_pj_categs' => 	1, 
			'denta' . '_sitemap_pj_tags' => 		1 
		), 
		'error' => array( 
			'denta' . '_error_color' => 				'#313131', 
			'denta' . '_error_bg_color' => 			'#ffffff', 
			'denta' . '_error_bg_img_enable' => 		0, 
			'denta' . '_error_bg_image' => 			'', 
			'denta' . '_error_bg_rep' => 				'no-repeat', 
			'denta' . '_error_bg_pos' => 				'top center', 
			'denta' . '_error_bg_att' => 				'scroll', 
			'denta' . '_error_bg_size' => 			'cover', 
			'denta' . '_error_search' => 				1, 
			'denta' . '_error_sitemap_button' =>		1, 
			'denta' . '_error_sitemap_link' => 		'' 
		), 
		'code' => array( 
			'denta' . '_custom_css' => 			'', 
			'denta' . '_custom_js' => 			'', 
			'denta' . '_gmap_api_key' => 			'', 
			'denta' . '_api_key' => 				'', 
			'denta' . '_api_secret' => 			'', 
			'denta' . '_access_token' => 			'', 
			'denta' . '_access_token_secret' => 	'' 
		), 
		'recaptcha' => array( 
			'denta' . '_recaptcha_public_key' => 		'', 
			'denta' . '_recaptcha_private_key' => 	'' 
		) 
	);
	
	
	if ($id) {
		return $settings[$id];
	} else {
		return $settings;
	}
}

}



// Theme Settings Single Posts Default Values
if (!function_exists('denta_settings_single_defaults')) {

function denta_settings_single_defaults($id = false) {
	$settings = array( 
		'post' => array( 
			'denta' . '_blog_post_layout' => 			'fullwidth', 
			'denta' . '_blog_post_title' => 			1, 
			'denta' . '_blog_post_date' => 			1, 
			'denta' . '_blog_post_cat' => 			1, 
			'denta' . '_blog_post_author' => 			1, 
			'denta' . '_blog_post_comment' => 		1, 
			'denta' . '_blog_post_tag' => 			1, 
			'denta' . '_blog_post_like' => 			1, 
			'denta' . '_blog_post_nav_box' => 		1, 
			'denta' . '_blog_post_nav_order_cat' => 	0, 
			'denta' . '_blog_post_share_box' => 		1, 
			'denta' . '_blog_post_author_box' => 		1, 
			'denta' . '_blog_more_posts_box' => 		'popular', 
			'denta' . '_blog_more_posts_count' => 	'3', 
			'denta' . '_blog_more_posts_pause' => 	'5' 
		), 
		'project' => array( 
			'denta' . '_portfolio_project_title' => 			1, 
			'denta' . '_portfolio_project_details_title' => 	esc_html__('Service details', 'denta'), 
			'denta' . '_portfolio_project_date' => 			1, 
			'denta' . '_portfolio_project_cat' => 			1, 
			'denta' . '_portfolio_project_author' => 			1, 
			'denta' . '_portfolio_project_comment' => 		0, 
			'denta' . '_portfolio_project_tag' => 			0, 
			'denta' . '_portfolio_project_like' => 			1, 
			'denta' . '_portfolio_project_link' => 			0, 
			'denta' . '_portfolio_project_share_box' => 		1, 
			'denta' . '_portfolio_project_nav_box' => 		1, 
			'denta' . '_portfolio_project_nav_order_cat' => 	0, 
			'denta' . '_portfolio_project_author_box' => 		1, 
			'denta' . '_portfolio_more_projects_box' => 		'popular', 
			'denta' . '_portfolio_more_projects_count' => 	'4', 
			'denta' . '_portfolio_more_projects_pause' => 	'5', 
			'denta' . '_portfolio_project_slug' => 			'service', 
			'denta' . '_portfolio_pj_categs_slug' => 			'pj-categs', 
			'denta' . '_portfolio_pj_tags_slug' => 			'pj-tags' 
		), 
		'profile' => array( 
			'denta' . '_profile_post_title' => 			1, 
			'denta' . '_profile_post_details_title' => 	esc_html__('Profile details', 'denta'), 
			'denta' . '_profile_post_cat' => 				1, 
			'denta' . '_profile_post_comment' => 			1, 
			'denta' . '_profile_post_like' => 			1, 
			'denta' . '_profile_post_nav_box' => 			1, 
			'denta' . '_profile_post_nav_order_cat' => 	0, 
			'denta' . '_profile_post_share_box' => 		1, 
			'denta' . '_profile_post_slug' => 			'profile', 
			'denta' . '_profile_pl_categs_slug' => 		'pl-categs' 
		) 
	);
	
	
	if ($id) {
		return $settings[$id];
	} else {
		return $settings;
	}
}

}



/* Service Puzzle Proportion */
if (!function_exists('denta_project_puzzle_proportion')) {

function denta_project_puzzle_proportion() {
	return 0.7069;
}

}



/* Theme Image Thumbnails Size */
if (!function_exists('denta_get_image_thumbnail_list')) {

function denta_get_image_thumbnail_list() {
	$list = array( 
		'cmsmasters-small-thumb' => array( 
			'width' => 		75, 
			'height' => 	75, 
			'crop' => 		true 
		), 
		'cmsmasters-square-thumb' => array( 
			'width' => 		300, 
			'height' => 	300, 
			'crop' => 		true, 
			'title' => 		esc_attr__('Square', 'denta') 
		), 
		'cmsmasters-blog-masonry-thumb' => array( 
			'width' => 		580, 
			'height' => 	366, 
			'crop' => 		true, 
			'title' => 		esc_attr__('Masonry Blog', 'denta') 
		), 
		'cmsmasters-project-thumb' => array( 
			'width' => 		580, 
			'height' => 	410, 
			'crop' => 		true, 
			'title' => 		esc_attr__('Service', 'denta') 
		), 
		'cmsmasters-project-masonry-thumb' => array( 
			'width' => 		580, 
			'height' => 	9999, 
			'title' => 		esc_attr__('Masonry Service', 'denta') 
		), 
		'post-thumbnail' => array( 
			'width' => 		860, 
			'height' => 	575, 
			'crop' => 		true, 
			'title' => 		esc_attr__('Featured', 'denta') 
		), 
		'cmsmasters-masonry-thumb' => array( 
			'width' => 		860, 
			'height' => 	9999, 
			'title' => 		esc_attr__('Masonry', 'denta') 
		), 
		'cmsmasters-full-thumb' => array( 
			'width' => 		1160, 
			'height' => 	770, 
			'crop' => 		true, 
			'title' => 		esc_attr__('Full', 'denta') 
		), 
		'cmsmasters-project-full-thumb' => array( 
			'width' => 		1160, 
			'height' => 	820, 
			'crop' => 		true, 
			'title' => 		esc_attr__('Service Full', 'denta') 
		), 
		'cmsmasters-full-masonry-thumb' => array( 
			'width' => 		1160, 
			'height' => 	9999, 
			'title' => 		esc_attr__('Masonry Full', 'denta') 
		) 
	);
	
	
	return $list;
}

}



/* Service Post Type Registration Rename */
if (!function_exists('denta_project_labels')) {

function denta_project_labels() {
	return array( 
		'name' => 					esc_html__('Services', 'denta'), 
		'singular_name' => 			esc_html__('Service', 'denta'), 
		'menu_name' => 				esc_html__('Services', 'denta'), 
		'all_items' => 				esc_html__('All Services', 'denta'), 
		'add_new' => 				esc_html__('Add New', 'denta'), 
		'add_new_item' => 			esc_html__('Add New Service', 'denta'), 
		'edit_item' => 				esc_html__('Edit Service', 'denta'), 
		'new_item' => 				esc_html__('New Service', 'denta'), 
		'view_item' => 				esc_html__('View Service', 'denta'), 
		'search_items' => 			esc_html__('Search Services', 'denta'), 
		'not_found' => 				esc_html__('No Services found', 'denta'), 
		'not_found_in_trash' => 	esc_html__('No Services found in Trash', 'denta') 
	);
}

}

add_filter('cmsmasters_project_labels_filter', 'denta_project_labels');


if (!function_exists('denta_pj_categs_labels')) {

function denta_pj_categs_labels() {
	return array( 
		'name' => 					esc_html__('Service Categories', 'denta'), 
		'singular_name' => 			esc_html__('Service Category', 'denta') 
	);
}

}

add_filter('cmsmasters_pj_categs_labels_filter', 'denta_pj_categs_labels');


if (!function_exists('denta_pj_tags_labels')) {

function denta_pj_tags_labels() {
	return array( 
		'name' => 					esc_html__('Service Tags', 'denta'), 
		'singular_name' => 			esc_html__('Service Tag', 'denta') 
	);
}

}

add_filter('cmsmasters_pj_tags_labels_filter', 'denta_pj_tags_labels');



/* Profile Post Type Registration Rename */
if (!function_exists('denta_profile_labels')) {

function denta_profile_labels() {
	return array( 
		'name' => 					esc_html__('Profiles', 'denta'), 
		'singular_name' => 			esc_html__('Profiles', 'denta'), 
		'menu_name' => 				esc_html__('Profiles', 'denta'), 
		'all_items' => 				esc_html__('All Profiles', 'denta'), 
		'add_new' => 				esc_html__('Add New', 'denta'), 
		'add_new_item' => 			esc_html__('Add New Profile', 'denta'), 
		'edit_item' => 				esc_html__('Edit Profile', 'denta'), 
		'new_item' => 				esc_html__('New Profile', 'denta'), 
		'view_item' => 				esc_html__('View Profile', 'denta'), 
		'search_items' => 			esc_html__('Search Profiles', 'denta'), 
		'not_found' => 				esc_html__('No Profiles found', 'denta'), 
		'not_found_in_trash' => 	esc_html__('No Profiles found in Trash', 'denta') 
	);
}

}

// add_filter('cmsmasters_profile_labels_filter', 'denta_profile_labels');


if (!function_exists('denta_pl_categs_labels')) {

function denta_pl_categs_labels() {
	return array( 
		'name' => 					esc_html__('Profile Categories', 'denta'), 
		'singular_name' => 			esc_html__('Profile Category', 'denta') 
	);
}

}

// add_filter('cmsmasters_pl_categs_labels_filter', 'denta_pl_categs_labels');

