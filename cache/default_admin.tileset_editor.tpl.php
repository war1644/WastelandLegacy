<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<table width="100%" cellpadding="2" cellspacing="1" border="0" class="portaline">
';

echo ' <tr>
';

echo '  <th colspan="2">' , ((isset($this->tpldata['.'][0]['L_TILESET_EDITOR'])) ? $this->tpldata['.'][0]['L_TILESET_EDITOR'] : ((isset($lang->tileset_editor)) ? $lang->tileset_editor : '')) , ' : ' , ((isset($this->tpldata['.'][0]['TILESET_NAME'])) ? $this->tpldata['.'][0]['TILESET_NAME'] : '') , '</th>
';

echo ' </tr>
';

echo ' <tr>
';

echo '
';

echo '  <td class="row1" align="right" nowrap="nowrap" valign="top" width="50%" style="padding:10px;">
';

echo '
';

echo '  <form action="" onsubmit="return false;"><input type="button" value="' , ((isset($this->tpldata['.'][0]['L_SAVE_TILESET'])) ? $this->tpldata['.'][0]['L_SAVE_TILESET'] : ((isset($lang->save_tileset)) ? $lang->save_tileset : '')) , '" class="button" onclick="save_tileset();" /></form>
';

echo '
';

echo '  <hr />
';

echo '
';

echo '  <form action="" onsubmit="return false;"><input type="radio" name="mode" value="2" onclick="change_mode(this.value);" />&nbsp;<i>' , ((isset($this->tpldata['.'][0]['L_TILESET_PROPERTIES'])) ? $this->tpldata['.'][0]['L_TILESET_PROPERTIES'] : ((isset($lang->tileset_properties)) ? $lang->tileset_properties : '')) , '</i> &nbsp; <input type="radio" name="mode" value="0" onclick="change_mode(this.value);" />&nbsp;<i>' , ((isset($this->tpldata['.'][0]['L_MODE_TILE'])) ? $this->tpldata['.'][0]['L_MODE_TILE'] : ((isset($lang->mode_tile)) ? $lang->mode_tile : '')) , '</i> &nbsp; <input type="radio" checked="checked" name="mode" value="1" onclick="change_mode(this.value);" />&nbsp;<i>' , ((isset($this->tpldata['.'][0]['L_MODE_LAYER'])) ? $this->tpldata['.'][0]['L_MODE_LAYER'] : ((isset($lang->mode_layer)) ? $lang->mode_layer : '')) , '</i>&nbsp;</form><br /><br />
';

echo '
';

echo '  <div id="actual_mode"></div>
';

echo '
';

echo '  </td>
';

echo '  <td class="row2" align="left" valign="top" width="50%">
';

echo '
';

echo '  <div id="global_tileset"></div>
';

echo '
';

echo '  </td>
';

echo ' </tr>
';

echo '
';

echo '</table>
';

echo '
';

echo '<script type="text/javascript">
';

echo '<!--
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

echo 'var l_tileset_tiles_lower = \'' , ((isset($this->tpldata['.'][0]['L_TILESET_TILES_LOWER'])) ? quotes($this->tpldata['.'][0]['L_TILESET_TILES_LOWER']) : ((isset($lang->tileset_tiles_lower)) ? quotes($lang->tileset_tiles_lower) : '')) , '\';
';

echo 'var l_tileset_tiles_upper = \'' , ((isset($this->tpldata['.'][0]['L_TILESET_TILES_UPPER'])) ? quotes($this->tpldata['.'][0]['L_TILESET_TILES_UPPER']) : ((isset($lang->tileset_tiles_upper)) ? quotes($lang->tileset_tiles_upper) : '')) , '\';
';

echo 'var tileset_id = ' , ((isset($this->tpldata['.'][0]['TILESET_ID'])) ? $this->tpldata['.'][0]['TILESET_ID'] : '') , ';
';

echo 'var tileset_color = \'' , ((isset($this->tpldata['.'][0]['TILESET_BGCOLOR'])) ? $this->tpldata['.'][0]['TILESET_BGCOLOR'] : '') , '\';
';

echo 'var refresh_method = ' , ((isset($this->tpldata['.'][0]['REFRESH_METHOD'])) ? $this->tpldata['.'][0]['REFRESH_METHOD'] : '') , ';
';

echo 'var tileset_name = \'' , ((isset($this->tpldata['.'][0]['TILESET_NAME'])) ? quotes($this->tpldata['.'][0]['TILESET_NAME']) : '') , '\';
';

echo 'var tileset_cols = ' , ((isset($this->tpldata['.'][0]['TILESET_COLS'])) ? $this->tpldata['.'][0]['TILESET_COLS'] : '') , ';
';

echo '
';

echo 'var mode = new Array();
';

echo 'mode[0] = \'<form action="" onsubmit="return false;">' , ((isset($this->tpldata['.'][0]['L_SELECT_TILE'])) ? quotes($this->tpldata['.'][0]['L_SELECT_TILE']) : ((isset($lang->select_tile)) ? quotes($lang->select_tile) : '')) , ' :<br /><br /><select name="tile_filename" onchange="document.getElementById(\\\'demo_tile\\\').style.backgroundImage=\\\'url(images/tiles/\\\'+this.value+\\\')\\\';actual_tile=this.value;" size="16">\';
';

echo 'mode[0] += \'<option value=""> - </option>\';
';

