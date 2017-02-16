
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

var allys = new Array();
var opponents = new Array();
var allies_in_battle = new Array();
var opponents_in_battle = new Array();
var battle_refresh_2 = false;
var battle_refresh_1 = 1;
var battle_refresh_0 = 0;
var stopped_battle = false;
var refresh_var = 0;
var method_forcing = '';
var content_to_refresh_1 = false;
var content_to_refresh_2 = false;
var chatbox_content = '';
var chat_history = true;
var actual_layer = '';
var chat_state = chatbox_state[2];
var new_chatbox_state = new Array(chatbox_state[0], chatbox_state[1], chatbox_state[2]);
var actual_mode = 0;
var timeouts = 0;
var message_id = 0;

document.getElementById('battle_tools').innerHTML = player_waiting;

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

//循环执行，如果脚本代码传入，则执行
function refresh_loop(refresh_id) {
	eval('if ( content_to_refresh_' + refresh_id + ' ) {  eval(content_to_refresh_' + refresh_id + '); content_to_refresh_' + refresh_id + ' = false; }');
	setTimeout('refresh_loop(' + refresh_id + ');', 200);
}

/**
 * ajax请求
 */
function refresh_action(refresh_id, file_name, refresh_time) {
    var url = str_replace(file_name, '&amp;', '&') + 'refresh_var=' + refresh_var + '&refresh_id=' + refresh_id;

    $.get(url,function (res) {
        if (res) {
            eval('content_to_refresh_' + refresh_id + ' = res;');
        }else{
            battle_session_restart();
        }
    });
    refresh_var++;


    if ( refresh_time ) {
        setTimeout('refresh_action(' + refresh_id + ', \'' + file_name + '\', ' + refresh_time + ')', refresh_time);
    }
}

function win_battle(gain_exp, gain_points, level_up)
{
	stopped_battle = true;
	
	if ( level_up )
	{
		setTimeout('document.location.href = \'' + u_index + '?mod=battle&mode=win&level_up=' + level_up + '\';', 1000);
	}
	else
	{
		setTimeout('document.location.href = \'' + u_index + '?mod=battle&mode=win\';', 1000);
	}
}

function battle_session_stop()
{
	stopped_battle = true;
	document.location.href = u_index + '?mod=battle&mode=stop';
}

function battle_session_restart()
{
    stopped_battle = true;
    document.location.href = u_index + '?mod=battle';
}

function battle_session_refresh()
{
	battle_refresh_1++;
}

