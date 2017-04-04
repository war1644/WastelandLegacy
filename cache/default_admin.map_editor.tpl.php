<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<div id="scripttoup1"></div>
';

echo '<table width="100%" cellpadding="2" cellspacing="1" border="0" class="portaline">
';

echo '
';

echo ' <tr>
';

echo '  <th colspan="2">' , ((isset($this->tpldata['.'][0]['L_MAP_EDITOR'])) ? $this->tpldata['.'][0]['L_MAP_EDITOR'] : ((isset($lang->map_editor)) ? $lang->map_editor : '')) , ' : ' , ((isset($this->tpldata['.'][0]['MAP_NAME'])) ? $this->tpldata['.'][0]['MAP_NAME'] : '') , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row2" align="center" valign="top">
';

echo '  <div id="div_mode" style="padding:10px">
';

echo '  <form action="" onsubmit="return false;">
';

echo '  <input type="button" value="' , ((isset($this->tpldata['.'][0]['L_SAVE_MAP'])) ? $this->tpldata['.'][0]['L_SAVE_MAP'] : ((isset($lang->save_map)) ? $lang->save_map : '')) , '" onclick="save_map();" class="button" style="margin:2px" /></form>
';

echo '  <hr />
';

echo '  <form action="" onsubmit="return false;">
';

echo '  <input type="radio" name="mode" value="2" onclick="change_mode(this.value);" />&nbsp;<i>' , ((isset($this->tpldata['.'][0]['L_MAP_PROPERTIES'])) ? $this->tpldata['.'][0]['L_MAP_PROPERTIES'] : ((isset($lang->map_properties)) ? $lang->map_properties : '')) , '</i> &nbsp; <input type="radio" name="mode" value="0" onclick="change_mode(this.value);" />&nbsp;<i>' , ((isset($this->tpldata['.'][0]['L_MODE_TILE'])) ? $this->tpldata['.'][0]['L_MODE_TILE'] : ((isset($lang->mode_tile)) ? $lang->mode_tile : '')) , '</i><br ><input type="radio" name="mode" value="3" onclick="change_mode(this.value);" />&nbsp;<i>' , ((isset($this->tpldata['.'][0]['L_TOOLS'])) ? $this->tpldata['.'][0]['L_TOOLS'] : ((isset($lang->tools)) ? $lang->tools : '')) , '</i> &nbsp; <input type="radio" checked="checked" name="mode" value="1" onclick="change_mode(this.value);" />&nbsp;<i>' , ((isset($this->tpldata['.'][0]['L_MODE_EVENT'])) ? $this->tpldata['.'][0]['L_MODE_EVENT'] : ((isset($lang->mode_event)) ? $lang->mode_event : '')) , '</i>
';

echo '  </form><br /><br />
';

echo '
';

echo '  <div id="actual_mode"></div>
';

echo '
';

echo '  </td>
';

echo '  <td class="row1" align="center" valign="top">
';

echo '  <div id="demo_tile" style="width:' , ((isset($this->tpldata['.'][0]['TILE_SIZE'])) ? $this->tpldata['.'][0]['TILE_SIZE'] : '') , 'px;height:' , ((isset($this->tpldata['.'][0]['TILE_SIZE'])) ? $this->tpldata['.'][0]['TILE_SIZE'] : '') , 'px"></div>
';

echo '  <br /><br />
';

echo '  <div style="width:400px;height:400px;overflow:auto;position:relative;left:0;top:0">
';

echo '   <div id="global_map">
';

echo '    <div style="position:relative;left:0;top:0;background-image:url(' , ((isset($this->tpldata['.'][0]['MAP_BACKGROUND'])) ? $this->tpldata['.'][0]['MAP_BACKGROUND'] : '') , ');width:' , ((isset($this->tpldata['.'][0]['MAP_WIDTH'])) ? $this->tpldata['.'][0]['MAP_WIDTH'] : '') , 'px;height:' , ((isset($this->tpldata['.'][0]['MAP_HEIGHT'])) ? $this->tpldata['.'][0]['MAP_HEIGHT'] : '') , 'px">
';

echo '     <div id="lower_bloc"></div>
';

