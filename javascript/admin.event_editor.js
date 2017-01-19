
/*

Program: phpore
Author: Jeremy Faivre
Contact: http://www.jeremyfaivre.com/about
Year: 2005

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

*/

var refresh_var = 0;
var content_to_refresh_1 = false;
var method_forcing = '';
var command_id;
var actual_mode = 0;
var actual_id = false;
var actual_next_id = false;
var updating = false;
var old_face_url = '';

if ( refresh_method == 0 )
{
	document.write('<div id="scripttoup1" class="hidden_layer"></div>');
}
else if ( !window.XMLHttpRequest && !window.ActiveXObject )
{
	document.write('<div id="scripttoup1" class="hidden_layer"></div>');
	refresh_method = 0;
	method_forcing = '&amp;method_forcing=1';
}

function change_mode(id)
{
	if ( actual_mode != id )
	{
		actual_mode = id;
		document.getElementById('actual_mode').innerHTML = mode[id];

		if ( id == 0 )
		{
			document.getElementById('event_picture_image').src = 'images/' + event_picture_type + '/' + event_picture;
			document.getElementById('event_picture_path').innerHTML = 'images/' + event_picture_type + '/';
			document.getElementById('event_picture').value = event_picture;
			document.getElementById('event_name').value = event_name;

			if ( event_picture_type == 'charasets' )
			{
				document.getElementById('event_picture_type').options[1].selected = true;
				document.getElementById('event_dir_visibility').style.visibility = 'visible';

				if ( event_dir == '0_0_1' )
				{
					document.getElementById('event_dir').options[0].selected = true;
				}
				else if ( event_dir == '1_0_1' )
				{
					document.getElementById('event_dir').options[1].selected = true;
				}
				else if ( event_dir == '2_0_1' )
				{
					document.getElementById('event_dir').options[2].selected = true;
				}
				else if ( event_dir == '3_0_1' )
				{
					document.getElementById('event_dir').options[3].selected = true;
				}
				else if ( event_dir == '0_1_1' )
				{
					document.getElementById('event_dir').options[4].selected = true;
				}
				else if ( event_dir == '1_1_1' )
				{
					document.getElementById('event_dir').options[5].selected = true;
				}
				else if ( event_dir == '2_1_1' )
				{
					document.getElementById('event_dir').options[6].selected = true;
				}
				else if ( event_dir == '3_1_1' )
				{
					document.getElementById('event_dir').options[7].selected = true;
				}
				else if ( event_dir == '0_2_1' )
				{
					document.getElementById('event_dir').options[8].selected = true;
				}
				else if ( event_dir == '1_2_1' )
				{
					document.getElementById('event_dir').options[9].selected = true;
				}
				else if ( event_dir == '2_2_1' )
				{
					document.getElementById('event_dir').options[10].selected = true;
				}
				else if ( event_dir == '3_2_1' )
				{
					document.getElementById('event_dir').options[11].selected = true;
				}
				else if ( event_dir == '0_3_1' )
				{
					document.getElementById('event_dir').options[12].selected = true;
				}
				else if ( event_dir == '1_3_1' )
				{
					document.getElementById('event_dir').options[13].selected = true;
				}
				else if ( event_dir == '2_3_1' )
				{
					document.getElementById('event_dir').options[14].selected = true;
				}
				else if ( event_dir == '3_3_1' )
				{
					document.getElementById('event_dir').options[15].selected = true;
				}
				else if ( event_dir == '0_0_0' )
				{
					document.getElementById('event_dir').options[16].selected = true;
				}
				else if ( event_dir == '1_0_0' )
				{
					document.getElementById('event_dir').options[17].selected = true;
				}
				else if ( event_dir == '2_0_0' )
				{
					document.getElementById('event_dir').options[18].selected = true;
				}
				else if ( event_dir == '3_0_0' )
				{
					document.getElementById('event_dir').options[19].selected = true;
				}
				else if ( event_dir == '0_1_0' )
				{
					document.getElementById('event_dir').options[20].selected = true;
				}
				else if ( event_dir == '1_1_0' )
				{
					document.getElementById('event_dir').options[21].selected = true;
				}
				else if ( event_dir == '2_1_0' )
				{
					document.getElementById('event_dir').options[22].selected = true;
				}
				else if ( event_dir == '3_1_0' )
				{
					document.getElementById('event_dir').options[23].selected = true;
				}
				else if ( event_dir == '0_2_0' )
				{
					document.getElementById('event_dir').options[24].selected = true;
				}
				else if ( event_dir == '1_2_0' )
				{
					document.getElementById('event_dir').options[25].selected = true;
				}
				else if ( event_dir == '2_2_0' )
				{
					document.getElementById('event_dir').options[26].selected = true;
				}
				else if ( event_dir == '3_2_0' )
				{
					document.getElementById('event_dir').options[27].selected = true;
				}
				else if ( event_dir == '0_3_0' )
				{
					document.getElementById('event_dir').options[28].selected = true;
				}
				else if ( event_dir == '1_3_0' )
				{
					document.getElementById('event_dir').options[29].selected = true;
				}
				else if ( event_dir == '2_3_0' )
				{
					document.getElementById('event_dir').options[30].selected = true;
				}
				else if ( event_dir == '3_3_0' )
				{
					document.getElementById('event_dir').options[31].selected = true;
				}
			}
			else
			{
				document.getElementById('event_picture_type').options[0].selected = true;
				document.getElementById('event_dir_visibility').style.visibility = 'hidden';
			}

			document.getElementById('event_layer').options[event_layer].selected = true;

			setTimeout('check_data();', 500);
		}
	}
}

