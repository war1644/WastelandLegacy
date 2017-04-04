<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo '
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_SELECT_TILESET_TO_EDIT'])) ? $this->tpldata['.'][0]['L_SELECT_TILESET_TO_EDIT'] : ((isset($lang->select_tileset_to_edit)) ? $lang->select_tileset_to_edit : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1" align="center" style="padding:20px">
';

echo '  <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '" method="GET" onsubmit="if(document.getElementById(\'tileset_id\').value==0){return false;}">
';

echo '  <input type="hidden" name="mod" value="admin.map" />
';

echo '  <input type="hidden" name="mode" value="tileset_editor" />
';

echo '  <select name="tileset_id" id="tileset_id">
';

echo '  <option value="0"> - </option>
';

$_tileset_list_count = (isset($this->tpldata['tileset_list'])) ? count($this->tpldata['tileset_list']) : 0;for ($_tileset_list_i = 0; $_tileset_list_i < $_tileset_list_count; $_tileset_list_i++){
echo '  <option value="' , ((isset($this->tpldata['tileset_list'][$_tileset_list_i]['ID'])) ? $this->tpldata['tileset_list'][$_tileset_list_i]['ID'] : '') , '">' , ((isset($this->tpldata['tileset_list'][$_tileset_list_i]['ID'])) ? $this->tpldata['tileset_list'][$_tileset_list_i]['ID'] : '') , '. ' , ((isset($this->tpldata['tileset_list'][$_tileset_list_i]['NAME'])) ? $this->tpldata['tileset_list'][$_tileset_list_i]['NAME'] : '') , '</option>
';

} // END tileset_list
echo '  </select>
';

echo '  <input type="submit" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? $this->tpldata['.'][0]['L_VALIDATE'] : ((isset($lang->validate)) ? $lang->validate : '')) , '" class="button" />
';

echo '  </form>
';

echo '  </td>
';

echo ' </tr>
';

echo '</table>
';