echo '     <div id="upper_bloc"></div>
';

echo '     <div id="event_bloc"></div>
';

echo '     <div id="action_bloc"></div>
';

echo '    </div>
';

echo '   </div>
';

echo '  </div>
';

echo '  <br /><br />
';

echo '  </div>
';

echo '  </td>
';

echo ' </tr>
';

echo '</table>
';

echo '<script type="text/javascript">
';

echo '
';

echo 'var tile_size = ' , ((isset($this->tpldata['.'][0]['TILE_SIZE'])) ? $this->tpldata['.'][0]['TILE_SIZE'] : '') , ';
';

echo 'var u_index = \'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? quotes($this->tpldata['.'][0]['U_INDEX']) : '') , '\';
';

echo 'var tileset_tiles_lower = ' , ((isset($this->tpldata['.'][0]['TILESET_TILES_LOWER'])) ? $this->tpldata['.'][0]['TILESET_TILES_LOWER'] : '') , ';
';

echo 'var tileset_tiles_upper = ' , ((isset($this->tpldata['.'][0]['TILESET_TILES_UPPER'])) ? $this->tpldata['.'][0]['TILESET_TILES_UPPER'] : '') , ';
';

echo 'var tileset_color = \'' , ((isset($this->tpldata['.'][0]['TILESET_BGCOLOR'])) ? quotes($this->tpldata['.'][0]['TILESET_BGCOLOR']) : '') , '\';
';

echo 'var tileset_cols = ' , ((isset($this->tpldata['.'][0]['TILESET_COLS'])) ? $this->tpldata['.'][0]['TILESET_COLS'] : '') , ';
';

echo 'var refresh_method = ' , ((isset($this->tpldata['.'][0]['REFRESH_METHOD'])) ? $this->tpldata['.'][0]['REFRESH_METHOD'] : '') , ';
';

echo 'var l_set_default_start_position = \'' , ((isset($this->tpldata['.'][0]['L_SET_DEFAULT_START_POSITION'])) ? quotes($this->tpldata['.'][0]['L_SET_DEFAULT_START_POSITION']) : ((isset($lang->set_default_start_position)) ? quotes($lang->set_default_start_position) : '')) , '\';
';

echo 'var l_set_players_position = \'' , ((isset($this->tpldata['.'][0]['L_SET_PLAYERS_POSITION'])) ? quotes($this->tpldata['.'][0]['L_SET_PLAYERS_POSITION']) : ((isset($lang->set_players_position)) ? quotes($lang->set_players_position) : '')) , '\';
';

echo 'var map_name = \'' , ((isset($this->tpldata['.'][0]['MAP_NAME'])) ? quotes($this->tpldata['.'][0]['MAP_NAME']) : '') , '\';
';

echo 'var l_teleport = \'' , ((isset($this->tpldata['.'][0]['L_TELEPORT'])) ? quotes($this->tpldata['.'][0]['L_TELEPORT']) : ((isset($lang->teleport)) ? quotes($lang->teleport) : '')) , '\';
';

echo 'var lower_buffer = \'\';
';

echo 'var upper_buffer = \'\';
';

echo 'var col_map = ' , ((isset($this->tpldata['.'][0]['COL_MAP'])) ? $this->tpldata['.'][0]['COL_MAP'] : '') , ';
';

echo 'var row_map = ' , ((isset($this->tpldata['.'][0]['ROW_MAP'])) ? $this->tpldata['.'][0]['ROW_MAP'] : '') , ';
';

echo 'var map_id = ' , ((isset($this->tpldata['.'][0]['MAP_ID'])) ? $this->tpldata['.'][0]['MAP_ID'] : '') , ';
';

echo 'var preloaded = false;
';

echo 'var map_name = \'' , ((isset($this->tpldata['.'][0]['MAP_NAME'])) ? quotes($this->tpldata['.'][0]['MAP_NAME']) : '') , '\';
';

echo 'var map_music = \'' , ((isset($this->tpldata['.'][0]['MAP_MUSIC'])) ? quotes($this->tpldata['.'][0]['MAP_MUSIC']) : '') , '\';
';

