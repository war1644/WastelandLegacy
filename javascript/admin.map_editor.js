
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
var saved = true;
var lower_tiles_img = new Array();
var upper_tiles_img = new Array();
var actual_mode = 0;
var actual_tile = '';
var actual_tile_id = 0;
var actual_layer = 0;
var max_tile_id = 0;
var switch_edit = false;
var content_to_refresh_1 = false;
var lower_tileset = '';
var upper_tileset = '';
var lower_map = new Array();
var upper_map = new Array();
var event_map = new Array();
var actual_event = 0;
var method_forcing = '';
var old_tileset_id = tileset_id;

mode[1] = mode_1_begin + mode_1_content + mode_1_end;

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

function select_event(id)
{
	if ( id == 0 )
	{
		document.getElementById('actual_event').innerHTML = '';
		actual_event = 0;
		return;
	}

	actual_event = id;

	var content = '';
	var picture = event_data[id][0];
	var width = event_data[id][1];
	var height = event_data[id][2];
	var dir = event_data[id][3];

	if ( !dir )
	{
		document.getElementById('actual_event').innerHTML = '<div id="' + id + '" style="background-image:url(images/sprites/' + picture + ');width:' + width + 'px;height:' + height + 'px"></div>';
	}
	else
	{
		var dir_left = - dir[0] * width;
		var dir_top = - dir[1] * height;

		//alert('<div class="playermain" id="' + id + '" style="left:' + left + 'px;top:' + top + 'px;z-index:' + z_index + '"><div class="eventsprite" style="width:' + width + 'px;height:' + height + 'px"><div class="eventcharaset" id="charaset_' + id + '" style="left:' + dir_left + 'px;top:' + dir_top + 'px;background-image:url(images/charasets/' + picture + '.png);width:' + (width * 4) + 'px;height:' + (height * 4) + 'px"></div></div></div>');

		document.getElementById('actual_event').innerHTML = '<div class="eventsprite" style="width:' + width + 'px;height:' + height + 'px"><div class="eventcharaset" style="left:' + dir_left + 'px;top:' + dir_top + 'px;background-image:url(images/charasets/' + picture + ');width:' + (width * 4) + 'px;height:' + (height * 4) + 'px"></div></div>';
	}
}

function add_event(id, left, top)
{
	if ( id == 0 )
	{
		remove_event(left, top);
		return;
	}

	event_map[top*col_map+left] = id;

	var picture = event_data[id][0];
	var width = event_data[id][1];
	var height = event_data[id][2];
	var dir = event_data[id][3];
	var name = event_data[id][4];
	var z_index = 9 + top * 2;

	document.getElementById('a' + left + '-' + top).title = id + '. ' + name;
	if ( document.getElementById('i' + left + '-' + top) )
	{
		document.getElementById('i' + left + '-' + top).style.backgroundImage = 'url(images/engine/event.png)';
	}
	else
	{
		document.getElementById('event_bloc').innerHTML += '<div id="i' + left + '-' + top + '" style="width:' + tile_size + 'px;height:' + tile_size + 'px;left:' + (left * tile_size) + 'px;top:' + (top * tile_size) + 'px;background-image:url(images/engine/event.png);z-index:' + z_index + '"></div>';
	}
}

function remove_event(left, top)
{
	event_map[top*col_map+left] = 0;

	document.getElementById('a' + left + '-' + top).title = '';

	if ( document.getElementById('i' + left + '-' + top) )
	{
		document.getElementById('i' + left + '-' + top).style.backgroundImage = '';
	}
}

