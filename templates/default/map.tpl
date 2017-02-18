
<div id="cache_images" class="hidden_layer"></div>

<div id="drag_layer2" onmouseover="actual_layer=this.id" style="position:absolute;left:0;top:0;z-index:9999">


 <table cellspacing="1" cellpadding="2" class="portaline">
  <tr>
   <th id="chat_title"></th>
  </tr>
  <tr>
   <td class="row1">
    <div id="chat_hidden" class="hidden_layer"><div id="chatbox"></div><br /><div style="padding-left:15px"><i>{L_POST_MESSAGE}</i><br />
    <form action="" onsubmit="submit_chat();return false;"><input type="text" id="message_chat" maxlength="128" value="" onkeypress="if(event.keyCode==13)submit_chat();" />&nbsp; <input type="submit" value="{L_VALIDATE}" class="button" /></form><br /><br /></div>
    </div></div>
    <div id="chat_show" style="display:inline"></div>
   </td>
  </tr>
 </table>
</div>

<table width="100%" cellpadding="2" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{MAP_NAME}</th>
 </tr>

 <tr>
  <td class="row1" align="center" valign="middle" style="padding:10px;">
   <div id="global_map">
    <div style="position:relative;left:0px;top:0px;{MAP_BACKGROUND}width:{MAP_WIDTH}px;height:{MAP_HEIGHT}px">
     <div id="message"></div>
     <div id="map_loader">
	  <div id="map_loading" style="width:{MAP_WIDTH}px;height:{MAP_HEIGHT}px;"><br /><i>{L_MAP_LOADING}</i></div>
	 </div>
	 <!-- BEGIN map_image -->
	 <div style="position:absolute;left:0px;top:0px;z-index:{map_image.Z_INDEX};background-image:url({map_image.PICTURE});width:{MAP_WIDTH}px;height:{MAP_HEIGHT}px"></div>
	 <!-- END map_image -->
     <div id="lower_bloc"></div>
     <div id="upper_bloc"></div>
     <div id="event_bloc"></div>
     <div id="player_bloc"></div>
     <div id="action_bloc"></div>
     <div id="action_bloc_cursor"></div>
    </div>
   </div>
  </td>
 </tr>
</table>
<script type="text/javascript">

var my_user_id = {USER_ID};
var my_user_name = '[USER_NAME]';
var p_charaset = '[CHARASET]';
var refresh_method = {REFRESH_METHOD};
var m_moves = {MAP_MOVES};
var m_move_id = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {MAP_MOVES});
var map_sid = {MAP_SID};
var map_id = {MAP_ID};
var tile_size = {TILE_SIZE};
var u_index = '[U_INDEX]';
var l_close_message = '[L_CLOSE_MESSAGE]';
var l_flood_alert = '[L_FLOOD_ALERT]';
var players_moving = new Array();
var lower_buffer = '';
var upper_buffer = '';
var chat_last_id = {LAST_CHAT_ID};
var map_width = {MAP_WIDTH};
var map_height = {MAP_HEIGHT};
var player_x = {PLAYER_X};
var player_y = {PLAYER_Y};
var chatbox_state = new Array({CHATBOX_STATE});
var event_status = '[EVENT_STATUS]';
var player_moving = {PLAYER_MOVING};


var chatbox_header = new Object();
chatbox_header.reduce = '<div align="left"><div style="position:absolute"><form action="" onsubmit="return false"><input type="button" class="button" id="chat_state" value="[L_CHATBOX_REDUCE]" onclick="change_chat_state()" /></form></div></div>[L_CHATBOX]';
chatbox_header.increase = '<form action="" onsubmit="return false"><input type="button" class="button" id="chat_state" value="[L_CHATBOX_INCREASE]" onclick="change_chat_state()" /></form> &nbsp; [L_CHATBOX]';

var message_box = new Object();



message_box.begin = '<div style="border: 2px solid #fff;" class="m_middle_center">';
message_box.end = '</div>';


function map_preload() {
    <!-- BEGIN lower_bloc -->
    l_bloc('{lower_bloc.ID}', {lower_bloc.LEFT}, {lower_bloc.TOP}, '[lower_bloc.BACKGROUND_IMAGE]', {lower_bloc.Z_INDEX});
    <!-- END lower_bloc -->
    document.getElementById('lower_bloc').innerHTML = lower_buffer;
    lower_buffer = false;
    <!-- BEGIN upper_bloc -->
    u_bloc('{upper_bloc.ID}', {upper_bloc.LEFT}, {upper_bloc.TOP}, '[upper_bloc.BACKGROUND_IMAGE]', {upper_bloc.Z_INDEX});
    <!-- END upper_bloc -->
    document.getElementById('upper_bloc').innerHTML = upper_buffer;
    upper_buffer = false;
    <!-- BEGIN add_chat -->
    chat_add('[add_chat.NAME]', '[add_chat.MESSAGE]');
    <!-- END add_chat -->
    chat_history = false;
    a_bloc({MAP_WIDTH}, {MAP_HEIGHT});
    setTimeout('check_loading();', 1000);
    return true;
}

function map_start() {
    <!-- BEGIN event_bloc -->
    add_event('[event_bloc.ID]', {event_bloc.LEFT}, {event_bloc.TOP}, {event_bloc.LAYER}, {event_bloc.WIDTH}, {event_bloc.HEIGHT}, '[event_bloc.PICTURE]', {event_bloc.DIR});
    <!-- END event_bloc -->
    <!-- BEGIN add_player_bloc -->
    add_player({add_player_bloc.ID}, '[add_player_bloc.NAME]', '[add_player_bloc.CHARASET]', {add_player_bloc.LEFT}, {add_player_bloc.TOP}, {add_player_bloc.DIR}, {add_player_bloc.MOVES}, {add_player_bloc.WIDTH}, {add_player_bloc.HEIGHT});
    battle({add_player_bloc.ID}, {add_player_bloc.BATTLE_ID}, {add_player_bloc.BATTLE_STATE})
    <!-- END add_player_bloc -->
    if (trim(event_status) != '') {
        continue_event(event_status);
    }
}
</script>
<script type="text/javascript" src="javascript/map.js"></script>

<div id="extradiv" style="display:inline"></div>