echo 'var tileset_id = ' , ((isset($this->tpldata['.'][0]['TILESET_ID'])) ? $this->tpldata['.'][0]['TILESET_ID'] : '') , ';
';

echo 'var event_data = new Array();
';

echo '
';

echo 'var mode = new Array();
';

echo 'mode[0] = \'<div id="global_tileset" class="row1"><b>' , ((isset($this->tpldata['.'][0]['L_LOWER_LAYER'])) ? quotes($this->tpldata['.'][0]['L_LOWER_LAYER']) : ((isset($lang->lower_layer)) ? quotes($lang->lower_layer) : '')) , '</b><br /><div id="lower_tileset" style="width:\' + parseInt((tile_size + 1) * 8) + \'px"></div><br /><br /><b>' , ((isset($this->tpldata['.'][0]['L_UPPER_LAYER'])) ? quotes($this->tpldata['.'][0]['L_UPPER_LAYER']) : ((isset($lang->upper_layer)) ? quotes($lang->upper_layer) : '')) , '</b><br /><div id="upper_tileset" style="width:\' + parseInt((tile_size + 1) * 8) + \'px"></div></div><br /><div style="text-align:right"><form action="" onsubmit="return false">' , ((isset($this->tpldata['.'][0]['L_WIDTH_TILES_COPY'])) ? quotes($this->tpldata['.'][0]['L_WIDTH_TILES_COPY']) : ((isset($lang->width_tiles_copy)) ? quotes($lang->width_tiles_copy) : '')) , ' : <input type="numeric" id="w_tiles_copy" value="1" maxlength="1" style="width:30px" /> &nbsp; &nbsp; <br />' , ((isset($this->tpldata['.'][0]['L_HEIGHT_TILES_COPY'])) ? quotes($this->tpldata['.'][0]['L_HEIGHT_TILES_COPY']) : ((isset($lang->height_tiles_copy)) ? quotes($lang->height_tiles_copy) : '')) , ' : <input type="numeric" id="h_tiles_copy" value="1" maxlength="1" style="width:30px" /> &nbsp; &nbsp; <br />' , ((isset($this->tpldata['.'][0]['L_WIDTH_TILES_PASTE'])) ? quotes($this->tpldata['.'][0]['L_WIDTH_TILES_PASTE']) : ((isset($lang->width_tiles_paste)) ? quotes($lang->width_tiles_paste) : '')) , ' : <input type="numeric" id="w_tiles_paste" value="1" maxlength="1" style="width:30px" /> &nbsp; &nbsp; <br />' , ((isset($this->tpldata['.'][0]['L_HEIGHT_TILES_PASTE'])) ? quotes($this->tpldata['.'][0]['L_HEIGHT_TILES_PASTE']) : ((isset($lang->height_tiles_paste)) ? quotes($lang->height_tiles_paste) : '')) , ' : <input type="numeric" id="h_tiles_paste" value="1" maxlength="1" style="width:30px" /> &nbsp; &nbsp; </div></form>\';
';

echo 'var mode_1_begin = \'<form action="" onsubmit="return false"><select name="event_id" onchange="select_event(this.value);" size="8"><option value="0"> - </option>\';
';

echo 'var mode_1_content = \'\';
';