// update
function refresh_process()
{
	if ( !stopped_battle )
	{
		if ( battle_refresh_1 > battle_refresh_0 || battle_refresh_2 )
		{
			if ( battle_refresh_1 <= battle_refresh_0 )
			{
				battle_refresh_2 = false;
			}
			else
			{
				battle_refresh_0++;
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
			refresh_action(1, u_index + '?mod=battle&amp;mode=refresh&amp;allies=' + allies_in_battle.join(',') + '&amp;opponents=' + opponents_in_battle.join(',') + '&amp;chatbox=' + chatcontent + '&amp;chat_last=' + chat_last_id + '&amp;' + chat_pos + 'mid=' + message_id + '&amp;');
		}
		else
		{
			if ( debug )
			{
				alert('连接失败!');
			}
			battle_session_stop();
		}
	}
	setTimeout('refresh_process();', 5000);
}

//添加队友到战斗场景
function add_ally(id, name, picture)
{
	allies_in_battle.push(id);
	allys[id] = {};
    allys[id].name = name;
    allys[id].picture = picture;


    if ( document.getElementById('ally_' + id) )
	{
		document.getElementById('ally_' + id).innerHTML = '<div style="padding:10px"><span style="color:white"><b>' + name + '</b></span><br /><br /><img src="images/battlers/' + picture + '" alt="" /></div>';
	}
	else
	{
		document.getElementById('allies').innerHTML += '<div id="ally_' + id + '" style="display:inline"><div style="padding:10px"><span style="color:white"><b>' + name + '</b></span><br /><br /><a href="#" onclick="battler_click(' + id + ');return false;"><img src="images/battlers/' + picture + '" alt="" border="0" /></a></div></div>';
	}
}

//添加敌人到战斗场景
function add_opponent(id, name, picture)
{
	opponents_in_battle.push(id);
	opponents[id] = {};
    opponents[id].name = name;
    opponents[id].picture = picture;


    if ( document.getElementById('opponent_' + id) )
	{
		document.getElementById('opponent_' + id).innerHTML = '<div style="padding:10px"><span style="color:white"><b>' + name + '</b></span><br /><br /><img src="images/monsters/' + picture + '" alt="" /></div>';
	}
	else
	{
		document.getElementById('opponents').innerHTML += '<div id="opponent_' + id + '" style="display:inline"><div style="padding:10px"><span style="color:white"><b>' + name + '</b></span><br /><br /><a href="#" onclick="battler_click(' + id + ');return false;"><img src="images/monsters/' + picture + '" alt="" border="0" /></a></div></div>';
	}
}

//从战斗场景移除队友
function remove_ally(id)
{
	document.getElementById('ally_' + id).innerHTML = '';
	allies_in_battle.pop();
	allies_in_battle[id] = '';
}

//从战斗场景移除敌人
function remove_opponent(id)
{
	document.getElementById('opponent_' + id).innerHTML = '';
	opponents_in_battle[id] = '';
}

//攻击开始
function battler_click(id)
{
	if ( actual_mode == 1 )
	{
		if ( opponents[id] )
		{
            $("#sprite").show();
			animation();
			actual_mode = 0;
            // alert(id);
            document.getElementById('battle_tools').innerHTML = player_waiting;
            message_action(allys[my_user_id].name+' 攻击 '+opponents[id].name,message_id++);
			//刷新
			// refresh_action(2, u_index + '?mod=battle&amp;mode=action&amp;type=basic&amp;op_id=' + id + '&amp;');
			// setTimeout('check_timeout(' + timeouts + ');', 5000);
            battle_timeout(user_speed);
        }
		else
		{
			document.getElementById('battle_tools').innerHTML = l_click_opponent;
		}
	}
}
var sfx = 'music/sfx/';
function animation() {
    var p = $('#ally_' + my_user_id).offset();
    console.log(p);

    $("#sprite").css({'left':p.x,'top':p.y});
    $("#sfx")[0].play();
    // $("#sfx").attr('src',sfx+'Cannon.wav');
    $("#sprite").css('animation-play-state','running');
    setTimeout(function () {
        $("#sfx").attr({'src':sfx+'CannonEnd.wav','autoplay':'true'});
    },1300);
    setTimeout(function () {
        $("#sprite").hide();
    },2000)

}

function check_timeout(k)
{
	if ( timeouts == k )
	{
		battle_session_stop();
	}
}

function battle_timeout(time)
{
	if ( time == user_speed )
	{
		timeouts++;
	}

	if ( time > 0 )
	{
		document.getElementById('timeout').innerHTML = time;
		setTimeout('battle_timeout(' + (time - 1) + ');', 1000);
	}
	else
	{
		document.getElementById('battle_tools').innerHTML = player_tools;
	}
}

function basic_action()
{
	var id = parseInt(document.getElementById('basic_action_select').value);
	switch (id){
        case 1:
            document.getElementById('battle_tools').innerHTML = l_click_to_attack;
            actual_mode = 1;
            break;
		case 3:
            //刷新
            refresh_action(2, u_index + '?mod=battle&mode=action&type=flee&allies=' + allies_in_battle.join(',') + '&opponents=' + opponents_in_battle.join(','));
            break;
		case 2:
            // document.getElementById('battle_tools').innerHTML = my_user_name + ' 进行防御';
            message_action(my_user_name + ' 进行防御',message_id++);
            // document.getElementById('battle_tools').innerHTML =player_tools;
			break;
	}
}

function tank_action()
{
    var id = parseInt(document.getElementById('tank_action_select').value);

    if ( id == 1 )
    {
        document.getElementById('battle_tools').innerHTML = l_click_to_attack;
        actual_mode = 1;
    }
}

function message_action(message, id)
{
	message_id = id;
	document.getElementById('battle_actions').innerHTML += message + '<br />';
	document.getElementById('battle_actions').scrollTop = document.getElementById('battle_actions').scrollHeight;
}

battle_preload();

window.onload = function()
{
	refresh_loop(1);
	refresh_loop(2);
	start_drag('drag_layer2');
	setTimeout('refresh_process();', 5100);
};