/**
 * @package 	WordPress
 * @subpackage 	Denta
 * @version		1.0.0
 * 
 * Timetable Admin Settings Toggles Scripts
 * Created by CMSMasters
 * 
 */


(function ($) { 
	/* Single Posts 'Timetable Event' Tab Fields Load*/
	if ($('#' + cmsmasters_timetable_settings.shortname + '_tt_event_hours').is(':not(:checked)')) {
		$('#' + cmsmasters_timetable_settings.shortname + '_tt_event_hours_title').parents('tr').hide();
	}
	
	/* Single Posts 'Timetable Event' Tab 'Hours' Field Change */
	$('#' + cmsmasters_timetable_settings.shortname + '_tt_event_hours').on('change', function () { 
		if ($(this).is(':checked')) {
			$('#' + cmsmasters_timetable_settings.shortname + '_tt_event_hours_title').parents('tr').show();
		} else {
			$('#' + cmsmasters_timetable_settings.shortname + '_tt_event_hours_title').parents('tr').hide();
		}
	} );
} )(jQuery);

