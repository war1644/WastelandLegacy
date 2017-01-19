<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

$_map_deleted_count = (isset($this->tpldata['map_deleted'])) ? count($this->tpldata['map_deleted']) : 0;for ($_map_deleted_i = 0; $_map_deleted_i < $_map_deleted_count; $_map_deleted_i++){
echo '<div id="to_erase">
';

echo '<table width="100%" cellpadding="8" cellspacing="0" border="0" class="action_done">
';

echo ' <tr>
';

echo '  <td align="center"><b>' , ((isset($this->tpldata['.'][0]['L_MAP_DELETED'])) ? $this->tpldata['.'][0]['L_MAP_DELETED'] : ((isset($lang->map_deleted)) ? $lang->map_deleted : '')) , '</b></td>
';

echo ' </tr>
';

echo '</table>
';

echo '
';

echo '<table width="100%">
';

echo ' <tr>
';

echo '  <td height="5"></td>
';

echo ' </tr>
';

echo '</table>
';

echo '</div>
';

echo '<script type="text/javascript">
';

echo '<!--
';

echo 'setTimeout(\'document.getElementById(\\\'to_erase\\\').innerHTML=\\\'\\\';document.getElementById(\\\'to_erase\\\').style.display=\\\'inline\\\';\', 3000);
';

echo '//-->
';

echo '</script>
';

} // END map_deleted
echo '
';

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_SELECT_MAP_TO_DELETE'])) ? $this->tpldata['.'][0]['L_SELECT_MAP_TO_DELETE'] : ((isset($lang->select_map_to_delete)) ? $lang->select_map_to_delete : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1" align="center" style="padding:20px">
';

echo '  <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.map&amp;mode=delete_map" method="POST" onsubmit="if(document.getElementById(\'map_id\').value==0||!confirm(\'' , ((isset($this->tpldata['.'][0]['L_ARE_YOU_SURE_TO_DELETE_MAP'])) ? quotes($this->tpldata['.'][0]['L_ARE_YOU_SURE_TO_DELETE_MAP']) : ((isset($lang->are_you_sure_to_delete_map)) ? quotes($lang->are_you_sure_to_delete_map) : '')) , '\')){return false;}">
';

echo '  <input type="hidden" name="delete_map" value="1" />
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


