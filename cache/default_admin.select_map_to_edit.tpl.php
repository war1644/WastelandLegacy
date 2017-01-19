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

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_SELECT_MAP_TO_EDIT'])) ? $this->tpldata['.'][0]['L_SELECT_MAP_TO_EDIT'] : ((isset($lang->select_map_to_edit)) ? $lang->select_map_to_edit : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1" align="center" style="padding:20px">
';

echo '  <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '" method="GET" onsubmit="if(document.getElementById(\'map_id\').value==0){return false;}">
';

echo '  <input type="hidden" name="mod" value="admin.map" />
';

echo '  <input type="hidden" name="mode" value="map_editor" />
';

echo '  <select name="map_id" id="map_id">
';

echo '  <option value="0"> - </option>
';

$_map_list_count = (isset($this->tpldata['map_list'])) ? count($this->tpldata['map_list']) : 0;for ($_map_list_i = 0; $_map_list_i < $_map_list_count; $_map_list_i++){
echo '  <option value="' , ((isset($this->tpldata['map_list'][$_map_list_i]['ID'])) ? $this->tpldata['map_list'][$_map_list_i]['ID'] : '') , '">' , ((isset($this->tpldata['map_list'][$_map_list_i]['ID'])) ? $this->tpldata['map_list'][$_map_list_i]['ID'] : '') , '. ' , ((isset($this->tpldata['map_list'][$_map_list_i]['NAME'])) ? $this->tpldata['map_list'][$_map_list_i]['NAME'] : '') , '</option>
';

} // END map_list
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


