
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

var player = new Array();
var event_data = new Array();
var players_in_map = new Array();
var events_left_gain = new Array();
var events_top_gain = new Array();
var sprites_1 = new Array();
var sprites_0 = new Array();
var sprites_changedir = new Array();
var events = new Array();
var event_left = new Array();
var event_top = new Array();
var m_table = new Array('a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0', 'a0-0');
var m_key = 15;
var map_refresh_2 = true;
var map_refresh_1 = 1;
var map_refresh_0 = 0;
var map_pass = new Array();
var stopped_map = false;
var refresh_var = 0;
var showing_message = false;
var close_message_func = false;
var input_number = false;
var method_forcing = '';
var content_to_refresh_1 = false;
var content_to_refresh_2 = false;
var chatbox_content = '';
var chat_history = true;
var path_finding;
var path_finished;
var user_moving = false;
var events_placement = new Array();
var actual_layer = '';
var chat_state = chatbox_state[2];
var new_chatbox_state = new Array(chatbox_state[0], chatbox_state[1], chatbox_state[2]);
var event_wait = 0;
var window_x = 0;
var window_y = 0;
var all_loaded = 0;
var map_images = new Array();
var stop_walking = false;
var speed = 2;

if ( chat_state == 0 )
{
	document.getElementById('chat_title').innerHTML = chatbox_header.increase;
}
else
{
	document.getElementById('chat_title').innerHTML = chatbox_header.reduce;
	document.getElementById('chat_show').innerHTML = document.getElementById('chat_hidden').innerHTML;
	document.getElementById('chat_hidden').innerHTML = '';
}

document.getElementById('drag_layer2').style.left = chatbox_state[0] + 'px';
document.getElementById('drag_layer2').style.top = chatbox_state[1] + 'px';

var division = new Array();
division[0] = 0;
division[1] = Math.floor(tile_size / 16);
division[0] += division[1];
division[2] = Math.floor((tile_size - division[0]) / 15);
division[0] += division[2];
division[3] = Math.floor((tile_size - division[0]) / 14);
division[0] += division[3];
division[4] = Math.floor((tile_size - division[0]) / 13);
division[0] += division[4];
division[5] = Math.floor((tile_size - division[0]) / 12);
division[0] += division[5];
division[6] = Math.floor((tile_size - division[0]) / 11);
division[0] += division[6];
division[7] = Math.floor((tile_size - division[0]) / 10);
division[0] += division[7];
division[8] = Math.floor((tile_size - division[0]) / 9);
division[0] += division[8];
division[9] = Math.floor((tile_size - division[0]) / 8);
division[0] += division[9];
division[10] = Math.floor((tile_size - division[0]) / 7);
division[0] += division[10];
division[11] = Math.floor((tile_size - division[0]) / 6);
division[0] += division[11];
division[12] = Math.floor((tile_size - division[0]) / 5);
division[0] += division[12];
division[13] = Math.floor((tile_size - division[0]) / 4);
division[0] += division[13];
division[14] = Math.floor((tile_size - division[0]) / 3);
division[0] += division[14];
division[15] = Math.floor((tile_size - division[0]) / 2);
division[0] += division[15];
division[16] = tile_size - division[0];

var debug = false;

if ( refresh_method == 0 )
{
	document.write('<div id="scripttoup1" class="hidden_layer"></div><div id="scripttoup2" class="hidden_layer"></div>');
}
else if ( debug )
{
	document.write('<div id="scripttoup1"></div><div id="scripttoup2"></div>');
	refresh_method = 0;
	method_forcing = '&amp;method_forcing=1';
}
else if ( !window.XMLHttpRequest && !window.ActiveXObject )
{
	document.write('<div id="scripttoup1" class="hidden_layer"></div><div id="scripttoup2" class="hidden_layer"></div>');
	refresh_method = 0;
	method_forcing = '&amp;method_forcing=1';
}

// music bg
document.write('<div id="musicstream" class="hidden_layer"></div>');
var actual_music = '';

function refresh_loop(refresh_id)
{
	eval('if ( content_to_refresh_' + refresh_id + ' ) { /*if ( refresh_id == 2 ) { alert(content_to_refresh_' + refresh_id + '); }*/ eval(content_to_refresh_' + refresh_id + '); content_to_refresh_' + refresh_id + ' = false; }');
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
			request.open('GET', str_replace(file_name, '&amp;', '&') + 'refresh_var=' + refresh_var + '' + map_sid + '&refresh_id=' + refresh_id, true);
			request.onreadystatechange = function()
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
						//document.body.innerHTML = request.responseText;
						//alert(request.responseText);
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
		document.getElementById('scripttoup' + refresh_id).innerHTML = '<iframe src="' + file_name + 'refresh_var=' + refresh_var + '' + map_sid + '&amp;refresh_id=' + refresh_id + '' + method_forcing + '"></' + 'iframe>';
		refresh_var++;
	}

	if ( refresh_time )
	{
		setTimeout('refresh_action(' + refresh_id + ', \'' + file_name + '\', ' + refresh_time + ')', refresh_time);
	}
}

function show_message(message, key, script, align, time, face)
{
	message = htmlspecialchars_decode(message);

	if ( align < 1 || align > 3 )
	{
		align = 'left';
	}
	else if ( align == 1 )
	{
		align = 'right';
	}
	else if ( align == 2 )
	{
		align = 'center';
	}
	else if ( align == 3 )
	{
		align = 'justify';
	}

	var count = 1;
	var tab = 'Array(\'' + quotes(script[0]) + '\'';
	while ( count < key )
	{
		tab += ', \'\'';
		count++;
	}
	while ( script[count] )
	{
		tab += ', \'' + quotes(script[count]) + '\'';
		count++;
	}
	tab += ')';

	if ( face )
	{
		if ( face[1] == 0 )
		{
			face[1] = 'left';
		}
		else
		{
			face[1] = 'right';
		}

		var show_face = '<img src="images/faces/' + face[0] + '" alt="" style="float:' + face[1] + '" />';
	}
	else
	{
		var show_face = '';
	}

	/*if ( document.getElementById('message').innerHTML == '' )
	{*/
		var left = parseInt(document.getElementById('p' + my_user_id).style.left) - 16 + window_x;
		var top = parseInt(document.getElementById('p' + my_user_id).style.top) - 128 + window_y;
		key++;

		if ( !time )
		{
			close_message_func = 'document.getElementById(\'message\').innerHTML=\'\';script_eval(' + key + ', ' + tab + ');';
			var close_message = '<br /><div align="center"><form action="" onsubmit="' + close_message_func + 'return false;"><input type="submit" value="' +  l_close_message + '" /></form></div>';
		}
		else
		{
			var close_message = '';
			setTimeout('document.getElementById(\'message\').innerHTML = \'\';script_eval(' + key + ', ' + tab + ');', time);
			close_message_func = false;
		}

		document.getElementById('message').innerHTML = '<div id="message_layer" onmouseover="actual_layer=this.id" style="position:absolute;left:' + left + 'px;top:' + top + 'px;z-index:9999">' + message_box.begin + '<div class="message" align="' + align + '" style="text-align:' + align + '">' + show_face + '' + message + '' + close_message + '</div>' + message_box.end + '</div>';
	
		start_drag('message_layer');
	/*}
	else
	{
		if ( !time )
		{
			time = 'false';
		}

		setTimeout('show_message(\'' + quotes(message) + '\', ' + key + ', ' + tab + ', \'' + align + '\', ' + time + ');', 200);
	}*/
}

