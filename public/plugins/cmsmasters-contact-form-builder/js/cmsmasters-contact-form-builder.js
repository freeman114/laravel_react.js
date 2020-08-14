/**
 * @package 	WordPress Plugin
 * @subpackage 	CMSMasters Contact Form Builder
 * @version 	1.3.9
 * 
 * jQuery Contact Form Builder Plugin
 * Created by CMSMasters
 * 
 */


jQuery(document).ready(function () { 
	(function ($) { 
		var insaving = false, 
			loaderImageUrl = $('input[name="loader_image_url"]').val();
		
		// Save/Update Form Function
		function saveAction(saveOption, formName) { 
			$('input[name="form_name"], input[name="field_label"], input[name="opt_label"], textarea[name="composer_message"], textarea[name="composer_subject"], textarea[name="composer_success"], input[name="composer_button"]').removeAttr('style');
			
			if (saveOption === 'add') {
				var form_try_label = '', 
					offsetTop = 0;
				
				if ($('input[name="form_name"]').val().replace(/\s*/g, '') === '') {
					form_try_label = (formName) ? formName : '';
					
					alert(cmsmasters_fb.enter_form_name);
					
					$('input[name="form_name"]').css( { 
						border : '1px solid #ff0000' 
					} );
					
					offsetTop = $('input[name="form_name"]').offset().top - 50;
					
					$('html, body').animate( { 
						scrollTop : offsetTop 
					}, 'slow');
					
					$('input[name="form_name"]').focus();
					$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
					
					insaving = false;
					
					return false;
				} else if (formName) {
					form_try_label = formName;
				} else {
					form_try_label = $('input[name="form_name"]').val();
				}
				
				if ($('textarea[name="composer_message"]').val().replace(/\s*/g, '') === '') {
					alert(cmsmasters_fb.enter_mess_text);
					
					$('textarea[name="composer_message"]').css( { 
						border : '1px solid #ff0000' 
					} );
					
					offsetTop = $('textarea[name="composer_message"]').offset().top - 50;
					
					$('html, body').animate( {
						scrollTop : offsetTop 
					}, 'slow');
					
					$('textarea[name="composer_message"]').focus();
					$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
					
					insaving = false;
					
					return false;
				}
				
				if ($('textarea[name="composer_subject"]').val().replace(/\s*/g, '') === '') {
					alert(cmsmasters_fb.enter_mess_subj);
					
					$('textarea[name="composer_subject"]').css( { 
						border : '1px solid #ff0000' 
					} );
					
					offsetTop = $('textarea[name="composer_subject"]').offset().top - 50;
					
					$('html, body').animate( { 
						scrollTop : offsetTop 
					}, 'slow');
					
					$('textarea[name="composer_subject"]').focus();
					$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
					
					insaving = false;
					
					return false;
				}
				
				if ($('textarea[name="composer_success"]').val().replace(/\s*/g, '') === '') {
					alert(cmsmasters_fb.enter_success_text);
					
					$('textarea[name="composer_success"]').css( { 
						border : '1px solid #ff0000' 
					} );
					
					offsetTop = $('textarea[name="composer_success"]').offset().top - 50;
					
					$('html, body').animate( { 
						scrollTop : offsetTop 
					}, 'slow');
					
					$('textarea[name="composer_success"]').focus();
					$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
					
					insaving = false;
					
					return false;
				}
				
				if ($('input[name="composer_button"]').val().replace(/\s*/g, '') === '') {
					alert(cmsmasters_fb.enter_submit_text);
					
					$('input[name="composer_button"]').css( { 
						border : '1px solid #ff0000' 
					} );
					
					offsetTop = $('input[name="composer_button"]').offset().top - 50;
					
					$('html, body').animate( { 
						scrollTop : offsetTop 
					}, 'slow');
					
					$('input[name="composer_button"]').focus();
					$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
					
					insaving = false;
					
					return false;
				}
				
				var save_field_label = $('input[name=field_label]');
				
				for (var i = 0, ilength = save_field_label.length; i < ilength; i += 1) {
					if (save_field_label.eq(i).val().replace(/\s*/g, '') === '') {
						alert(cmsmasters_fb.enter_field_labels);
						
						save_field_label.eq(i).css( { 
							border : '1px solid #ff0000' 
						} );
						
						offsetTop = save_field_label.eq(i).offset().top - 50;
						
						$('html, body').animate( { 
							scrollTop : offsetTop 
						}, 'slow');
						
						save_field_label.eq(i).focus();
						$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
						
						insaving = false;
						
						return false;
					}
				}
				
				var save_opt_label = $('input[name="opt_label"]');
				
				for (var j = 0, jlength = save_opt_label.length; j < jlength; j += 1) {
					if (save_opt_label.eq(j).val().replace(/\s*/g, '') === '') {
						alert(cmsmasters_fb.enter_field_options);
						
						save_opt_label.eq(j).css( { 
							border : '1px solid #ff0000' 
						} );

						offsetTop = save_opt_label.eq(j).offset().top - 50;

						$('html, body').animate( { 
							scrollTop : offsetTop 
						}, 'slow');
						
						save_opt_label.eq(j).focus();
						$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
						
						insaving = false;
						
						return false;
					}
				}
				
				function addForm(tryVal) {
					var form_label = tryVal, 
						form_name = form_label.replace(/<\/?[^>]+>/gi, '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/[\s-]+/g, ' ').substr(0, 30).replace(/\s/g, '_');
					
					
					$.post(loaderImageUrl + 'inc/form-builder-operator.php', { 
						type : 'form', 
						option : 'try', 
						data : form_name 
					} ).error(function () { 
						$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
						
						alert(cmsmasters_fb.error_on_page);
						
						return false;
					} ).complete(function (data) { 
						if (data.responseText === form_name) {
							var newName = prompt(cmsmasters_fb.form_name_exists);
							
							if (newName && newName.replace(/\s*/g, '') !== '') {
								addForm(newName);
							} else {
								$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
							}
							
							insaving = false;
							
							return false;
						} else {
							var form_value = $('textarea[name="composer_message"]').val(), 
								form_descr = [ 
									$('textarea[name="composer_subject"]').val(), 
									$('textarea[name="composer_success"]').val(), 
									$('input[name="composer_button"]').val() 
								], 
								form_params = [];
							
							if ($('input[name="composer_use_captcha"]').is(':checked')) {
								form_params[0] = $('input[name="composer_use_captcha"]:checked').val();
							}
							
							if ($('input[name="composer_reset_button"]').is(':checked')) {
								form_params[1] = $('input[name="composer_reset_button"]:checked').val();
							}
							
							var savedForm = { 
									number : '0', 
									slug : form_name, 
									parent_slug : data.responseText, 
									type : 'form', 
									label : form_label, 
									value : form_value, 
									description : form_descr, 
									parameters : form_params 
								}, 
								savedFields = [];
							
							savedFields[0] = savedForm;
							
							for (var i = 0, ilength = $('#fields-list li').length; i < ilength; i += 1) {
								var field_number = $('#fields-list li:eq(' + i + ')').find('input[name="field_order"]').val(), 
									field_type = $('#fields-list li:eq(' + i + ')').find('input[name="field_type"]').val(), 
									field_label = $('#fields-list li:eq(' + i + ')').find('input[name="field_label"]').val(), 
									field_name = 'field_' + Math.random() * 1000000000000000000, 
									field_descr = $('#fields-list li:eq(' + i + ')').find('textarea[name="field_descr"]').val(), 
									min = $('#fields-list li:eq(' + i + ')').find('input[name="min_size"]').val(), 
									max = $('#fields-list li:eq(' + i + ')').find('input[name="max_size"]').val(), 
									width = $('#fields-list li:eq(' + i + ')').find('select[name="field_width"]').val(), 
									verify = $('#fields-list li:eq(' + i + ')').find('select[name="field_verify"]').val(), 
									field_value = [], 
									field_params = [];
								
								if ($('#fields-list li:eq(' + i + ')').find('.opt_cont').is('div')) {
									for (var j = 0, jlength = $('#fields-list li:eq(' + i + ') .opt_cont .opt_item').length; j < jlength; j += 1) {
										field_value[j] = $('#fields-list li:eq(' + i + ') .opt_cont .opt_item:eq(' + j + ')').find('input[name="opt_label"]').val();
									}
								}
								
								if ($('#fields-list li:eq(' + i + ')').find('input[name="field_required"]').is(':checked')) {
									field_params.push($('input[name="field_required"]:checked').val());
								}
								
								if ($('#fields-list li:eq(' + i + ')').find('input[name="field_placeholder"]').is(':checked')) {
									field_params.push($('input[name="field_placeholder"]:checked').val());
								}
								
								if (min !== '' && min !== '0' && min !== undefined) {
									field_params.push('minSize[' + min + ']');
								}
								
								if (max !== '' && max !== '0' && max !== undefined) {
									field_params.push('maxSize[' + max + ']');
								}
								
								if (verify !== '' && verify !== undefined) {
									field_params.push(verify);
								}
								
								if (width !== '' && width !== undefined) {
									field_params.push(width);
								}
								
								var savedField = { 
										number : field_number, 
										slug : field_name, 
										parent_slug : data.responseText, 
										type : field_type, 
										label : field_label, 
										value : field_value, 
										description : field_descr, 
										parameters : field_params 
									};
								
								savedFields[i + 1] = savedField;
							}
							
							$.post(loaderImageUrl + 'inc/form-builder-operator.php', { 
								type : 'fields', 
								option : 'add', 
								data : JSON.stringify(savedFields) 
							} ).error(function () { 
								$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
								
								alert(cmsmasters_fb.error_on_page);
								
								insaving = false;
								
								return false;
							} ).complete(function (data) { 
								$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('slow');
								
								if (data.responseText === 'error') {
									alert(cmsmasters_fb.form_saving_error);
					
									insaving = false;
									
									return false;
								} else {
									var newFormArray = data.responseText.split(':');
									
									
									$('select#form_choose').append('<option value="' + newFormArray[0] + '">' + newFormArray[1] + '</option>');
									
									$('html, body').animate( { 
										scrollTop : 0 
									}, 'slow');
									
									$('#settings_save').slideDown('fast').delay(5000).slideUp('slow');
					
									insaving = false;
									
									$('.rght .tabb input[name="cancel_form"]').hide();
									$('.rght .tabb input[name="save_as_form"]').hide();
									$('.rght .tabb button[name="add_form"]').show();
									$('#form_build_tab').empty();
									$('.slider .rght .tabb.bot').parent().slideUp('fast');
								}
							} );
						}
					} );
				}
				
				addForm(form_try_label);
			} else if (saveOption === 'update') {
				$('input[name="form_name"], input[name="field_label"], input[name="opt_label"], textarea[name="composer_message"], textarea[name="composer_subject"], textarea[name="composer_success"], input[name="composer_button"]').removeAttr('style');
				
				var form_try_name = $('input[name="form_name"]').attr('id'), 
					posTop = 0;
				
				if (form_try_name.replace(/\s*/g, '') === '') {
					alert(cmsmasters_fb.error_on_page);
					
					insaving = false;
					
					return false;
				}
				
				if ($('input[name="form_name"]').val().replace(/\s*/g, '') === '') {
					alert(cmsmasters_fb.enter_form_name);
					
					$('input[name="form_name"]').css( { 
						border : '1px solid #ff0000' 
					} );
					
					offsetTop = $('input[name="form_name"]').offset().top - 50;
					
					$('html, body').animate( { 
						scrollTop : offsetTop 
					}, 'slow');
					
					$('input[name="form_name"]').focus();
					$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
					
					insaving = false;
					
					return false;
				}
				
				if ($('textarea[name="composer_message"]').val().replace(/\s*/g, '') === '') {
					alert(cmsmasters_fb.enter_mess_text);
					
					$('textarea[name="composer_message"]').css( { 
						border : '1px solid #ff0000' 
					} );
					
					posTop = $('textarea[name="composer_message"]').offset().top - 50;
					
					$('html, body').animate( { 
						scrollTop : posTop 
					}, 'slow');
					
					$('textarea[name="composer_message"]').focus();
					$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
					
					insaving = false;
					
					return false;
				}
				
				if ($('textarea[name="composer_subject"]').val().replace(/\s*/g, '') === '') {
					alert(cmsmasters_fb.enter_mess_subj);
					
					$('textarea[name="composer_subject"]').css( { 
						border : '1px solid #ff0000' 
					} );
					
					posTop = $('textarea[name="composer_subject"]').offset().top - 50;
					
					$('html, body').animate( { 
						scrollTop : posTop 
					}, 'slow');
					
					$('textarea[name="composer_subject"]').focus();
					$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
					
					insaving = false;
					
					return false;
				}
				
				if ($('textarea[name="composer_success"]').val().replace(/\s*/g, '') === '') {
					alert(cmsmasters_fb.enter_success_text);
					
					$('textarea[name="composer_success"]').css( { 
						border : '1px solid #ff0000' 
					} );
					
					posTop = $('textarea[name="composer_success"]').offset().top - 50;
					
					$('html, body').animate( { 
						scrollTop : posTop 
					}, 'slow');
					
					$('textarea[name="composer_success"]').focus();
					$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
					
					insaving = false;
					
					return false;
				}
				
				if ($('input[name="composer_button"]').val().replace(/\s*/g, '') === '') {
					alert(cmsmasters_fb.enter_submit_text);
					
					$('input[name="composer_button"]').css( { 
						border : '1px solid #ff0000' 
					} );
					
					posTop = $('input[name="composer_button"]').offset().top - 50;
					
					$('html, body').animate( { 
						scrollTop : posTop 
					}, 'slow');
					
					$('input[name="composer_button"]').focus();
					$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
					
					insaving = false;
					
					return false;
				}
				
				var field_label = $('input[name="field_label"]');
				
				for (var k = 0, klength = field_label.length; k < klength; k += 1) {
					if (field_label.eq(k).val().replace(/\s*/g, '') === '') {
						alert(cmsmasters_fb.enter_field_labels);
						
						field_label.eq(k).css( { 
							border : '1px solid #ff0000' 
						} );
						
						posTop = field_label.eq(k).offset().top - 50;
						
						$('html, body').animate( { 
							scrollTop : posTop 
						}, 'slow');
						
						field_label.eq(k).focus();
						$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
						
						insaving = false;
						
						return false;
					}
				}
				
				var opt_label = $('input[name="opt_label"]');
				
				for (var l = 0, llength = opt_label.length; l < llength; l += 1) {
					if (opt_label.eq(l).val().replace(/\s*/g, '') === '') {
						alert(cmsmasters_fb.enter_field_options);
						
						opt_label.eq(l).css( { 
							border : '1px solid #ff0000' 
						} );
						
						posTop = opt_label.eq(l).offset().top - 50;
						
						$('html, body').animate( { 
							scrollTop : posTop 
						}, 'slow');
						
						opt_label.eq(l).focus();
						$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
						
						insaving = false;
						
						return false;
					}
				}
				
				function updateForm(tryVal) {
					var form_label = $('input[name="form_name"]').val(), 
						form_name = tryVal;
					
					$.post(loaderImageUrl + 'inc/form-builder-operator.php', { 
						type : 'form', 
						option : 'try', 
						data : form_name 
					} ).error(function () { 
						$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
						
						alert(cmsmasters_fb.error_on_page);
						
						insaving = false;
						
						return false;
					} ).complete(function (data) { 
						if (data.responseText !== form_name) {
							var ask = confirm(cmsmasters_fb.save_form_as + ' "' + form_label + '"?');
							
							if (ask && form_label.replace(/\s*/g, '') !== '') {
								$('input[name="form_option"]').val('add');
								
								saveAction('add');
							} else {
								$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
								
								insaving = false;
							}
							
							return false;
						} else {
							var form_id = $('input[name="form_id"]').val(), 
								form_value = $('textarea[name="composer_message"]').val(), 
								form_descr = [ 
									$('textarea[name="composer_subject"]').val(), 
									$('textarea[name="composer_success"]').val(), 
									$('input[name="composer_button"]').val() 
								], 
								form_params = [];
							
							if ($('input[name="composer_use_captcha"]').is(':checked')) {
								form_params[0] = $('input[name="composer_use_captcha"]:checked').val();
							}
							
							if ($('input[name="composer_reset_button"]').is(':checked')) {
								form_params[1] = $('input[name="composer_reset_button"]:checked').val();
							}
							
							var savedForm = { 
									id : form_id, 
									number : '0', 
									slug : form_name, 
									parent_slug : data.responseText, 
									type : 'form', 
									label : form_label, 
									value : form_value, 
									description : form_descr, 
									parameters : form_params 
								}, 
								savedFields = [];
							
							savedFields[0] = savedForm;
							
							for (var i = 0, ilength = $('#fields-list li').length; i < ilength; i += 1) {
								var field_id = $('#fields-list li:eq(' + i + ')').find('input[name="field_id"]').val(), 
									field_number = $('#fields-list li:eq(' + i + ')').find('input[name="field_order"]').val(), 
									field_type = $('#fields-list li:eq(' + i + ')').find('input[name="field_type"]').val(), 
									field_label = $('#fields-list li:eq(' + i + ')').find('input[name="field_label"]').val(), 
									field_name = $('#fields-list li:eq(' + i + ')').find('input[name="field_label"]').attr('id'), 
									field_descr = $('#fields-list li:eq(' + i + ')').find('textarea[name="field_descr"]').val(), 
									min = $('#fields-list li:eq(' + i + ')').find('input[name="min_size"]').val(), 
									max = $('#fields-list li:eq(' + i + ')').find('input[name="max_size"]').val(), 
									width = $('#fields-list li:eq(' + i + ')').find('select[name="field_width"]').val(), 
									row = $('#fields-list li:eq(' + i + ')').find('input[name="field_row"]'), 
									verify = $('#fields-list li:eq(' + i + ')').find('select[name="field_verify"]').val(), 
									field_value = [], 
									field_params = [];
								
								if (field_name === '' || field_name === '_') {
									field_name = 'field_' + Math.random() * 1000000000000000000;
								}
								
								if ($('#fields-list li:eq(' + i + ')').find('.opt_cont').is('div')) {
									for (var j = 0, jlength = $('#fields-list li:eq(' + i + ') .opt_cont .opt_item').length; j < jlength; j += 1) {
										field_value[j] = $('#fields-list li:eq(' + i + ') .opt_cont .opt_item:eq(' + j + ')').find('input[name="opt_label"]').val();
									}
								}
								
								if ($('#fields-list li:eq(' + i + ')').find('input[name="field_required"]').is(':checked')) {
									field_params.push($('input[name="field_required"]:checked').val());
								}
								
								if ($('#fields-list li:eq(' + i + ')').find('input[name="field_placeholder"]').is(':checked')) {
									field_params.push($('input[name="field_placeholder"]:checked').val());
								}
								
								if (min !== '' && min !== '0' && min !== undefined) {
									field_params.push('minSize[' + min + ']');
								}
								
								if (max !== '' && max !== '0' && max !== undefined) {
									field_params.push('maxSize[' + max + ']');
								}
								
								if (verify !== '' && verify !== undefined) {
									field_params.push(verify);
								}
								
								if (width !== '' && width !== undefined) {
									field_params.push(width);
								}
								
								if (row.is(':checked')) {
									field_params.push(row.val());
								}
								
								var savedField = { 
										id : field_id, 
										number : field_number, 
										slug : field_name, 
										parent_slug : data.responseText, 
										type : field_type, 
										label : field_label, 
										value : field_value, 
										description : field_descr, 
										parameters : field_params 
									};
								
								savedFields[i + 1] = savedField;
							}
							
							$.post(loaderImageUrl + 'inc/form-builder-operator.php', { 
								type : 'fields', 
								option : 'update', 
								data : JSON.stringify(savedFields) 
							} ).error(function () { 
								$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
								
								alert(cmsmasters_fb.error_on_page);
								
								insaving = false;
								
								return false;
							} ).complete(function (data) { 
								$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('slow');
								
								if (data.responseText === 'error') {
									alert(cmsmasters_fb.form_saving_error);
									
									insaving = false;
									
									return false;
								} else {
									var newFormArray = data.responseText.split(':');
									
									$('select#form_choose').find('option[value="' + newFormArray[0] + '"]').text(newFormArray[1]);
									
									$('html, body').animate( { 
										scrollTop : 0 
									}, 'slow');
									
									$('#settings_save').slideDown('fast').delay(5000).slideUp('slow');
									
									insaving = false;
									
									$('.rght .tabb input[name="cancel_form"]').hide();
									$('.rght .tabb input[name="save_as_form"]').hide();
									$('.rght .tabb button[name="add_form"]').show();
									$('#form_build_tab').empty();
									$('.slider .rght .tabb.bot').parent().slideUp('fast');
								}
							} );
						}
					} );
				}
				
				updateForm(form_try_name);
			}
		}
		
		// Choose Field Type
		function fieldChoose(type, parameters) { 
			var field_html = '', 
				id = (parameters) ? parameters.id : '', 
				number = (parameters) ? parameters.number : $('#fields-list li').length + 1, 
				name = (parameters) ? parameters.slug : '', 
				par_sl = (parameters) ? parameters.parent_slug : $('input[name="form_id"]').val(), 
				ps_n = (parameters) ? id : par_sl + '_' + Math.random() * 1000000000000000000, 
				label = (parameters) ? parameters.label.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : '', 
				value = (parameters) ? parameters.value : '', 
				descr = (parameters && parameters.description !== false) ? parameters.description : '', 
				params = (parameters && parameters.parameters !== false) ? parameters.parameters : '', 
				minSize = '', 
				maxSize = '', 
				required = '', 
				placeholder = '', 
				widthFull = '', 
				widthHalf = '', 
				widthThird = '', 
				row = '', 
				customEmail = '', 
				customUrl = '', 
				customNumber = '', 
				customOnlyNumberSp = '', 
				customOnlyLetterSp = '';
			
			if (parameters) {
				required = ($.inArray('required', params) !== -1) ? ' checked="checked"' : '';
				placeholder = ($.inArray('placeholder', params) !== -1) ? ' checked="checked"' : '';
				widthFull = ($.inArray('width[one_first]', params) !== -1) ? ' selected="selected"' : '';
				widthHalf = ($.inArray('width[one_half]', params) !== -1) ? ' selected="selected"' : '';
				widthThird = ($.inArray('width[one_third]', params) !== -1) ? ' selected="selected"' : '';
				row = ($.inArray('row', params) !== -1) ? ' checked="checked"' : '';
				customEmail = ($.inArray('custom[email]', params) !== -1) ? ' selected="selected"' : '';
				customUrl = ($.inArray('custom[url]', params) !== -1) ? ' selected="selected"' : '';
				customNumber = ($.inArray('custom[number]', params) !== -1) ? ' selected="selected"' : '';
				customOnlyNumberSp = ($.inArray('custom[onlyNumberSp]', params) !== -1) ? ' selected="selected"' : '';
				customOnlyLetterSp = ($.inArray('custom[onlyLetterSp]', params) !== -1) ? ' selected="selected"' : '';
				
				for (var n = 0, nlength = params.length; n < nlength; n += 1) {
					if (params[n] !== null && $.inArray('minSize', params[n].split('[')) !== -1) {
						minSize = params[n].replace(']', '').replace('minSize[', '');
					}
				}
				
				for (var x = 0, xlength = params.length; x < xlength; x += 1) {
					if (params[x] !== null && $.inArray('maxSize', params[x].split('[')) !== -1) {
						maxSize = params[x].replace(']', '').replace('maxSize[', '');
					}
				}
			}
			
			switch (type) {
			case 'text' :
				field_html += '<li>' + 
					'<table class="form-table cmsmasters-options">' + 
						'<tr>' + 
							'<td class="sep">' + 
								'<button class="button delete small_but" type="button" name="delete_field"><span class="dashicons-dismiss"></span></button>' + 
								'<input type="hidden" name="field_id" value="' + id + '" />' + 
								'<input type="hidden" name="field_order" value="' + number + '" />' + 
								'<input type="hidden" name="field_type" value="text" />' + 
								'<div class="fl_field">' + 
									'<label for="' + ((name !== '') ? name : 'name_' + ps_n) + '"><strong>' + cmsmasters_fb.cmsmasters_text + ' ' + cmsmasters_fb.cmsmasters_field_label + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<input size="31" name="field_label" type="text" value="' + label + '" id="' + ((name !== '') ? name : 'name_' + ps_n) + '" />' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_required_' + ps_n + '">' + 
											'<input type="checkbox" name="field_required" id="field_required_' + ps_n + '" value="required"' + required + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_required + '</span>' + 
										'</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_row_' + ps_n + '">' + 
											'<input type="checkbox" name="field_row" id="field_row_' + ps_n + '" value="row"' + row + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_row + '</span>' + 
										'</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_placeholder_' + ps_n + '">' + 
											'<input type="checkbox" name="field_placeholder" id="field_placeholder_' + ps_n + '" value="placeholder"' + placeholder + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_placeholder + '</span>' + 
										'</label>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="descr_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_text + ' ' + cmsmasters_fb.cmsmasters_field_descr + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<textarea name="field_descr" cols="38" rows="4" id="descr_' + ps_n + '">' + descr + '</textarea>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="field_verify_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_text + ' ' + cmsmasters_fb.cmsmasters_field_opts + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="td_spinner">' + 
										'<div class="fl">' + 
											'<input size="5" maxlength="5" name="min_size" id="min_size_' + ps_n + '" type="number" min="0" step="1" value="' + minSize + '" class="spinner" />' + 
										'</div>' + 
										'<label for="min_size_' + ps_n + '">&nbsp; ' + cmsmasters_fb.cmsmasters_min_text_size + '</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="td_spinner">' + 
										'<div class="fl">' + 
											'<input size="5" maxlength="5" name="max_size" id="max_size_' + ps_n + '" type="number" min="0" step="1" value="' + maxSize + '" class="spinner" />' + 
										'</div>' + 
										'<label for="max_size_' + ps_n + '">&nbsp; ' + cmsmasters_fb.cmsmasters_max_text_size + '</label>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<select name="field_width" id="field_width_' + ps_n + '" style="margin-top:38px;">' + 
										'<option value="">' + cmsmasters_fb.cmsmasters_choose_width + '</option>' + 
										'<option value="width[one_first]"' + widthFull + '>1/1</option>' + 
										'<option value="width[one_half]"' + widthHalf + '>1/2</option>' + 
										'<option value="width[one_third]"' + widthThird + '>1/3</option>' + 
									'</select>' + 
									'<div class="cl"><br /></div>' + 
									'<select name="field_verify" id="field_verify_' + ps_n + '">' + 
										'<option value="">' + cmsmasters_fb.cmsmasters_choose_verif + '</option>' + 
										'<option value="custom[email]"' + customEmail + '>' + cmsmasters_fb.cmsmasters_email + '</option>' + 
										'<option value="custom[url]"' + customUrl + '>' + cmsmasters_fb.cmsmasters_url + '</option>' + 
										'<option value="custom[number]"' + customNumber + '>' + cmsmasters_fb.cmsmasters_number + '</option>' + 
										'<option value="custom[onlyNumberSp]"' + customOnlyNumberSp + '>' + cmsmasters_fb.cmsmasters_only_nb_sp + '</option>' + 
										'<option value="custom[onlyLetterSp]"' + customOnlyLetterSp + '>' + cmsmasters_fb.cmsmasters_only_lt_sp + '</option>' + 
									'</select>' + 
								'</div>' + 
								'<span class="sortableMove dashicons-sort"></span>' + 
							'</td>' + 
						'</tr>' + 
					'</table>' + 
				'</li>';
				
				break;
			case 'email' :
				field_html += '<li>' + 
					'<table class="form-table cmsmasters-options">' + 
						'<tr>' + 
							'<td class="sep">' + 
								'<button class="button delete small_but" type="button" name="delete_field"><span class="dashicons-dismiss"></span></button>' + 
								'<input type="hidden" name="field_id" value="' + id + '" />' + 
								'<input type="hidden" name="field_order" value="' + number + '" />' + 
								'<input type="hidden" name="field_type" value="email" />' + 
								'<div class="fl_field">' + 
									'<label for="' + ((name !== '') ? name : 'name_' + ps_n) + '"><strong>' + cmsmasters_fb.cmsmasters_email + ' ' + cmsmasters_fb.cmsmasters_field_label + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<input size="31" name="field_label" type="text" value="' + label + '" id="' + ((name !== '') ? name : 'name_' + ps_n) + '" />' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_required_' + ps_n + '">' + 
											'<input type="checkbox" name="field_required" id="field_required_' + ps_n + '" value="required"' + required + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_required + '</span>' + 
										'</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_row_' + ps_n + '">' + 
											'<input type="checkbox" name="field_row" id="field_row_' + ps_n + '" value="row"' + row + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_row + '</span>' + 
										'</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_placeholder_' + ps_n + '">' + 
											'<input type="checkbox" name="field_placeholder" id="field_placeholder_' + ps_n + '" value="placeholder"' + placeholder + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_placeholder + '</span>' + 
										'</label>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="descr_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_email + ' ' + cmsmasters_fb.cmsmasters_field_descr + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<textarea name="field_descr" cols="38" rows="4" id="descr_' + ps_n + '">' + descr + '</textarea>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="field_verify_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_email + ' ' + cmsmasters_fb.cmsmasters_field_opts + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<select name="field_width" id="field_width_' + ps_n + '">' + 
										'<option value="">' + cmsmasters_fb.cmsmasters_choose_width + '</option>' + 
										'<option value="width[one_first]"' + widthFull + '>1/1</option>' + 
										'<option value="width[one_half]"' + widthHalf + '>1/2</option>' + 
										'<option value="width[one_third]"' + widthThird + '>1/3</option>' + 
									'</select>' + 
									'<div class="cl"><br /></div>' + 
									'<select name="field_verify" id="field_verify_' + ps_n + '">' + 
										'<option value="">' + cmsmasters_fb.cmsmasters_choose_verif + '</option>' + 
										'<option value="custom[email]"' + customEmail + '>' + cmsmasters_fb.cmsmasters_email + '</option>' + 
									'</select>' + 
								'</div>' + 
								'<span class="sortableMove dashicons-sort"></span>' + 
							'</td>' + 
						'</tr>' + 
					'</table>' + 
				'</li>';
				
				break;
			case 'textarea' :
				field_html += '<li>' + 
					'<table class="form-table cmsmasters-options">' + 
						'<tr>' + 
							'<td class="sep">' + 
								'<button class="button delete small_but" type="button" name="delete_field"><span class="dashicons-dismiss"></span></button>' + 
								'<input type="hidden" name="field_id" value="' + id + '" />' + 
								'<input type="hidden" name="field_order" value="' + number + '" />' + 
								'<input type="hidden" name="field_type" value="textarea" />' + 
								'<div class="fl_field">' + 
									'<label for="' + ((name !== '') ? name : 'name_' + ps_n) + '"><strong>' + cmsmasters_fb.cmsmasters_text_area + ' ' + cmsmasters_fb.cmsmasters_field_label + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<input size="31" name="field_label" type="text" value="' + label + '" id="' + ((name !== '') ? name : 'name_' + ps_n) + '" />' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_required_' + ps_n + '">' + 
											'<input type="checkbox" name="field_required" id="field_required_' + ps_n + '" value="required"' + required + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_required + '</span>' + 
										'</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_row_' + ps_n + '">' + 
											'<input type="checkbox" name="field_row" id="field_row_' + ps_n + '" value="row"' + row + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_row + '</span>' + 
										'</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_placeholder_' + ps_n + '">' + 
											'<input type="checkbox" name="field_placeholder" id="field_placeholder_' + ps_n + '" value="placeholder"' + placeholder + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_placeholder + '</span>' + 
										'</label>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="descr_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_text_area + ' ' + cmsmasters_fb.cmsmasters_field_descr + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<textarea name="field_descr" cols="38" rows="4" id="descr_' + ps_n + '">' + descr + '</textarea>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label><strong>' + cmsmasters_fb.cmsmasters_text_area + ' ' + cmsmasters_fb.cmsmasters_field_opts + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="td_spinner">' + 
										'<div class="fl">' + 
											'<input size="5" maxlength="5" name="min_size" id="min_size_' + ps_n + '" type="number" min="0" step="1" value="' + minSize + '" class="spinner" />' + 
										'</div>' + 
										'<label for="min_size_' + ps_n + '">&nbsp; ' + cmsmasters_fb.cmsmasters_min_text_size + '</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="td_spinner">' + 
										'<div class="fl">' + 
											'<input size="5" maxlength="5" name="max_size" id="max_size_' + ps_n + '" type="number" min="0" step="1" value="' + maxSize + '" class="spinner" />' + 
										'</div>' + 
										'<label for="max_size_' + ps_n + '">&nbsp; ' + cmsmasters_fb.cmsmasters_max_text_size + '</label>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<select name="field_width" id="field_width_' + ps_n + '" style="margin-top:38px;">' + 
										'<option value="">' + cmsmasters_fb.cmsmasters_choose_width + '</option>' + 
										'<option value="width[one_first]"' + widthFull + '>1/1</option>' + 
										'<option value="width[one_half]"' + widthHalf + '>1/2</option>' + 
										'<option value="width[one_third]"' + widthThird + '>1/3</option>' + 
									'</select>' + 
								'</div>' + 
								'<span class="sortableMove dashicons-sort"></span>' + 
							'</td>' + 
						'</tr>' + 
					'</table>' + 
				'</li>';
				
				break;
			case 'dropdown' :
				field_html += '<li>' + 
					'<table class="form-table cmsmasters-options">' + 
						'<tr>' + 
							'<td class="sep">' + 
								'<button class="button delete small_but" type="button" name="delete_field"><span class="dashicons-dismiss"></span></button>' + 
								'<input type="hidden" name="field_id" value="' + id + '" />' + 
								'<input type="hidden" name="field_order" value="' + number + '" />' + 
								'<input type="hidden" name="field_type" value="dropdown" />' + 
								'<div class="fl_field">' + 
									'<label for="' + ((name !== '') ? name : 'name_' + ps_n) + '"><strong>' + cmsmasters_fb.cmsmasters_dropdown + ' ' + cmsmasters_fb.cmsmasters_field_label + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<input size="31" name="field_label" type="text" value="' + label + '" id="' + ((name !== '') ? name : 'name_' + ps_n) + '" />' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_required_' + ps_n + '">' + 
											'<input type="checkbox" name="field_required" id="field_required_' + ps_n + '" value="required"' + required + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_required + '</span>' + 
										'</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_row_' + ps_n + '">' + 
											'<input type="checkbox" name="field_row" id="field_row_' + ps_n + '" value="row"' + row + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_row + '</span>' + 
										'</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_placeholder_' + ps_n + '">' + 
											'<input type="checkbox" name="field_placeholder" id="field_placeholder_' + ps_n + '" value="placeholder"' + placeholder + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_placeholder + '</span>' + 
										'</label>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="descr_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_dropdown + ' ' + cmsmasters_fb.cmsmasters_field_descr + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<textarea name="field_descr" cols="38" rows="4" id="descr_' + ps_n + '">' + descr + '</textarea>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label><strong>' + cmsmasters_fb.cmsmasters_dropdown + ' ' + cmsmasters_fb.cmsmasters_items + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="opt_cont">';
									
									if (value.length > 1) {
										for (var v = 0, vlength = value.length; v < vlength; v += 1) {
											field_html += '<div class="opt_item">' + 
												'<input size="31" name="opt_label" type="text" value="' + value[v] + '" class="fl" />' + 
												'<button class="button delete small_but" type="button" name="delete_opt"><span class="dashicons-no"></span></button>' + 
												'<div class="cl"></div>' + 
											'</div>';
										}
									} else {
										field_html += '<div class="opt_item">' + 
											'<input size="31" name="opt_label" type="text" value="" class="fl" />' + 
											'<button class="button delete small_but" type="button" name="delete_opt"><span class="dashicons-no"></span></button>' + 
											'<div class="cl"></div>' + 
										'</div>' + 
										'<div class="opt_item">' + 
											'<input size="31" name="opt_label" type="text" value="" class="fl" />' + 
											'<button class="button delete small_but" type="button" name="delete_opt"><span class="dashicons-no"></span></button>' + 
											'<div class="cl"></div>' + 
										'</div>';
									}
									
									field_html += '<button class="button add small_but" type="button" name="add_opt"><span class="dashicons-plus"></span></button>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="field_verify_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_dropdown + ' ' + cmsmasters_fb.cmsmasters_field_opts + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<select name="field_width" id="field_width_' + ps_n + '">' + 
										'<option value="">' + cmsmasters_fb.cmsmasters_choose_width + '</option>' + 
										'<option value="width[one_first]"' + widthFull + '>1/1</option>' + 
										'<option value="width[one_half]"' + widthHalf + '>1/2</option>' + 
										'<option value="width[one_third]"' + widthThird + '>1/3</option>' + 
									'</select>' + 
								'</div>' + 
								'<span class="sortableMove dashicons-sort"></span>' + 
							'</td>' + 
						'</tr>' + 
					'</table>' + 
				'</li>';
				
				break;
			case 'radiobutton' :
				field_html += '<li>' + 
					'<table class="form-table cmsmasters-options">' + 
						'<tr>' + 
							'<td class="sep">' + 
								'<button class="button delete small_but" type="button" name="delete_field"><span class="dashicons-dismiss"></span></button>' + 
								'<input type="hidden" name="field_id" value="' + id + '" />' + 
								'<input type="hidden" name="field_order" value="' + number + '" />' + 
								'<input type="hidden" name="field_type" value="radiobutton" />' + 
								'<div class="fl_field">' + 
									'<label for="' + ((name !== '') ? name : 'name_' + ps_n) + '"><strong>' + cmsmasters_fb.cmsmasters_radiobuttons + ' ' + cmsmasters_fb.cmsmasters_field_label + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<input size="31" name="field_label" type="text" value="' + label + '" id="' + ((name !== '') ? name : 'name_' + ps_n) + '" />' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_required_' + ps_n + '">' + 
											'<input type="checkbox" name="field_required" id="field_required_' + ps_n + '" value="required"' + required + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_required + '</span>' + 
										'</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_row_' + ps_n + '">' + 
											'<input type="checkbox" name="field_row" id="field_row_' + ps_n + '" value="row"' + row + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_row + '</span>' + 
										'</label>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="descr_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_radiobuttons + ' ' + cmsmasters_fb.cmsmasters_field_descr + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<textarea name="field_descr" cols="38" rows="4" id="descr_' + ps_n + '">' + descr + '</textarea>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label><strong>' + cmsmasters_fb.cmsmasters_radiobuttons + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="opt_cont">';
									
									if (value.length > 1) {
										for (var w = 0, wlength = value.length; w < wlength; w += 1) {
											field_html += '<div class="opt_item">' + 
												'<input size="31" name="opt_label" type="text" value="' + value[w] + '" class="fl" />' + 
												'<button class="button delete small_but" type="button" name="delete_opt"><span class="dashicons-no"></span></button>' + 
												'<div class="cl"></div>' + 
											'</div>';
										}
									} else {
										field_html += '<div class="opt_item">' + 
											'<input size="31" name="opt_label" type="text" value="" class="fl" />' + 
											'<button class="button delete small_but" type="button" name="delete_opt"><span class="dashicons-no"></span></button>' + 
											'<div class="cl"></div>' + 
										'</div>' + 
										'<div class="opt_item">' + 
											'<input size="31" name="opt_label" type="text" value="" class="fl" />' + 
											'<button class="button delete small_but" type="button" name="delete_opt"><span class="dashicons-no"></span></button>' + 
											'<div class="cl"></div>' + 
										'</div>';
									}
									
									field_html += '<button class="button add small_but" type="button" name="add_opt"><span class="dashicons-plus"></span></button>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="field_verify_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_radiobuttons + ' ' + cmsmasters_fb.cmsmasters_field_opts + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<select name="field_width" id="field_width_' + ps_n + '">' + 
										'<option value="">' + cmsmasters_fb.cmsmasters_choose_width + '</option>' + 
										'<option value="width[one_first]"' + widthFull + '>1/1</option>' + 
										'<option value="width[one_half]"' + widthHalf + '>1/2</option>' + 
										'<option value="width[one_third]"' + widthThird + '>1/3</option>' + 
									'</select>' + 
								'</div>' + 
								'<span class="sortableMove dashicons-sort"></span>' + 
							'</td>' + 
						'</tr>' + 
					'</table>' + 
				'</li>';
				
				break;
			case 'checkbox' :
				field_html += '<li>' + 
					'<table class="form-table cmsmasters-options">' + 
						'<tr>' + 
							'<td class="sep">' + 
								'<button class="button delete small_but" type="button" name="delete_field"><span class="dashicons-dismiss"></span></button>' + 
								'<input type="hidden" name="field_id" value="' + id + '" />' + 
								'<input type="hidden" name="field_order" value="' + number + '" /> '+ 
								'<input type="hidden" name="field_type" value="checkbox" />' + 
								'<div class="fl_field">' + 
									'<label for="' + ((name !== '') ? name : 'name_' + ps_n) + '"><strong>' + cmsmasters_fb.cmsmasters_checkbox + ' ' + cmsmasters_fb.cmsmasters_field_label + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<input size="31" name="field_label" type="text" value="' + label + '" id="' + ((name !== '') ? name : 'name_' + ps_n) + '" />' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_required_' + ps_n + '">' + 
											'<input type="checkbox" name="field_required" id="field_required_' + ps_n + '" value="required"' + required + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_required + '</span>' + 
										'</label>' + 
									'</div>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_row_' + ps_n + '">' + 
											'<input type="checkbox" name="field_row" id="field_row_' + ps_n + '" value="row"' + row + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_row + '</span>' + 
										'</label>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="descr_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_checkbox + ' ' + cmsmasters_fb.cmsmasters_field_descr + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<textarea name="field_descr" cols="38" rows="4" id="descr_' + ps_n + '">' + descr + '</textarea>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="ch_label_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_checkbox + ' ' + cmsmasters_fb.cmsmasters_label + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="opt_cont">' + 
										'<div class="opt_item">' + 
											'<input size="31" name="opt_label" type="text" value="' + value + '" id="ch_label_' + ps_n + '" />' + 
										'</div>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="field_verify_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_checkbox + ' ' + cmsmasters_fb.cmsmasters_field_opts + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<select name="field_width" id="field_width_' + ps_n + '">' + 
										'<option value="">' + cmsmasters_fb.cmsmasters_choose_width + '</option>' + 
										'<option value="width[one_first]"' + widthFull + '>1/1</option>' + 
										'<option value="width[one_half]"' + widthHalf + '>1/2</option>' + 
										'<option value="width[one_third]"' + widthThird + '>1/3</option>' + 
									'</select>' + 
								'</div>' + 
								'<span class="sortableMove dashicons-sort"></span>' + 
							'</td>' + 
						'</tr>' + 
					'</table>' + 
				'</li>';
				
				break;
			case 'checkboxes' :
				field_html += '<li>' + 
					'<table class="form-table cmsmasters-options">' + 
						'<tr>' + 
							'<td class="sep">' + 
								'<button class="button delete small_but" type="button" name="delete_field"><span class="dashicons-dismiss"></span></button>' + 
								'<input type="hidden" name="field_id" value="' + id + '" />' + 
								'<input type="hidden" name="field_order" value="' + number + '" />' + 
								'<input type="hidden" name="field_type" value="checkboxes" />' + 
								'<div class="fl_field">' + 
									'<label for="' + ((name !== '') ? name : 'name_' + ps_n) + '"><strong>' + cmsmasters_fb.cmsmasters_checkboxes + ' ' + cmsmasters_fb.cmsmasters_field_label + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<input size="31" name="field_label" type="text" value="' + label + '" id="' + ((name !== '') ? name : 'name_' + ps_n) + '" />' + 
									'<div class="cl"><br /></div>' + 
									'<div class="check_parent">' + 
										'<label for="field_row_' + ps_n + '">' + 
											'<input type="checkbox" name="field_row" id="field_row_' + ps_n + '" value="row"' + row + ' /> ' + 
											'<span class="labelon">' + cmsmasters_fb.cmsmasters_row + '</span>' + 
										'</label>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="descr_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_checkboxes + ' ' + cmsmasters_fb.cmsmasters_field_descr + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<textarea name="field_descr" cols="38" rows="4" id="descr_' + ps_n + '">' + descr + '</textarea>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label><strong>' + cmsmasters_fb.cmsmasters_checkboxes + ' <span style="color:#ff0000;">*</span></strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<div class="opt_cont">';
									
									if (value.length > 1) {
										for (var y = 0, ylength = value.length; y < ylength; y += 1) {
											field_html += '<div class="opt_item">' + 
												'<input size="31" name="opt_label" type="text" value="' + value[y] + '" class="fl" />' + 
												'<button class="button delete small_but" type="button" name="delete_opt"><span class="dashicons-no"></span></button>' + 
												'<div class="cl"></div>' + 
											'</div>';
										}
									} else {
										field_html += '<div class="opt_item">' + 
											'<input size="31" name="opt_label" type="text" value="" class="fl" />' + 
											'<button class="button delete small_but" type="button" name="delete_opt"><span class="dashicons-no"></span></button>' + 
											'<div class="cl"></div>' + 
										'</div>' + 
										'<div class="opt_item">' + 
											'<input size="31" name="opt_label" type="text" value="" class="fl" />' + 
											'<button class="button delete small_but" type="button" name="delete_opt"><span class="dashicons-no"></span></button>' + 
											'<div class="cl"></div>' + 
										'</div>';
									}
									
									field_html += '<button class="button add small_but" type="button" name="add_opt"><span class="dashicons-plus"></span></button>' + 
									'</div>' + 
								'</div>' + 
								'<div class="fl_field">' + 
									'<label for="field_verify_' + ps_n + '"><strong>' + cmsmasters_fb.cmsmasters_checkboxes + ' ' + cmsmasters_fb.cmsmasters_field_opts + '</strong></label>' + 
									'<div class="cl"><br /></div>' + 
									'<select name="field_width" id="field_width_' + ps_n + '">' + 
										'<option value="">' + cmsmasters_fb.cmsmasters_choose_width + '</option>' + 
										'<option value="width[one_first]"' + widthFull + '>1/1</option>' + 
										'<option value="width[one_half]"' + widthHalf + '>1/2</option>' + 
										'<option value="width[one_third]"' + widthThird + '>1/3</option>' + 
									'</select>' + 
								'</div>' + 
								'<span class="sortableMove dashicons-sort"></span>' + 
							'</td>' + 
						'</tr>' + 
					'</table>' + 
				'</li>';
				
				break;
			}
			
			return field_html;
		}
		
		// Add New Form
		$('.rght .tabb button[name="add_form"]').click(function () { 
			if (insaving) { 
				return false;
			}
			
			insaving = true;
			
			$(this).next().next().addClass('active_submit_loader').show();
			
			var formName = prompt(cmsmasters_fb.new_form_name);
			
			if (!formName || formName.replace(/\s*/g, '') === '') {
				alert(cmsmasters_fb.form_name_invalid);
				
				insaving = false;
				
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
				
				return false;
			} else {
				var form_name = formName.toLowerCase().replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '');
				
				if (form_name == '' || form_name == '_') { 
					form_name = 'form_' + Math.random() * 1000000000000000000;
				}
				
				$(this).hide();
				$('.rght .tabb input[name="cancel_form"]').show();
				$('#form_build_tab').empty();
				
				var formHTML = '';
				
				formHTML += '<div>' + 
					'<table class="form-table cmsmasters-options">' + 
						'<tr>' + 
							'<td>' + 
								'<input type="hidden" name="form_option" value="add" />' + 
								'<input type="hidden" name="form_id" value="' + form_name + '" />' + 
								'<h3 class="fb_h2">' + cmsmasters_fb.cmsmasters_form_name + ' <span style="color:#ff0000;">*</span></h3>' + 
								'<div>' + 
									'<input class="button-primary top_save" type="button" name="save" value="' + cmsmasters_fb.cmsmasters_save_form + '" />' + 
									'<div class="fr submit_loader spinner"></div>' + 
								'</div>' + 
								'<input size="31" maxlength="100" name="form_name" id="' + form_name + '" type="text" value="' + formName + '" class="fl" />' + 
							'</td>' + 
						'</tr>' + 
						'<tr>' + 
							'<td class="sortable_fields">' + 
								'<p class="fr"><strong>' + cmsmasters_fb.cmsmasters_drag_and_drop + '</strong></p>' + 
								'<h3>' + cmsmasters_fb.add_remove_edit + '</h3>' + 
							'</td>' + 
						'</tr>' + 
					'</table>' + 
					'<ul id="fields-list">' + 
					'</ul>' + 
					'<table class="form-table cmsmasters-options">' + 
						'<tr>' + 
							'<td class="add_fields">' + 
								'<button class="button add" type="button" name="add_field"><span class="dashicons-plus"></span>' + cmsmasters_fb.add_new_field + '</button>' + 
								'<select id="field_choose">' + 
									'<option value="text">' + cmsmasters_fb.cmsmasters_text_field + '</option>' + 
									'<option value="email">' + cmsmasters_fb.cmsmasters_email_field + '</option>' + 
									'<option value="textarea">' + cmsmasters_fb.cmsmasters_text_area + '</option>' + 
									'<option value="dropdown">' + cmsmasters_fb.cmsmasters_dropdown + '</option>' + 
									'<option value="radiobutton">' + cmsmasters_fb.cmsmasters_radiobuttons + '</option>' + 
									'<option value="checkbox">' + cmsmasters_fb.cmsmasters_checkbox + '</option>' + 
									'<option value="checkboxes">' + cmsmasters_fb.cmsmasters_checkboxes + '</option>' + 
								'</select>' + 
								'<div class="cl"></div>' + 
							'</td>' + 
						'</tr>' + 
						'<tr>' + 
							'<td class="mess_compose">' + 
								'<h3>' + cmsmasters_fb.cmsmasters_mess_comp + '</h3>' + 
								'<div class="message_composer_buttons"></div>' + 
								'<div class="cl"></div>' + 
								'<textarea name="composer_message" cols="100" rows="10">' + cmsmasters_fb.your_mess_text + '</textarea>' + 
							'</td>' + 
						'</tr>' + 
						'<tr>' + 
							'<td>' + 
								'<h3>' + cmsmasters_fb.the_mess_subj + '</h3>' + 
								'<textarea name="composer_subject" cols="100" rows="1">' + cmsmasters_fb.cmsmasters_form_subj + '</textarea>' + 
							'</td>' + 
						'</tr>' + 
						'<tr>' + 
							'<td>' + 
								'<h3>' + cmsmasters_fb.success_send_text + '</h3>' + 
								'<textarea name="composer_success" cols="100" rows="5">' + cmsmasters_fb.cmsmasters_thank_you + '</textarea>' + 
							'</td>' + 
						'</tr>' + 
						'<tr>' + 
							'<td>' + 
								'<h3>' + cmsmasters_fb.the_mess_button + '</h3>' + 
								'<input type="text" name="composer_button" value="' + cmsmasters_fb.cmsmasters_form_button + '" size="31" />' + 
							'</td>' + 
						'</tr>' + 
						'<tr>' + 
							'<td class="sep">' + 
								'<div class="check_parent fl">' + 
									'<label for="composer_use_captcha">' + 
										'<input type="checkbox" name="composer_use_captcha" id="composer_use_captcha" value="captcha" /> ' + 
										'<span class="labelon">' + cmsmasters_fb.cmsmasters_use_captcha + '</span>' + 
									'</label>' + 
								'</div>' + 
								'<div class="check_parent fl">' + 
									'<label for="composer_reset_button">' + 
										'<input type="checkbox" name="composer_reset_button" id="composer_reset_button" value="reset" /> ' + 
										'<span class="labelon">' + cmsmasters_fb.add_reset_button + '</span>' + 
									'</label>' + 
								'</div>' + 
								'<div class="cl">' + 
									'<input class="button-primary bottom_save" type="button" name="save" value="' + cmsmasters_fb.cmsmasters_save_form + '" />' + 
									'<div class="fl submit_loader spinner" style="margin:4em 0 0 10px;"></div>' + 
								'</div>' + 
							'</td>' + 
						'</tr>' + 
					'</table>' + 
				'</div>';
				
				$('#form_build_tab').append(formHTML);
				$('.slider .rght .tabb.bot').parent().slideDown('slow');
				
				insaving = false;
				
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
				
				// Enable Fields Sorting
				$('#fields-list').sortable( { 
					handle : '.sortableMove', 
					axis : 'y', 
					cursor : 'move', 
					placeholder : 'ui-sortable-highlight', 
					update : function (event, ui) { 
						$('.message_composer_buttons').empty();
						
						for (var i = 0, ilength = $('#fields-list li').length; i < ilength; i += 1) {
							$('#fields-list li:eq(' + i + ')').find('input[name="field_order"]').val(i + 1);
							
							var but_val = $('#fields-list li:eq(' + i + ')').find('input[name="field_label"]').val();
							
							if (but_val.replace(/\s*/g, '') === '') { 
								but_val = cmsmasters_fb.cmsmasters_field;
							}
							
							$('.message_composer_buttons').append('<input class="button button-small" type="button" name="composer_add_button" value="' + but_val + '" />');
						}
					} 
				} );
				
				return false;
			}
		} );
		
		// Cancel
		$('.rght .tabb input[name="cancel_form"]').click(function () { 
			if (insaving) { 
				return false;
			}
			
			$(this).next().addClass('active_submit_loader').show();
			
			var ask = ($('#form_build_tab').find('input[name="form_name"]').attr('name') !== undefined) ? confirm(cmsmasters_fb.want_to_proceed) : true;
			
			if (!ask) {
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
				
				return false;
			}
			
			$(this).hide();
			$('.rght .tabb input[name="save_as_form"]').hide();
			$('.rght .tabb button[name="add_form"]').show();
			$('#form_build_tab').empty();
			$('.slider .rght .tabb.bot').parent().slideUp('fast');
			
			$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
			
			return false;
		} );
		
		// Delete Form
		$('.rght .tabb button[name="delete_form"]').click(function () { 
			if (insaving) { 
				return false;
			}
			
			var form_choose = $('#form_choose').val();
			
			if (form_choose === '') {
				alert(cmsmasters_fb.please_choose_form);
				
				return false;
			}
			
			$(this).parent().find('.submit_loader').addClass('active_submit_loader').show();
			
			var form_choose_text = $('#form_choose option:selected').text(), 
				ask = confirm(cmsmasters_fb.del_the_form_first + ' "' + form_choose_text + '" ' + cmsmasters_fb.del_the_form_last);
			
			if (!ask) {
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
				
				return false;
			}
			
			insaving = true;
			
			$('#settings_error').hide();
			
			if ($('#form_build_tab input[name="form_id"]').val() === form_choose) {
				$('.rght .tabb input[name="cancel_form"]').hide();
				$('.rght .tabb input[name="save_as_form"]').hide();
				$('.rght .tabb button[name="add_form"]').show();
				$('#form_build_tab').empty();
				$('.slider .rght .tabb.bot').parent().slideUp('fast');
			}
			
			$.post(loaderImageUrl + 'inc/form-builder-operator.php', { 
				type : 'form', 
				option : 'delete', 
				data : form_choose 
			} ).error(function () { 
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
				
				alert(cmsmasters_fb.error_on_page);
				
				insaving = false;
				
				return false;
			} ).complete(function (data) { 
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('slow');
				
				if (data.responseText === 'error') {
					alert(cmsmasters_fb.form_del_error);
					
					insaving = false;
					
					return false;
				} else {
					$('select#form_choose').find('option[value="' + form_choose + '"]').remove();
					
					$('html, body').animate( { 
						scrollTop : 0 
					}, 'slow');
					
					$('#settings_error').slideDown('fast').delay(5000).slideUp('slow');
					
					insaving = false;
				}
			} );
			
			return false;
		} );
		
		// Edit Form
		$('.rght .tabb button[name="edit_form"]').click(function () { 
			if (insaving) {
				return false;
			}
			
			var form_choose = $('#form_choose').val();
			
			if (form_choose === '') {
				alert(cmsmasters_fb.please_choose_form);
				
				return false;
			}
			
			$(this).next().addClass('active_submit_loader').show();
			
			var ask = ($('#form_build_tab').find('input[name="form_name"]').attr('name') !== undefined) ? confirm(cmsmasters_fb.want_to_proceed) : true;
			
			if (!ask) {
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
				
				return false;
			}
			
			insaving = true;
			
			$('#form_build_tab').empty();
			$('.slider .rght .tabb.bot').parent().slideUp('fast');
			
			$.post(loaderImageUrl + 'inc/form-builder-operator.php', { 
				type : 'form', 
				option : 'edit', 
				data : form_choose 
			} ).error(function () { 
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
				
				alert(cmsmasters_fb.error_on_page);
				
				insaving = false;
				
				return false;
			} ).complete(function (data) { 
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('slow');
				
				if (data.responseText === 'error') {
					alert(cmsmasters_fb.error_was_detect);
					
					insaving = false;
					
					return false;
				} else {
					$('.rght .tabb button[name="add_form"]').hide();
					$('.rght .tabb input[name="cancel_form"]').show();
					$('.rght .tabb input[name="save_as_form"]').show();
					
					var formHTML = '', 
						table_values = $.parseJSON(data.responseText), 
						composer_value = '';
					
					$.each(table_values, function (i, field_val) { 
						if (field_val.type !== 'form') { 
							composer_value += '<input class="button button-small" type="button" name="composer_add_button" value="' + field_val.label + '" />';
						}
					} );
					
					$.each(table_values, function (i, val) { 
						if (val.type === 'form') {
							var form_vals = val.description, 
								captcha = ($.inArray('captcha', val.parameters) != -1) ? ' checked="checked"' : '', 
								reset = ($.inArray('reset', val.parameters) != -1) ? ' checked="checked"' : '';
							
							formHTML += '<div>' + 
							'<table class="form-table cmsmasters-options">' + 
								'<tr>' + 
									'<td>' + 
										'<input type="hidden" name="form_option" value="update" />' + 
										'<input type="hidden" name="form_id" value="' + val.id + '" />' + 
										'<h3 class="fb_h2">' + cmsmasters_fb.cmsmasters_form_name + ' <span style="color:#ff0000;">*</span></h3>' + 
										'<div>' + 
											'<input class="button-primary top_save" type="button" name="save" value="' + cmsmasters_fb.cmsmasters_save_form + '" />' + 
											'<div class="fr submit_loader spinner"></div>' + 
										'</div>' + 
										'<input size="31" maxlength="100" name="form_name" id="' + val.slug + '" type="text" value="' + val.label + '" class="fl" />' + 
									'</td>' + 
								'</tr>' + 
								'<tr>' + 
									'<td class="sortable_fields">' + 
										'<p class="fr"><strong>' + cmsmasters_fb.cmsmasters_drag_and_drop + '</strong></p>' + 
										'<h3>' + cmsmasters_fb.add_remove_edit + '</h3>' + 
									'</td>' + 
								'</tr>' + 
							'</table>' + 
							'<ul id="fields-list">';
							
							$.each(table_values, function (i, field_val) { 
								if (field_val.type !== 'form') {
									formHTML += fieldChoose(field_val.type, field_val);
								}
							} );
							
							formHTML += '</ul>' + 
								'<table class="form-table cmsmasters-options">' + 
									'<tr>' + 
										'<td class="add_fields">' + 
											'<button class="button add" type="button" name="add_field"><span class="dashicons-plus"></span>' + cmsmasters_fb.add_new_field + '</button>' + 
											'<select id="field_choose">' + 
												'<option value="text">' + cmsmasters_fb.cmsmasters_text_field + '</option>' + 
												'<option value="email">' + cmsmasters_fb.cmsmasters_email_field + '</option>' + 
												'<option value="textarea">' + cmsmasters_fb.cmsmasters_text_area + '</option>' + 
												'<option value="dropdown">' + cmsmasters_fb.cmsmasters_dropdown + '</option>' + 
												'<option value="radiobutton">' + cmsmasters_fb.cmsmasters_radiobuttons + '</option>' + 
												'<option value="checkbox">' + cmsmasters_fb.cmsmasters_checkbox + '</option>' + 
												'<option value="checkboxes">' + cmsmasters_fb.cmsmasters_checkboxes + '</option>' + 
											'</select>' + 
											'<div class="cl"></div>' + 
										'</td>' + 
									'</tr>' + 
									'<tr>' + 
										'<td class="mess_compose">' + 
											'<h3>' + cmsmasters_fb.cmsmasters_mess_comp + '</h3>' + 
											'<div class="message_composer_buttons">' + composer_value + '</div>' + 
											'<div class="cl"></div>' + 
											'<textarea name="composer_message" cols="100" rows="10">' + val.value + '</textarea>' + 
										'</td>' + 
									'</tr>' + 
									'<tr>' + 
										'<td>' + 
											'<h3>' + cmsmasters_fb.the_mess_subj + '</h3>' + 
											'<textarea name="composer_subject" cols="100" rows="1">' + form_vals[0] + '</textarea>' + 
										'</td>' + 
									'</tr>' + 
									'<tr>' + 
										'<td>' + 
											'<h3>' + cmsmasters_fb.success_send_text + '</h3>' + 
											'<textarea name="composer_success" cols="100" rows="5">' + form_vals[1] + '</textarea>' + 
										'</td>' + 
									'</tr>' + 
									'<tr>' + 
										'<td>' + 
											'<h3>' + cmsmasters_fb.the_mess_button + '</h3>' + 
											'<input type="text" name="composer_button" value="' + form_vals[2] + '" size="31" />' + 
										'</td>' + 
									'</tr>' + 
									'<tr>' + 
										'<td class="sep">' + 
											'<div class="check_parent fl">' + 
												'<label for="composer_use_captcha">' + 
													'<input type="checkbox" name="composer_use_captcha" id="composer_use_captcha" value="captcha"' + captcha + ' /> ' + 
													'<span class="labelon">' + cmsmasters_fb.cmsmasters_use_captcha + '</span>' + 
												'</label>' + 
											'</div>' + 
											'<div class="check_parent fl">' + 
												'<label for="composer_reset_button">' + 
													'<input type="checkbox" name="composer_reset_button" id="composer_reset_button" value="reset"' + reset + ' /> ' + 
													'<span class="labelon">' + cmsmasters_fb.add_reset_button + '</span>' + 
												'</label>' + 
											'</div>' + 
											'<div class="cl">' + 
												'<input class="button-primary bottom_save" type="button" name="save" value="' + cmsmasters_fb.cmsmasters_save_form + '" />' + 
												'<div class="fl submit_loader spinner" style="margin:4em 0 0 10px;"></div>' + 
											'</div>' + 
										'</td>' + 
									'</tr>' + 
								'</table>' + 
							'</div>';
							
							$('#form_build_tab').append(formHTML);
						}
					} );
					
					$('.slider .rght .tabb.bot').parent().slideDown('slow');
					
					insaving = false;
					
					// Enable Fields Sorting
					$('#fields-list').sortable( { 
						handle : '.sortableMove', 
						axis : 'y', 
						cursor : 'move', 
						placeholder : 'ui-sortable-highlight', 
						update : function (event, ui) { 
							$('.message_composer_buttons').empty();
							
							for (var i = 0, ilength = $('#fields-list li').length; i < ilength; i += 1) {
								$('#fields-list li:eq(' + i + ')').find('input[name="field_order"]').val(i + 1);
								
								var but_val = $('#fields-list li:eq(' + i + ')').find('input[name="field_label"]').val();
								
								if (but_val.replace(/\s*/g, '') === '') {
									but_val = cmsmasters_fb.cmsmasters_field;
								}
								
								$('.message_composer_buttons').append('<input class="button button-small" type="button" name="composer_add_button" value="' + but_val + '" />');
							}
						}
					} );
				}
			} );
			
			return false;
		} );
		
		// Save As Form
		$('.rght .tabb input[name="save_as_form"]').click(function () { 
			if (insaving) {
				return false;
			}
			
			insaving = true;
			
			$('#settings_save').hide();
			$(this).parent().find('.submit_loader').addClass('active_submit_loader').show();
			
			var spinners = $('.rght .tabb').find('input.spinner'), 
				slength = spinners.length, 
				spinnerError = false;
			
			for (var i = 0; i < slength; i += 1) {
				var spinner = spinners.eq(i), 
					spinnerVal = spinner.val();
				
				if (spinnerVal.replace(/\s*/g, '') === '') {
					spinner.val('');
				} else if (isNaN(Number(spinnerVal.replace('-', '')))) {
					spinnerError = true;
					
					spinner.val('').addClass('numberError').css( { 
						border : '1px solid #ff0000' 
					} );
				} else {
					if (Number(spinnerVal.replace('-', '')) < 1) {
						spinner.val(1);
					} else if (Number(spinnerVal.replace('-', '')) > 99999) {
						spinner.val(99999);
					} else if ((Number(spinnerVal.replace('-', ''))).toFixed() !== Number(spinnerVal.replace('-', ''))) {
						spinner.val((Number(spinnerVal.replace('-', ''))).toFixed());
					} else {
						spinner.val(spinnerVal.replace('-', ''));
					}
				}
			}
			
			if (spinnerError) {
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
				
				alert(cmsmasters_fb.enter_valid_number);
				
				insaving = false;
				
				return false;
			}
			
			var formName = prompt(cmsmasters_fb.new_form_name);
			
			if (formName && formName.replace(/\s*/g, '') !== '') {
				saveAction('add', formName);
			} else {
				alert(cmsmasters_fb.form_not_saved);
				
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
			}
			
			insaving = false;
			
			return false;
		} );
		
		// Save Form
		$('.rght .tabb').delegate('input[name="save"]', 'click', function () { 
			if (insaving) {
				return false;
			}
			
			insaving = true;
			
			$('#settings_save').hide();
			$(this).parent().find('.submit_loader').addClass('active_submit_loader').show();
			
			var spinners = $('.rght .tabb').find('input.spinner'), 
				slength = spinners.length, 
				spinnerError = false;
			
			for (var i = 0; i < slength; i += 1) {
				var spinner = spinners.eq(i), 
					spinnerVal = spinner.val(), 
					spinnerNumber = 1;
				
				if (spinnerVal.replace(/\s*/g, '') === '') {
					spinner.val('');
				} else if (isNaN(Number(spinnerVal.replace('-', '')))) {
					spinnerError = true;
					
					spinner.val('').addClass('numberError').css( { 
						border : '1px solid #ff0000' 
					} );
				} else {
					spinnerNumber = Number(spinnerVal.replace('-', ''));
					
					if (spinnerNumber < 1) {
						spinner.val(1);
					} else if (spinnerNumber > 99999) {
						spinner.val(99999);
					} else {
						spinner.val(spinnerNumber.toFixed());
					}
				}
			}
			
			if (spinnerError) {
				$('.submit_loader.active_submit_loader').removeClass('active_submit_loader').fadeOut('fast');
				
				alert(cmsmasters_fb.enter_valid_number);
				
				insaving = false;
				
				return false;
			}
			
			var saveOption = $('input[name="form_option"]').val();
			
			saveAction(saveOption);
			
			insaving = false;
			
			return false;
		} );
		
		// Add New Field
		$('.rght .tabb').delegate('button[name="add_field"]', 'click', function () { 
			if (insaving) {
				return false;
			}
			
			var field_type = $('#field_choose').val();
			
			if (field_type === '') {
				alert(cmsmasters_fb.choose_field_type);
				
				return false;
			}
			
			$('#fields-list').append(fieldChoose(field_type));
			
			$('.message_composer_buttons').append('<input class="button button-small" type="button" name="composer_add_button" value="' + cmsmasters_fb.cmsmasters_field + '" />');
			
			return false;
		} );
		
		// Delete Field
		$('.rght .tabb').delegate('button[name="delete_field"]', 'click', function () { 
			if (insaving) {
				return false;
			}
			
			var field = $(this).parent().parent().parent().parent().parent(), 
				element = $(this).parent().parent().parent().parent().parent().index(), 
				vl = $(this).parent().find('input[name="field_label"]').val(), 
				oldvl = $('.message_composer_buttons').find('input[name="composer_add_button"]:eq(' + element + ')').val(), 
				cmt = $('textarea[name="composer_message"]').val();
			
			if ($(field).is('li')) {
				var ask = confirm(cmsmasters_fb.del_this_field);
				
				if (!ask) {
					return false;
				}
				
				if ($('input[name="form_option"]').val() === 'update') {
					var field_choose = field.find('input[name="field_id"]').val();
					
					if (field_choose === '') {
						$('textarea[name="composer_message"]').val(cmt.replace('[%' + oldvl + '%]', ''));
						
						$('.message_composer_buttons').find('input[name="composer_add_button"]:eq(' + element + ')').remove();
						
						field.slideUp('fast', function () { 
							$(this).remove();
						} );
						
						return false;
					}
					
					$.post(loaderImageUrl + 'inc/form-builder-operator.php', { 
						type : 'fields', 
						option : 'delete', 
						data : field_choose 
					} ).error(function () { 
						alert(cmsmasters_fb.error_on_page);
						
						return false;
					} ).complete(function (data) { 
						if (data.responseText === 'error') {
							$('textarea[name="composer_message"]').val(cmt.replace('[%' + oldvl + '%]', ''));
							
							$('.message_composer_buttons').find('input[name="composer_add_button"]:eq(' + element + ')').remove();
							
							alert(cmsmasters_fb.field_del_error);
							
							field.slideUp('fast', function () { 
								$(this).remove();
							} );
							
							return false;
						} else {
							$('textarea[name="composer_message"]').val(cmt.replace('[%' + oldvl + '%]', ''));
							
							$('.message_composer_buttons').find('input[name="composer_add_button"]:eq(' + element + ')').remove();
							
							field.slideUp('fast', function () { 
								$(this).remove();
							} );
							
							return false;
						}
					} );
				} else if ($('input[name="form_option"]').val() === 'add') {
					$('textarea[name="composer_message"]').val(cmt.replace('[%' + oldvl + '%]', ''));
					
					$('.message_composer_buttons').find('input[name="composer_add_button"]:eq(' + element + ')').remove();
					
					field.slideUp('fast', function () { 
						$(this).remove();
					} );
					
					return false;
				}
			} else {
				alert(cmsmasters_fb.error_on_page);
				
				return false;
			}
		} );
		
		// Add Option
		$('.rght .tabb').delegate('button[name="add_opt"]', 'click', function () { 
			if (insaving) {
				return false;
			}
			
			var opt = '<div class="opt_item">' + 
				'<input class="fl" type="text" value="" name="opt_label" size="31">' + 
				'<button class="button delete small_but" type="button" name="delete_opt"><span class="dashicons-no"></span></button>' + 
				'<div class="cl"></div>' + 
			'</div>';
			
			$(this).before(opt);
			
			return false;
		} );
		
		// Delete Option
		$('.rght .tabb').delegate('button[name="delete_opt"]', 'click', function () { 
			
			if (insaving) {
				return false;
			}
			
			if ($(this).parent().parent().find('.opt_item').length > 2) {
				var ask = confirm(cmsmasters_fb.del_this_option);
				
				if (!ask) {
					return false;
				}
				
				$(this).parent().fadeOut('fast', function () { 
					$(this).remove();
				} );
			} else {
				alert(cmsmasters_fb.less_two_options);
			}
			
			return false;
		} );
		
		// Composer Add/Edit Buttons On Blur
		$('.rght .tabb').delegate('input[name="field_label"]', 'blur', function () { 
			if (insaving) {
				return false;
			}
			
			var element = $(this).parent().parent().parent().parent().parent().parent().index(), 
				vl = $(this).val(), 
				oldvl = $('.message_composer_buttons').find('input[name="composer_add_button"]:eq(' + element + ')').val(), 
				cmt = $('textarea[name="composer_message"]').val();
			
			if (vl.replace(/\s*/g, '') === '') {
				vl = cmsmasters_fb.cmsmasters_field;
			}
			
			$('textarea[name="composer_message"]').val(cmt.replace('[%' + oldvl + '%]', '[%' + vl + '%]'));
			
			$('.message_composer_buttons').find('input[name="composer_add_button"]:eq(' + element + ')').val(vl);
			
			return false;
		} );
		
		// Composer Add/Edit Buttons On Change
		$('.rght .tabb').delegate('input[name="field_label"]', 'change', function () { 
			if (insaving) {
				return false;
			}
			
			var element = $(this).parent().parent().parent().parent().parent().parent().index(), 
				vl = $(this).val(), 
				oldvl = $('.message_composer_buttons').find('input[name="composer_add_button"]:eq(' + element + ')').val(), 
				cmt = $('textarea[name="composer_message"]').val();
			
			if (vl.replace(/\s*/g, '') === '') {
				vl = cmsmasters_fb.cmsmasters_field;
			}
			
			$('textarea[name="composer_message"]').val(cmt.replace('[%' + oldvl + '%]', '[%' + vl + '%]'));
			
			$('.message_composer_buttons').find('input[name="composer_add_button"]:eq(' + element + ')').val(vl);
			
			return false;
		} );
		
		// Composer Button Click
		$('.rght .tabb').delegate('input[name="composer_add_button"]', 'click', function () { 
			if (insaving) {
				return false;
			}
			
			var newVal = $(this).val(), 
				oldVal = $('textarea[name="composer_message"]').val();
			
			$('textarea[name="composer_message"]').val(oldVal + '[%' + newVal + '%]').focus();
			
			return false;
		} );
		
		// Empty Field Error Focus
		$('.rght .tabb').delegate('input[name="field_label"], input[name="opt_label"], input.spinner.numberError', 'focus', function () { 
			if (insaving) {
				return false;
			}
			
			$(this).removeAttr('style');
			
			return false;
		} );
		
		// Page Leave Script
		$('div#adminmenuwrap a, div#footer a, div#wpadminbar a').bind('click', function () { 
			if ($('#adminoptions_form .clsep').is(':visible')) {
				if (!confirm(cmsmasters_fb.settings_lost)) {
					return false;
				}
			}
		} );
	} )(jQuery);
} );

