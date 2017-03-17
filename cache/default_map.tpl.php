<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<style id="map_css"></style>
';

echo '<div id="cache_images" class="hidden_layer"></div>
';

echo '<div id="drag_layer2" onmouseover="actual_layer=this.id" style="position:absolute;left:0;top:0;z-index:9999">
';

echo '
';

echo '
';

echo ' <div class="portaline" style="background:#000020;border: 10px solid #384048;border-radius: 10px;box-shadow: 0 0 5px #fff">
';

echo '   <div id="chat_title" class="title_header"></div>
';

echo '    <div id="chat_hidden" class="hidden_layer"><div id="chatbox"></div><br />
';

echo '     <div style="padding-left:15px"><br />
';

echo '      <form action="" onsubmit="submit_chat();return false;">\\
';

echo '       <input type="text" id="message_chat" maxlength="128" value="" onkeypress="if(event.keyCode==13)submit_chat();" />&nbsp;
';

echo '       <input type="submit" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? $this->tpldata['.'][0]['L_VALIDATE'] : ((isset($lang->validate)) ? $lang->validate : '')) , '" class="button" />
';

echo '      </form><br /><br />
';

echo '     </div>
';

echo '     <div style="padding-left:15px"><i></i>
';

echo '      <br />
';

echo '
';

echo '     <input type="submit" value="背包" onclick="equipment_list()"class="button" />
';

echo '     </div>
';

echo '    </div>
';

echo '
';

echo '    <div id="chat_show" style="display:inline"></div>
';

echo ' </div>
';

echo '</div>
';

echo '
';

echo '
';

echo '<div width="100%" class="portaline">
';

echo ' <div class="title_header"><b>' , ((isset($this->tpldata['.'][0]['MAP_NAME'])) ? $this->tpldata['.'][0]['MAP_NAME'] : '') , '</b><div/>
';

echo '  <div align="center" valign="middle" style="padding:10px;">
';

echo '   <div id="global_map">
';

echo '    <div style="position:relative;left:0px;top:0px;' , ((isset($this->tpldata['.'][0]['MAP_BACKGROUND'])) ? $this->tpldata['.'][0]['MAP_BACKGROUND'] : '') , 'width:' , ((isset($this->tpldata['.'][0]['MAP_WIDTH'])) ? $this->tpldata['.'][0]['MAP_WIDTH'] : '') , 'px;height:' , ((isset($this->tpldata['.'][0]['MAP_HEIGHT'])) ? $this->tpldata['.'][0]['MAP_HEIGHT'] : '') , 'px">
';

echo '     <div id="message"></div>
';

echo '     <div id="map_loader">
';

echo '	  <div id="map_loading" style="width:' , ((isset($this->tpldata['.'][0]['MAP_WIDTH'])) ? $this->tpldata['.'][0]['MAP_WIDTH'] : '') , 'px;height:' , ((isset($this->tpldata['.'][0]['MAP_HEIGHT'])) ? $this->tpldata['.'][0]['MAP_HEIGHT'] : '') , 'px;"><br /><i>' , ((isset($this->tpldata['.'][0]['L_MAP_LOADING'])) ? $this->tpldata['.'][0]['L_MAP_LOADING'] : ((isset($lang->map_loading)) ? $lang->map_loading : '')) , '</i></div>
';

echo '	 </div>
';

$_map_image_count = (isset($this->tpldata['map_image'])) ? count($this->tpldata['map_image']) : 0;for ($_map_image_i = 0; $_map_image_i < $_map_image_count; $_map_image_i++){
echo '	 <div style="position:absolute;left:0px;top:0px;z-index:' , ((isset($this->tpldata['map_image'][$_map_image_i]['Z_INDEX'])) ? $this->tpldata['map_image'][$_map_image_i]['Z_INDEX'] : '') , ';background-image:url(' , ((isset($this->tpldata['map_image'][$_map_image_i]['PICTURE'])) ? $this->tpldata['map_image'][$_map_image_i]['PICTURE'] : '') , ');width:' , ((isset($this->tpldata['.'][0]['MAP_WIDTH'])) ? $this->tpldata['.'][0]['MAP_WIDTH'] : '') , 'px;height:' , ((isset($this->tpldata['.'][0]['MAP_HEIGHT'])) ? $this->tpldata['.'][0]['MAP_HEIGHT'] : '') , 'px"></div>
';

} // END map_image
echo '     <div id="lower_bloc"></div>
';

