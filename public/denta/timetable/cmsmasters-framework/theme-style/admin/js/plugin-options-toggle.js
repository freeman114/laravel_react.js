/**
 * @package 	WordPress
 * @subpackage 	Denta
 * @version		1.0.0
 * 
 * Timetable Admin Options Toggles Scripts
 * Created by CMSMasters
 * 
 */


(function ($) { 
	$(document).ready(function () { 
		/* Timetable Hours Field Load */
		if ($('#cmsmasters_tt_event_hours').is(':checked')) {
			$('#cmsmasters_tt_event_hours_title').closest('tr').show();
		} else {
			$('#cmsmasters_tt_event_hours_title').closest('tr').hide();
		}
		
		/* Timetable Hours Field Change */
		$('#cmsmasters_tt_event_hours').on('change', function () { 
			if ($(this).is(':checked')) {
				$('#cmsmasters_tt_event_hours_title').closest('tr').show();
			} else {
				$('#cmsmasters_tt_event_hours_title').closest('tr').hide();
			}
		} );
	} );
} )(jQuery);

