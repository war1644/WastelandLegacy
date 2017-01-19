<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general" method="POST">
';

echo '<input type="hidden" name="mode" value="save_user" />
';

echo '<input type="hidden" name="id" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_ID'])) ? $this->tpldata['.'][0]['CHARACTER_ID'] : '') , '" />
';

echo '
';

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo '
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_USER_EDITOR'])) ? $this->tpldata['.'][0]['L_USER_EDITOR'] : ((isset($lang->user_editor)) ? $lang->user_editor : '')) , ' : ' , ((isset($this->tpldata['.'][0]['CHARACTER_NAME'])) ? $this->tpldata['.'][0]['CHARACTER_NAME'] : '') , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td align="center" class="cat">' , ((isset($this->tpldata['.'][0]['L_ACCOUNT_OPTIONS'])) ? $this->tpldata['.'][0]['L_ACCOUNT_OPTIONS'] : ((isset($lang->account_options)) ? $lang->account_options : '')) , '</td>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1">
';

echo '
';

echo '  <table width="100%" border="0" cellpadding="3" cellspacing="0">
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_NAME'])) ? $this->tpldata['.'][0]['L_NAME'] : ((isset($lang->name)) ? $lang->name : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="16" name="name" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_NAME'])) ? $this->tpldata['.'][0]['CHARACTER_NAME'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CHANGE_PASSWORD'])) ? $this->tpldata['.'][0]['L_CHANGE_PASSWORD'] : ((isset($lang->change_password)) ? $lang->change_password : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="24" name="password" value="" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_EMAIL'])) ? $this->tpldata['.'][0]['L_EMAIL'] : ((isset($lang->email)) ? $lang->email : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="email" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_EMAIL'])) ? $this->tpldata['.'][0]['CHARACTER_EMAIL'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_ADMINISTRATOR'])) ? $this->tpldata['.'][0]['L_ADMINISTRATOR'] : ((isset($lang->administrator)) ? $lang->administrator : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><select name="admin" id="admin"><option value="0">' , ((isset($this->tpldata['.'][0]['L_NO'])) ? $this->tpldata['.'][0]['L_NO'] : ((isset($lang->no)) ? $lang->no : '')) , '</option><option value="1">' , ((isset($this->tpldata['.'][0]['L_YES'])) ? $this->tpldata['.'][0]['L_YES'] : ((isset($lang->yes)) ? $lang->yes : '')) , '</option></select></td>
';

echo '   </tr>
';

echo '  </table>
';

echo '
';

echo '  </td>
';

echo ' </tr>
';

echo ' <tr>
';

echo '  <td align="center" class="cat">' , ((isset($this->tpldata['.'][0]['L_CHARACTER_PROPERTIES'])) ? $this->tpldata['.'][0]['L_CHARACTER_PROPERTIES'] : ((isset($lang->character_properties)) ? $lang->character_properties : '')) , '</td>
';

echo ' </tr>
';

echo ' <tr>
';

echo '  <td class="row1">
';

echo '
';

echo '  <table width="100%" border="0" cellpadding="3" cellspacing="0">
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_POINTS'])) ? $this->tpldata['.'][0]['L_POINTS'] : ((isset($lang->points)) ? $lang->points : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="points" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_POINTS'])) ? $this->tpldata['.'][0]['CHARACTER_POINTS'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_HP'])) ? $this->tpldata['.'][0]['L_HP'] : ((isset($lang->hp)) ? $lang->hp : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="hp" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_HP'])) ? $this->tpldata['.'][0]['CHARACTER_HP'] : '') , '" style="width:30px" /> <span style="font-size:18px">/</span> <input type="numeric" maxlength="11" name="hp_max" id="hp_max" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_HP_MAX'])) ? $this->tpldata['.'][0]['CHARACTER_HP_MAX'] : '') , '" style="width:30px" onchange="document.getElementById(\'hp_max_total\').innerHTML=parseInt(this.value)+parseInt(document.getElementById(\'hp_plus\').innerHTML);" /> + <span id="hp_plus">' , ((isset($this->tpldata['.'][0]['CHARACTER_HP_PLUS'])) ? $this->tpldata['.'][0]['CHARACTER_HP_PLUS'] : '') , '</span> = <span id="hp_max_total">' , ((isset($this->tpldata['.'][0]['CHARACTER_HP_MAX_TOTAL'])) ? $this->tpldata['.'][0]['CHARACTER_HP_MAX_TOTAL'] : '') , '</span></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MP'])) ? $this->tpldata['.'][0]['L_MP'] : ((isset($lang->mp)) ? $lang->mp : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="mp" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_MP'])) ? $this->tpldata['.'][0]['CHARACTER_MP'] : '') , '" style="width:30px" /> <span style="font-size:18px">/</span> <input type="numeric" maxlength="11" name="mp_max" id="mp_max" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_MP_MAX'])) ? $this->tpldata['.'][0]['CHARACTER_MP_MAX'] : '') , '" style="width:30px" onchange="document.getElementById(\'mp_max_total\').innerHTML=parseInt(this.value)+parseInt(document.getElementById(\'mp_plus\').innerHTML);" /> + <span id="mp_plus">' , ((isset($this->tpldata['.'][0]['CHARACTER_MP_PLUS'])) ? $this->tpldata['.'][0]['CHARACTER_MP_PLUS'] : '') , '</span> = <span id="mp_max_total">' , ((isset($this->tpldata['.'][0]['CHARACTER_MP_MAX_TOTAL'])) ? $this->tpldata['.'][0]['CHARACTER_MP_MAX_TOTAL'] : '') , '</span></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_ATTACK'])) ? $this->tpldata['.'][0]['L_ATTACK'] : ((isset($lang->attack)) ? $lang->attack : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="attack" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_ATTACK'])) ? $this->tpldata['.'][0]['CHARACTER_ATTACK'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_DEFENSE'])) ? $this->tpldata['.'][0]['L_DEFENSE'] : ((isset($lang->defense)) ? $lang->defense : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="defense" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_DEFENSE'])) ? $this->tpldata['.'][0]['CHARACTER_DEFENSE'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MIND'])) ? $this->tpldata['.'][0]['L_MIND'] : ((isset($lang->mind)) ? $lang->mind : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="mind" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_MIND'])) ? $this->tpldata['.'][0]['CHARACTER_MIND'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_AGILITY'])) ? $this->tpldata['.'][0]['L_AGILITY'] : ((isset($lang->agility)) ? $lang->agility : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="agility" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_AGILITY'])) ? $this->tpldata['.'][0]['CHARACTER_AGILITY'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_EXP'])) ? $this->tpldata['.'][0]['L_EXP'] : ((isset($lang->exp)) ? $lang->exp : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="exp" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_EXP'])) ? $this->tpldata['.'][0]['CHARACTER_EXP'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_LEVEL'])) ? $this->tpldata['.'][0]['L_LEVEL'] : ((isset($lang->level)) ? $lang->level : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="level" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_LEVEL'])) ? $this->tpldata['.'][0]['CHARACTER_LEVEL'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_SPACE_STORAGE'])) ? $this->tpldata['.'][0]['L_SPACE_STORAGE'] : ((isset($lang->space_storage)) ? $lang->space_storage : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="space" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_SPACE'])) ? $this->tpldata['.'][0]['CHARACTER_SPACE'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CHARASET'])) ? $this->tpldata['.'][0]['L_CHARASET'] : ((isset($lang->charaset)) ? $lang->charaset : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="charaset" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_CHARASET'])) ? $this->tpldata['.'][0]['CHARACTER_CHARASET'] : '') , '" onchange="document.getElementById(\'charaset_pic\').src=\'images/charasets/\'+this.value;" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="center" width="100%" colspan="2" style="padding:10px"><img src="images/charasets/' , ((isset($this->tpldata['.'][0]['CHARACTER_CHARASET_PIC'])) ? $this->tpldata['.'][0]['CHARACTER_CHARASET_PIC'] : '') , '" alt="" id="charaset_pic" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_BATTLER'])) ? $this->tpldata['.'][0]['L_BATTLER'] : ((isset($lang->battler)) ? $lang->battler : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="battler" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_BATTLER'])) ? $this->tpldata['.'][0]['CHARACTER_BATTLER'] : '') , '" onchange="document.getElementById(\'battler_pic\').src=\'images/battlers/\'+this.value;" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="center" width="100%" colspan="2" style="padding:10px"><img src="images/battlers/' , ((isset($this->tpldata['.'][0]['CHARACTER_BATTLER_PIC'])) ? $this->tpldata['.'][0]['CHARACTER_BATTLER_PIC'] : '') , '" alt="" id="battler_pic" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CLASS'])) ? $this->tpldata['.'][0]['L_CLASS'] : ((isset($lang->class)) ? $lang->class : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><select name="classname" id="classname" onchange="document.getElementById(\'hp_plus\').innerHTML=classes_hp_plus[this.value];document.getElementById(\'mp_plus\').innerHTML=classes_mp_plus[this.value];document.getElementById(\'hp_max_total\').innerHTML=parseInt(document.getElementById(\'hp_max\').value)+classes_hp_plus[this.value];document.getElementById(\'mp_max_total\').innerHTML=parseInt(document.getElementById(\'mp_max\').value)+classes_mp_plus[this.value];">
';

$_class_list_count = (isset($this->tpldata['class_list'])) ? count($this->tpldata['class_list']) : 0;for ($_class_list_i = 0; $_class_list_i < $_class_list_count; $_class_list_i++){
echo '	<option value="' , ((isset($this->tpldata['class_list'][$_class_list_i]['NAME'])) ? $this->tpldata['class_list'][$_class_list_i]['NAME'] : '') , '">' , ((isset($this->tpldata['class_list'][$_class_list_i]['TITLE'])) ? $this->tpldata['class_list'][$_class_list_i]['TITLE'] : '') , '</option>
';

} // END class_list
echo '	</select></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_VARIABLES'])) ? $this->tpldata['.'][0]['L_VARIABLES'] : ((isset($lang->variables)) ? $lang->variables : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><textarea name="vars" cols="" rows="" style="width:200px;height:40px">' , ((isset($this->tpldata['.'][0]['CHARACTER_VARS'])) ? $this->tpldata['.'][0]['CHARACTER_VARS'] : '') , '</textarea></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_BIOGRAPHY'])) ? $this->tpldata['.'][0]['L_BIOGRAPHY'] : ((isset($lang->biography)) ? $lang->biography : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><textarea name="biography" cols="" rows="" style="width:200px;height:60px">' , ((isset($this->tpldata['.'][0]['CHARACTER_BIOGRAPHY'])) ? $this->tpldata['.'][0]['CHARACTER_BIOGRAPHY'] : '') , '</textarea></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_START_LOCATION'])) ? $this->tpldata['.'][0]['L_START_LOCATION'] : ((isset($lang->start_location)) ? $lang->start_location : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="start_location" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_START_LOCATION'])) ? $this->tpldata['.'][0]['CHARACTER_START_LOCATION'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MODIFY_LOCATION'])) ? $this->tpldata['.'][0]['L_MODIFY_LOCATION'] : ((isset($lang->modify_location)) ? $lang->modify_location : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><select name="modify_location" id="modify_location" onchange="modify_location_change();"><option value="0">' , ((isset($this->tpldata['.'][0]['L_NO'])) ? $this->tpldata['.'][0]['L_NO'] : ((isset($lang->no)) ? $lang->no : '')) , '</option><option value="1">' , ((isset($this->tpldata['.'][0]['L_YES'])) ? $this->tpldata['.'][0]['L_YES'] : ((isset($lang->yes)) ? $lang->yes : '')) , '</option></select></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MAP_ID'])) ? $this->tpldata['.'][0]['L_MAP_ID'] : ((isset($lang->map_id)) ? $lang->map_id : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="map_id" id="map_id" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_MAP_ID'])) ? $this->tpldata['.'][0]['CHARACTER_MAP_ID'] : '') , '" style="width:30px" disabled="disabled" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MAP_X'])) ? $this->tpldata['.'][0]['L_MAP_X'] : ((isset($lang->map_x)) ? $lang->map_x : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="map_left" id="map_left" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_MAP_LEFT'])) ? $this->tpldata['.'][0]['CHARACTER_MAP_LEFT'] : '') , '" style="width:30px" disabled="disabled" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MAP_Y'])) ? $this->tpldata['.'][0]['L_MAP_Y'] : ((isset($lang->map_y)) ? $lang->map_y : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="map_top" id="map_top" value="' , ((isset($this->tpldata['.'][0]['CHARACTER_MAP_TOP'])) ? $this->tpldata['.'][0]['CHARACTER_MAP_TOP'] : '') , '" style="width:30px" disabled="disabled" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_DIRECTION'])) ? $this->tpldata['.'][0]['L_DIRECTION'] : ((isset($lang->direction)) ? $lang->direction : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><select name="map_dir" id="map_dir" disabled="disabled"><option value="0">' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? $this->tpldata['.'][0]['L_DOWN'] : ((isset($lang->down)) ? $lang->down : '')) , '</option><option value="1">' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? $this->tpldata['.'][0]['L_LEFT'] : ((isset($lang->left)) ? $lang->left : '')) , '</option><option value="2">' , ((isset($this->tpldata['.'][0]['L_UP'])) ? $this->tpldata['.'][0]['L_UP'] : ((isset($lang->up)) ? $lang->up : '')) , '</option><option value="3">' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? $this->tpldata['.'][0]['L_RIGHT'] : ((isset($lang->right)) ? $lang->right : '')) , '</option></select></td>
';

echo '   </tr>
';

echo '  </table>
';

echo '
';

echo '  </td>
';

echo '
';

echo '  </td>
';

echo ' </tr>
';

echo ' <tr>
';

echo '  <td align="center" class="cat"><input type="submit" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? $this->tpldata['.'][0]['L_VALIDATE'] : ((isset($lang->validate)) ? $lang->validate : '')) , '" class="post" /></td>
';

echo ' </tr>
';

echo '</table>
';

echo '
';

echo '</form>
';

echo '<script type="text/javascript">
';

echo '<!--
';

echo 'var admin = ' , ((isset($this->tpldata['.'][0]['CHARACTER_ADMIN'])) ? $this->tpldata['.'][0]['CHARACTER_ADMIN'] : '') , ';
';

echo 'var classname = \'' , ((isset($this->tpldata['.'][0]['CHARACTER_CLASSNAME'])) ? quotes($this->tpldata['.'][0]['CHARACTER_CLASSNAME']) : '') , '\';
';

echo 'var map_dir = ' , ((isset($this->tpldata['.'][0]['CHARACTER_MAP_DIR'])) ? $this->tpldata['.'][0]['CHARACTER_MAP_DIR'] : '') , ';
';

echo 'var classes_hp_plus = new Array();
';

echo 'var classes_mp_plus = new Array();
';

$_class_list_count = (isset($this->tpldata['class_list'])) ? count($this->tpldata['class_list']) : 0;for ($_class_list_i = 0; $_class_list_i < $_class_list_count; $_class_list_i++){
echo 'classes_hp_plus[\'' , ((isset($this->tpldata['class_list'][$_class_list_i]['NAME'])) ? quotes($this->tpldata['class_list'][$_class_list_i]['NAME']) : '') , '\'] = ' , ((isset($this->tpldata['class_list'][$_class_list_i]['HP_PLUS'])) ? $this->tpldata['class_list'][$_class_list_i]['HP_PLUS'] : '') , ';
';

echo 'classes_mp_plus[\'' , ((isset($this->tpldata['class_list'][$_class_list_i]['NAME'])) ? quotes($this->tpldata['class_list'][$_class_list_i]['NAME']) : '') , '\'] = ' , ((isset($this->tpldata['class_list'][$_class_list_i]['MP_PLUS'])) ? $this->tpldata['class_list'][$_class_list_i]['MP_PLUS'] : '') , ';
';

} // END class_list
echo '//-->
';

echo '</script>
';

echo '<script type="text/javascript" src="javascript/admin.user_editor.js"></script>
';