$_event_list_count = (isset($this->tpldata['event_list'])) ? count($this->tpldata['event_list']) : 0;for ($_event_list_i = 0; $_event_list_i < $_event_list_count; $_event_list_i++){
echo 'mode_1_content += \'<option value="' , ((isset($this->tpldata['event_list'][$_event_list_i]['ID'])) ? $this->tpldata['event_list'][$_event_list_i]['ID'] : '') , '">' , ((isset($this->tpldata['event_list'][$_event_list_i]['ID'])) ? $this->tpldata['event_list'][$_event_list_i]['ID'] : '') , '. ' , ((isset($this->tpldata['event_list'][$_event_list_i]['NAME'])) ? quotes($this->tpldata['event_list'][$_event_list_i]['NAME']) : '') , '</option>\';
';

echo 'event_data[' , ((isset($this->tpldata['event_list'][$_event_list_i]['ID'])) ? $this->tpldata['event_list'][$_event_list_i]['ID'] : '') , '] = new Array(\'' , ((isset($this->tpldata['event_list'][$_event_list_i]['PICTURE'])) ? quotes($this->tpldata['event_list'][$_event_list_i]['PICTURE']) : '') , '\', ' , ((isset($this->tpldata['event_list'][$_event_list_i]['WIDTH'])) ? $this->tpldata['event_list'][$_event_list_i]['WIDTH'] : '') , ', ' , ((isset($this->tpldata['event_list'][$_event_list_i]['HEIGHT'])) ? $this->tpldata['event_list'][$_event_list_i]['HEIGHT'] : '') , ', ' , ((isset($this->tpldata['event_list'][$_event_list_i]['DIR'])) ? $this->tpldata['event_list'][$_event_list_i]['DIR'] : '') , ', \'' , ((isset($this->tpldata['event_list'][$_event_list_i]['NAME'])) ? quotes($this->tpldata['event_list'][$_event_list_i]['NAME']) : '') , '\');
';

} // END event_list
echo 'var mode_1_end = \'</select></form><br /><br /><div id="actual_event"></div>\';
';

echo 'mode[2] = \'<form action="" onsubmit="return false">' , ((isset($this->tpldata['.'][0]['L_MAP_NAME'])) ? quotes($this->tpldata['.'][0]['L_MAP_NAME']) : ((isset($lang->map_name)) ? quotes($lang->map_name) : '')) , ' : <input type="text" id="map_name" value="" /><br /><br />' , ((isset($this->tpldata['.'][0]['L_MAP_MUSIC'])) ? quotes($this->tpldata['.'][0]['L_MAP_MUSIC']) : ((isset($lang->map_music)) ? quotes($lang->map_music) : '')) , ' : <input type="text" id="map_music" value="" /><br /><br />' , ((isset($this->tpldata['.'][0]['L_MAP_TILESET'])) ? quotes($this->tpldata['.'][0]['L_MAP_TILESET']) : ((isset($lang->map_tileset)) ? quotes($lang->map_tileset) : '')) , ' : <select name="map_tileset" id="map_tileset" onchange="tileset_id=this.value;">\';
';

$_tileset_list_count = (isset($this->tpldata['tileset_list'])) ? count($this->tpldata['tileset_list']) : 0;for ($_tileset_list_i = 0; $_tileset_list_i < $_tileset_list_count; $_tileset_list_i++){
echo 'mode[2] += \'<option value="' , ((isset($this->tpldata['tileset_list'][$_tileset_list_i]['ID'])) ? $this->tpldata['tileset_list'][$_tileset_list_i]['ID'] : '') , '">' , ((isset($this->tpldata['tileset_list'][$_tileset_list_i]['ID'])) ? $this->tpldata['tileset_list'][$_tileset_list_i]['ID'] : '') , '. ' , ((isset($this->tpldata['tileset_list'][$_tileset_list_i]['NAME'])) ? quotes($this->tpldata['tileset_list'][$_tileset_list_i]['NAME']) : '') , '</option>\';
';

} // END tileset_list
echo 'mode[2] += \'</select></form>\';
';