function refresh_loop(refresh_id)
{
	eval('if ( content_to_refresh_' + refresh_id + ' ) { eval(content_to_refresh_' + refresh_id + '); content_to_refresh_' + refresh_id + ' = false; }');
	setTimeout('refresh_loop(' + refresh_id + ');', 200);
}

function refresh_action(refresh_id, file_name, refresh_time)
{
	if ( refresh_method == 1 )// XMLHttpRequest
	{
		var request = false;

		if ( window.XMLHttpRequest ) // branch for native XMLHttpRequest object
		{
			try
			{
				request = new XMLHttpRequest();
			}
			catch(e)
			{
				request = false;
			}
		}
		else if ( window.ActiveXObject ) // branch for IE/Windows ActiveX version
		{
			try
			{
				request = new ActiveXObject('Msxml2.XMLHTTP');
			}
			catch(e)
			{
				try
				{
					request = new ActiveXObject('Microsoft.XMLHTTP');
				}
				catch(e)
				{
					request = false;
				}
			}
		}

		if ( request )
		{
			request.open('GET', str_replace(file_name, '&amp;', '&') + 'refresh_var=' + refresh_var + '&refresh_id=' + refresh_id, true);
			request.onreadystatechange = function(file_name)
			{
				if (request.readyState == 4)
				{
					if (request.status != 200)
					{
						map_session_restart();
					}
					else
					{
						eval('content_to_refresh_' + refresh_id + ' = request.responseText;');
					}
				}
			};
			request.send('');
			refresh_var++;
		}
		else
		{
			map_session_restart();
		}
	}
	else // dnrefresh
	{
		document.getElementById('scripttoup' + refresh_id).innerHTML = '<iframe src="' + file_name + 'refresh_var=' + refresh_var + '&amp;refresh_id=' + refresh_id + '' + method_forcing + '"></' + 'iframe>';
		refresh_var++;
	}

	if ( refresh_time )
	{
		setTimeout('refresh_action(' + refresh_id + ', \'' + file_name + '\', ' + refresh_time + ')', refresh_time);
	}
}

function check_data()
{
	if ( document.getElementById('select_command') && document.getElementById('select_command').value == 4 && document.getElementById('face_demo') )
	{
		if ( old_face_url != document.getElementById('face_url').value )
		{
			document.getElementById('face_demo').src = 'images/faces/' + document.getElementById('face_url').value;
			old_face_url = document.getElementById('face_url').value;
		}

		setTimeout('check_data();', 500);
	}
	else if ( actual_mode == 0 )
	{
		if ( event_picture != document.getElementById('event_picture').value || document.getElementById('event_picture_type').value != event_picture_type )
		{
			event_picture = document.getElementById('event_picture').value;
			event_picture_type = document.getElementById('event_picture_type').value;
			document.getElementById('event_picture_image').src = 'images/' + event_picture_type + '/' + event_picture;
			document.getElementById('event_picture_path').innerHTML = 'images/' + event_picture_type + '/';
		}

		if ( document.getElementById('event_name') && document.getElementById('event_name').value != event_name )
		{
			event_name = document.getElementById('event_name').value;
		}

		if ( document.getElementById('event_dir') && document.getElementById('event_dir').value != event_dir )
		{
			event_dir = document.getElementById('event_dir').value;
		}

		if ( document.getElementById('event_layer') && document.getElementById('event_layer').value != event_layer )
		{
			event_layer = document.getElementById('event_layer').value;
		}

		setTimeout('check_data();', 500);
	}
}

