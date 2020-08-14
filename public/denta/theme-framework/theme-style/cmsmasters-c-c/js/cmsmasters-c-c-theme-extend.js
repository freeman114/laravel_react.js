/**
 * @package 	WordPress
 * @subpackage 	Denta
 * @version		1.0.0
 * 
 * Theme Content Composer Schortcodes Extend
 * Created by CMSMasters
 * 
 */



/**
 * Сlient Extend
 */

var cmsmasters_client_new_fields = {};


for (var id in cmsmastersMultipleShortcodes.cmsmasters_client.fields) {
	if (id === 'link') {
		cmsmasters_client_new_fields['logo_overlay'] = { 
			type : 			'upload', 
			title : 		cmsmasters_theme_shortcodes.client_field_logo_overlay_title, 
			descr : 		cmsmasters_theme_shortcodes.client_field_logo_overlay_descr, 
			def : 			'', 
			required : 		true, 
			width : 		'half', 
			frame : 		'post', 
			library : 		'image', 
			multiple : 		false, 
			description : 	false, 
			caption : 		false, 
			align : 		false, 
			link : 			false, 
			size : 			false 
		};
		
		
		cmsmasters_client_new_fields[id] = cmsmastersMultipleShortcodes.cmsmasters_client.fields[id];
	} else {
		cmsmasters_client_new_fields[id] = cmsmastersMultipleShortcodes.cmsmasters_client.fields[id];
	}
}


cmsmastersMultipleShortcodes.cmsmasters_client.fields = cmsmasters_client_new_fields;



/**
 * Stats Extend
 */

var cmsmasters_stats_new_fields = {};


for (var id in cmsmastersShortcodes.cmsmasters_stats.fields) {
	if (id === 'type') {
		delete cmsmastersShortcodes.cmsmasters_stats.fields[id];
	} else if (id === 'count') {
		cmsmastersShortcodes.cmsmasters_stats.fields[id]['depend'] = 'mode:circles';
		
		
		cmsmasters_stats_new_fields[id] = cmsmastersShortcodes.cmsmasters_stats.fields[id];
	} else {
		cmsmasters_stats_new_fields[id] = cmsmastersShortcodes.cmsmasters_stats.fields[id];
	}
}


cmsmastersShortcodes.cmsmasters_stats.fields = cmsmasters_stats_new_fields;



/**
 * Pricing Table Extend
 */

var cmsmasters_pricing_table_item_new_fields = {};


for (var id in cmsmastersMultipleShortcodes.cmsmasters_pricing_table_item.fields) {
	if (id === 'best_bg_color') {
		cmsmastersMultipleShortcodes.cmsmasters_pricing_table_item.fields[id]['title'] = cmsmasters_theme_shortcodes.pricing_offer_field_best_offer_bd_title;
		cmsmastersMultipleShortcodes.cmsmasters_pricing_table_item.fields[id]['descr'] = cmsmasters_theme_shortcodes.pricing_offer_field_best_offer_bd_descr;
		
		cmsmasters_pricing_table_item_new_fields[id] = cmsmastersMultipleShortcodes.cmsmasters_pricing_table_item.fields[id];
	} else {
		cmsmasters_pricing_table_item_new_fields[id] = cmsmastersMultipleShortcodes.cmsmasters_pricing_table_item.fields[id];
	}
}


cmsmastersMultipleShortcodes.cmsmasters_pricing_table_item.fields = cmsmasters_pricing_table_item_new_fields;



/**
 * Blog Extend
 */

var cmsmasters_blog_new_fields = {};


for (var id in cmsmastersShortcodes.cmsmasters_blog.fields) {
	if (id === 'filter_text') {
		delete cmsmastersShortcodes.cmsmasters_blog.fields[id];
	} else {
		cmsmasters_blog_new_fields[id] = cmsmastersShortcodes.cmsmasters_blog.fields[id];
	}
}


cmsmastersShortcodes.cmsmasters_blog.fields = cmsmasters_blog_new_fields;



/**
 * Portfolio Extend
 */

var cmsmasters_portfolio_new_fields = {};


