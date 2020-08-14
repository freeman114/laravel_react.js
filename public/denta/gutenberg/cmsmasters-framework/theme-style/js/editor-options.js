/**
 * @package 	WordPress
 * @subpackage 	Denta
 * @version 	1.0.5
 * 
 * Editor Styles Wrapper Options Toggles Scripts
 * Created by CMSMasters
 * 
 */


(function ($) { 
	"use strict";
	
	$(document).ready(function () { 
		/* Page Layout Change */
		$('input[name="cmsmasters_layout"]').on('change', function () { 
			if ($(this).val() !== 'fullwidth') {
				$('body').addClass('enable_sidebar');
			} else {
				$('body').removeClass('enable_sidebar');
			}
		} );
	} );
} )(jQuery);

