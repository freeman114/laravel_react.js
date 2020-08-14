/**
 * @package 	WordPress
 * @subpackage 	Denta
 * @version		1.0.0
 * 
 * Timetable Content Composer Schortcodes Extend
 * Created by CMSMasters
 * 
 */


/**
 * Timetable
 */
cmsmastersShortcodes.cmsmasters_timetable = { 
	title : 	cmsmasters_timetable_shortcodes.timetable_title, 
	icon : 		'admin-icon-table', 
	pair : 		false, 
	content : 	false, 
	visual : 	false, 
	multiple : 	false, 
	def : 		"", 
	fields : { 
		// Shortcode ID
		shortcode_id : { 
			type : 		'hidden', 
			title : 	'', 
			descr : 	'', 
			def : 		'', 
			required : 	true, 
			width : 	'full' 
		}, 
		// Events
		event : { 
			type : 		'select_multiple', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_event_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_event_descr + "<br /><span>" + cmsmasters_shortcodes.note + ' ' + cmsmasters_timetable_shortcodes.timetable_field_event_descr_note + "</span>", 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : 	cmsmasters_timetable_shortcodes.timetable_events 
		}, 
		// Event categories
		event_category : { 
			type : 		'select_multiple', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_event_category_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_event_category_descr + "<br /><span>" + cmsmasters_shortcodes.note + ' ' + cmsmasters_timetable_shortcodes.timetable_field_event_category_descr_note + "</span>", 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : 	cmsmasters_timetable_shortcodes.timetable_event_categories 
		}, 
		// Hour categories
		hour_category : { 
			type : 		'select_multiple', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_hour_category_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_hour_category_descr + "<br /><span>" + cmsmasters_shortcodes.note + ' ' + cmsmasters_timetable_shortcodes.timetable_field_hour_category_descr_note + "</span>", 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : 	cmsmasters_timetable_shortcodes.timetable_hour_categories 
		}, 
		// Columns
		columns : { 
			type : 		'select_multiple', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_columns_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_columns_descr + "<br /><span>" + cmsmasters_shortcodes.note + ' ' + cmsmasters_timetable_shortcodes.timetable_field_columns_descr_note + "</span>", 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : 	cmsmasters_timetable_shortcodes.timetable_columns 
		}, 
		// Hour measure
		measure : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_measure_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_measure_descr, 
			def : 		'1', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 		cmsmasters_timetable_shortcodes.timetable_field_measure_choice_hour, 
						'0.5' : 	cmsmasters_timetable_shortcodes.timetable_field_measure_choice_half_hour, 
						'0.25' : 	cmsmasters_timetable_shortcodes.timetable_field_measure_choice_quarter_hour 
			} 
		}, 
		// Filter style
		filter_style : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_filter_style_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_filter_style_descr, 
			def : 		'dropdown_list', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'dropdown_list' : 	cmsmasters_timetable_shortcodes.timetable_field_filter_style_choice_dropdown_list, 
						'tabs' : 			cmsmasters_timetable_shortcodes.timetable_field_filter_style_choice_tabs 
			} 
		}, 
		// Filter kind
		filter_kind : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_filter_kind_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_filter_kind_descr, 
			def : 		'event', 
			required : 	false, 
			width : 	'half', 
			choises : { 
					'event' : 						cmsmasters_timetable_shortcodes.timetable_field_filter_kind_choice_event, 
					'event_category' : 				cmsmasters_timetable_shortcodes.timetable_field_filter_kind_choice_event_category, 
					'event_and_event_category' :	cmsmasters_timetable_shortcodes.timetable_field_filter_kind_choice_event_and_event_category 
			} 
		}, 
		// Filter label
		filter_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_filter_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_filter_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_filter_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Filter label 2
		filter_label_2 : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_filter_label_2_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_filter_label_2_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_filter_label_2_def, 
			required : 	false, 
			width : 	'half', 
			depend : 	'filter_kind:event_and_event_category' 
		}, 
		// Time format
		time_format : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_time_format_title, 
			descr : 	'', 
			def : 		'H.i', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'H.i' : 	'09.03', 
						'H:i' : 	'09:03', 
						'g:i a' : 	'9:03 am', 
						'g:i A' : 	'9:03 AM', 
						'custom' : 	cmsmasters_timetable_shortcodes.timetable_field_time_format_choice_custom 
			} 
		}, 
		// Time format custom
		time_format_custom : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_time_format_custom_title, 
			descr : 	'', 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			depend : 	'time_format:custom' 
		}, 
		// Hide 'All Events' view
		hide_all_events_view : { 
			type : 		'checkbox', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_hide_all_events_view_title, 
			descr : 	'', 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 	cmsmasters_shortcodes.choice_enable 
			} 
		}, 
		// Hide first (hours) column
		hide_hours_column : { 
			type : 		'checkbox', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_hide_hours_column_title, 
			descr : 	'', 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 	cmsmasters_shortcodes.choice_enable 
			} 
		}, 
		// Show end hour in first (hours) column
		show_end_hour : { 
			type : 		'checkbox', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_show_end_hour_title, 
			descr : 	'', 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 	cmsmasters_shortcodes.choice_enable 
			} 
		}, 
		// Event block layout
		event_layout : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_event_layout_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_event_layout_descr, 
			def : 		'1', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 	cmsmasters_timetable_shortcodes.timetable_field_event_layout_choice_type + ' 1', 
						'2' : 	cmsmasters_timetable_shortcodes.timetable_field_event_layout_choice_type + ' 2', 
						'3' : 	cmsmasters_timetable_shortcodes.timetable_field_event_layout_choice_type + ' 3', 
						'4' : 	cmsmasters_timetable_shortcodes.timetable_field_event_layout_choice_type + ' 4', 
						'5' : 	cmsmasters_timetable_shortcodes.timetable_field_event_layout_choice_type + ' 5' 
			} 
		}, 
		// Hide empty rows
		hide_empty : { 
			type : 		'checkbox', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_hide_empty_title, 
			descr : 	'', 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 	cmsmasters_shortcodes.choice_enable 
			} 
		}, 
		// Disable event url
		disable_event_url : { 
			type : 		'checkbox', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_disable_event_url_title, 
			descr : 	'', 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 	cmsmasters_shortcodes.choice_enable 
			} 
		}, 
		// Text align
		text_align : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_text_align_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_text_align_descr, 
			def : 		'center', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'center' : 		cmsmasters_shortcodes.choice_center, 
						'left' : 		cmsmasters_shortcodes.choice_left, 
						'right' : 		cmsmasters_shortcodes.choice_right, 
			} 
		}, 
		// Id
		id : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_id_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_id_descr + "<br /><span>" + cmsmasters_shortcodes.note + ' ' + cmsmasters_timetable_shortcodes.timetable_field_id_descr_note + "</span>", 
			def : 		'', 
			required : 	false, 
			width : 	'half' 
		}, 
		// Row height (in px)
		row_height : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_row_height_title, 
			descr : 	"<span>" + cmsmasters_shortcodes.note + ' ' + cmsmasters_shortcodes.size_zero_note + "</span>", 
			def : 		'31', 
			required : 	false, 
			width : 	'number', 
			min : 		'0' 
		}, 
		// Display list view on desktop
		desktop_list_view : { 
			type : 		'checkbox', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_desktop_list_view_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_desktop_list_view_descr, 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 	cmsmasters_shortcodes.choice_enable 
			} 
		}, 
		// Event description in responsive mode
		event_description_responsive : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_event_description_responsive_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_event_description_responsive_descr, 
			def : 		'none', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'none' : cmsmasters_timetable_shortcodes.timetable_field_choice_none, 
						'description-1' : cmsmasters_timetable_shortcodes.timetable_field_choice_description_1, 
						'description-2' : cmsmasters_timetable_shortcodes.timetable_field_choice_description_2, 
						'description-1-and-description-2' : cmsmasters_timetable_shortcodes.timetable_field_choice_description_1_and_description_2 
			} 
		}, 
		// Collapse event hours in responsive mode
		collapse_event_hours_responsive : { 
			type : 		'checkbox', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_collapse_event_hours_responsive_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_collapse_event_hours_responsive_descr, 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 	cmsmasters_shortcodes.choice_enable 
			} 
		}, 
		// Use colors in responsive mode
		colors_responsive_mode : { 
			type : 		'checkbox', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_colors_responsive_mode_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_colors_responsive_mode_descr, 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 	cmsmasters_shortcodes.choice_enable 
			} 
		}, 
		// Export to PDF button
		export_to_pdf_button : { 
			type : 		'checkbox', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_export_to_pdf_button_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_export_to_pdf_button_descr, 
			def : 		'', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'1' : 	cmsmasters_shortcodes.choice_enable 
			} 
		}, 
		// Generate PDF label
		generate_pdf_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_generate_pdf_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_generate_pdf_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_generate_pdf_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Show booking button
		show_booking_button : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_show_booking_button_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_show_booking_button_descr, 
			def : 		'no', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'no' : 			cmsmasters_timetable_shortcodes.timetable_field_show_booking_button_choice_no, 
						'always' : 		cmsmasters_timetable_shortcodes.timetable_field_show_booking_button_choice_always, 
						'on_hover' : 	cmsmasters_timetable_shortcodes.timetable_field_show_booking_button_choice_on_hover 
			} 
		}, 
		// Show available slots
		show_available_slots : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_show_available_slots_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_show_available_slots_descr, 
			def : 		'no', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'no' : 			cmsmasters_timetable_shortcodes.timetable_field_show_available_slots_choice_no, 
						'always' : 		cmsmasters_timetable_shortcodes.timetable_field_show_available_slots_choice_always 
			} 
		}, 
		// Available Slots Singular
		available_slots_singular_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_available_slots_singular_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_available_slots_singular_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_available_slots_singular_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Available Slots Plural
		available_slots_plural_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_available_slots_plural_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_available_slots_plural_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_available_slots_plural_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Default Booking View
		default_booking_view : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_default_booking_view_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_default_booking_view_descr, 
			def : 		'user', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'user' : 	cmsmasters_timetable_shortcodes.timetable_field_default_booking_view_choice_user, 
						'guest' : 	cmsmasters_timetable_shortcodes.timetable_field_default_booking_view_choice_guest 
			} 
		}, 
		// Allow User Booking
		allow_user_booking : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_allow_user_booking_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_allow_user_booking_descr, 
			def : 		'yes', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'yes' : 	cmsmasters_timetable_shortcodes.timetable_field_allow_user_booking_choice_yes, 
						'no' : 		cmsmasters_timetable_shortcodes.timetable_field_allow_user_booking_choice_no 
			}, 
			depend : 	'default_booking_view:guest' 
		}, 
		// Allow Guest Booking
		allow_guest_booking : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_allow_guest_booking_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_allow_guest_booking_descr, 
			def : 		'no', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'yes' : 	cmsmasters_timetable_shortcodes.timetable_field_allow_guest_booking_choice_yes, 
						'no' : 		cmsmasters_timetable_shortcodes.timetable_field_allow_guest_booking_choice_no 
			}, 
			depend : 	'default_booking_view:user' 
		}, 
		// Show Guest Name Field
		show_guest_name_field : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_show_guest_name_field_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_show_guest_name_field_descr, 
			def : 		'yes', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'yes' : 	cmsmasters_timetable_shortcodes.timetable_field_show_guest_name_field_choice_yes, 
						'no' : 		cmsmasters_timetable_shortcodes.timetable_field_show_guest_name_field_choice_no 
			}, 
			depend : 	'allow_guest_booking:yes' 
		}, 
		// Guest Name Field Required
		guest_name_field_required : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_guest_name_field_required_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_guest_name_field_required_descr, 
			def : 		'yes', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'yes' : 	cmsmasters_timetable_shortcodes.timetable_field_guest_name_field_required_choice_yes, 
						'no' : 		cmsmasters_timetable_shortcodes.timetable_field_guest_name_field_required_choice_no 
			}, 
			depend : 	'allow_guest_booking:yes' 
		}, 
		// Show Guest Phone Field
		show_guest_phone_field : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_show_guest_phone_field_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_show_guest_phone_field_descr, 
			def : 		'no', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'yes' : 	cmsmasters_timetable_shortcodes.timetable_field_show_guest_phone_field_choice_yes, 
						'no' : 		cmsmasters_timetable_shortcodes.timetable_field_show_guest_phone_field_choice_no 
			}, 
			depend : 	'allow_guest_booking:yes' 
		}, 
		// Guest Phone Field Required
		guest_phone_field_required : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_guest_phone_field_required_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_guest_phone_field_required_descr, 
			def : 		'no', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'yes' : 	cmsmasters_timetable_shortcodes.timetable_field_guest_phone_field_required_choice_yes, 
						'no' : 		cmsmasters_timetable_shortcodes.timetable_field_guest_phone_field_required_choice_no 
			}, 
			depend : 	'allow_guest_booking:yes' 
		}, 
		// Show Guest Message Field
		show_guest_message_field : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_show_guest_message_field_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_show_guest_message_field_descr, 
			def : 		'no', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'yes' : 	cmsmasters_timetable_shortcodes.timetable_field_show_guest_message_field_choice_yes, 
						'no' : 		cmsmasters_timetable_shortcodes.timetable_field_show_guest_message_field_choice_no 
			}, 
			depend : 	'allow_guest_booking:yes' 
		}, 
		// Guest Message Field Required
		guest_message_field_required : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_guest_message_field_required_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_guest_message_field_required_descr, 
			def : 		'no', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'yes' : 	cmsmasters_timetable_shortcodes.timetable_field_guest_message_field_required_choice_yes, 
						'no' : 		cmsmasters_timetable_shortcodes.timetable_field_guest_message_field_required_choice_no 
			}, 
			depend : 	'allow_guest_booking:yes' 
		}, 
		// Booking label
		booking_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booking_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_booking_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_booking_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Booked label
		booked_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booked_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_booked_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_booked_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Unavailable label
		unavailable_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_unavailable_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_unavailable_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_unavailable_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Popup Booking Label
		booking_popup_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booking_popup_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_booking_popup_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_booking_popup_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Popup Login Label
		login_popup_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_login_popup_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_login_popup_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_login_popup_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Popup Cancel Label
		cancel_popup_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_cancel_popup_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_cancel_popup_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_cancel_popup_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Popup Continue Label
		continue_popup_label : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_continue_popup_label_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_continue_popup_label_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_continue_popup_label_def, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Terms And Conditions Checkbox
		terms_checkbox : { 
			type : 		'select', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_terms_checkbox_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_terms_checkbox_descr, 
			def : 		'no', 
			required : 	false, 
			width : 	'half', 
			choises : { 
						'yes' :		cmsmasters_timetable_shortcodes.timetable_field_terms_checkbox_choice_yes, 
						'no' :		cmsmasters_timetable_shortcodes.timetable_field_terms_checkbox_choice_no 
			} 
		}, 
		// Terms And Conditions Message
		terms_message : { 
			type : 		'input', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_terms_message_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_terms_message_descr, 
			def : 		cmsmasters_timetable_shortcodes.timetable_field_terms_message_def, 
			required : 	false, 
			width : 	'half', 
			depend : 	'terms_checkbox:yes' 
		}, 
		// Booking pop-up message
		booking_popup_message : { 
			type : 		'uri_encode_editor', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booking_popup_message_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_booking_popup_message_descr + ' {event_title} {column_title} {event_start} {event_end} {event_description_1} {event_description_2} {user_name} {user_email} {tt_btn_book} {tt_btn_cancel} {tt_btn_continue}', 
			def : 		encodeURI('<h2>You are about to book event</h2><p>{event_title}</p><p>{column_title}</p><p>{event_start} - {event_end}</p><p>An initial receipt will be sent out automatically unless you decide not to do so below.</p><div>{tt_btn_book}{tt_btn_cancel}</div>'), 
			required : 	false, 
			width : 	'full' 
		}, 
		// Booking pop-up thank you message
		booking_popup_thank_you_message : { 
			type : 		'uri_encode_editor', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booking_popup_thank_you_message_title, 
			descr : 	cmsmasters_timetable_shortcodes.timetable_field_booking_popup_message_descr + ' {event_title} {column_title} {event_start} {event_end} {event_description_1} {event_description_2} {user_name} {user_email} {tt_btn_book} {tt_btn_cancel} {tt_btn_continue}', 
			def : 		encodeURI('<h2>Thank you for choosing our services!</h2><p>{event_title}</p><p>{column_title}</p><p>{event_start} - {event_end}</p><p>This is a confirmation of your booking. Your booking is now complete and a confirmation email has been sent to you.</p><div>{tt_btn_continue}</div>'), 
			required : 	false, 
			width : 	'full' 
		}, 
		// Timetable box background color
		box_bg_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_box_bg_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.box_bg_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Timetable box hover background color
		box_hover_bg_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_box_hover_bg_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.box_hover_bg_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Timetable box text color
		box_txt_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_box_txt_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.box_txt_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Timetable box hover text color
		box_hover_txt_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_box_hover_txt_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.box_hover_txt_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Timetable box hours text color
		box_hours_txt_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_box_hours_txt_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.box_hours_txt_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Timetable box hours hover text color
		box_hours_hover_txt_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_box_hours_hover_txt_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.box_hours_hover_txt_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Row 1 style background color
		row1_bg_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_row1_bg_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.row1_bg_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Row 1 style text color
		row1_txt_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_row1_txt_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.row1_txt_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Row 2 style background color
		row2_bg_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_row2_bg_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.row2_bg_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Row 2 style text color
		row2_txt_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_row2_txt_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.row2_txt_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Booking text color
		booking_text_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booking_text_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.booking_text_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Booking background color
		booking_bg_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booking_bg_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.booking_bg_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Booking hover text color
		booking_hover_text_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booking_hover_text_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.booking_hover_text_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Booking hover background color
		booking_hover_bg_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booking_hover_bg_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.booking_hover_bg_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Booked text color
		booked_text_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booked_text_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.booked_text_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Booked background color
		booked_bg_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_booked_bg_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.booked_bg_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Unavailable text color
		unavailable_text_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_unavailable_text_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.unavailable_text_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Unavailable background color
		unavailable_bg_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_unavailable_bg_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.unavailable_bg_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Available slots color
		available_slots_color : { 
			type : 		'rgba', 
			title : 	cmsmasters_timetable_shortcodes.timetable_field_available_slots_color_title, 
			descr : 	'', 
			def : 		cmsmasters_timetable_shortcodes.available_slots_color, 
			required : 	false, 
			width : 	'half' 
		}, 
		// Additional Classes
		classes : { 
			type : 		'input', 
			title : 	cmsmasters_shortcodes.classes_title, 
			descr : 	cmsmasters_shortcodes.classes_descr, 
			def : 		'', 
			required : 	false, 
			width : 	'half' 
		} 
	} 
};