/**
 * 提交消息到后台
 */
function submit_message(event_status, input_message)
{
    refresh_action(2, u_index + '?mod=map&amp;mode=submit&amp;event_status=' + event_status + '&amp;input_message=' + input_message + '&amp;map_sid=' + map_sid + '$amp;x=' + player_x + '&amp;y=' + player_y + '&amp;map_id=' + map_id + '&amp;');

}

function continue_event(event_status)
{
	refresh_action(2, u_index + '?mod=map&amp;mode=submit&amp;event_status=' + event_status + '&amp;map_sid=' + map_sid + '$amp;x=' + player_x + '&amp;y=' + player_y + '&amp;map_id=' + map_id + '&amp;');

}

/**
 * 提交玩家选项到后台
 */
function submit_choice(event_status, input_choice)
{
	refresh_action(2, u_index + '?mod=map&amp;mode=submit&amp;event_status=' + event_status + '&amp;input_choice=' + input_choice + '&amp;map_sid=' + map_sid + '$amp;x=' + player_x + '&amp;y=' + player_y + '&amp;map_id=' + map_id + '&amp;');
}

function select_choice(event_status, align, face, choices)
{
	if ( align < 1 || align > 3 )
	{
		align = 'left';
	}
	else if ( align == 1 )
	{
		align = 'right';
	}
	else if ( align == 2 )
	{
		align = 'center';
	}
	else if ( align == 3 )
	{
		align = 'justify';
	}

	var left = parseInt(document.getElementById('p' + my_user_id).style.left) - 16 + window_x;
	var top = parseInt(document.getElementById('p' + my_user_id).style.top) - 64 + window_y;
	
	close_message_func = 'setTimeout(\'submit_choice(\\\'' + event_status + '\\\', document.getElementById(\\\'input_choice\\\').value);document.getElementById(\\\'message\\\').innerHTML=\\\'\\\';\', 200);';

	var choice_fork = '<select name="choices" id="input_choice">';

	var i = 0;
	while ( i < choices.length )
	{
		choice_fork += '<option value="' + i + '">' + choices[i] + '</option>';
		i++;
	}

	choice_fork += '</select>';

	if ( face )
	{
		if ( face[1] == 0 )
		{
			face[1] = 'left';
		}
		else
		{
			face[1] = 'right';
		}

		var show_face = '<img src="images/faces/' + face[0] + '" alt="" style="float:' + face[1] + '" />';
	}
	else
	{
		var show_face = '';
	}

	var area_value = '<form action="" onsubmit="' + close_message_func + 'return false;">' + choice_fork;
	var close_message = '<br /><div align="center"><input type="submit" value="' +  l_close_message + '" /></div></form>';
	
	document.getElementById('message').innerHTML = '<div id="message_layer" onmouseover="actual_layer=this.id" style="position:absolute;left:' + left + 'px;top:' + top + 'px;z-index:9999">' + message_box.begin + '<div class="message" align="' + align + '" style="text-align:' + align + '">' + show_face + '' + area_value + '' + close_message + '</div>' + message_box.end + '</div>';

	// bug with drag and select tag
	//start_drag('message_layer');
}

function input_string(message, event_status, align, face, number)
{
	message = htmlspecialchars_decode(message);
	if ( align < 1 || align > 3 )
	{
		align = 'left';
	}
	else if ( align == 1 )
	{
		align = 'right';
	}
	else if ( align == 2 )
	{
		align = 'center';
	}
	else if ( align == 3 )
	{
		align = 'justify';
	}

	var left = parseInt(document.getElementById('p' + my_user_id).style.left) - 16 + window_x;
	var top = parseInt(document.getElementById('p' + my_user_id).style.top) - 64 + window_y;
	
	close_message_func = 'setTimeout(\'submit_message(\\\'' + event_status + '\\\', document.getElementById(\\\'input_message\\\').value);document.getElementById(\\\'message\\\').innerHTML=\\\'\\\';\', 200);';

	if ( number )
	{
		input_number = true;
		close_message_func += 'input_number=false;';
		var input_type = 'numeric';
	}
	else
	{
		var input_type = 'text';
	}

	if ( face )
	{
		if ( face[1] == 0 )
		{
			face[1] = 'left';
		}
		else
		{
			face[1] = 'right';
		}

		var show_face = '<img src="images/faces/' + face[0] + '" alt="" style="float:' + face[1] + '" />';
	}
	else
	{
		var show_face = '';
	}

	var area_value = '<form action="" onsubmit="' + close_message_func + 'return false;"><input type="' + input_type + '" value="" id="input_message" name="input_message">';
	if ( trim(message) != '' )
	{
		area_value = '<br />' + area_value;
	}
	var close_message = '<br /><div align="center"><input type="submit" value="' +  l_close_message + '" /></div></form>';
	
	document.getElementById('message').innerHTML = '<div id="message_layer" onmouseover="actual_layer=this.id" style="position:absolute;left:' + left + 'px;top:' + top + 'px;z-index:9999">' + message_box.begin + '<div class="message" align="' + align + '" style="text-align:' + align + '">' + show_face + '' + message + '' + area_value + '' + close_message + '</div>' + message_box.end + '</div>';

	start_drag('message_layer');

	check_number();
	setTimeout('document.getElementById(\'input_message\').focus();', 500);
}

function check_number()
{
	if ( input_number && document.getElementById('message').innerHTML != '' )
	{
		if ( document.getElementById('input_message').value != '-' && isNaN(document.getElementById('input_message').value) )
		{
			var data = parseFloat(document.getElementById('input_message').value);
			if ( isNaN(data) )
			{
				data = '';
			}
			document.getElementById('input_message').value = data;
		}

		setTimeout('check_number();', 200);
	}
}

function wait(time, key, script)
{
	var count = 1;
	var tab = 'Array(\'' + quotes(script[0]) + '\'';
	while ( count < key )
	{
		tab += ', \'\'';
		count++;
	}
	while ( script[count] )
	{
		tab += ', \'' + quotes(script[count]) + '\'';
		count++;
	}
	tab += ')';

	key++;
	setTimeout('script_eval(' + key + ', ' + tab + ');', time);
}

function set_player_moving(moving, key, script)
{
	player[my_user_id].moving = moving;

	key++;
	script_eval(key, script);
}

function script_eval(key, script)
{
	if ( key == 0 )
	{
		event_wait++;
	}

	while ( script[key] && script[key] == 1 )
	{
		key++;
	}

	if ( script[key] )
	{
		eval(script[key]);
	}
	else
	{
		player[my_user_id].moving = false;
		window_x = 0;
		window_y = 0;
	}
}

