<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<table border width=170 height=100>
';

echo '  <tr>
';

echo '    <th>id</th>
';

echo '    <th>贩卖地</th>
';

echo '    <th>物品类型</th>
';

echo '    <th>装备位置</th>
';

echo '    <th>物品名称</th>
';

echo '    <th>物品价格</th>
';

echo '    <th>攻击力</th>
';

echo '    <th>攻击范围</th>
';

echo '    <th>防御力</th>
';

echo '    <th>可装备</th>
';

echo '    <th>特效</th>
';

echo '    <th>编辑</th>
';

echo '  </tr>
';

$_equipment_list_count = (isset($this->tpldata['equipment_list'])) ? count($this->tpldata['equipment_list']) : 0;for ($_equipment_list_i = 0; $_equipment_list_i < $_equipment_list_count; $_equipment_list_i++){
echo '  <tr>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['ID'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['ID'] : '') , '</th>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['PLACE'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['PLACE'] : '') , '</th>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['TYPE'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['TYPE'] : '') , '</th>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['POSITION'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['POSITION'] : '') , '</th>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['NAME'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['NAME'] : '') , '</th>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['PRICE'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['PRICE'] : '') , '</th>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['ATTACK'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['ATTACK'] : '') , '</th>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['RANGE'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['RANGE'] : '') , '</th>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['DEFENCE'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['DEFENCE'] : '') , '</th>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['USABLE'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['USABLE'] : '') , '</th>
';

echo '    <th>' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['EFFECTS'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['EFFECTS'] : '') , '</th>
';

echo '    <th><a href="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.map&amp;mode=editors_equipment&amp;id=' , ((isset($this->tpldata['equipment_list'][$_equipment_list_i]['ID'])) ? $this->tpldata['equipment_list'][$_equipment_list_i]['ID'] : '') , '">编辑</a></th>
';

echo '  </tr>
';

} // END equipment_list
echo '
';

echo '</table>
';