for (var id in cmsmastersShortcodes.cmsmasters_portfolio.fields) {
	if (id === 'filter_text') {
		delete cmsmastersShortcodes.cmsmasters_portfolio.fields[id];
	} else {
		cmsmasters_portfolio_new_fields[id] = cmsmastersShortcodes.cmsmasters_portfolio.fields[id];
	}
}


cmsmastersShortcodes.cmsmasters_portfolio.fields = cmsmasters_portfolio_new_fields;

cmsmastersShortcodes.cmsmasters_portfolio.title = cmsmasters_theme_shortcodes.portfolio_title;
cmsmastersShortcodes.cmsmasters_portfolio.fields.orderby.descr = cmsmasters_theme_shortcodes.portfolio_field_orderby_descr;
cmsmastersShortcodes.cmsmasters_portfolio.fields.count.title = cmsmasters_theme_shortcodes.portfolio_field_pj_number_title;
cmsmastersShortcodes.cmsmasters_portfolio.fields.count.descr = cmsmasters_theme_shortcodes.portfolio_field_pj_number_descr;
cmsmastersShortcodes.cmsmasters_portfolio.fields.categories.descr = cmsmasters_theme_shortcodes.portfolio_field_categories_descr + "<br /><span>" + cmsmasters_shortcodes.note + ' ' + cmsmasters_theme_shortcodes.portfolio_field_categories_descr_note + "</span>";
cmsmastersShortcodes.cmsmasters_portfolio.fields.layout.choises.grid = cmsmasters_theme_shortcodes.portfolio_field_layout_choice_grid;
cmsmastersShortcodes.cmsmasters_portfolio.fields.layout.descr = cmsmasters_theme_shortcodes.portfolio_field_layout_mode_descr;
cmsmastersShortcodes.cmsmasters_portfolio.fields.layout_mode.descr = cmsmasters_theme_shortcodes.portfolio_field_layout_descr;
cmsmastersShortcodes.cmsmasters_portfolio.fields.columns.descr = cmsmasters_theme_shortcodes.portfolio_field_col_count_descr  + "<br /><span>" + cmsmasters_shortcodes.note + ' ' + cmsmasters_shortcodes.portfolio_field_col_count_descr_note + "<br />" + cmsmasters_shortcodes.portfolio_field_col_count_descr_note_custom + "</span>";
cmsmastersShortcodes.cmsmasters_portfolio.fields.metadata_grid.descr = cmsmasters_theme_shortcodes.portfolio_field_metadata_descr;
cmsmastersShortcodes.cmsmasters_portfolio.fields.metadata_puzzle.descr = cmsmasters_theme_shortcodes.portfolio_field_metadata_descr;
cmsmastersShortcodes.cmsmasters_portfolio.fields.gap.descr = cmsmasters_theme_shortcodes.portfolio_field_gap_descr;
cmsmastersShortcodes.cmsmasters_portfolio.fields.filter.descr = cmsmasters_theme_shortcodes.portfolio_field_filter_descr;
cmsmastersShortcodes.cmsmasters_portfolio.fields.sorting.descr = cmsmasters_theme_shortcodes.portfolio_field_sorting_descr;

cmsmastersShortcodes.cmsmasters_posts_slider.fields.post_type.choises.project = cmsmasters_theme_shortcodes.posts_slider_field_poststype_choice_project;
cmsmastersShortcodes.cmsmasters_posts_slider.fields.portfolio_categories.title = cmsmasters_theme_shortcodes.posts_slider_field_pjcateg_title;
cmsmastersShortcodes.cmsmasters_posts_slider.fields.portfolio_categories.descr = cmsmasters_theme_shortcodes.posts_slider_field_pjcateg_descr + "<br /><span>" + cmsmasters_shortcodes.note + ' ' + cmsmasters_theme_shortcodes.posts_slider_field_pjcateg_descr_note + "</span>";
cmsmastersShortcodes.cmsmasters_posts_slider.fields.portfolio_metadata.title = cmsmasters_theme_shortcodes.posts_slider_field_pjmeta_title;
cmsmastersShortcodes.cmsmasters_posts_slider.fields.portfolio_metadata.descr = cmsmasters_theme_shortcodes.posts_slider_field_pjmeta_descr;