function command(id, submit, args)
{
	var on_submit = '';
	var html = '';

	if ( !submit )
	{
		if ( id == 0 )
		{
			html += l_variable + ' $ <input type="text" value="" name="args_0" /><br /><br />';
			html += '<select name="args_1"><option value="=">' + l_condition_equal + '</option><option value="!=">' + l_condition_different + '</option><option value="&lt;">' + l_condition_smaller + '</option><option value="&gt;">' + l_condition_bigger + '</option><option value="&lt;=">' + l_condition_smaller_or_equal + '</option><option value="&gt;=">' + l_condition_bigger_or_equal + '</option></select><br /><br />'
			html += '<select name="args_2"><option value="0">' + l_value + '</option><option value="1">' + l_variable + ' $</option></select> <input type="text" value="" name="args_3" /><br /><br />';
			html += '<select name="args_4"><option value="0">' + l_condition_without_else + '</option><option value="1">' + l_condition_with_else + '</option></select><br /><br />';
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value, this.args_1.value, this.args_2.value, this.args_3.value, this.args_4.value));';
		}
		else if ( id == 1 )
		{
			html += l_html_activated + ' : <select name="args_0"><option value="0">' + l_no + '</option><option value="1">' + l_yes + '</option></select><br /><br />';
			html += '<textarea id="args_1" cols="" rows="" style="width:200px;height:100px"></textarea><br /><br />';
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value, this.args_1.value));';
		}
		else if ( id == 2 )
		{
			html += '<select name="args_0"><option value="left">' + l_left + '</option><option value="right">' + l_right + '</option><option value="center">' + l_center + '</option><option value="justify">' + l_justify + '</option></select><br /><br />';
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value));';
		}
		else if ( id == 3 )
		{
			html += '<select name="args_0" onchange="if(this.value==1){document.getElementById(\'hide_option\').style.visibility=\'visible\';}else{document.getElementById(\'hide_option\').style.visibility=\'hidden\';}"><option value="0">' + l_validation + '</option><option value="1">' + l_time_limit + '</option></select><br /><br />';
			html += '<span id="hide_option" style="visibility:hidden"><input type="numeric" style="width:30px" maxlength="5" value="5000" name="args_1" /> ms<br /><br /></span>';
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value, this.args_1.value));';
		}
		else if ( id == 4 )
		{
			html += l_show_face + ' : <select name="args_0" onchange="if(this.value==1){document.getElementById(\'hide_option\').style.visibility=\'visible\';setTimeout(\'check_data();\', 1000);}else{document.getElementById(\'hide_option\').style.visibility=\'hidden\';}"><option value="0">' + l_no + '</option><option value="1">' + l_yes + '</option></select><br /><br />';
			html += '<span id="hide_option" style="visibility:hidden">images/faces/ <input type="text" value="" name="args_1" id="face_url" /><br /><br />';
			html += '<img src="" id="face_demo" alt="" /></span><br /><br />';
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value, this.args_1.value));';
		}
		else if ( id == 5 )
		{
			html += l_stored_in_var + ' : $ <input type="text" value="" name="args_0" /><br /><br />';
			html += '1 : <input type="text" value="" name="args_1" style="width:180px" /><br /><br />';
			html += '2 : <input type="text" value="" name="args_2" style="width:180px" /><br /><br />';
			html += '3 : <input type="text" value="" name="args_3" style="width:180px" /><br /><br />';
			html += '4 : <input type="text" value="" name="args_4" style="width:180px" /><br /><br />';
			html += '5 : <input type="text" value="" name="args_5" style="width:180px" /><br /><br />';	
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value, this.args_1.value, this.args_2.value, this.args_3.value, this.args_4.value, this.args_5.value));';
		}
		else if ( id == 6 )
		{
			html += '<select name="args_2"><option value="0">' + l_text + '</option><option value="1">' + l_number + '</option></select><br /><br />';
			html += l_stored_in_var + ' : $ <input type="text" value="" name="args_3" /><br /><br />';
			html += l_show_message + ' : <select name="args_5" onchange="if(this.value==1){document.getElementById(\'hide_option\').style.visibility=\'visible\';}else{document.getElementById(\'hide_option\').style.visibility=\'hidden\';}"><option value="0">' + l_no + '</option><option value="1">' + l_yes + '</option></select><br /><br />';
			html += '<span id="hide_option" style="visibility:hidden">' + l_html_activated + ' : <select name="args_0"><option value="0">' + l_no + '</option><option value="1">' + l_yes + '</option></select><br /><br />';
			html += '<textarea id="args_1" cols="" rows="" style="width:200px;height:100px"></textarea><br /><br /></span>';
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value, this.args_1.value, this.args_2.value, this.args_3.value));';
		}
		else if ( id == 7 )
		{
			html += '<input type="numeric" style="width:30px" maxlength="5" value="1000" name="args_0" /> ms<br /><br />';
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value));';
		}
		else if ( id == 8 )
		{
			html += l_variable + ' $ <input type="text" value="" name="args_0" /><br /><br />';
			html += '<select name="args_1"><option value="=">' + l_var_set + '</option><option value="+">' + l_var_increase + '</option><option value="-">' + l_var_decrease + '</option><option value="*">' + l_var_multiply + '</option><option value="/">' + l_var_divide + '</option><option value=".">' + l_var_concat + '</option></select><br /><br />'
			html += '<select name="args_2"><option value="0">' + l_value + '</option><option value="1">' + l_variable + ' $</option></select> <input type="text" value="" name="args_3" /><br /><br />';
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value, this.args_1.value, this.args_2.value, this.args_3.value));';
		}
		else if ( id == 9 )
		{
			html += 'ID : <input type="text" style="width:30px" maxlength="11" value="" name="args_0" /><br /><br />';
			html += 'X : <input type="text" style="width:30px" maxlength="11" value="" name="args_1" /><br /><br />';
			html += 'Y : <input type="text" style="width:30px" maxlength="11" value="" name="args_2" /><br /><br />';
			html += l_map_dir + ' : <select name="args_3"><option value="">' + l_do_not_change + '</option><option value=" left">' + l_left + '</option><option value=" right">' + l_right + '</option><option value=" up">' + l_up + '</option><option value=" down">' + l_down + '</option></select><br /><br />';
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value, this.args_1.value, this.args_2.value, this.args_3.value));';
		}
		else if ( id == 10 || id == 11 )
		{
			html += '<i>' + l_warning_function + '</i><br /><br />';
			html += '<textarea id="args_0" cols="" rows="" style="width:200px;height:100px"></textarea><br /><br />';
			on_submit = 'command(' + id + ', true, new Array(this.args_0.value));';
		}
		else
		{
			return false;
		}

		html = '<form onsubmit="' + on_submit + 'return false;" action="">' + html + '<input type="submit" value="' + l_validate + '" /></form>';

		document.getElementById('editor_options').innerHTML = html;
	}
	else
	{
		var render = "\n";

		if ( id == 0 )
		{
			var reg = new RegExp('^[A-Za-z0-9_]+$', 'g');
			
			if ( trim(args[0]) == '' || !reg.test(args[0]) )
			{
				args[0] = 0;
			}

			if ( args[2] == 1 )
			{
				if ( trim(args[3]) == '' || !reg.test(args[3]) )
				{
					args[3] = '$0';
				}
				else
				{
					args[3] = '$' + args[3];
				}
			}

			render += 'IF $' + args[0] + ' ' + args[1] + ' ' + args[3] + "\n\n";

			if ( args[4] == 0 )
			{
				render += 'END IF';
			}
			else
			{
				render += 'ELSE' + "\n\n" + 'END IF';
			}
		}
		else if ( id == 1 )
		{
			render += 'MESSAGE';
			if ( args[0] == 1 )
			{
				render += ' HTML';
			}

			render += "\n" + trim(htmlspecialchars(args[1])) + "\n" + 'END MESSAGE';
		}
		else if ( id == 2 )
		{
			render += 'MESSAGE_ALIGN ' + args[0];
		}
		else if ( id == 3 )
		{
			if ( args[0] == 0 )
			{
				args[1] = 'false';
			}
			else
			{
				args[1] = parseInt(args[1]);
				if ( isNaN(args[1]) )
				{
					args[1] = 0;
				}
				if ( args[1] < 0 )
				{
					args[1] = -args[1];
				}
			}

			render += 'MESSAGE_TIME ' + args[1];
		}
		else if ( id == 4 )
		{
			if ( args[0] == 0 || trim(args[1]) == '' )
			{
				args[1] = 'false';
			}

			render += 'MESSAGE_FACE ' + trim(args[1]);
		}
		else if ( id == 5 )
		{
			var reg = new RegExp('^[A-Za-z0-9_]+$', 'g');  

			if ( trim(args[0]) == '' || !reg.test(args[0]) )
			{
				args[0] = 0;
			}

			render += 'CHOICE $' + args[0] + "\n";

			var i = 1;
			while ( i < 6 && trim(args[i]) != '' )
			{
				render += args[i] + "\n";
				i++;
			}

			render += 'END CHOICE';
		}
		else if ( id == 6 )
		{
			if ( args[2] == 0 )
			{
				render += 'INPUT ';
			}
			else
			{
				render += 'INPUT_NUMBER ';
			}

			var reg = new RegExp('^[A-Za-z0-9_]+$', 'g');  

			if ( trim(args[3]) == '' || !reg.test(args[3]) )
			{
				args[3] = 0;
			}

			render += '$' + args[3];

			if ( trim(args[1]) != '' )
			{
				render += ' MESSAGE';
				if ( args[0] == 1 )
				{
					render += ' HTML';
				}

				render += "\n" + trim(htmlspecialchars(args[1])) + "\n" + 'END MESSAGE';
			}
		}
		else if ( id == 7 )
		{
			args[0] = parseInt(args[0]);
			if ( isNaN(args[0]) )
			{
				args[0] = 0;
			}
			if ( args[0] < 0 )
			{
				args[0] = -args[0];
			}

			render += 'WAIT ' + args[0];
		}
		else if ( id == 8 )
		{
			var reg = new RegExp('^[A-Za-z0-9_]+$', 'g');
			
			if ( trim(args[0]) == '' || !reg.test(args[0]) )
			{
				args[0] = 0;
			}

			if ( args[2] == 1 )
			{
				if ( trim(args[3]) == '' || !reg.test(args[3]) )
				{
					args[3] = '$0';
				}
				else
				{
					args[3] = '$' + args[3];
				}
			}

			render += 'VAR $' + args[0] + ' ' + args[1] + ' ' + args[3];
		}
		else if ( id == 9 )
		{
			if ( trim(args[0]) != '' )
			{
				args[0] = parseInt(args[0]);
				if ( isNaN(args[0]) )
				{
					args[0] = 0;
				}
				if ( args[0] < 0 )
				{
					args[0] = -args[0];
				}
			}
			else
			{
				args[0] = ' ';
			}

			if ( trim(args[1]) != '' )
			{
				args[1] = parseInt(args[1]);
				if ( isNaN(args[1]) )
				{
					args[1] = 0;
				}
				if ( args[1] < 0 )
				{
					args[1] = -args[1];
				}
			}
			else
			{
				args[1] = ' ';
			}

			if ( trim(args[2]) != '' )
			{
				args[2] = parseInt(args[2]);
				if ( isNaN(args[2]) )
				{
					args[2] = 0;
				}
				if ( args[2] < 0 )
				{
					args[2] = -args[2];
				}
			}
			else
			{
				args[2] = ' ';
			}

			render += 'TELEPORT ' + args[0] + ',' + args[1] + ',' + args[2] + args[3];
		}
		else if ( id == 10 )
		{
			render += 'JAVASCRIPT' + "\n" + trim(args[0]) + "\n" + 'END JAVASCRIPT';
		}
		else if ( id == 11 )
		{
			render += 'PHP' + "\n" + trim(args[0]) + "\n" + 'END PHP';
		}
		else
		{
			return false;
		}

		document.getElementById('text_script').value += render + "\n";
		document.getElementById('text_script').scrollTop = document.getElementById('text_script').scrollHeight;
		document.getElementById('select_command').options[0].selected = true;
		document.getElementById('editor_options').innerHTML = '';
	}
}