function add_player(id, name, charaset, left, top, dir, moves, width, height)
{
	//add_charaset(charaset);

	var dir_left;
	var dir_top;

	if ( dir == 0 )
	{
		dir_left = 0;
		dir_top = 0;
	}
	else if ( dir == 1 )
	{
		dir_left = 0;
		dir_top = -height;
	}
	else if ( dir == 2 )
	{
		dir_left = 0;
		dir_top = -height * 3;
	}
	else if ( dir == 3 )
	{
		dir_left = 0;
		dir_top = -height * 2;
	}

	//alert('left:' + dir_left + 'px;top:' + dir_top + 'px;');

	players_in_map[id] = 'p' + id + '-' + moves;
	player[id] = new Object();
	player[id].charaset = charaset;
	player[id].moves = moves;
	player[id].left_gain = Math.ceil((width - tile_size) / 2);
	player[id].top_gain = height - tile_size;
	player[id].width = width;
	player[id].height = height;
	player[id].name = name;
	player[id].battle_id = 0;
	player[id].battle_state = 0;

	if ( id == my_user_id )
	{
		player[id].moving = player_moving;
	}
	else
	{
		player[id].moving = false;
	}

	var z_index = 9 + top * 2;
	left = left * tile_size - player[id].left_gain;
	top = top * tile_size - player[id].top_gain;

    var playerImg = "'images/charasets/" + charaset + "'";
	if ( document.getElementById('p' + id) )
	{
		document.getElementById('p' + id).innerHTML = '<div class="playersprite" style="width:' + width + 'px;height:' + height + 'px"><div class="playercharaset" id="charaset_' + id + '" style="left:' + dir_left + 'px;top:' + dir_top + 'px;background-image:url('+ playerImg +');width:' + (width * 4) + 'px;height:' + (height * 4) + 'px"></div></div><div class="playername" id="name_' + id + '" style="width:30px;">' + name + '</div><div class="playerspacer"></div>';
		document.getElementById('p' + id).style.left = left + 'px';
		document.getElementById('p' + id).style.top = top + 'px';
		//document.getElementById('p' + id).style.backgroundImage = 'url(images/sprites/' + charaset + '_' + pic + '.png)';
		document.getElementById('p' + id).style.zIndex = z_index;
	}
	else
	{
		document.getElementById('player_bloc').innerHTML = '<div class="playermain" id="p' + id + '" style="left:' + left + 'px;top:' + top + 'px;z-index:' + z_index + '"><div class="playersprite" style="width:' + width + 'px;height:' + height + 'px"><div class="playercharaset" id="charaset_' + id + '" style="left:' + dir_left + 'px;top:' + dir_top + 'px;background-image:url('+ playerImg +');width:' + (width * 4) + 'px;height:' + (height * 4) + 'px"></div></div><div class="playername" id="name_' + id + '" style="width:30px;">' + name + '</div><div class="playerspacer"></div></div>' + document.getElementById('player_bloc').innerHTML;
	}
	//alert('<div id="p' + id + '" style="left:' + left + 'px;top:' + top + 'px;z-index:' + z_index + '"><div class="playersprite" style="width:' + width + 'px;height:' + height + 'px"><div class="playercharaset" id="charaset_' + id + '" style="background-image:url(images/charasets/' + charaset + '.png);width:' + (width * 4) + 'px;height:' + (height * 4) + 'px"></div></div><div class="playername">' + name + '</div></div>');
}

function add_event(id, left, top, layer, width, height, picture, dir)
{
	events_placement[top][left][layer][events_placement[top][left][layer].length] = id;
	event_data[id] = new Object();
	event_data[id].id = id;
	event_data[id].layer = layer;

	if ( layer == 1 )
	{
		map_pass[top][left] = false;
	}


	var z_index = 9 + top * 2;

	event_data[id].left_gain = Math.ceil((width - tile_size) / 2);
	event_data[id].top_gain = height - tile_size;

	left = left * tile_size - event_data[id].left_gain;
	top = top * tile_size - event_data[id].top_gain;

    if ( !dir )
	{
        var tmp = "'images/sprites/" + picture + "'";
		document.getElementById('event_bloc').innerHTML += '<div id="' + id + '" style="left:' + left + 'px;top:' + top + 'px;background-image:url('+tmp+');width:' + width + 'px;height:' + height + 'px;z-index:' + z_index + '"></div>';
		event_data[id].changedir = false;
	}
	else
	{
		var dir_left = - dir[0] * width;
		var dir_top = - dir[1] * height;

		if ( dir[2] == 1 )
		{
			event_data[id].changedir = dir[0] + ',' + dir[1];
		}
		else
		{
			event_data[id].changedir = false;
		}

		//alert('<div class="playermain" id="' + id + '" style="left:' + left + 'px;top:' + top + 'px;z-index:' + z_index + '"><div class="eventsprite" style="width:' + width + 'px;height:' + height + 'px"><div class="eventcharaset" id="charaset_' + id + '" style="left:' + dir_left + 'px;top:' + dir_top + 'px;background-image:url(images/charasets/' + picture + '.png);width:' + (width * 4) + 'px;height:' + (height * 4) + 'px"></div></div></div>');
        var playerImg = "'images/charasets/" + picture + "'";

        document.getElementById('player_bloc').innerHTML += '<div class="playermain" id="' + id + '" style="left:' + left + 'px;top:' + top + 'px;z-index:' + z_index + '"><div class="eventsprite" style="width:' + width + 'px;height:' + height + 'px"><div class="eventcharaset" id="charaset_' + id + '" style="left:' + dir_left + 'px;top:' + dir_top + 'px;background-image:url('+ playerImg +');width:' + (width * 4) + 'px;height:' + (height * 4) + 'px"></div></div></div>';
	}
}

function remove_player(id)
{
	document.getElementById('p' + id).innerHTML = '';
	document.getElementById('p' + id).style.left = '';
	document.getElementById('p' + id).style.top = '';
	document.getElementById('p' + id).style.backgroundImage = '';
	document.getElementById('p' + id).style.zIndex = 1;

	players_in_map[id] = '';
}

function player_exists(id)
{
	if ( !document.getElementById('p' + id) || document.getElementById('p' + id).innerHTML == '' )
	{
		return false;
	}
	else
	{
		return true;
	}
}

function map_session_stop()
{
	stopped_map = true;
	document.location.href = u_index + '?mod=map&mode=stop';
}

function map_session_restart()
{
	stopped_map = true;
	document.location.href = u_index + '?mod=map&map_sid=' + map_sid;
}

function teleport(event_status)
{
	stopped_map = true;
	document.location.href = u_index + '?mod=map&event_status=' + event_status + '&map_sid=' + map_sid;
}

function map_session_refresh()
{
	map_refresh_1++;
	map_refresh_2 = true;
}

