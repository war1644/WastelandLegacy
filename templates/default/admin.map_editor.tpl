<div id="scripttoup1"></div>
<table width="100%" cellpadding="2" cellspacing="1" border="0" class="portaline">

 <tr>
  <th colspan="2">{L_MAP_EDITOR} : {MAP_NAME}</th>
 </tr>

 <tr>
  <td class="row2" align="center" valign="top">
  <div id="div_mode" style="padding:10px">
  <form action="" onsubmit="return false;">
  <input type="button" value="{L_SAVE_MAP}" onclick="save_map();" class="button" style="margin:2px" /></form>
  <hr />
  <form action="" onsubmit="return false;">
  <input type="radio" name="mode" value="2" onclick="change_mode(this.value);" />&nbsp;<i>{L_MAP_PROPERTIES}</i> &nbsp; <input type="radio" name="mode" value="0" onclick="change_mode(this.value);" />&nbsp;<i>{L_MODE_TILE}</i><br ><input type="radio" name="mode" value="3" onclick="change_mode(this.value);" />&nbsp;<i>{L_TOOLS}</i> &nbsp; <input type="radio" checked="checked" name="mode" value="1" onclick="change_mode(this.value);" />&nbsp;<i>{L_MODE_EVENT}</i>
  </form><br /><br />

  <div id="actual_mode"></div>
  
  </td>
  <td class="row1" align="center" valign="top">
  <div id="demo_tile" style="width:{TILE_SIZE}px;height:{TILE_SIZE}px"></div>
  <br /><br />
  <div style="width:400px;height:400px;overflow:auto;position:relative;left:0;top:0">
   <div id="global_map">
    <div style="position:relative;left:0;top:0;background-image:url({MAP_BACKGROUND});width:{MAP_WIDTH}px;height:{MAP_HEIGHT}px">
     <div id="lower_bloc"></div>
     <div id="upper_bloc"></div>
     <div id="event_bloc"></div>
     <div id="action_bloc"></div>
    </div>
   </div>
  </div>
  <br /><br />
  </div>
  </td>
 </tr>
</table>
<script type="text/javascript">

var tile_size = {TILE_SIZE};
var u_index = '[U_INDEX]';
var tileset_tiles_lower = {TILESET_TILES_LOWER};
var tileset_tiles_upper = {TILESET_TILES_UPPER};
var tileset_color = '[TILESET_BGCOLOR]';
var tileset_cols = {TILESET_COLS};
var refresh_method = {REFRESH_METHOD};
var l_set_default_start_position = '[L_SET_DEFAULT_START_POSITION]';
var l_set_players_position = '[L_SET_PLAYERS_POSITION]';
var map_name = '[MAP_NAME]';
var l_teleport = '[L_TELEPORT]';
var lower_buffer = '';
var upper_buffer = '';
var col_map = {COL_MAP};
var row_map = {ROW_MAP};
var map_id = {MAP_ID};
var preloaded = false;
var map_name = '[MAP_NAME]';
var map_music = '[MAP_MUSIC]';
var tileset_id = {TILESET_ID};
var event_data = new Array();

