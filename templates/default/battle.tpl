
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
  <th colspan="2">{L_BATTLE}</th>
 </tr>

 <tr>
  <td class="cat" align="center" width="50%">{L_OPPONENTS}</td>
  <td class="cat" align="center" width="50%">{L_ALLIES}</td>
 </tr>

 <tr>
  <td style="background-color:black" align="center" valign="middle" colspan="2">
  <div style="width:640px;height:320px;background-image:url('images/backgrounds/{BATTLE_BACKGROUND}');background-size:contain;padding:0px">

  <table cellpadding="0" cellspacing="0" border="0" bordercolor="black">
  <tr><td align="center">
    <div id="opponents" style="width:318px;height:318px;overflow:auto">
    </div>


  </td><td align="center">

    <div id="allies" style="width:318px;height:318px;overflow:auto">
    </div>

  </td></tr>
  </table>

  </div>
  </td>
 </tr>

 <tr>
  <td colspan="2" class="cat">{L_BATTLE_MENU}</td>
 </tr>

 <tr>
  <td class="row2" align="center" valign="top">
  <div id="battle_tools" style="padding:20px">
  
  </div>
  </td>
  <td class="row2" align="center" valign="top">
  <div id="battle_actions">

  </div>
  </td>
 </tr>

</table>
<script type="text/javascript">
var my_user_id = {USER_ID};
var my_user_name = '[USER_NAME]';
var refresh_method = {REFRESH_METHOD};
var u_index = '[U_INDEX]';
var l_flood_alert = '[L_FLOOD_ALERT]';
var l_click_to_attack = '[L_CLICK_TO_ATTACK]';
var l_click_opponent = '[L_CLICK_OPPONENT]';
var chat_last_id = {LAST_CHAT_ID};
var chatbox_state = new Array({CHATBOX_STATE});

var chatbox_header = new Object();
chatbox_header.reduce = '<div align="left"><div style="position:absolute"><form action="" onsubmit="return false"><input type="button" class="button" id="chat_state" value="[L_CHATBOX_REDUCE]" onclick="change_chat_state()" /></form></div></div>[L_CHATBOX]';
chatbox_header.increase = '<form action="" onsubmit="return false"><input type="button" class="button" id="chat_state" value="[L_CHATBOX_INCREASE]" onclick="change_chat_state()" /></form> &nbsp; [L_CHATBOX]';

var message_box = new Object();
message_box.begin = '<table cellspacing="0" cellpadding="0" border="0"><tr><td class="m_top_left"><div class="m_top_left_div"></div></td><td class="m_top_center"></td><td class="m_top_right"></td></tr><tr><td class="m_middle_left"></td><td class="m_middle_center">';
message_box.end = '</td><td class="m_middle_right"></td></tr><tr><td class="m_bottom_left"></td><td class="m_bottom_center"></td><td class="m_bottom_right"><div class="m_bottom_right_div"></div></td></tr></table>';

var player_tools = '<form onsubmit="return false;">' +
    '[L_BASIC_ACTION] : <select name="basic_action_select" id="basic_action_select">' +
    '<option value="1">[L_ACT_ATTACK]</option>' +
    '<option value="2">[L_ACT_DEFEND]</option>' +
    '<option value="3">[L_ACT_FLEE]</option>' +
    '</select> <input type="button" value="[L_VALIDATE]" class="button" onclick="basic_action();" />' +
    '</form>';
var tank_player_tools = '<form onsubmit="return false;">' +
    '[L_TANK_ACTION] : <select name="tank_action_select" id="tank_action_select">' +
    '<option value="1">[L_TANK_MAIN_CANNON]</option>' +
    '<option value="2">[L_TANK_SUBCANNON]</option>' +
    '<option value="3">[L_TANK_SE]</option>' +
    '<option value="4">[L_TANK_SHELLS]</option>' +
    '<option value="5">[L_ACT_FLEE]</option>' +
    '</select> <input type="button" value="[L_VALIDATE]" class="button" onclick="tank_action();" />' +
    '</form>';
var player_waiting = '[L_WAIT_TURN]<br /><span id="timeout"></span>';

var user_speed = {USER_SPEED};

function battle_preload()
{
<!-- BEGIN ally -->
	add_ally({ally.ID}, '[ally.NAME]', '[ally.PICTURE]');
<!-- END ally -->
<!-- BEGIN opponent -->
	add_opponent({opponent.ID}, '[opponent.NAME]', '[opponent.PICTURE]');
<!-- END opponent -->
<!-- BEGIN add_chat -->
	chat_add('[add_chat.NAME]', '[add_chat.MESSAGE]');
<!-- END add_chat -->
	chat_history = false;
	battle_timeout({USER_SPEED});
}
//setTimeout('remove_ally(2);', 5000);
</script>
<script type="text/javascript" src="javascript/battle.js"></script>

<div id="extradiv" style="display:inline"></div>