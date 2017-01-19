<table width="100%" cellpadding="2" cellspacing="1" border="0" class="portaline">
 <tr>
  <th colspan="2">{L_TILESET_EDITOR} : {TILESET_NAME}</th>
 </tr>
 <tr>

  <td class="row1" align="right" nowrap="nowrap" valign="top" width="50%" style="padding:10px;">

  <form action="" onsubmit="return false;"><input type="button" value="{L_SAVE_TILESET}" class="button" onclick="save_tileset();" /></form>

  <hr />

  <form action="" onsubmit="return false;"><input type="radio" name="mode" value="2" onclick="change_mode(this.value);" />&nbsp;<i>{L_TILESET_PROPERTIES}</i> &nbsp; <input type="radio" name="mode" value="0" onclick="change_mode(this.value);" />&nbsp;<i>{L_MODE_TILE}</i> &nbsp; <input type="radio" checked="checked" name="mode" value="1" onclick="change_mode(this.value);" />&nbsp;<i>{L_MODE_LAYER}</i>&nbsp;</form><br /><br />

  <div id="actual_mode"></div>

  </td>
  <td class="row2" align="left" valign="top" width="50%">

  <div id="global_tileset"></div>

  </td>
 </tr>

</table>

<script type="text/javascript">
<!--

var tile_size = {TILE_SIZE};
var u_index = '[U_INDEX]';
var tileset_tiles_lower = {TILESET_TILES_LOWER};
var tileset_tiles_upper = {TILESET_TILES_UPPER};
var l_tileset_tiles_lower = '[L_TILESET_TILES_LOWER]';
var l_tileset_tiles_upper = '[L_TILESET_TILES_UPPER]';
var tileset_id = {TILESET_ID};
var tileset_color = '{TILESET_BGCOLOR}';
var refresh_method = {REFRESH_METHOD};
var tileset_name = '[TILESET_NAME]';
var tileset_cols = {TILESET_COLS};

var mode = new Array();
mode[0] = '<form action="" onsubmit="return false;">[L_SELECT_TILE] :<br /><br /><select name="tile_filename" onchange="document.getElementById(\'demo_tile\').style.backgroundImage=\'url(images/tiles/\'+this.value+\')\';actual_tile=this.value;" size="16">';
mode[0] += '<option value=""> - </option>';
<!-- BEGIN tile -->
mode[0] += '<option value="{tile.FILENAME}">{tile.FILENAME}</option>';
<!-- END tile -->
mode[0] += '</select></form><br />';
mode[0] += '<div id="demo_tile" style="width:{TILE_SIZE}px;height:{TILE_SIZE}px"></div>';
mode[1] = '[L_CLICK_TO_CHANGE_LAYER]<br /><br /><div style="float:right;text-align:left"> &nbsp; &nbsp; <b>0.</b> [L_LAYER_BELOW]<br /> &nbsp; &nbsp; <b>1.</b> [L_LAYER_SAME]<br /> &nbsp; &nbsp; <b>2.</b> [L_LAYER_ABOVE]</div>';
var global_tileset = '<b>[L_LOWER_LAYER]</b><br /><div id="lower_tileset" style="width:' + parseInt((tile_size + 1) * 8) + 'px"></div><br /><br /><b>[L_UPPER_LAYER]</b><br /><div id="upper_tileset" style="width:' + parseInt((tile_size + 1) * 8) + 'px"></div>';
mode[2] = '<form action="" onsubmit="return false">[L_TILESET_NAME] : <input type="text" id="tileset_name" value="" /><br /><br />[L_TILESET_TILES_LOWER] : <input type="numeric" value="" id="set_lower_size" /><br /><br />[L_TILESET_TILES_UPPER] : <input type="numeric" value="" id="set_upper_size" /><br /><br /><input type="button" value="[L_RESIZE_TILESET]" class="post" onclick="resize_tileset()" /></form>';

function make_tileset()
{
	construct_tileset({LOWER_TILES_IMG}, {LOWER_TILES_VALUE}, {UPPER_TILES_IMG}, {UPPER_TILES_VALUE});
}

//-->
</script>
<script type="text/javascript" src="javascript/admin.tileset_editor.js"></script>