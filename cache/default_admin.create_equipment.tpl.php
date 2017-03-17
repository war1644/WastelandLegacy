<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_CREATE_EVENT'])) ? $this->tpldata['.'][0]['L_CREATE_EVENT'] : ((isset($lang->create_event)) ? $lang->create_event : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1">
';

echo '  <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.map&amp;mode=create_equipmentr" method="POST">
';

echo '
';

echo '    <input type="hidden" name="create_equipmentr" value="1" />
';

echo '  <table width="100%" cellpadding="7" cellspacing="0" border="0">
';

echo '   <tr>
';

echo '
';

echo '  <td align="right" width="50%">贩卖地 :
';

echo '    <select name="map_id" id="map_id">
';

echo '    <option value="0"> - </option>
';

$_map_list_count = (isset($this->tpldata['map_list'])) ? count($this->tpldata['map_list']) : 0;for ($_map_list_i = 0; $_map_list_i < $_map_list_count; $_map_list_i++){
echo '    <option value="' , ((isset($this->tpldata['map_list'][$_map_list_i]['ID'])) ? $this->tpldata['map_list'][$_map_list_i]['ID'] : '') , '">' , ((isset($this->tpldata['map_list'][$_map_list_i]['ID'])) ? $this->tpldata['map_list'][$_map_list_i]['ID'] : '') , '. ' , ((isset($this->tpldata['map_list'][$_map_list_i]['NAME'])) ? $this->tpldata['map_list'][$_map_list_i]['NAME'] : '') , '</option>
';

} // END map_list
echo '    </select>
';

echo '  </td>
';

echo '
';

echo '
';

echo '
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">物品类型 :</td><td align="left" width="50%"><input type="text" name="type" value="" /></td>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">装备位置:</td><td align="left" width="50%"><input type="text" name="position" value="" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">物品名称 :</td><td align="left" width="50%"><input type="text" name="name" value="" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">物品价格:</td><td align="left" width="50%"><input type="text" name="price" value="" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">攻击力:</td><td align="left" width="50%"><input type="text" name="attack" value="" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">攻击范围 :</td><td align="left" width="50%"><input type="text" name="range" value="" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">防御力 :</td><td align="left" width="50%"><input type="text" name="defence" value="" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">可装备 :</td><td align="left" width="50%"><input type="text" name="usable" value="" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">特效 :</td><td align="left" width="50%"><input type="text" name="effects" value="" /></td>
';

echo '   </tr>
';

echo '
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


