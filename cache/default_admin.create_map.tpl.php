<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_CREATE_MAP'])) ? $this->tpldata['.'][0]['L_CREATE_MAP'] : ((isset($lang->create_map)) ? $lang->create_map : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1">
';

echo '  <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.map&amp;mode=create_map" method="POST">
';

echo '  <input type="hidden" name="create_map" value="1" />
';

echo '
';

echo '  <table width="100%" cellpadding="3" cellspacing="0" border="0">
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MAP_NAME'])) ? $this->tpldata['.'][0]['L_MAP_NAME'] : ((isset($lang->map_name)) ? $lang->map_name : '')) , ' :</td><td align="left" width="50%"><input type="text" name="map_name" value="" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MAP_WIDTH'])) ? $this->tpldata['.'][0]['L_MAP_WIDTH'] : ((isset($lang->map_width)) ? $lang->map_width : '')) , ' :</td><td align="left" width="50%"><input type="numeric" name="map_width" value="" style="width:25px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MAP_HEIGHT'])) ? $this->tpldata['.'][0]['L_MAP_HEIGHT'] : ((isset($lang->map_height)) ? $lang->map_height : '')) , ' :</td><td align="left" width="50%"><input type="numeric" name="map_height" value="" style="width:25px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MAP_TILESET'])) ? $this->tpldata['.'][0]['L_MAP_TILESET'] : ((isset($lang->map_tileset)) ? $lang->map_tileset : '')) , ' :</td><td align="left" width="50%"><select name="map_tileset">
';

$_tileset_list_count = (isset($this->tpldata['tileset_list'])) ? count($this->tpldata['tileset_list']) : 0;for ($_tileset_list_i = 0; $_tileset_list_i < $_tileset_list_count; $_tileset_list_i++){
echo '    <option value="' , ((isset($this->tpldata['tileset_list'][$_tileset_list_i]['ID'])) ? $this->tpldata['tileset_list'][$_tileset_list_i]['ID'] : '') , '">' , ((isset($this->tpldata['tileset_list'][$_tileset_list_i]['ID'])) ? $this->tpldata['tileset_list'][$_tileset_list_i]['ID'] : '') , '. ' , ((isset($this->tpldata['tileset_list'][$_tileset_list_i]['NAME'])) ? $this->tpldata['tileset_list'][$_tileset_list_i]['NAME'] : '') , '</option>
';

} // END tileset_list
echo '    </select></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="center" colspan="2"><input type="submit" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? $this->tpldata['.'][0]['L_VALIDATE'] : ((isset($lang->validate)) ? $lang->validate : '')) , '" class="button" /></td>
';

echo '   </tr>
';

echo '  </table>
';

echo '
';

echo '  </form>
';

echo '  </td>
';

echo ' </tr>
';

echo '</table>
';