var mode = new Array();
mode[0] = '<div id="global_tileset" class="row1"><b>[L_LOWER_LAYER]</b><br /><div id="lower_tileset" style="width:' + parseInt((tile_size + 1) * 8) + 'px"></div><br /><br /><b>[L_UPPER_LAYER]</b><br /><div id="upper_tileset" style="width:' + parseInt((tile_size + 1) * 8) + 'px"></div></div><br /><div style="text-align:right"><form action="" onsubmit="return false">[L_WIDTH_TILES_COPY] : <input type="numeric" id="w_tiles_copy" value="1" maxlength="1" style="width:30px" /> &nbsp; &nbsp; <br />[L_HEIGHT_TILES_COPY] : <input type="numeric" id="h_tiles_copy" value="1" maxlength="1" style="width:30px" /> &nbsp; &nbsp; <br />[L_WIDTH_TILES_PASTE] : <input type="numeric" id="w_tiles_paste" value="1" maxlength="1" style="width:30px" /> &nbsp; &nbsp; <br />[L_HEIGHT_TILES_PASTE] : <input type="numeric" id="h_tiles_paste" value="1" maxlength="1" style="width:30px" /> &nbsp; &nbsp; </div></form>';
var mode_1_begin = '<form action="" onsubmit="return false"><select name="event_id" onchange="select_event(this.value);" size="8"><option value="0"> - </option>';
var mode_1_content = '';
<!-- BEGIN event_list -->
mode_1_content += '<option value="{event_list.ID}">{event_list.ID}. [event_list.NAME]</option>';
event_data[{event_list.ID}] = new Array('[event_list.PICTURE]', {event_list.WIDTH}, {event_list.HEIGHT}, {event_list.DIR}, '[event_list.NAME]');
<!-- END event_list -->
var mode_1_end = '</select></form><br /><br /><div id="actual_event"></div>';
mode[2] = '<form action="" onsubmit="return false">[L_MAP_NAME] : <input type="text" id="map_name" value="" /><br /><br />[L_MAP_MUSIC] : <input type="text" id="map_music" value="" /><br /><br />[L_MAP_TILESET] : <select name="map_tileset" id="map_tileset" onchange="tileset_id=this.value;">';
<!-- BEGIN tileset_list -->
mode[2] += '<option value="{tileset_list.ID}">{tileset_list.ID}. [tileset_list.NAME]</option>';
<!-- END tileset_list -->
mode[2] += '</select></form>';
mode[3] = '<form action="" onsubmit="return false"><select id="tool_type"><optgroup label="[L_PRESET_EVENT]"><option value="1">[L_TELEPORT_HERE]</option><option value="2">[L_TELEPORT_HERE] ([L_DOWN])</option><option value="3">[L_TELEPORT_HERE] ([L_LEFT])</option><option value="4">[L_TELEPORT_HERE] ([L_UP])</option><option value="5">[L_TELEPORT_HERE] ([L_RIGHT])</option></optgroup><optgroup label="[L_ACTION]"><option value="6">[L_SET_DEFAULT_START_POSITION] ([L_DOWN])</option><option value="7">[L_SET_DEFAULT_START_POSITION] ([L_LEFT])</option><option value="8">[L_SET_DEFAULT_START_POSITION] ([L_UP])</option><option value="9">[L_SET_DEFAULT_START_POSITION] ([L_RIGHT])</option><option value="10">[L_SET_PLAYERS_POSITION] ([L_DOWN])</option><option value="11">[L_SET_PLAYERS_POSITION] ([L_LEFT])</option><option value="12">[L_SET_PLAYERS_POSITION] ([L_UP])</option><option value="13">[L_SET_PLAYERS_POSITION] ([L_RIGHT])</option></optgroup></select></form>';

document.getElementById('div_mode').style.width = parseInt((tile_size + 1) * 8 + 40) + 'px';

function preload_editor()
{
	construct_tileset({LOWER_TILES_IMG}, {UPPER_TILES_IMG});
<!-- BEGIN lower_bloc -->
	l_bloc('{lower_bloc.ID}', {lower_bloc.LEFT}, {lower_bloc.TOP}, '[lower_bloc.BACKGROUND_IMAGE]', {lower_bloc.Z_INDEX}, {lower_bloc.VALUE});
<!-- END lower_bloc -->
	document.getElementById('lower_bloc').innerHTML = lower_buffer;
	lower_buffer = false;
<!-- BEGIN upper_bloc -->
	u_bloc('{upper_bloc.ID}', {upper_bloc.LEFT}, {upper_bloc.TOP}, '[upper_bloc.BACKGROUND_IMAGE]', {upper_bloc.Z_INDEX}, {upper_bloc.VALUE});
<!-- END upper_bloc -->
	document.getElementById('upper_bloc').innerHTML = upper_buffer;
	upper_buffer = false;
	a_bloc({MAP_WIDTH}, {MAP_HEIGHT});
<!-- BEGIN event_bloc -->
	add_event({event_bloc.ID}, {event_bloc.LEFT}, {event_bloc.TOP});
<!-- END event_bloc -->
	preloaded = true;
	//alert(lower_map.join());
	return true;
}

</script>
<script type="text/javascript" src="javascript/admin.map_editor.js"></script>