echo 'mode[3] = \'<form action="" onsubmit="return false"><select id="tool_type"><optgroup label="' , ((isset($this->tpldata['.'][0]['L_PRESET_EVENT'])) ? quotes($this->tpldata['.'][0]['L_PRESET_EVENT']) : ((isset($lang->preset_event)) ? quotes($lang->preset_event) : '')) , '"><option value="1">' , ((isset($this->tpldata['.'][0]['L_TELEPORT_HERE'])) ? quotes($this->tpldata['.'][0]['L_TELEPORT_HERE']) : ((isset($lang->teleport_here)) ? quotes($lang->teleport_here) : '')) , '</option><option value="2">' , ((isset($this->tpldata['.'][0]['L_TELEPORT_HERE'])) ? quotes($this->tpldata['.'][0]['L_TELEPORT_HERE']) : ((isset($lang->teleport_here)) ? quotes($lang->teleport_here) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ')</option><option value="3">' , ((isset($this->tpldata['.'][0]['L_TELEPORT_HERE'])) ? quotes($this->tpldata['.'][0]['L_TELEPORT_HERE']) : ((isset($lang->teleport_here)) ? quotes($lang->teleport_here) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ')</option><option value="4">' , ((isset($this->tpldata['.'][0]['L_TELEPORT_HERE'])) ? quotes($this->tpldata['.'][0]['L_TELEPORT_HERE']) : ((isset($lang->teleport_here)) ? quotes($lang->teleport_here) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ')</option><option value="5">' , ((isset($this->tpldata['.'][0]['L_TELEPORT_HERE'])) ? quotes($this->tpldata['.'][0]['L_TELEPORT_HERE']) : ((isset($lang->teleport_here)) ? quotes($lang->teleport_here) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ')</option></optgroup><optgroup label="' , ((isset($this->tpldata['.'][0]['L_ACTION'])) ? quotes($this->tpldata['.'][0]['L_ACTION']) : ((isset($lang->action)) ? quotes($lang->action) : '')) , '"><option value="6">' , ((isset($this->tpldata['.'][0]['L_SET_DEFAULT_START_POSITION'])) ? quotes($this->tpldata['.'][0]['L_SET_DEFAULT_START_POSITION']) : ((isset($lang->set_default_start_position)) ? quotes($lang->set_default_start_position) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ')</option><option value="7">' , ((isset($this->tpldata['.'][0]['L_SET_DEFAULT_START_POSITION'])) ? quotes($this->tpldata['.'][0]['L_SET_DEFAULT_START_POSITION']) : ((isset($lang->set_default_start_position)) ? quotes($lang->set_default_start_position) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ')</option><option value="8">' , ((isset($this->tpldata['.'][0]['L_SET_DEFAULT_START_POSITION'])) ? quotes($this->tpldata['.'][0]['L_SET_DEFAULT_START_POSITION']) : ((isset($lang->set_default_start_position)) ? quotes($lang->set_default_start_position) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ')</option><option value="9">' , ((isset($this->tpldata['.'][0]['L_SET_DEFAULT_START_POSITION'])) ? quotes($this->tpldata['.'][0]['L_SET_DEFAULT_START_POSITION']) : ((isset($lang->set_default_start_position)) ? quotes($lang->set_default_start_position) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ')</option><option value="10">' , ((isset($this->tpldata['.'][0]['L_SET_PLAYERS_POSITION'])) ? quotes($this->tpldata['.'][0]['L_SET_PLAYERS_POSITION']) : ((isset($lang->set_players_position)) ? quotes($lang->set_players_position) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ')</option><option value="11">' , ((isset($this->tpldata['.'][0]['L_SET_PLAYERS_POSITION'])) ? quotes($this->tpldata['.'][0]['L_SET_PLAYERS_POSITION']) : ((isset($lang->set_players_position)) ? quotes($lang->set_players_position) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ')</option><option value="12">' , ((isset($this->tpldata['.'][0]['L_SET_PLAYERS_POSITION'])) ? quotes($this->tpldata['.'][0]['L_SET_PLAYERS_POSITION']) : ((isset($lang->set_players_position)) ? quotes($lang->set_players_position) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ')</option><option value="13">' , ((isset($this->tpldata['.'][0]['L_SET_PLAYERS_POSITION'])) ? quotes($this->tpldata['.'][0]['L_SET_PLAYERS_POSITION']) : ((isset($lang->set_players_position)) ? quotes($lang->set_players_position) : '')) , ' (' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ')</option></optgroup></select></form>\';
';

echo '
';

echo 'document.getElementById(\'div_mode\').style.width = parseInt((tile_size + 1) * 8 + 40) + \'px\';
';

echo '
';

echo 'function preload_editor()
';

echo '{
';

echo '	construct_tileset(' , ((isset($this->tpldata['.'][0]['LOWER_TILES_IMG'])) ? $this->tpldata['.'][0]['LOWER_TILES_IMG'] : '') , ', ' , ((isset($this->tpldata['.'][0]['UPPER_TILES_IMG'])) ? $this->tpldata['.'][0]['UPPER_TILES_IMG'] : '') , ');
';

$_lower_bloc_count = (isset($this->tpldata['lower_bloc'])) ? count($this->tpldata['lower_bloc']) : 0;for ($_lower_bloc_i = 0; $_lower_bloc_i < $_lower_bloc_count; $_lower_bloc_i++){
echo '	l_bloc(\'' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['ID'])) ? $this->tpldata['lower_bloc'][$_lower_bloc_i]['ID'] : '') , '\', ' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['LEFT'])) ? $this->tpldata['lower_bloc'][$_lower_bloc_i]['LEFT'] : '') , ', ' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['TOP'])) ? $this->tpldata['lower_bloc'][$_lower_bloc_i]['TOP'] : '') , ', \'' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['BACKGROUND_IMAGE'])) ? quotes($this->tpldata['lower_bloc'][$_lower_bloc_i]['BACKGROUND_IMAGE']) : '') , '\', ' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['Z_INDEX'])) ? $this->tpldata['lower_bloc'][$_lower_bloc_i]['Z_INDEX'] : '') , ', ' , ((isset($this->tpldata['lower_bloc'][$_lower_bloc_i]['VALUE'])) ? $this->tpldata['lower_bloc'][$_lower_bloc_i]['VALUE'] : '') , ');
';

} // END lower_bloc
echo '	document.getElementById(\'lower_bloc\').innerHTML = lower_buffer;
';

echo '	lower_buffer = false;
';

$_upper_bloc_count = (isset($this->tpldata['upper_bloc'])) ? count($this->tpldata['upper_bloc']) : 0;for ($_upper_bloc_i = 0; $_upper_bloc_i < $_upper_bloc_count; $_upper_bloc_i++){
echo '	u_bloc(\'' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['ID'])) ? $this->tpldata['upper_bloc'][$_upper_bloc_i]['ID'] : '') , '\', ' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['LEFT'])) ? $this->tpldata['upper_bloc'][$_upper_bloc_i]['LEFT'] : '') , ', ' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['TOP'])) ? $this->tpldata['upper_bloc'][$_upper_bloc_i]['TOP'] : '') , ', \'' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['BACKGROUND_IMAGE'])) ? quotes($this->tpldata['upper_bloc'][$_upper_bloc_i]['BACKGROUND_IMAGE']) : '') , '\', ' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['Z_INDEX'])) ? $this->tpldata['upper_bloc'][$_upper_bloc_i]['Z_INDEX'] : '') , ', ' , ((isset($this->tpldata['upper_bloc'][$_upper_bloc_i]['VALUE'])) ? $this->tpldata['upper_bloc'][$_upper_bloc_i]['VALUE'] : '') , ');
';

} // END upper_bloc
echo '	document.getElementById(\'upper_bloc\').innerHTML = upper_buffer;
';