$_tile_count = (isset($this->tpldata['tile'])) ? count($this->tpldata['tile']) : 0;for ($_tile_i = 0; $_tile_i < $_tile_count; $_tile_i++){
echo 'mode[0] += \'<option value="' , ((isset($this->tpldata['tile'][$_tile_i]['FILENAME'])) ? $this->tpldata['tile'][$_tile_i]['FILENAME'] : '') , '">' , ((isset($this->tpldata['tile'][$_tile_i]['FILENAME'])) ? $this->tpldata['tile'][$_tile_i]['FILENAME'] : '') , '</option>\';
';

} // END tile
echo 'mode[0] += \'</select></form><br />\';
';

echo 'mode[0] += \'<div id="demo_tile" style="width:' , ((isset($this->tpldata['.'][0]['TILE_SIZE'])) ? $this->tpldata['.'][0]['TILE_SIZE'] : '') , 'px;height:' , ((isset($this->tpldata['.'][0]['TILE_SIZE'])) ? $this->tpldata['.'][0]['TILE_SIZE'] : '') , 'px"></div>\';
';

echo 'mode[1] = \'' , ((isset($this->tpldata['.'][0]['L_CLICK_TO_CHANGE_LAYER'])) ? quotes($this->tpldata['.'][0]['L_CLICK_TO_CHANGE_LAYER']) : ((isset($lang->click_to_change_layer)) ? quotes($lang->click_to_change_layer) : '')) , '<br /><br /><div style="float:right;text-align:left"> &nbsp; &nbsp; <b>0.</b> ' , ((isset($this->tpldata['.'][0]['L_LAYER_BELOW'])) ? quotes($this->tpldata['.'][0]['L_LAYER_BELOW']) : ((isset($lang->layer_below)) ? quotes($lang->layer_below) : '')) , '<br /> &nbsp; &nbsp; <b>1.</b> ' , ((isset($this->tpldata['.'][0]['L_LAYER_SAME'])) ? quotes($this->tpldata['.'][0]['L_LAYER_SAME']) : ((isset($lang->layer_same)) ? quotes($lang->layer_same) : '')) , '<br /> &nbsp; &nbsp; <b>2.</b> ' , ((isset($this->tpldata['.'][0]['L_LAYER_ABOVE'])) ? quotes($this->tpldata['.'][0]['L_LAYER_ABOVE']) : ((isset($lang->layer_above)) ? quotes($lang->layer_above) : '')) , '</div>\';
';

echo 'var global_tileset = \'<b>' , ((isset($this->tpldata['.'][0]['L_LOWER_LAYER'])) ? quotes($this->tpldata['.'][0]['L_LOWER_LAYER']) : ((isset($lang->lower_layer)) ? quotes($lang->lower_layer) : '')) , '</b><br /><div id="lower_tileset" style="width:\' + parseInt((tile_size + 1) * 8) + \'px"></div><br /><br /><b>' , ((isset($this->tpldata['.'][0]['L_UPPER_LAYER'])) ? quotes($this->tpldata['.'][0]['L_UPPER_LAYER']) : ((isset($lang->upper_layer)) ? quotes($lang->upper_layer) : '')) , '</b><br /><div id="upper_tileset" style="width:\' + parseInt((tile_size + 1) * 8) + \'px"></div>\';
';

echo 'mode[2] = \'<form action="" onsubmit="return false">' , ((isset($this->tpldata['.'][0]['L_TILESET_NAME'])) ? quotes($this->tpldata['.'][0]['L_TILESET_NAME']) : ((isset($lang->tileset_name)) ? quotes($lang->tileset_name) : '')) , ' : <input type="text" id="tileset_name" value="" /><br /><br />' , ((isset($this->tpldata['.'][0]['L_TILESET_TILES_LOWER'])) ? quotes($this->tpldata['.'][0]['L_TILESET_TILES_LOWER']) : ((isset($lang->tileset_tiles_lower)) ? quotes($lang->tileset_tiles_lower) : '')) , ' : <input type="numeric" value="" id="set_lower_size" /><br /><br />' , ((isset($this->tpldata['.'][0]['L_TILESET_TILES_UPPER'])) ? quotes($this->tpldata['.'][0]['L_TILESET_TILES_UPPER']) : ((isset($lang->tileset_tiles_upper)) ? quotes($lang->tileset_tiles_upper) : '')) , ' : <input type="numeric" value="" id="set_upper_size" /><br /><br /><input type="button" value="' , ((isset($this->tpldata['.'][0]['L_RESIZE_TILESET'])) ? quotes($this->tpldata['.'][0]['L_RESIZE_TILESET']) : ((isset($lang->resize_tileset)) ? quotes($lang->resize_tileset) : '')) , '" class="post" onclick="resize_tileset()" /></form>\';
';

echo '
';

echo 'function make_tileset()
';

echo '{
';

echo '	construct_tileset(' , ((isset($this->tpldata['.'][0]['LOWER_TILES_IMG'])) ? $this->tpldata['.'][0]['LOWER_TILES_IMG'] : '') , ', ' , ((isset($this->tpldata['.'][0]['LOWER_TILES_VALUE'])) ? $this->tpldata['.'][0]['LOWER_TILES_VALUE'] : '') , ', ' , ((isset($this->tpldata['.'][0]['UPPER_TILES_IMG'])) ? $this->tpldata['.'][0]['UPPER_TILES_IMG'] : '') , ', ' , ((isset($this->tpldata['.'][0]['UPPER_TILES_VALUE'])) ? $this->tpldata['.'][0]['UPPER_TILES_VALUE'] : '') , ');
';

echo '}
';

echo '
';

echo '//-->
';

echo '</script>
';

echo '<script type="text/javascript" src="javascript/admin.tileset_editor.js"></script>
';