function save_event()
{
	var event_saving_dir = event_dir;
	if ( event_picture_type != 'charasets' )
	{
		event_saving_dir = '';
	}
    var textScirpt = document.getElementById('text_script').value;
    // console.log(textScirpt);
    var html = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title></title></head><body onload="document.getElementById(\'save_form\').submit();">';
	html += '<form method="post" action="' + u_index + '?mod=admin.map" id="save_form">';
	html += '<input type="hidden" name="mode" value="save_event" />';
	html += '<input type="hidden" name="event_id" value="' + event_id + '" />';
	html += '<input type="hidden" name="event_layer" value="' + event_layer + '" />';
	html += '<input type="hidden" name="event_dir" value="' + event_saving_dir + '" />';
	html += '<input type="hidden" name="event_name" value="' + event_name + '" />';
	html += '<input type="hidden" name="event_picture" value="' + event_picture + '" />';
	html += '<input type="hidden" name="text_script" value="' + textScirpt + '" />';
	html += '</form></body></html>';
	var popupsaving = window.open('', '_blank', 'toolbar=0, location=0, directories=0, menuBar=0, scrollbars=0, resizable=0, width=10, height=10');
	popupsaving.document.open();
	popupsaving.document.write(html);
	popupsaving.document.close();
}

change_mode(1);

window.onload = function()
{
	refresh_loop(1);
};