echo '	upper_buffer = false;
';

echo '	a_bloc(' , ((isset($this->tpldata['.'][0]['MAP_WIDTH'])) ? $this->tpldata['.'][0]['MAP_WIDTH'] : '') , ', ' , ((isset($this->tpldata['.'][0]['MAP_HEIGHT'])) ? $this->tpldata['.'][0]['MAP_HEIGHT'] : '') , ');
';

$_event_bloc_count = (isset($this->tpldata['event_bloc'])) ? count($this->tpldata['event_bloc']) : 0;for ($_event_bloc_i = 0; $_event_bloc_i < $_event_bloc_count; $_event_bloc_i++){
echo '	add_event(' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['ID'])) ? $this->tpldata['event_bloc'][$_event_bloc_i]['ID'] : '') , ', ' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['LEFT'])) ? $this->tpldata['event_bloc'][$_event_bloc_i]['LEFT'] : '') , ', ' , ((isset($this->tpldata['event_bloc'][$_event_bloc_i]['TOP'])) ? $this->tpldata['event_bloc'][$_event_bloc_i]['TOP'] : '') , ');
';

} // END event_bloc
echo '	preloaded = true;
';

echo '	//alert(lower_map.join());
';

echo '	return true;
';

echo '}
';

echo '
';

echo '</script>
';

echo '<script type="text/javascript" src="javascript/admin.map_editor.js"></script>
';