// update player position
function refresh_process()
{
	var n_key = m_key;
	for ( i_loop = 0; i_loop < 16; i_loop++ )
	{
		if ( n_key < 15 )
		{
			n_key++;
		}
		else
		{
			n_key = 0;
		}

		if ( m_move_id[m_key] > m_moves )
		{
			m_moves++;
		}
	}

	if ( !stopped_map )
	{
		if ( map_refresh_1 > map_refresh_0 || map_refresh_2 )
		{
			if ( map_refresh_1 <= map_refresh_0 )
			{
				map_refresh_2 = false;
			}
			else
			{
				map_refresh_0++;
			}

			chatcontent = chatbox_content;
			chatbox_content = '';
			new_chatbox_state[0] = parseInt(document.getElementById('drag_layer2').style.left);
			new_chatbox_state[1] = parseInt(document.getElementById('drag_layer2').style.top);
			new_chatbox_state[2] = chat_state;
			if ( chatbox_state[0] != new_chatbox_state[0] || chatbox_state[1] != new_chatbox_state[1] || chatbox_state[2] != new_chatbox_state[2] )
			{
				chatbox_state = new Array(new_chatbox_state[0], new_chatbox_state[1], new_chatbox_state[2]);
				var chat_pos = 'chat_pos=' + chatbox_state.join('-') + '&amp;';
			}
			else
			{
				var chat_pos = '';
			}
			refresh_action(1, u_index + '?mod=map&amp;mode=refresh&amp;table=' + m_table.join('_') + '&amp;move_id=' + m_move_id.join('_') + '&amp;players=' + players_in_map.join('') + '&amp;map_sid=' + map_sid + '&amp;chatbox=' + chatcontent + '&amp;chat_last=' + chat_last_id + '&amp;x=' + player_x + '&amp;y=' + player_y + '&amp;map_id=' + map_id + '&amp;' + chat_pos);
			//document.write('?mod=map&amp;mode=refresh&amp;table=' + m_table.join('_') + '&amp;move_id=' + m_move_id.join('_') + '&amp;players=' + players_in_map.join('') + '&amp;map_sid=' + map_sid + '&amp;chatbox=' + chatcontent + '&amp;chat_last=' + chat_last_id + '&amp;x=' + player_x + '&amp;y=' + player_y + '&amp;map_id=' + map_id + '&amp;' + chat_pos);
		}
		else
		{
			if ( debug )
			{
				alert('connexion failed !');
			}
			map_session_restart();
		}
	}
	setTimeout('refresh_process();', 2500);
}

function bloc_over(bloc_id)
{
	if ( !player[my_user_id].moving )
	{
		document.getElementById('action_bloc_cursor').style.left = document.getElementById(bloc_id).style.left;
		document.getElementById('action_bloc_cursor').style.top = document.getElementById(bloc_id).style.top;
	}
}

function bloc_out(bloc_id)
{
	if ( !player[my_user_id].moving )
	{
		document.getElementById('action_bloc_cursor').style.left = '-9999px';
		document.getElementById('action_bloc_cursor').style.top = '-9999px';
	}
}

function move_update(bloc_id, x, y)
{
	if ( m_key < 15 )
	{
		var m_key_previous = m_key;
		m_key++;
	}
	else
	{
		m_key = 0;
		var m_key_previous = 15;
	}
	player_x += x;
	player_y += y;
	m_table[m_key] = bloc_id;
	m_move_id[m_key] = m_move_id[m_key_previous] + 1;
}

function add_user_move(user_id, bloc_id, charaset, player_move_dir)
{
	eval('player_move_' + player_move_dir + '(user_id, bloc_id, charaset, \'p\');');
}

function move_map_player(bloc_id, move_id, user_id, loop)
{
	if ( players_in_map[user_id] == '' )
	{
		return false;
	}
	else
	{
		if ( loop == 1 )
		{
			players_in_map[user_id] = 'p' + user_id + '-' + move_id;
		}

		if ( player[user_id].moves + 1 == move_id && !player[user_id].moving )
		{
			if ( bloc_id == 'teleport' )
			{
				player[user_id].moving = true;
				remove_player(user_id);
			}
			else if ( (parseInt(document.getElementById('p' + user_id).style.left) + player[user_id].left_gain) < parseInt(document.getElementById(bloc_id).style.left) && (parseInt(document.getElementById('p' + user_id).style.top) + player[user_id].top_gain) == parseInt(document.getElementById(bloc_id).style.top) )
			{
				player[user_id].moving = true;
				player[user_id].moves++;
				player_move_right(user_id, bloc_id, player[user_id].charaset, 'p');
			}
			else if ( (parseInt(document.getElementById('p' + user_id).style.left) + player[user_id].left_gain) > parseInt(document.getElementById(bloc_id).style.left) && (parseInt(document.getElementById('p' + user_id).style.top) + player[user_id].top_gain) == parseInt(document.getElementById(bloc_id).style.top) )
			{
				player[user_id].moving = true;
				player[user_id].moves++;
				player_move_left(user_id, bloc_id, player[user_id].charaset, 'p');
			}
			else if ( (parseInt(document.getElementById('p' + user_id).style.top) + player[user_id].top_gain) < parseInt(document.getElementById(bloc_id).style.top) && (parseInt(document.getElementById('p' + user_id).style.left) + player[user_id].left_gain) == parseInt(document.getElementById(bloc_id).style.left) )
			{
				player[user_id].moving = true;
				player[user_id].moves++;
				player_move_down(user_id, bloc_id, player[user_id].charaset, 'p');
			}
			else if ( (parseInt(document.getElementById('p' + user_id).style.top) + player[user_id].top_gain) > parseInt(document.getElementById(bloc_id).style.top) && (parseInt(document.getElementById('p' + user_id).style.left) + player[user_id].left_gain) == parseInt(document.getElementById(bloc_id).style.left) )
			{
				player[user_id].moving = true;
				player[user_id].moves++;
				player_move_up(user_id, bloc_id, player[user_id].charaset, 'p');
			}
		}
		else
		{
			loop++;
			setTimeout('move_map_player(\'' + bloc_id + '\', ' + move_id + ', ' + user_id + ', ' + loop + ');', 200 / speed);
		}
	}
}

function bloc_click(bloc_id)
{
	if ( !player[my_user_id].moving && !stopped_map )
	{
        if ( path_finding = find_path(bloc_id, my_user_id) )
		{
			stop_walking = false;
			path_finding.shift();
			path_finished = false;
			user_moving = true;
			bloc_move(bloc_id);
		}
	}
	else if ( user_moving )
	{
		stop_walking = true;
	}
}