echo '     <div id="upper_bloc"></div>
';

echo '     <div id="event_bloc"></div>
';

echo '     <div id="player_bloc"></div>
';

echo '     <div id="action_bloc"></div>
';

echo '     <div id="action_bloc_cursor"></div>
';

echo '    </div>
';

echo '   </div>
';

echo '  </div>
';

echo '<div/>
';

echo '<script type="text/javascript">function xxx() {
';

echo '
';

echo '    }
';

echo '
';

echo 'var my_user_id = ' , ((isset($this->tpldata['.'][0]['USER_ID'])) ? $this->tpldata['.'][0]['USER_ID'] : '') , ';
';

echo 'var my_user_name = \'' , ((isset($this->tpldata['.'][0]['USER_NAME'])) ? quotes($this->tpldata['.'][0]['USER_NAME']) : '') , '\';
';

echo 'var p_charaset = \'' , ((isset($this->tpldata['.'][0]['CHARASET'])) ? quotes($this->tpldata['.'][0]['CHARASET']) : '') , '\';
';

echo 'var refresh_method = ' , ((isset($this->tpldata['.'][0]['REFRESH_METHOD'])) ? $this->tpldata['.'][0]['REFRESH_METHOD'] : '') , ';
';

echo 'var m_moves = ' , ((isset($this->tpldata['.'][0]['MAP_MOVES'])) ? $this->tpldata['.'][0]['MAP_MOVES'] : '') , ';
';

echo 'var m_move_id = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' , ((isset($this->tpldata['.'][0]['MAP_MOVES'])) ? $this->tpldata['.'][0]['MAP_MOVES'] : '') , ');
';

echo 'var map_sid = ' , ((isset($this->tpldata['.'][0]['MAP_SID'])) ? $this->tpldata['.'][0]['MAP_SID'] : '') , ';
';

echo 'var map_id = ' , ((isset($this->tpldata['.'][0]['MAP_ID'])) ? $this->tpldata['.'][0]['MAP_ID'] : '') , ';
';

echo 'var tile_size = ' , ((isset($this->tpldata['.'][0]['TILE_SIZE'])) ? $this->tpldata['.'][0]['TILE_SIZE'] : '') , ';
';

echo 'var u_index = \'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? quotes($this->tpldata['.'][0]['U_INDEX']) : '') , '\';
';

echo 'var l_close_message = \'' , ((isset($this->tpldata['.'][0]['L_CLOSE_MESSAGE'])) ? quotes($this->tpldata['.'][0]['L_CLOSE_MESSAGE']) : ((isset($lang->close_message)) ? quotes($lang->close_message) : '')) , '\';
';

echo 'var l_flood_alert = \'' , ((isset($this->tpldata['.'][0]['L_FLOOD_ALERT'])) ? quotes($this->tpldata['.'][0]['L_FLOOD_ALERT']) : ((isset($lang->flood_alert)) ? quotes($lang->flood_alert) : '')) , '\';
';

echo 'var players_moving = new Array();
';

echo 'var lower_buffer = \'\';
';

echo 'var upper_buffer = \'\';
';

echo 'var chat_last_id = ' , ((isset($this->tpldata['.'][0]['LAST_CHAT_ID'])) ? $this->tpldata['.'][0]['LAST_CHAT_ID'] : '') , ';
';

echo 'var map_width = ' , ((isset($this->tpldata['.'][0]['MAP_WIDTH'])) ? $this->tpldata['.'][0]['MAP_WIDTH'] : '') , ';
';

echo 'var map_height = ' , ((isset($this->tpldata['.'][0]['MAP_HEIGHT'])) ? $this->tpldata['.'][0]['MAP_HEIGHT'] : '') , ';
';

echo 'var player_x = ' , ((isset($this->tpldata['.'][0]['PLAYER_X'])) ? $this->tpldata['.'][0]['PLAYER_X'] : '') , ';
';

