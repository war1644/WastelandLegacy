<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<style id="css">
';

echo ' @keyframes aniFrame{
';

echo '  100%{background-position-x:100%;}
';

echo ' }
';

echo ' @keyframes burstPlayer{
';

echo ' 0%{left:0;}
';

echo ' 100%{left:25px;}
';

echo ' }
';

echo '
';

echo ' @keyframes burstEnemy{
';

echo ' 0%{left:0;}
';

echo ' 100%{left:-25px;}
';

echo ' }
';

echo '
';

echo ' .sprite_dad{
';

echo '  width: 192px;
';

echo '  height: 192px;
';

echo '  position: relative;
';

echo ' }
';

echo '
';

echo '
';

echo ' #sprite {
';

echo '  width: 100%;
';

echo '  height: 100%;
';

echo '  background-image: url("images/sprites/mAttack.png");
';

echo '  animation: aniFrame steps(14,end) 2s infinite;
';

echo '  animation-play-state:paused;
';

echo '  position: absolute;
';

echo ' }
';

echo '
';

echo '
';

echo '</style>
';

echo '
';

echo '<audio id="sfx" src="music/sfx/Cannon.wav"></audio>
';

echo '<div id="drag_layer2" onmouseover="actual_layer=this.id" style="position:absolute;left:0;top:0;z-index:9999">
';

echo ' <table cellspacing="1" cellpadding="2" class="portaline">
';

echo '  <tr>
';

echo '   <th id="chat_title"></th>
';

echo '  </tr>
';

echo '  <tr>
';

echo '   <td class="row1">
';

echo '    <div id="chat_hidden" class="hidden_layer"><div id="chatbox"></div><br /><div style="padding-left:15px"><i>' , ((isset($this->tpldata['.'][0]['L_POST_MESSAGE'])) ? $this->tpldata['.'][0]['L_POST_MESSAGE'] : ((isset($lang->post_message)) ? $lang->post_message : '')) , '</i><br />
';

echo '    <form action="" onsubmit="submit_chat();return false;"><input type="text" id="message_chat" maxlength="128" value="" onkeypress="if(event.keyCode==13)submit_chat();" />&nbsp; <input type="submit" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? $this->tpldata['.'][0]['L_VALIDATE'] : ((isset($lang->validate)) ? $lang->validate : '')) , '" class="button" /></form><br /><br /></div>
';

echo '    </div></div>
';

echo '    <div id="chat_show" style="display:inline"></div>
';

echo '   </td>
';

echo '  </tr>
';

echo ' </table>
';

echo '</div>
';

echo '
';

echo '<table width="100%" cellpadding="2" cellspacing="1" border="0" class="portaline">
';

echo '
';

echo ' <tr>
';