function bloc_move(final_bloc_id)
{
	/*if ( stopped_map )
	{
		alert('stopped_map');
	}
	else if ( player[my_user_id].moving )
	{
		alert('players_moving');
	}*/
	
	var bloc_id;

	if ( stop_walking )
	{
		path_finding = new Array();
		user_moving = false;
		path_finished = false;
		stop_walking = false;
		return;
	}

	if ( !stopped_map )
	{
		if ( path_finding && ( bloc_id = path_finding.shift() ) )
		{
			if ( bloc_id == final_bloc_id )
			{
				path_finished = true;
			}

			if ( (parseInt(document.getElementById('p' + my_user_id).style.left) + player[my_user_id].left_gain) < parseInt(document.getElementById(bloc_id).style.left) && (parseInt(document.getElementById('p' + my_user_id).style.top) + player[my_user_id].top_gain) == parseInt(document.getElementById(bloc_id).style.top) )
			{
				//document.getElementById('action_bloc_cursor').style.left = document.getElementById(bloc_id).style.left;
				//document.getElementById('action_bloc_cursor').style.top = parseInt(parseInt(document.getElementById('p' + my_user_id).style.top) + player[my_user_id].top_gain) + 'px';
				player[my_user_id].moving = true;
				add_user_move(my_user_id, bloc_id, p_charaset, 'right');
			}
			else if ( (parseInt(document.getElementById('p' + my_user_id).style.left) + player[my_user_id].left_gain) > parseInt(document.getElementById(bloc_id).style.left) && (parseInt(document.getElementById('p' + my_user_id).style.top) + player[my_user_id].top_gain) == parseInt(document.getElementById(bloc_id).style.top) )
			{
				//document.getElementById('action_bloc_cursor').style.left = document.getElementById(bloc_id).style.left;
				//document.getElementById('action_bloc_cursor').style.top = parseInt(parseInt(document.getElementById('p' + my_user_id).style.top) + player[my_user_id].top_gain) + 'px';
				player[my_user_id].moving = true;
				add_user_move(my_user_id, bloc_id, p_charaset, 'left');
			}
			else if ( (parseInt(document.getElementById('p' + my_user_id).style.top) + player[my_user_id].top_gain) < parseInt(document.getElementById(bloc_id).style.top) && (parseInt(document.getElementById('p' + my_user_id).style.left) + player[my_user_id].left_gain) == parseInt(document.getElementById(bloc_id).style.left) )
			{
				//document.getElementById('action_bloc_cursor').style.left = document.getElementById(bloc_id).style.left;
				//document.getElementById('action_bloc_cursor').style.top = document.getElementById(bloc_id).style.top;
				player[my_user_id].moving = true;
				add_user_move(my_user_id, bloc_id, p_charaset, 'down');
			}
			else if ( (parseInt(document.getElementById('p' + my_user_id).style.top) + player[my_user_id].top_gain) > parseInt(document.getElementById(bloc_id).style.top) && (parseInt(document.getElementById('p' + my_user_id).style.left) + player[my_user_id].left_gain) == parseInt(document.getElementById(bloc_id).style.left) )
			{
				//document.getElementById('action_bloc_cursor').style.left = document.getElementById(bloc_id).style.left;
				//document.getElementById('action_bloc_cursor').style.top = document.getElementById(bloc_id).style.top;
				player[my_user_id].moving = true;
				add_user_move(my_user_id, bloc_id, p_charaset, 'up');
			}
		}
	}

	if ( user_moving && bloc_id != final_bloc_id )
	{
		setTimeout('bloc_move(\'' + final_bloc_id + '\');', 1000 / speed);
	}
	else
	{
		setTimeout('user_moving = false;', 1000 / speed);
	}
}

function check_event(number, user_id, left, top, layer)
{
	if ( event_wait == number )
	{
		exec_event(user_id, left, top, layer);
	}
}

function exec_event(user_id, left, top, layer)
{
	var event_pos = left + '-' + top;
	var n_key = m_key;
	for ( i_loop = 0; i_loop < 16; i_loop++ )
	{
		if ( n_key < 15 )
		{
			n_key++;
		}
		else
		{
			n_key = 0;
		}

		if ( m_move_id[m_key] > m_moves )
		{
			m_moves++;
		}
	}

	if ( !stopped_map )
	{
		new_chatbox_state[0] = parseInt(document.getElementById('drag_layer2').style.left);
		new_chatbox_state[1] = parseInt(document.getElementById('drag_layer2').style.top);
		new_chatbox_state[2] = chat_state;
		if ( chatbox_state[0] != new_chatbox_state[0] || chatbox_state[1] != new_chatbox_state[1] || chatbox_state[2] != new_chatbox_state[2] )
		{
			chatbox_state = new Array(new_chatbox_state[0], new_chatbox_state[1], new_chatbox_state[2]);
			var chat_pos = 'chat_pos=' + chatbox_state.join('-') + '&amp;';
		}
		else
		{
			var chat_pos = '';
		}

		//alert(u_index + '?mod=map&amp;mode=event&amp;table=' + m_table.join('_') + '&amp;move_id=' + m_move_id.join('_') + '&amp;event_id=' + event_id + '&amp;layer=' + layer + '&amp;map_sid=' + map_sid + '&amp;');
		refresh_action(2, u_index + '?mod=map&amp;mode=event&amp;table=' + m_table.join('_') + '&amp;move_id=' + m_move_id.join('_') + '&amp;event_pos=' + event_pos + '&amp;layer=' + layer + '&amp;map_sid=' + map_sid + '&amp;x=' + player_x + '&amp;y=' + player_y + '&amp;map_id=' + map_id + '&amp;' + chat_pos);
		setTimeout('check_event(' + event_wait + ', ' + user_id + ', ' + left + ', ' + top + ', ' + layer + ');', 5000);
		//document.write('?mod=map&amp;mode=event&amp;table=' + m_table.join('_') + '&amp;move_id=' + m_move_id.join('_') + '&amp;event_pos=' + event_pos + '&amp;layer=' + layer + '&amp;map_sid=' + map_sid + '&amp;x=' + player_x + '&amp;y=' + player_y + '&amp;map_id=' + map_id + '&amp;' + chat_pos);
		
	}
}

function player_move_right(user_id, bloc_id, charaset, prefix)
{
	var player_id = prefix + user_id;
	var next_left_pos = Math.round((parseInt(document.getElementById(player_id).style.left) + tile_size + player[user_id].left_gain) / tile_size);
	var next_top_pos = Math.round((parseInt(document.getElementById(player_id).style.top) + player[user_id].top_gain) / tile_size);
	//var next_lower_bloc = 'l' + next_left_pos + '-' + next_top_pos;
	//var next_upper_bloc = 'u' + next_left_pos + '-' + next_top_pos;
	var next_event_bloc = 'i' + next_left_pos + '-' + next_top_pos;
    if ( map_pass[next_top_pos][next_left_pos] )
	{
		if ( user_id == my_user_id )
		{
			move_update(bloc_id, 1, 0);
		}
		document.getElementById('charaset_' + user_id).style.top = -(player[user_id].height * 2) + 'px';
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[1] + ') + \'px\';', 62 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[2] + ') + \'px\';', 125 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[3] + ') + \'px\';', 187 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[4] + ') + \'px\';', 250 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[5] + ') + \'px\';', 312 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[6] + ') + \'px\';', 375 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[7] + ') + \'px\';', 437 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[8] + ') + \'px\';', 500 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[9] + ') + \'px\';', 562 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[10] + ') + \'px\';', 625 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[11] + ') + \'px\';', 687 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[12] + ') + \'px\';', 750 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[13] + ') + \'px\';', 812 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[14] + ') + \'px\';', 875 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[15] + ') + \'px\';', 937 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) + ' + division[16] + ') + \'px\';', 1000 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + player[user_id].width + 'px\';', 63 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 2) + 'px\';', 188 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 3) + 'px\';', 313 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'0px\';', 438 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + player[user_id].width + 'px\';', 563 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 2) + 'px\';', 688 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 3) + 'px\';', 813 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'0px\';', 938 / speed);

		/*if ( (parseInt(document.getElementById(player_id).style.left) + tile_size + player[user_id].left_gain) < parseInt(document.getElementById(bloc_id).style.left) )
		{
			setTimeout('player_move_right(\'' + user_id + '\', \'' + bloc_id + '\', \'' + charaset + '\', \'' + prefix + '\')', 1000);
		}
		else
		{*/
			if ( prefix == 'p' )
			{
				
				if ( user_id == my_user_id && events_placement[next_top_pos][next_left_pos][0].length > 0 )
				{
					/*if ( event_data[next_event_bloc].changedir )
					{
						setTimeout('document.getElementById(\'charaset_' + next_event_bloc + '\').style.top = document.getElementById(\'' + next_event_bloc + '\').style.top;', 1000);
					}*/
					if ( path_finished )
					{
						setTimeout('exec_event(' + user_id + ', ' + next_left_pos + ', ' + next_top_pos + ', 0);', 1000 / speed);
					}
				}
				else
				{
					setTimeout('player[' + user_id + '].moving = false;', 1000 / speed);
				}
			}
		/*}*/
	}
	else
	{
		document.getElementById('charaset_' + user_id).style.top = -(player[user_id].height * 2) + 'px';
		if ( prefix == 'p' )
		{
			if ( user_id == my_user_id && events_placement[next_top_pos][next_left_pos][1].length > 0 )
			{
				if ( event_data[next_event_bloc].changedir )
				{
					document.getElementById('charaset_' + next_event_bloc).style.top = '-' + (parseInt(document.getElementById('charaset_' + next_event_bloc).style.height) / 4) + 'px';
					//alert(parseInt(document.getElementById(next_event_bloc).style.top));
				}

				if ( user_id == my_user_id )
				{
					move_update(bloc_id, 0, 0);
				}
				exec_event(user_id, next_left_pos, next_top_pos, 1);
			}
			else
			{
				player[user_id].moving = false;
			}
		}
	}
}