function change_mode(id)
{
	if ( actual_mode != id )
	{
		actual_mode = id;
		document.getElementById('actual_mode').innerHTML = mode[id];
	
		if ( id == 0 )
		{
			actual_tile = '';
			document.getElementById('lower_tileset').innerHTML = lower_tileset;
			document.getElementById('upper_tileset').innerHTML = upper_tileset;
		}
		else if ( id == 2 )
		{
			switch_edit = false;
			document.getElementById('map_name').value = map_name;
			document.getElementById('map_music').value = map_music;
			var i = 0;
			while ( document.getElementById('map_tileset').options[i].value != tileset_id )
			{
				i++;
			}
			document.getElementById('map_tileset').options[i].selected = true;
			setTimeout('check_data();', 500);
		}
		else
		{
			switch_edit = false;
		}
	}
}

function check_data()
{
	if ( actual_mode == 2 )
	{
		if ( document.getElementById('map_name') && document.getElementById('map_name').value != map_name )
		{
			map_name = document.getElementById('map_name').value;
		}

		if ( document.getElementById('map_music') && document.getElementById('map_music').value != map_music )
		{
			map_music = document.getElementById('map_music').value;
		}

		setTimeout('check_data();', 500);
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

function l_bloc(id, left, top, background_image, z_index, value)
{
	if ( background_image != '' )
	{
        var img = '\'images/tiles/' + background_image + '\'';
		background_image = 'background-image:url('+img+');';
	}

	lower_map[top*col_map+left] = value;
	event_map[top*col_map+left] = 0;

	left = left * tile_size;
	top = top * tile_size;

	lower_buffer += '<div id="' + id + '" style="left:' + left + 'px;top:' + top + 'px;' + background_image + 'z-index:' + z_index + ';width:' + tile_size + 'px;height:' + tile_size + 'px"></div>';
}

function u_bloc(id, left, top, background_image, z_index, value)
{
	if ( background_image != '' )
	{
        var img = '\'images/tiles/' + background_image + '\'';
        background_image = 'background-image:url('+img+');';
		// background_image = 'background-image:url(images/tiles/' + background_image + ');';
	}

	upper_map[top*col_map+left] = value;

	left = left * tile_size;
	top = top * tile_size;

	upper_buffer += '<div id="' + id + '" style="left:' + left + 'px;top:' + top + 'px;' + background_image + 'z-index:' + z_index + ';width:' + tile_size + 'px;height:' + tile_size + 'px"></div>';
}

function a_bloc(width, height)
{
	var left = 0;
	var top = 0;
	var buffer = '';
	while ( top * tile_size < height )
	{
		while ( left * tile_size < width )
		{
			buffer += '<div id="a' + left + '-' + top + '" class="map_editor_tile" title="" style="left:' + (left * tile_size) + 'px;top:' + (top * tile_size) + 'px;z-index:9997;width:' + tile_size + 'px;height:' + tile_size + 'px" onclick="bloc_click(' + left + ', ' + top + ')"></div>';
			left++;
		}
		left = 0;
		top++;
	}
	document.getElementById('action_bloc').innerHTML = buffer;
}

function put_event(bloc_id)
{
	saved = false;

	var left = parseInt(document.getElementById(bloc_id).style.left) / tile_size;
	var top = parseInt(document.getElementById(bloc_id).style.top) / tile_size;

	add_event(actual_event, left, top);
}

function bloc_click(left, top)
{
	if ( actual_mode == 1 )
	{
		put_event('a' + left + '-' + top);
		return;
	}
	else if ( actual_mode == 3 )
	{
		var do_it = false;
		var html = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title></title></head><body onload="document.getElementById(\'save_form\').submit();"><form method="post" action="' + u_index + '?mod=admin.map" id="save_form">';
		html += '<input type="hidden" name="map_id" value="' + map_id + '" />';
		html += '<input type="hidden" name="map_left" value="' + left + '" />';
		html += '<input type="hidden" name="map_top" value="' + top + '" />';
						
		if ( document.getElementById('tool_type').value < 6 )
		{
			if ( confirm(l_teleport + ' : ' + map_id + '. ' + map_name + ' [' + left + ',' + top + ']') )
			{
				html += '<input type="hidden" name="mode" value="preset_event" />';
				html += '<input type="hidden" name="event_type" value="teleport" />';
				html += '<input type="hidden" name="map_dir" value="' + document.getElementById('tool_type').value + '" />';
				html += '<input type="hidden" name="map_name" value="' + map_name + '" />';
				do_it = true;
			}
		}
		else if ( document.getElementById('tool_type').value < 10 )
		{
			if ( confirm(l_set_default_start_position + ' : ' + map_id + '. ' + map_name + ' [' + left + ',' + top + ']') )
			{
				html += '<input type="hidden" name="map_dir" value="' + document.getElementById('tool_type').value + '" />';
				html += '<input type="hidden" name="mode" value="default_start_position" />';
				do_it = true;
			}
		}
		else if ( document.getElementById('tool_type').value < 14 )
		{
			if ( confirm(l_set_players_position + ' : ' + map_id + '. ' + map_name + ' [' + left + ',' + top + ']') )
			{
				html += '<input type="hidden" name="map_dir" value="' + document.getElementById('tool_type').value + '" />';
				html += '<input type="hidden" name="mode" value="players_position" />';
				do_it = true;
			}
		}

		if ( do_it )
		{
			html += '</form></body></html>';
            var popupsaving = window.open('', '_blank', 'toolbar=0, location=0, directories=0, menuBar=0, scrollbars=0, resizable=0, width=100, height=100');
			popupsaving.document.write(html);
			popupsaving.document.close();
		}

		return;
	}
	else if ( switch_edit && actual_mode == 0 )
	{
		var w_copy = parseInt(document.getElementById('w_tiles_copy').value);
		var h_copy = parseInt(document.getElementById('h_tiles_copy').value);
		var w_paste = parseInt(document.getElementById('w_tiles_paste').value);
		var h_paste = parseInt(document.getElementById('h_tiles_paste').value);

		if ( ( isNaN(w_copy) || w_copy < 1 || isNaN(h_copy) || h_copy < 1 || isNaN(w_paste) || w_paste < 1 || isNaN(h_paste) || h_paste < 1 ) || ( w_copy == 1 && h_copy == 1 && w_paste == 1 && h_paste == 1 ) )
		{
			document.getElementById('w_tiles_copy').value = 1;
			document.getElementById('h_tiles_copy').value = 1;
			document.getElementById('w_tiles_paste').value = 1;
			document.getElementById('h_tiles_paste').value = 1;
			bloc_action(('a' + left + '-' + top), actual_tile, actual_tile_id, actual_layer);
			return;
		}
		else
		{
			var i = 0;
			var j = 0;
			if ( w_copy > tileset_cols )
			{
				w_copy = tileset_cols;
			}

			var id_to_copy = new Array();
			while ( i < h_copy )
			{
				id_to_copy[i] = new Array();
				j = 0;
				while ( j < w_copy && (actual_tile_id + j + (i * tileset_cols)) < max_tile_id )
				{
					id_to_copy[i][j] = actual_tile_id + j + (i * tileset_cols);
					j++;
				}
				i++;
			}

			i = 0;
			j = 0;
			var k = 0;
			var l = 0;
			if ( actual_layer == 1 )
			{
				var relative_tile_prefix = 'upper_tile_';
			}
			else
			{
				var relative_tile_prefix = 'lower_tile_';
			}

			while ( k < h_paste )
			{
				if ( i >= id_to_copy.length )
				{
					i = 0;
				}
				
				l = 0;
				while ( l < w_paste )
				{
					if ( j >= id_to_copy[i].length )
					{
						j = 0;
					}

					if ( document.getElementById('a' + (left + l) + '-' + (top + k)) )
					{
						bloc_action(('a' + (left + l) + '-' + (top + k)), (relative_tile_prefix + id_to_copy[i][j]), id_to_copy[i][j], actual_layer);
					}
					//alert('bloc_action((\'a' + (left + l) + '-' + (top + k)+'),'+ (relative_tile_prefix + id_to_copy[i][j])+','+ id_to_copy[i][j]+','+ actual_layer+'\');');
					j++;
					l++;
				}
				i++;
				k++;
			}
		}
	}
}

function bloc_action(bloc_id, relative_tile, relative_tile_id, relative_layer)
{
	saved = false;

	var left = parseInt(document.getElementById(bloc_id).style.left) / tile_size;
	var top = parseInt(document.getElementById(bloc_id).style.top) / tile_size;

	//alert(left + ',' + top);

	if ( relative_layer == 0 )
	{
		lower_map[top*col_map+left] = relative_tile_id;
		if ( relative_tile_id == 0 )
		{
			document.getElementById('l' + bloc_id.substring(1, bloc_id.length)).style.backgroundImage = '';
		}
		else
		{
			document.getElementById('l' + bloc_id.substring(1, bloc_id.length)).style.backgroundImage = document.getElementById(relative_tile).style.backgroundImage;
		}
	}
	else
	{
		upper_map[top*col_map+left] = relative_tile_id;
        console.log(bloc_id);
        document.getElementById('u' + bloc_id.substring(1, bloc_id.length)).style.backgroundImage = document.getElementById(relative_tile).style.backgroundImage;
	}
}

function lower_click(id, key)
{
	switch_edit = true;
	saved = false;
	document.getElementById('demo_tile').style.backgroundImage = document.getElementById(id).style.backgroundImage;
	actual_tile = id;
	actual_tile_id = parseInt(str_replace(id, 'lower_tile_', ''));
	actual_layer = 0;
}

function upper_click(id, key)
{
	switch_edit = true;
	saved = false;
	document.getElementById('demo_tile').style.backgroundImage = document.getElementById(id).style.backgroundImage;
	actual_tile = id;
	actual_tile_id = parseInt(str_replace(id, 'upper_tile_', ''));
	actual_layer = 1;
}

function save_map()
{
	if ( !preloaded )
	{
		return false;
	}

	var html = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><title></title></head><body onload="document.getElementById(\'save_form\').submit();"><form method="post" action="' + u_index + '?mod=admin.map" id="save_form">';
	html += '<input type="hidden" name="mode" value="save_map" />';
	html += '<input type="hidden" name="map_id" value="' + map_id + '" />';
	html += '<input type="hidden" name="col_map" value="' + col_map + '" />';
	html += '<input type="hidden" name="tileset_id" value="' + tileset_id + '" />';
	html += '<input type="hidden" name="old_tileset_id" value="' + old_tileset_id + '" />';
	html += '<input type="hidden" name="map_name" value="' + map_name + '" />';
	html += '<input type="hidden" name="map_music" value="' + map_music + '" />';
	html += '<input type="hidden" name="lower_map" value="' + lower_map.join() + '" />';
	html += '<input type="hidden" name="upper_map" value="' + upper_map.join() + '" />';
	html += '<input type="hidden" name="event_map" value="' + event_map.join() + '" />';
	html += '</form></body></html>';
	var popupsaving = window.open('', '_blank', 'toolbar=0, location=0, directories=0, menuBar=0, scrollbars=0, resizable=0, width=10, height=10');
	popupsaving.document.write(html);
	popupsaving.document.close();
}

function remake_event_list(id, name, picture, width, height, dir)
{
	mode_1_content += '<option value="' + id + '">' + id + '. ' + name + '</option>';
	event_data[id] = new Array(picture, width, height, dir, name);
	mode[1] = mode_1_begin + mode_1_content + mode_1_end;
}

function construct_tileset(lower_img, upper_img)
{
	//document.getElementById('title_map_name').innerHTML = '&nbsp;: ' + name;

	lower_tiles_img = lower_img;
	upper_tiles_img = upper_img;

	var background;

	lower_tileset = '<table id="lower_tileset" border="0" cellspacing="1" cellpadding="0"><tr>';

	var count = 0;
	while ( typeof(lower_tiles_img[count]) != 'undefined' )
	{
		if ( count > 0 && ((count) / tileset_cols) == Math.floor((count) / tileset_cols) )
		{
			lower_tileset += '</tr><tr>';
		}
	
		if ( lower_tiles_img[count] != '' )
		{
            var img = '\'images/tiles/' + lower_tiles_img[count] +'\'';
            background = ';background-color:' + tileset_color + ';background-image:url('+ img +')';
			// background = ';background-color:' + tileset_color + ';background-image:url(images/tiles/' + lower_tiles_img[count] + ')';
		}
		else
		{
			background = ';background-color:' + tileset_color;
		}

		lower_tileset += '<td width="' + tile_size + '" height="' + tile_size + '" style="width:' + tile_size + 'px;height:' + tile_size + 'px"><div title="' + lower_tiles_img[count] + '" id="lower_tile_' + count + '" onclick="lower_click(this.id, ' + count + ');" style="width:' + tile_size + 'px;height:' + tile_size + 'px' + background + '"></div></td>';

		count++;
	}

	background = ';background-color:' + tileset_color;

	while ( ((count) / tileset_cols) != Math.floor((count) / tileset_cols) )
	{
		lower_tileset += '<td width="' + tile_size + '" height="' + tile_size + '" style="width:' + tile_size + 'px;height:' + tile_size + 'px"><div title="" id="lower_tile_' + count + '" onclick="lower_click(this.id, ' + count + ');" style="width:' + tile_size + 'px;height:' + tile_size + 'px' + background + '"></div></td>';
		lower_tiles_img[count] = '';
		count++;
	}

	lower_tileset += '</tr></table>';

	upper_tileset = '<table id="upper_tileset" border="0" cellspacing="1" cellpadding="0"><tr>';

	var count = 0;
	while ( typeof(upper_tiles_img[count]) != 'undefined' )
	{
		if ( count > 0 && ((count) / tileset_cols) == Math.floor((count) / tileset_cols) )
		{
			upper_tileset += '</tr><tr>';
		}

		if ( upper_tiles_img[count] != '' )
		{
            var img = '\'images/tiles/' + upper_tiles_img[count] +'\'';
			background = ';background-color:' + tileset_color + ';background-image:url('+ img +')';
		}
		else
		{
			background = ';background-color:' + tileset_color;
		}

		upper_tileset += '<td width="' + tile_size + '" height="' + tile_size + '" style="width:' + tile_size + 'px;height:' + tile_size + 'px"><div title="' + upper_tiles_img[count] + '" id="upper_tile_' + count + '" onclick="upper_click(this.id, ' + count + ');" style="width:' + tile_size + 'px;height:' + tile_size + 'px' + background + '"></div></td>';

		count++;
	}

	background = ';background-color:' + tileset_color;

	while ( ((count) / tileset_cols) != Math.floor((count) / tileset_cols) )
	{
		upper_tileset += '<td width="' + tile_size + '" height="' + tile_size + '" style="width:' + tile_size + 'px;height:' + tile_size + 'px"><div title="" id="upper_tile_' + count + '" onclick="upper_click(this.id, ' + count + ');" style="width:' + tile_size + 'px;height:' + tile_size + 'px' + background + '"></div></td>';
		upper_tiles_img[count] = '';
		count++;
	}

	upper_tileset += '</tr></table>';

	//document.body.innerHTML = str_replace(str_replace(str_replace(lower_tileset, '&', '&amp;'), '<', '&lt;'), '>', '&gt;');

	saved = true;
	loaded = true;
	max_tile_id = upper_tiles_img.length - 1;
	return true;
}

change_mode(1);
preload_editor();

window.onload = function()
{
	refresh_loop(1);
};