echo '  <th colspan="2">' , ((isset($this->tpldata['.'][0]['L_BATTLE'])) ? $this->tpldata['.'][0]['L_BATTLE'] : ((isset($lang->battle)) ? $lang->battle : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="cat" align="center" width="50%">' , ((isset($this->tpldata['.'][0]['L_OPPONENTS'])) ? $this->tpldata['.'][0]['L_OPPONENTS'] : ((isset($lang->opponents)) ? $lang->opponents : '')) , '</td>
';

echo '  <td class="cat" align="center" width="50%">' , ((isset($this->tpldata['.'][0]['L_ALLIES'])) ? $this->tpldata['.'][0]['L_ALLIES'] : ((isset($lang->allies)) ? $lang->allies : '')) , '</td>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td style="background-color:black" align="center" valign="middle" colspan="2">
';

echo '  <div style="width:640px;height:320px;background-image:url(\'images/backgrounds/' , ((isset($this->tpldata['.'][0]['BATTLE_BACKGROUND'])) ? $this->tpldata['.'][0]['BATTLE_BACKGROUND'] : '') , '\');background-size:contain;padding:0px">
';

echo '
';

echo '  <table cellpadding="0" cellspacing="0" border="0" bordercolor="black">
';

echo '  <tr><td align="center">
';

echo '    <div id="opponents" style="width:318px;height:318px;overflow:auto">
';

echo '    </div>
';

echo '
';

echo '
';

echo '  </td><td align="center">
';

echo '
';

echo '    <div id="allies" style="width:318px;height:318px;overflow:auto">
';

echo '    </div>
';

echo '
';

echo '  </td></tr>
';

echo '  </table>
';

echo '
';

echo '  </div>
';

echo '  </td>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td colspan="2" class="cat">' , ((isset($this->tpldata['.'][0]['L_BATTLE_MENU'])) ? $this->tpldata['.'][0]['L_BATTLE_MENU'] : ((isset($lang->battle_menu)) ? $lang->battle_menu : '')) , '</td>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row2" align="center" valign="top">
';

echo '  <div id="battle_tools" style="padding:20px">
';

echo '
';

echo '  </div>
';

echo '  </td>
';

echo '  <td class="row2" align="center" valign="top">
';

echo '  <div id="battle_actions">
';

echo '
';

echo '  </div>
';

echo '  </td>
';

echo ' </tr>
';

echo ' <div class="sprite_dad">
';

echo '    <div id="sprite"></div>
';

echo ' </div>
';

echo '
';

echo '</table>
';

echo '<script type="text/javascript">
';

echo 'var my_user_id = ' , ((isset($this->tpldata['.'][0]['USER_ID'])) ? $this->tpldata['.'][0]['USER_ID'] : '') , ';
';

echo 'var my_user_name = \'' , ((isset($this->tpldata['.'][0]['USER_NAME'])) ? quotes($this->tpldata['.'][0]['USER_NAME']) : '') , '\';
';

echo 'var refresh_method = ' , ((isset($this->tpldata['.'][0]['REFRESH_METHOD'])) ? $this->tpldata['.'][0]['REFRESH_METHOD'] : '') , ';
';

echo 'var u_index = \'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? quotes($this->tpldata['.'][0]['U_INDEX']) : '') , '\';
';

echo 'var l_flood_alert = \'' , ((isset($this->tpldata['.'][0]['L_FLOOD_ALERT'])) ? quotes($this->tpldata['.'][0]['L_FLOOD_ALERT']) : ((isset($lang->flood_alert)) ? quotes($lang->flood_alert) : '')) , '\';
';

echo 'var l_click_to_attack = \'' , ((isset($this->tpldata['.'][0]['L_CLICK_TO_ATTACK'])) ? quotes($this->tpldata['.'][0]['L_CLICK_TO_ATTACK']) : ((isset($lang->click_to_attack)) ? quotes($lang->click_to_attack) : '')) , '\';
';

echo 'var l_click_opponent = \'' , ((isset($this->tpldata['.'][0]['L_CLICK_OPPONENT'])) ? quotes($this->tpldata['.'][0]['L_CLICK_OPPONENT']) : ((isset($lang->click_opponent)) ? quotes($lang->click_opponent) : '')) , '\';
';

echo 'var chat_last_id = ' , ((isset($this->tpldata['.'][0]['LAST_CHAT_ID'])) ? $this->tpldata['.'][0]['LAST_CHAT_ID'] : '') , ';
';

echo 'var chatbox_state = new Array(' , ((isset($this->tpldata['.'][0]['CHATBOX_STATE'])) ? $this->tpldata['.'][0]['CHATBOX_STATE'] : '') , ');
';

echo '
';

echo 'var chatbox_header = new Object();
';

echo 'chatbox_header.reduce = \'<div align="left"><div style="position:absolute"><form action="" onsubmit="return false"><input type="button" class="button" id="chat_state" value="' , ((isset($this->tpldata['.'][0]['L_CHATBOX_REDUCE'])) ? quotes($this->tpldata['.'][0]['L_CHATBOX_REDUCE']) : ((isset($lang->chatbox_reduce)) ? quotes($lang->chatbox_reduce) : '')) , '" onclick="change_chat_state()" /></form></div></div>' , ((isset($this->tpldata['.'][0]['L_CHATBOX'])) ? quotes($this->tpldata['.'][0]['L_CHATBOX']) : ((isset($lang->chatbox)) ? quotes($lang->chatbox) : '')) , '\';
';

echo 'chatbox_header.increase = \'<form action="" onsubmit="return false"><input type="button" class="button" id="chat_state" value="' , ((isset($this->tpldata['.'][0]['L_CHATBOX_INCREASE'])) ? quotes($this->tpldata['.'][0]['L_CHATBOX_INCREASE']) : ((isset($lang->chatbox_increase)) ? quotes($lang->chatbox_increase) : '')) , '" onclick="change_chat_state()" /></form> &nbsp; ' , ((isset($this->tpldata['.'][0]['L_CHATBOX'])) ? quotes($this->tpldata['.'][0]['L_CHATBOX']) : ((isset($lang->chatbox)) ? quotes($lang->chatbox) : '')) , '\';
';

echo '
';

echo 'var message_box = new Object();
';

echo 'message_box.begin = \'<table cellspacing="0" cellpadding="0" border="0"><tr><td class="m_top_left"><div class="m_top_left_div"></div></td><td class="m_top_center"></td><td class="m_top_right"></td></tr><tr><td class="m_middle_left"></td><td class="m_middle_center">\';
';

echo 'message_box.end = \'</td><td class="m_middle_right"></td></tr><tr><td class="m_bottom_left"></td><td class="m_bottom_center"></td><td class="m_bottom_right"><div class="m_bottom_right_div"></div></td></tr></table>\';
';

echo '
';

echo '
';

echo 'var player_tools = \'<form onsubmit="return false;">\' +
';

echo '    \'' , ((isset($this->tpldata['.'][0]['L_BASIC_ACTION'])) ? quotes($this->tpldata['.'][0]['L_BASIC_ACTION']) : ((isset($lang->basic_action)) ? quotes($lang->basic_action) : '')) , ' : <select name="basic_action_select" id="basic_action_select">\' +
';

echo '    \'<option value="1">' , ((isset($this->tpldata['.'][0]['L_ACT_ATTACK'])) ? quotes($this->tpldata['.'][0]['L_ACT_ATTACK']) : ((isset($lang->act_attack)) ? quotes($lang->act_attack) : '')) , '</option>\' +
';

echo '    \'<option value="2">' , ((isset($this->tpldata['.'][0]['L_ACT_DEFEND'])) ? quotes($this->tpldata['.'][0]['L_ACT_DEFEND']) : ((isset($lang->act_defend)) ? quotes($lang->act_defend) : '')) , '</option>\' +
';

echo '    \'<option value="3">' , ((isset($this->tpldata['.'][0]['L_ACT_FLEE'])) ? quotes($this->tpldata['.'][0]['L_ACT_FLEE']) : ((isset($lang->act_flee)) ? quotes($lang->act_flee) : '')) , '</option>\' +
';

echo '    \'</select> <input type="button" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? quotes($this->tpldata['.'][0]['L_VALIDATE']) : ((isset($lang->validate)) ? quotes($lang->validate) : '')) , '" class="button" onclick="basic_action();" />\' +
';

echo '    \'</form>\';
';

echo 'var tank_player_tools = \'<form onsubmit="return false;">\' +
';

echo '    \'' , ((isset($this->tpldata['.'][0]['L_TANK_ACTION'])) ? quotes($this->tpldata['.'][0]['L_TANK_ACTION']) : ((isset($lang->tank_action)) ? quotes($lang->tank_action) : '')) , ' : <select name="tank_action_select" id="tank_action_select">\' +
';

echo '    \'<option value="1">' , ((isset($this->tpldata['.'][0]['L_TANK_MAIN_CANNON'])) ? quotes($this->tpldata['.'][0]['L_TANK_MAIN_CANNON']) : ((isset($lang->tank_main_cannon)) ? quotes($lang->tank_main_cannon) : '')) , '</option>\' +
';

echo '    \'<option value="2">' , ((isset($this->tpldata['.'][0]['L_TANK_SUBCANNON'])) ? quotes($this->tpldata['.'][0]['L_TANK_SUBCANNON']) : ((isset($lang->tank_subcannon)) ? quotes($lang->tank_subcannon) : '')) , '</option>\' +
';

echo '    \'<option value="3">' , ((isset($this->tpldata['.'][0]['L_TANK_SE'])) ? quotes($this->tpldata['.'][0]['L_TANK_SE']) : ((isset($lang->tank_se)) ? quotes($lang->tank_se) : '')) , '</option>\' +
';

echo '    \'<option value="4">' , ((isset($this->tpldata['.'][0]['L_TANK_SHELLS'])) ? quotes($this->tpldata['.'][0]['L_TANK_SHELLS']) : ((isset($lang->tank_shells)) ? quotes($lang->tank_shells) : '')) , '</option>\' +
';

echo '    \'<option value="5">' , ((isset($this->tpldata['.'][0]['L_ACT_FLEE'])) ? quotes($this->tpldata['.'][0]['L_ACT_FLEE']) : ((isset($lang->act_flee)) ? quotes($lang->act_flee) : '')) , '</option>\' +
';

echo '    \'</select> <input type="button" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? quotes($this->tpldata['.'][0]['L_VALIDATE']) : ((isset($lang->validate)) ? quotes($lang->validate) : '')) , '" class="button" onclick="tank_action();" />\' +
';

echo '    \'</form>\';
';

echo 'var player_waiting = \'' , ((isset($this->tpldata['.'][0]['L_WAIT_TURN'])) ? quotes($this->tpldata['.'][0]['L_WAIT_TURN']) : ((isset($lang->wait_turn)) ? quotes($lang->wait_turn) : '')) , '<br /><span id="timeout"></span>\';
';

echo '
';

echo 'var user_speed = ' , ((isset($this->tpldata['.'][0]['USER_SPEED'])) ? $this->tpldata['.'][0]['USER_SPEED'] : '') , ';
';

echo '
';

echo 'function battle_preload()
';

echo '{
';

$_ally_count = (isset($this->tpldata['ally'])) ? count($this->tpldata['ally']) : 0;for ($_ally_i = 0; $_ally_i < $_ally_count; $_ally_i++){
echo '	add_ally(' , ((isset($this->tpldata['ally'][$_ally_i]['ID'])) ? $this->tpldata['ally'][$_ally_i]['ID'] : '') , ', \'' , ((isset($this->tpldata['ally'][$_ally_i]['NAME'])) ? quotes($this->tpldata['ally'][$_ally_i]['NAME']) : '') , '\', \'' , ((isset($this->tpldata['ally'][$_ally_i]['PICTURE'])) ? quotes($this->tpldata['ally'][$_ally_i]['PICTURE']) : '') , '\');
';

} // END ally
$_opponent_count = (isset($this->tpldata['opponent'])) ? count($this->tpldata['opponent']) : 0;for ($_opponent_i = 0; $_opponent_i < $_opponent_count; $_opponent_i++){
echo '	add_opponent(' , ((isset($this->tpldata['opponent'][$_opponent_i]['ID'])) ? $this->tpldata['opponent'][$_opponent_i]['ID'] : '') , ', \'' , ((isset($this->tpldata['opponent'][$_opponent_i]['NAME'])) ? quotes($this->tpldata['opponent'][$_opponent_i]['NAME']) : '') , '\', \'' , ((isset($this->tpldata['opponent'][$_opponent_i]['PICTURE'])) ? quotes($this->tpldata['opponent'][$_opponent_i]['PICTURE']) : '') , '\');
';

} // END opponent
$_add_chat_count = (isset($this->tpldata['add_chat'])) ? count($this->tpldata['add_chat']) : 0;for ($_add_chat_i = 0; $_add_chat_i < $_add_chat_count; $_add_chat_i++){
echo '	chat_add(\'' , ((isset($this->tpldata['add_chat'][$_add_chat_i]['NAME'])) ? quotes($this->tpldata['add_chat'][$_add_chat_i]['NAME']) : '') , '\', \'' , ((isset($this->tpldata['add_chat'][$_add_chat_i]['MESSAGE'])) ? quotes($this->tpldata['add_chat'][$_add_chat_i]['MESSAGE']) : '') , '\');
';

} // END add_chat
echo '	chat_history = false;
';

echo '	battle_timeout(' , ((isset($this->tpldata['.'][0]['USER_SPEED'])) ? $this->tpldata['.'][0]['USER_SPEED'] : '') , ');
';

echo '}
';

echo '//setTimeout(\'remove_ally(2);\', 5000);
';

echo '</script>
';

echo '<script type="text/javascript" src="javascript/battle.js"></script>
';

echo '
';

echo '<div id="extradiv" style="display:inline"></div>
';