function player_move_left(user_id, bloc_id, charaset, prefix)
{
	var player_id = prefix + user_id;
	var next_left_pos = Math.round((parseInt(document.getElementById(player_id).style.left) - tile_size + player[user_id].left_gain) / tile_size);
	var next_top_pos = Math.round((parseInt(document.getElementById(player_id).style.top) + player[user_id].top_gain) / tile_size);
	//var next_lower_bloc = 'l' + next_left_pos + '-' + next_top_pos;
	//var next_upper_bloc = 'u' + next_left_pos + '-' + next_top_pos;
	var next_event_bloc = 'i' + next_left_pos + '-' + next_top_pos;

	if ( map_pass[next_top_pos][next_left_pos] )
	{
		if ( user_id == my_user_id )
		{
			move_update(bloc_id, -1, 0);
		}
		document.getElementById('charaset_' + user_id).style.top = -player[user_id].height + 'px';
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[1] + ') + \'px\';', 62 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[2] + ') + \'px\';', 125 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[3] + ') + \'px\';', 187 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[4] + ') + \'px\';', 250 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[5] + ') + \'px\';', 312 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[6] + ') + \'px\';', 375 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[7] + ') + \'px\';', 437 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[8] + ') + \'px\';', 500 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[9] + ') + \'px\';', 562 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[10] + ') + \'px\';', 625 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[11] + ') + \'px\';', 687 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[12] + ') + \'px\';', 750 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[13] + ') + \'px\';', 812 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[14] + ') + \'px\';', 875 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[15] + ') + \'px\';', 937 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.left = (parseInt(document.getElementById(\'' + player_id + '\').style.left) - ' + division[16] + ') + \'px\';', 1000 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + player[user_id].width + 'px\';', 63 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 2) + 'px\';', 188 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 3) + 'px\';', 313 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'0px\';', 438 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + player[user_id].width + 'px\';', 563 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 2) + 'px\';', 688 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 3) + 'px\';', 813 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'0px\';', 938 / speed);

		/*if ( (parseInt(document.getElementById(player_id).style.left) - tile_size + player[user_id].left_gain) > parseInt(document.getElementById(bloc_id).style.left) )
		{
			setTimeout('player_move_left(\'' + user_id + '\', \'' + bloc_id + '\', \'' + charaset + '\', \'' + prefix + '\')', 1000);
		}
		else
		{*/
			if ( prefix == 'p' )
			{
				if ( user_id == my_user_id && events_placement[next_top_pos][next_left_pos][0].length > 0 )
				{
					if ( path_finished )
					{
						setTimeout('exec_event(' + user_id + ', ' + next_left_pos + ', ' + next_top_pos + ', 0);', 1000 / speed);
					}
				}
				else
				{
					setTimeout('player[' + user_id + '].moving = false;', 1000 / speed);
				}
			}
		/*}*/
	}
	else
	{
		document.getElementById('charaset_' + user_id).style.top = -player[user_id].height + 'px';
		if ( prefix == 'p' )
		{
			if ( user_id == my_user_id && events_placement[next_top_pos][next_left_pos][1].length > 0 )
			{
				if ( event_data[next_event_bloc].changedir )
				{
					document.getElementById('charaset_' + next_event_bloc).style.top = '-' + (parseInt(document.getElementById('charaset_' + next_event_bloc).style.height) / 2) + 'px';
				}

				if ( user_id == my_user_id )
				{
					move_update(bloc_id, 0, 0);
				}
				exec_event(user_id, next_left_pos, next_top_pos, 1);
			}
			else
			{
				player[user_id].moving = false;
			}
		}
	}
}

function player_move_up(user_id, bloc_id, charaset, prefix)
{
	var player_id = prefix + user_id;
	var next_left_pos = Math.round((parseInt(document.getElementById(player_id).style.left) + player[user_id].left_gain) / tile_size);
	var next_top_pos = Math.round((parseInt(document.getElementById(player_id).style.top) - tile_size + player[user_id].top_gain) / tile_size);
	//var next_lower_bloc = 'l' + next_left_pos + '-' + next_top_pos;
	//var next_upper_bloc = 'u' + next_left_pos + '-' + next_top_pos;
	var next_event_bloc = 'i' + next_left_pos + '-' + next_top_pos;

	if ( map_pass[next_top_pos][next_left_pos] )
	{
		if ( user_id == my_user_id )
		{
			move_update(bloc_id, 0, -1);
		}
		document.getElementById(player_id).style.zIndex--;
		document.getElementById('charaset_' + user_id).style.top = -(player[user_id].height * 3) + 'px';
		setTimeout('document.getElementById(\'' + player_id + '\').style.zIndex--;', 1000 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[1] + ') + \'px\';', 62 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[2] + ') + \'px\';', 125 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[3] + ') + \'px\';', 187 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[4] + ') + \'px\';', 250 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[5] + ') + \'px\';', 312 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[6] + ') + \'px\';', 375 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[7] + ') + \'px\';', 437 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[8] + ') + \'px\';', 500 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[9] + ') + \'px\';', 562 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[10] + ') + \'px\';', 625 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[11] + ') + \'px\';', 687 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[12] + ') + \'px\';', 750 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[13] + ') + \'px\';', 812 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[14] + ') + \'px\';', 875 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[15] + ') + \'px\';', 937 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) - ' + division[16] + ') + \'px\';', 1000 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + player[user_id].width + 'px\';', 63 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 2) + 'px\';', 188 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 3) + 'px\';', 313 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'0px\';', 438 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + player[user_id].width + 'px\';', 563 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 2) + 'px\';', 688 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 3) + 'px\';', 813 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'0px\';', 938 / speed);

		/*if ( (parseInt(document.getElementById(player_id).style.top) - tile_size + player[user_id].top_gain) > parseInt(document.getElementById(bloc_id).style.top) )
		{
			setTimeout('player_move_up(\'' + user_id + '\', \'' + bloc_id + '\', \'' + charaset + '\', \'' + prefix + '\')', 1000);
		}
		else
		{*/
			if ( prefix == 'p' )
			{
				if ( user_id == my_user_id && events_placement[next_top_pos][next_left_pos][0].length > 0 )
				{
					if ( path_finished )
					{
						setTimeout('exec_event(' + user_id + ', ' + next_left_pos + ', ' + next_top_pos + ', 0);', 1000 / speed);
					}
				}
				else
				{
					setTimeout('player[' + user_id + '].moving = false;', 1000 / speed);
				}
			}
		/*}*/
	}
	else
	{
		document.getElementById('charaset_' + user_id).style.top = -(player[user_id].height * 3) + 'px';
		if ( prefix == 'p' )
		{
			if ( user_id == my_user_id && events_placement[next_top_pos][next_left_pos][1].length > 0 )
			{
				if ( event_data[next_event_bloc].changedir )
				{
					document.getElementById('charaset_' + next_event_bloc).style.top = 0;
				}

				if ( user_id == my_user_id )
				{
					move_update(bloc_id, 0, 0);
				}
				exec_event(user_id, next_left_pos, next_top_pos, 1);
			}
			else
			{
				player[user_id].moving = false;
			}
		}
	}
}