echo 'var player_y = ' , ((isset($this->tpldata['.'][0]['PLAYER_Y'])) ? $this->tpldata['.'][0]['PLAYER_Y'] : '') , ';
';

echo 'var chatbox_state = new Array(' , ((isset($this->tpldata['.'][0]['CHATBOX_STATE'])) ? $this->tpldata['.'][0]['CHATBOX_STATE'] : '') , ');
';

echo 'var event_status = \'' , ((isset($this->tpldata['.'][0]['EVENT_STATUS'])) ? quotes($this->tpldata['.'][0]['EVENT_STATUS']) : '') , '\';
';

echo 'var player_moving = ' , ((isset($this->tpldata['.'][0]['PLAYER_MOVING'])) ? $this->tpldata['.'][0]['PLAYER_MOVING'] : '') , ';
';

echo '
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

echo '
';

echo '
';

echo 'var message_box = new Object();
';

echo 'message_box.begin = \'<div style="border: 2px solid #fff;" class="m_middle_center">\';
';

echo 'message_box.end = \'</div>\';
';

echo '
';

echo '
';

echo 'function map_preload() {
';

$_lower_bloc_count = (isset($this->tpldata['lower_bloc'])) ? count($this->tpldata['lower_bloc']) : 0;for ($_lower_bloc_i = 0; $_lower_bloc_i < $_lower_bloc_count; $_lower_bloc_i++){
echo '    l_bloc(\'' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['ID'])) ? $this->tpldata['lower_bloc'][$_lower_bloc_i]['ID'] : '') , '\', ' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['LEFT'])) ? $this->tpldata['lower_bloc'][$_lower_bloc_i]['LEFT'] : '') , ', ' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['TOP'])) ? $this->tpldata['lower_bloc'][$_lower_bloc_i]['TOP'] : '') , ', \'' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['BACKGROUND_IMAGE'])) ? quotes($this->tpldata['lower_bloc'][$_lower_bloc_i]['BACKGROUND_IMAGE']) : '') , '\', ' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['Z_INDEX'])) ? $this->tpldata['lower_bloc'][$_lower_bloc_i]['Z_INDEX'] : '') , ');
';

} // END lower_bloc
echo '    document.getElementById(\'lower_bloc\').innerHTML = lower_buffer;
';

echo '    lower_buffer = false;
';

$_upper_bloc_count = (isset($this->tpldata['upper_bloc'])) ? count($this->tpldata['upper_bloc']) : 0;for ($_upper_bloc_i = 0; $_upper_bloc_i < $_upper_bloc_count; $_upper_bloc_i++){
echo '    u_bloc(\'' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['ID'])) ? $this->tpldata['upper_bloc'][$_upper_bloc_i]['ID'] : '') , '\', ' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['LEFT'])) ? $this->tpldata['upper_bloc'][$_upper_bloc_i]['LEFT'] : '') , ', ' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['TOP'])) ? $this->tpldata['upper_bloc'][$_upper_bloc_i]['TOP'] : '') , ', \'' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['BACKGROUND_IMAGE'])) ? quotes($this->tpldata['upper_bloc'][$_upper_bloc_i]['BACKGROUND_IMAGE']) : '') , '\', ' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['Z_INDEX'])) ? $this->tpldata['upper_bloc'][$_upper_bloc_i]['Z_INDEX'] : '') , ');
';

} // END upper_bloc
echo '    document.getElementById(\'upper_bloc\').innerHTML = upper_buffer;
';

echo '    upper_buffer = false;
';

$_add_chat_count = (isset($this->tpldata['add_chat'])) ? count($this->tpldata['add_chat']) : 0;for ($_add_chat_i = 0; $_add_chat_i < $_add_chat_count; $_add_chat_i++){
echo '    chat_add(\'' , ((isset($this->tpldata['add_chat'][$_add_chat_i]['NAME'])) ? quotes($this->tpldata['add_chat'][$_add_chat_i]['NAME']) : '') , '\', \'' , ((isset($this->tpldata['add_chat'][$_add_chat_i]['MESSAGE'])) ? quotes($this->tpldata['add_chat'][$_add_chat_i]['MESSAGE']) : '') , '\');
';

} // END add_chat
echo '    chat_history = false;
';

