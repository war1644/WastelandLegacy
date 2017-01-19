
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
var loaded = false;
var lower_tiles_img = Array();
var lower_tiles_value = Array();
var upper_tiles_img = Array();
var upper_tiles_value = Array();
var actual_mode = 0;
var actual_tile = '';
var content_to_refresh_1 = false;
var method_forcing = '';
var first_construction = true;

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
			actual_tile = '';
		}
		else if ( id == 2 )
		{
			document.getElementById('tileset_name').value = tileset_name;
			document.getElementById('set_lower_size').value = tileset_tiles_lower;
			document.getElementById('set_upper_size').value = tileset_tiles_upper;
			setTimeout('check_data();', 500);
		}
	}
}

function check_data()
{
	if ( actual_mode == 2 )
	{
		if ( document.getElementById('tileset_name') && document.getElementById('tileset_name').value != tileset_name )
		{
			tileset_name = document.getElementById('tileset_name').value;
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

function lower_click(id, key)
{
	if ( actual_mode == 0 )
	{
		saved = false;
		document.getElementById(id).style.backgroundImage = document.getElementById('demo_tile').style.backgroundImage;
		document.getElementById(id).title = str_replace(str_replace(document.getElementById('demo_tile').style.backgroundImage, 'url(images/tiles/', ''), ')', '');
		lower_tiles_img[key] = actual_tile;
	}
	else if ( actual_mode == 1 )
	{
		saved = false;
		var layer = parseInt(document.getElementById(id).innerHTML);

		if ( layer == 1 )
		{
			layer = 0;
		}
		else
		{
			layer++;
		}

		document.getElementById(id).innerHTML = layer;
		lower_tiles_value[key] = layer;
	}
}

function upper_click(id, key)
{
	if ( actual_mode == 0 )
	{
		saved = false;
		document.getElementById(id).style.backgroundImage = document.getElementById('demo_tile').style.backgroundImage;
		document.getElementById(id).title = str_replace(str_replace(document.getElementById('demo_tile').style.backgroundImage, 'url(images/tiles/', ''), ')', '');
		upper_tiles_img[key] = actual_tile;
	}
	else if ( actual_mode == 1 )
	{
		saved = false;
		var layer = parseInt(document.getElementById(id).innerHTML);

		if ( layer == 2 )
		{
			layer = 0;
		}
		else
		{
			layer++;
		}

		document.getElementById(id).innerHTML = layer;
		upper_tiles_value[key] = layer;
	}
}

function save_tileset()
{
	if ( !loaded )
	{
		alert(l_no_tileset_open);
		return false;
	}

	var html = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><title></title></head><body onload="document.getElementById(\'save_form\').submit();"><form method="post" action="' + u_index + '?mod=admin.map" id="save_form">';
	html += '<input type="hidden" name="mode" value="save_tileset" />';
	html += '<input type="hidden" name="tileset_id" value="' + tileset_id + '" />';
	html += '<input type="hidden" name="tileset_name" value="' + tileset_name + '" />';
	html += '<input type="hidden" name="lower_img" value="' + lower_tiles_img.join() + '" />';
	html += '<input type="hidden" name="lower_value" value="' + lower_tiles_value.join() + '" />';
	html += '<input type="hidden" name="upper_img" value="' + upper_tiles_img.join() + '" />';
	html += '<input type="hidden" name="upper_value" value="' + upper_tiles_value.join() + '" />';
	html += '</form></body></html>';
	var popupsaving = window.open('', '_blank', 'toolbar=0, location=0, directories=0, menuBar=0, scrollbars=0, resizable=0, width=10, height=10');
	popupsaving.document.write(html);
	popupsaving.document.close();
}

function resize_tileset()
{
	var lower_size = parseInt(document.getElementById('set_lower_size').value);
	var upper_size = parseInt(document.getElementById('set_upper_size').value);

    if ( !lower_size || isNaN(lower_size) )
	{
		lower_size = tileset_tiles_lower;
		document.getElementById('set_lower_size').value = tileset_tiles_lower;
	}
	else
	{
		tileset_tiles_lower = lower_size;
	}

	if ( !upper_size || isNaN(upper_size) )
	{
		upper_size = tileset_tiles_upper;
		document.getElementById('set_upper_size').value = tileset_tiles_upper;
	}
	else
	{
		tileset_tiles_upper = upper_size;
	}

	var lower_img = new Array();
	var lower_value = new Array();
	var upper_img = new Array();
	var upper_value = new Array();

	var i = 0;
	while ( i < lower_size )
	{
		if ( typeof(lower_tiles_value[i]) != 'undefined' )
		{
			lower_img[i] = lower_tiles_img[i];
			lower_value[i] = lower_tiles_value[i];
		}
		else
		{
			lower_img[i] = '';
			lower_value[i] = 0;
		}

		i++;
	}


    i = 0;
	while ( i < upper_size )
	{
		if ( typeof(upper_tiles_value[i]) != 'undefined' )
		{
			upper_img[i] = upper_tiles_img[i];
			upper_value[i] = upper_tiles_value[i];
		}
		else
		{
			upper_img[i] = '';
			upper_value[i] = 0;
		}

		i++;
	}

	construct_tileset(lower_img, lower_value, upper_img, upper_value);
}

//重置瓦片集大小，最后一行不满会自动补满一行
function construct_tileset(lower_img, lower_value, upper_img, upper_value)
{
	lower_tiles_img = lower_img;
	lower_tiles_value = lower_value;
	upper_tiles_img = upper_img;
	upper_tiles_value = upper_value;

	var lower_tileset = '<table id="lower_tileset" border="0" cellspacing="1" cellpadding="0"><tr>';
	var background;

	var count = 0;
	while ( typeof(lower_tiles_value[count]) != 'undefined' )
	{
		if ( count > 0 && ((count) / tileset_cols) == Math.floor((count) / tileset_cols) )
		{
			lower_tileset += '</tr><tr>';
		}
	
		if ( lower_tiles_img[count] != '' )
		{
			background = ';background-color:' + tileset_color + ';background-image:url(images/tiles/' + lower_tiles_img[count] + ')';
		}
		else
		{
			background = ';background-color:' + tileset_color;
		}

		lower_tileset += '<td width="' + tile_size + '" height="' + tile_size + '" style="width:' + tile_size + 'px;height:' + tile_size + 'px"><div title="' + lower_tiles_img[count] + '" id="lower_tile_' + count + '" onclick="lower_click(this.id, ' + count + ');" style="width:' + tile_size + 'px;height:' + tile_size + 'px' + background + '">' + lower_tiles_value[count] + '</div></td>';

		count++;
	}

    background = ';background-color:' + tileset_color;

	while ( ((count) / tileset_cols) != Math.floor((count) / tileset_cols) )
	{
		lower_tileset += '<td width="' + tile_size + '" height="' + tile_size + '" style="width:' + tile_size + 'px;height:' + tile_size + 'px"><div title="" id="lower_tile_' + count + '" onclick="lower_click(this.id, ' + count + ');" style="width:' + tile_size + 'px;height:' + tile_size + 'px' + background + '">0</div></td>';
		lower_tiles_img[count] = '';
		lower_tiles_value[count] = 0;
		count++;
	}

	lower_tileset += '</tr></table>';

	var upper_tileset = '<table id="upper_tileset" border="0" cellspacing="1" cellpadding="0"><tr>';

	var count = 0;
	while ( typeof(upper_tiles_value[count]) != 'undefined' )
	{
		if ( count > 0 && ((count) / tileset_cols) == Math.floor((count) / tileset_cols) )
		{
			upper_tileset += '</tr><tr>';
		}

		if ( upper_tiles_img[count] != '' )
		{
			background = ';background-color:' + tileset_color + ';background-image:url(images/tiles/' + upper_tiles_img[count] + ')';
		}
		else
		{
			background = ';background-color:' + tileset_color;
		}

		upper_tileset += '<td width="' + tile_size + '" height="' + tile_size + '" style="width:' + tile_size + 'px;height:' + tile_size + 'px"><div title="' + upper_tiles_img[count] + '" id="upper_tile_' + count + '" onclick="upper_click(this.id, ' + count + ');" style="width:' + tile_size + 'px;height:' + tile_size + 'px' + background + '">' + upper_tiles_value[count] + '</div></td>';

		count++;
	}

	background = ';background-color:' + tileset_color;

	while ( ((count) / tileset_cols) != Math.floor((count) / tileset_cols) )
	{
		upper_tileset += '<td width="' + tile_size + '" height="' + tile_size + '" style="width:' + tile_size + 'px;height:' + tile_size + 'px"><div title="" id="upper_tile_' + count + '" onclick="upper_click(this.id, ' + count + ');" style="width:' + tile_size + 'px;height:' + tile_size + 'px' + background + '">0</div></td>';
		upper_tiles_img[count] = '';
		upper_tiles_value[count] = 0;
		count++;
	}

	upper_tileset += '</tr></table>';

	document.getElementById('global_tileset').innerHTML = global_tileset;
	document.getElementById('lower_tileset').innerHTML = lower_tileset;
	document.getElementById('upper_tileset').innerHTML = upper_tileset;
	//document.body.innerHTML = str_replace(str_replace(str_replace(lower_tileset, '&', '&amp;'), '<', '&lt;'), '>', '&gt;');
	saved = true;
	loaded = true;
	return true;
}

change_mode(1);
make_tileset();

window.onload = function()
{
	refresh_loop(1);
	//make_tileset();
};