function player_move_down(user_id, bloc_id, charaset, prefix)
{
	var player_id = prefix + user_id;
	var next_left_pos = Math.round((parseInt(document.getElementById(player_id).style.left) + player[user_id].left_gain) / tile_size);
	var next_top_pos = Math.round((parseInt(document.getElementById(player_id).style.top) + tile_size + player[user_id].top_gain) / tile_size);
	//var next_lower_bloc = 'l' + next_left_pos + '-' + next_top_pos;
	//var next_upper_bloc = 'u' + next_left_pos + '-' + next_top_pos;
	var next_event_bloc = 'i' + next_left_pos + '-' + next_top_pos;

	if ( map_pass[next_top_pos][next_left_pos] )
	{
		if ( user_id == my_user_id )
		{
			move_update(bloc_id, 0, 1);
		}
		document.getElementById(player_id).style.zIndex++;
		document.getElementById('charaset_' + user_id).style.top = '0px';
		setTimeout('document.getElementById(\'' + player_id + '\').style.zIndex++;', 1000 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[1] + ') + \'px\';', 62 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[2] + ') + \'px\';', 125 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[3] + ') + \'px\';', 187 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[4] + ') + \'px\';', 250 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[5] + ') + \'px\';', 312 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[6] + ') + \'px\';', 375 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[7] + ') + \'px\';', 437 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[8] + ') + \'px\';', 500 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[9] + ') + \'px\';', 562 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[10] + ') + \'px\';', 625 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[11] + ') + \'px\';', 687 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[12] + ') + \'px\';', 750 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[13] + ') + \'px\';', 812 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[14] + ') + \'px\';', 875 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[15] + ') + \'px\';', 937 / speed);
		setTimeout('document.getElementById(\'' + player_id + '\').style.top = (parseInt(document.getElementById(\'' + player_id + '\').style.top) + ' + division[16] + ') + \'px\';', 1000 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + player[user_id].width + 'px\';', 63 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 2) + 'px\';', 188 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 3) + 'px\';', 313 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'0px\';', 438 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + player[user_id].width + 'px\';', 563 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 2) + 'px\';', 688 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'-' + (player[user_id].width * 3) + 'px\';', 813 / speed);
		setTimeout('document.getElementById(\'charaset_' + user_id + '\').style.left = \'0px\';', 938 / speed);

		/*if ( (parseInt(document.getElementById(player_id).style.top) + tile_size + player[user_id].top_gain) < parseInt(document.getElementById(bloc_id).style.top) )
		{
			setTimeout('player_move_down(\'' + user_id + '\', \'' + bloc_id + '\', \'' + charaset + '\', \'' + prefix + '\')', 1000);
		}
		else
		{*/
			if ( prefix == 'p' )
			{
				if ( user_id == my_user_id && events_placement[next_top_pos][next_left_pos][0].length > 0 )
				{
					if ( path_finished )
					{
						setTimeout('exec_event(' + user_id + ', ' + next_left_pos + ', ' + next_top_pos + ', 0);', 1000 / speed);
					}
				}
				else
				{
					setTimeout('player[' + user_id + '].moving = false;', 1000 / speed);
				}
			}
		/*}*/
	}
	else
	{
		document.getElementById('charaset_' + user_id).style.top = '0px';
		if ( prefix == 'p' )
		{
			if ( user_id == my_user_id && events_placement[next_top_pos][next_left_pos][1].length > 0 )
			{
				if ( event_data[next_event_bloc].changedir )
				{
					document.getElementById('charaset_' + next_event_bloc).style.top = '-' + (parseInt(document.getElementById('charaset_' + next_event_bloc).style.height) / 4) * 3 + 'px';
				}

				if ( user_id == my_user_id )
				{
					move_update(bloc_id, 0, 0);
				}
				exec_event(user_id, next_left_pos, next_top_pos, 1);
			}
			else
			{
				player[user_id].moving = false;
			}
		}
	}
}

function l_bloc(id, left, top, background_image, z_index)
{
	if ( left == 0 )
	{
		map_pass[top] = new Array();
		events_placement[top] = new Array();
	}
	
	events_placement[top][left] = new Array();
	events_placement[top][left][0] = new Array();
	events_placement[top][left][1] = new Array();

	if ( z_index == 2 )
	{
		map_pass[top][left] = false;
	}
	else
	{
		map_pass[top][left] = true;
	}

	left = left * tile_size;
	top = top * tile_size;

	if ( background_image != '' )
	{
		if ( !map_images[background_image] )
		{
			document.getElementById('cache_images').innerHTML += '<img src="images/tiles/' + background_image + '" width="1" height="1" onload="all_loaded--;" />';
			map_images[background_image] = true;
			all_loaded++;
		}
        var img = '\'images/tiles/' + background_image + '\'';
		background_image = 'background-image:url(' + img + ');';
		lower_buffer += '<div id="' + id + '" style="left:' + left + 'px;top:' + top + 'px;' + background_image + 'z-index:' + z_index + ';width:' + tile_size + 'px;height:' + tile_size + 'px"></div>';
	}
}

function u_bloc(id, left, top, background_image, z_index)
{
	if ( z_index == 6 )
	{
		map_pass[top][left] = false;
	}

	left = left * tile_size;
	top = top * tile_size;

	if ( background_image != '' )
	{
		if ( !map_images[background_image] )
		{
			document.getElementById('cache_images').innerHTML += '<img src="images/tiles/' + background_image + '" width="1" height="1" onload="all_loaded--;" />';
			map_images[background_image] = true;
			all_loaded++;
		}
        var img = '\'images/tiles/' + background_image + '\'';
		background_image = 'background-image:url(' + img + ');';
		upper_buffer += '<div id="' + id + '" style="left:' + left + 'px;top:' + top + 'px;' + background_image + 'z-index:' + z_index + ';width:' + tile_size + 'px;height:' + tile_size + 'px"></div>';
	}
}