echo '    a_bloc(' , ((isset($this->tpldata['.'][0]['MAP_WIDTH'])) ? $this->tpldata['.'][0]['MAP_WIDTH'] : '') , ', ' , ((isset($this->tpldata['.'][0]['MAP_HEIGHT'])) ? $this->tpldata['.'][0]['MAP_HEIGHT'] : '') , ');
';

echo '    setTimeout(\'check_loading();\', 1000);
';

echo '    return true;
';

echo '}
';

echo '
';

echo '
';

echo 'function map_start() {
';

$_event_bloc_count = (isset($this->tpldata['event_bloc'])) ? count($this->tpldata['event_bloc']) : 0;for ($_event_bloc_i = 0; $_event_bloc_i < $_event_bloc_count; $_event_bloc_i++){
echo '    add_event(\'' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['ID'])) ? quotes($this->tpldata['event_bloc'][$_event_bloc_i]['ID']) : '') , '\', ' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['LEFT'])) ? $this->tpldata['event_bloc'][$_event_bloc_i]['LEFT'] : '') , ', ' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['TOP'])) ? $this->tpldata['event_bloc'][$_event_bloc_i]['TOP'] : '') , ', ' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['LAYER'])) ? $this->tpldata['event_bloc'][$_event_bloc_i]['LAYER'] : '') , ', ' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['WIDTH'])) ? $this->tpldata['event_bloc'][$_event_bloc_i]['WIDTH'] : '') , ', ' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['HEIGHT'])) ? $this->tpldata['event_bloc'][$_event_bloc_i]['HEIGHT'] : '') , ', \'' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['PICTURE'])) ? quotes($this->tpldata['event_bloc'][$_event_bloc_i]['PICTURE']) : '') , '\', ' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['DIR'])) ? $this->tpldata['event_bloc'][$_event_bloc_i]['DIR'] : '') , ');
';

} // END event_bloc
$_add_player_bloc_count = (isset($this->tpldata['add_player_bloc'])) ? count($this->tpldata['add_player_bloc']) : 0;for ($_add_player_bloc_i = 0; $_add_player_bloc_i < $_add_player_bloc_count; $_add_player_bloc_i++){
echo '    add_player(' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['ID'])) ? $this->tpldata['add_player_bloc'][$_add_player_bloc_i]['ID'] : '') , ', \'' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['NAME'])) ? quotes($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['NAME']) : '') , '\', \'' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['CHARASET'])) ? quotes($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['CHARASET']) : '') , '\', ' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['LEFT'])) ? $this->tpldata['add_player_bloc'][$_add_player_bloc_i]['LEFT'] : '') , ', ' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['TOP'])) ? $this->tpldata['add_player_bloc'][$_add_player_bloc_i]['TOP'] : '') , ', ' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['DIR'])) ? $this->tpldata['add_player_bloc'][$_add_player_bloc_i]['DIR'] : '') , ', ' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['MOVES'])) ? $this->tpldata['add_player_bloc'][$_add_player_bloc_i]['MOVES'] : '') , ', ' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['WIDTH'])) ? $this->tpldata['add_player_bloc'][$_add_player_bloc_i]['WIDTH'] : '') , ', ' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['HEIGHT'])) ? $this->tpldata['add_player_bloc'][$_add_player_bloc_i]['HEIGHT'] : '') , ');
';

echo '    battle(' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['ID'])) ? $this->tpldata['add_player_bloc'][$_add_player_bloc_i]['ID'] : '') , ', ' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['BATTLE_ID'])) ? $this->tpldata['add_player_bloc'][$_add_player_bloc_i]['BATTLE_ID'] : '') , ', ' , ((isset($this->tpldata['add_player_bloc'][$_add_player_bloc_i]['BATTLE_STATE'])) ? $this->tpldata['add_player_bloc'][$_add_player_bloc_i]['BATTLE_STATE'] : '') , ')
';

} // END add_player_bloc
echo '    if (trim(event_status) != \'\') {
';

echo '        continue_event(event_status);
';

echo '    }
';

echo '}
';

echo '</script>
';

echo '<script type="text/javascript" src="javascript/map.js"></script>
';

echo '
';

echo '<div id="extradiv" style="display:inline"></div>
';