function a_bloc(width, height)
{
	var left = 0;
	var top = 0;
	var buffer = '';
	var mouseout = '';
	while ( top * tile_size < height )
	{
		while ( left * tile_size < width )
		{
			if ( left == 0 || left * tile_size - tile_size == width || top == 0 || top * tile_size - tile_size == height )
			{
				mouseout = ' onmouseout="bloc_out(this.id)"';
			}
			else
			{
				mouseout = '';
			}
			buffer += '<div id="a' + left + '-' + top + '" style="left:' + (left * tile_size) + 'px;top:' + (top * tile_size) + 'px;z-index:9997;width:' + tile_size + 'px;height:' + tile_size + 'px" onclick="bloc_click(this.id)"></div>';
			left++;
		}
		left = 0;
		top++;
	}
	document.getElementById('action_bloc').innerHTML = buffer;
}

function heuristic(x0, y0, x1, y1)
{
		return Math.abs(x1 - x0) + Math.abs(y1 - y0);
}

function make_pnt(x0, y0, x1, y1, pathcost, openlist, closelist, px, py)
{
	this.x = x0;
	this.y = y0;
	this.pathcost = pathcost;
	//需要的格子数
	this.togocost = heuristic(x0, y0, x1, y1);
	this.openlist = openlist;
	this.closelist = closelist;
	this.px = px;
	this.py = py;
}

function find_path(bloc_id, user_id)
{
	var clonemap = new Array();
	var min;
	var nearestind;
	var curopenind;
	var curpnt;
	var curtotcost;
	var i = 0;
	var j = 0;
	var curpathcost;
	var newpt;
	var curx;
	var cury;
	//tile个数
	var width_tile = Math.floor(map_width / tile_size);
	var height_tile = Math.floor(map_height / tile_size);
    for ( i = 0; i <= height_tile; i++ )
	{
		clonemap[i] = new Array();

		for ( j = 0; j <= width_tile; j++ )
		{
			clonemap[i][j] = false;
		}
	}

	//点击位置
	var x1 = Math.floor(parseInt(document.getElementById(bloc_id).style.left) / tile_size);
	var y1 = Math.floor(parseInt(document.getElementById(bloc_id).style.top) / tile_size);
	//玩家位置
	var x0 = Math.floor((parseInt(document.getElementById('p' + user_id).style.left) + player[user_id].left_gain) / tile_size);
	var y0 = Math.floor((parseInt(document.getElementById('p' + user_id).style.top) + player[user_id].top_gain) / tile_size);

	var x = x0;
	var y = y0;
	var openlist = new Array();
	var closelist = new Array();

	var pnt = new make_pnt(x0, y0, x1, y1, 0, true, false, 'stop', 'stop');

	clonemap[y0][x0] = pnt;
	openlist.push(pnt);
	// 开始搜索路径
	while ( openlist.length > 0 )
	{
		min = 99999999999;
		
		nearestind = 0;
		curopenind = openlist.length;
		curpnt = null;
		while ( curopenind-- )
		{
			curpnt = clonemap[openlist[curopenind].y][openlist[curopenind].x];
			curtotcost = curpnt.pathcost + curpnt.togocost;
			if ( curtotcost < min )
			{
				nearestind = curopenind;
				min = curtotcost;
			}
		}

		curpnt = openlist[nearestind];
		curpnt.openlist = false;
		curpnt.closelist = true;

        // 玩家与点击位置重合时，停止循环
		if ( curpnt.x == x1 && curpnt.y == y1 )
		{
			break;
		}

		closelist[closelist.length] = curpnt;
		openlist.splice(nearestind, 1);

		//开始寻找可行路径
		for ( i = -1; i <= 1; i++ )
		{
			for ( j = -1; j <= 1; j++ )
			{
				curx = curpnt.x + i;
				cury = curpnt.y + j;

                if ( ( i || j ) && curx != -1 && curx != width_tile && cury != -1 && cury != height_tile && !( i && j ) && ( !clonemap[cury][curx] || !clonemap[cury][curx].closelist ) && ( map_pass[cury][curx] || ( !map_pass[cury][curx] && curx == x1 && cury == y1 ) ) )
				{
					curpathcost = curpnt.pathcost + heuristic(curx, cury, x1, y1);
					if ( clonemap[cury][curx] && clonemap[cury][curx].openlist )
					{
						if ( curpathcost < clonemap[cury][curx].pathcost )
						{
							clonemap[cury][curx].px = curpnt.x;
							clonemap[cury][curx].py = curpnt.y;
						}
					}
					else
					{
						newpt = new make_pnt(curx, cury, x1, y1, curpathcost, true, false, curpnt.x, curpnt.y);
						clonemap[cury][curx] = newpt;
						openlist[openlist.length] = newpt;
					}
				}
			}
		}
	}
	// fin de boucle
	if ( curpnt.x != x1 || curpnt.y != y1 )
	{
		return false;
	}
	else
	{
		var returnarray = new Array();
		returnarray[returnarray.length] = 'a' + curpnt.x + '-' + curpnt.y;
		while ( curpnt.px != 'stop' && curpnt.py != 'stop' )
		{
			curpnt = clonemap[curpnt.py][curpnt.px];
			newpt = 'a' + curpnt.x + '-' + curpnt.y;
			returnarray[returnarray.length] = newpt;
		}
		return returnarray.reverse();
	}
}

function battle(id, battle_id, battle_state)
{
	if ( battle_id > 0 && battle_state < 3 && player[id].battle_id != battle_id )
	{
		player[id].battle_id = battle_id;
		document.getElementById('name_' + id).style.color = 'red';
	}
	else if ( ( battle_id == 0 && player[id].battle_id != 0 ) || ( battle_state == 3 && player[id].battle_state != 3 ) )
	{
		player[id].battle_id = 0;
		document.getElementById('name_' + id).style.color = 'white';
	}
}

function map_loaded()
{
	//document.onkeypress = process_keypress;
	refresh_loop(1);
	refresh_loop(2);
	start_drag('drag_layer2');
	var map_buffer = document.getElementById('global_map').innerHTML;
	document.getElementById('global_map').innerHTML = '';
	document.getElementById('global_map').innerHTML = map_buffer;
	document.getElementById('map_loader').innerHTML = '';
	document.getElementById('cache_images').innerHTML = '';
	setTimeout('refresh_process();', 5100);
	setTimeout('map_start();', 100);
	//setTimeout('script_eval(0, new Array(\'show_message(\\\'<img src=images/charasets/npcs/man_01.png alt="image" /> <strong>Salut mec, sa farte ? Moi, sa farte bien. Alors, l�-bas, cest une petite grotte toute mimi.</strong>\\\', key, script, 0, false, false);\'));', 1000);
}

function check_loading()
{
	if ( all_loaded > 0 )
	{
		setTimeout('check_loading()', 200);
	}
	else
	{
		map_loaded();
	}
}

map_preload();