<form action="{U_INDEX}?mod=admin.general" method="POST">
<input type="hidden" name="mode" value="save_user" />
<input type="hidden" name="id" value="{CHARACTER_ID}" />

<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{L_USER_EDITOR} : {CHARACTER_NAME}</th>
 </tr>

 <tr>
  <td align="center" class="cat">{L_ACCOUNT_OPTIONS}</td>
 </tr>

 <tr>
  <td class="row1">

  <table width="100%" border="0" cellpadding="3" cellspacing="0">
   <tr>
    <td align="right" width="50%">{L_NAME} :</td>
    <td align="left" width="50%"><input type="text" maxlength="16" name="name" value="{CHARACTER_NAME}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_CHANGE_PASSWORD} :</td>
    <td align="left" width="50%"><input type="text" maxlength="24" name="password" value="" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_EMAIL} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="email" value="{CHARACTER_EMAIL}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_ADMINISTRATOR} :</td>
    <td align="left" width="50%"><select name="admin" id="admin"><option value="0">{L_NO}</option><option value="1">{L_YES}</option></select></td>
   </tr>
  </table>

  </td>
 </tr>
 <tr>
  <td align="center" class="cat">{L_CHARACTER_PROPERTIES}</td>
 </tr>
 <tr>
  <td class="row1">

  <table width="100%" border="0" cellpadding="3" cellspacing="0">
   <tr>
    <td align="right" width="50%">{L_POINTS} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="points" value="{CHARACTER_POINTS}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_HP} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="hp" value="{CHARACTER_HP}" style="width:30px" /> <span style="font-size:18px">/</span> <input type="numeric" maxlength="11" name="hp_max" id="hp_max" value="{CHARACTER_HP_MAX}" style="width:30px" onchange="document.getElementById('hp_max_total').innerHTML=parseInt(this.value)+parseInt(document.getElementById('hp_plus').innerHTML);" /> + <span id="hp_plus">{CHARACTER_HP_PLUS}</span> = <span id="hp_max_total">{CHARACTER_HP_MAX_TOTAL}</span></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MP} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="mp" value="{CHARACTER_MP}" style="width:30px" /> <span style="font-size:18px">/</span> <input type="numeric" maxlength="11" name="mp_max" id="mp_max" value="{CHARACTER_MP_MAX}" style="width:30px" onchange="document.getElementById('mp_max_total').innerHTML=parseInt(this.value)+parseInt(document.getElementById('mp_plus').innerHTML);" /> + <span id="mp_plus">{CHARACTER_MP_PLUS}</span> = <span id="mp_max_total">{CHARACTER_MP_MAX_TOTAL}</span></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_ATTACK} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="attack" value="{CHARACTER_ATTACK}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_DEFENSE} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="defense" value="{CHARACTER_DEFENSE}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MIND} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="mind" value="{CHARACTER_MIND}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_AGILITY} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="agility" value="{CHARACTER_AGILITY}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_EXP} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="exp" value="{CHARACTER_EXP}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_LEVEL} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="level" value="{CHARACTER_LEVEL}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_SPACE_STORAGE} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="space" value="{CHARACTER_SPACE}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_CHARASET} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="charaset" value="{CHARACTER_CHARASET}" onchange="document.getElementById('charaset_pic').src='images/charasets/'+this.value;" /></td>
   </tr>
   <tr>
    <td align="center" width="100%" colspan="2" style="padding:10px"><img src="images/charasets/{CHARACTER_CHARASET_PIC}" alt="" id="charaset_pic" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_BATTLER} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="battler" value="{CHARACTER_BATTLER}" onchange="document.getElementById('battler_pic').src='images/battlers/'+this.value;" /></td>
   </tr>
   <tr>
    <td align="center" width="100%" colspan="2" style="padding:10px"><img src="images/battlers/{CHARACTER_BATTLER_PIC}" alt="" id="battler_pic" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_CLASS} :</td>
    <td align="left" width="50%"><select name="classname" id="classname" onchange="document.getElementById('hp_plus').innerHTML=classes_hp_plus[this.value];document.getElementById('mp_plus').innerHTML=classes_mp_plus[this.value];document.getElementById('hp_max_total').innerHTML=parseInt(document.getElementById('hp_max').value)+classes_hp_plus[this.value];document.getElementById('mp_max_total').innerHTML=parseInt(document.getElementById('mp_max').value)+classes_mp_plus[this.value];">
	<!-- BEGIN class_list -->
	<option value="{class_list.NAME}">{class_list.TITLE}</option>
	<!-- END class_list -->
	</select></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_VARIABLES} :</td>
    <td align="left" width="50%"><textarea name="vars" cols="" rows="" style="width:200px;height:40px">{CHARACTER_VARS}</textarea></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_BIOGRAPHY} :</td>
    <td align="left" width="50%"><textarea name="biography" cols="" rows="" style="width:200px;height:60px">{CHARACTER_BIOGRAPHY}</textarea></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_START_LOCATION} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="start_location" value="{CHARACTER_START_LOCATION}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MODIFY_LOCATION} :</td>
    <td align="left" width="50%"><select name="modify_location" id="modify_location" onchange="modify_location_change();"><option value="0">{L_NO}</option><option value="1">{L_YES}</option></select></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MAP_ID} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="map_id" id="map_id" value="{CHARACTER_MAP_ID}" style="width:30px" disabled="disabled" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MAP_X} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="map_left" id="map_left" value="{CHARACTER_MAP_LEFT}" style="width:30px" disabled="disabled" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MAP_Y} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="map_top" id="map_top" value="{CHARACTER_MAP_TOP}" style="width:30px" disabled="disabled" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_DIRECTION} :</td>
    <td align="left" width="50%"><select name="map_dir" id="map_dir" disabled="disabled"><option value="0">{L_DOWN}</option><option value="1">{L_LEFT}</option><option value="2">{L_UP}</option><option value="3">{L_RIGHT}</option></select></td>
   </tr>
  </table>

  </td>

  </td>
 </tr>
 <tr>
  <td align="center" class="cat"><input type="submit" value="{L_VALIDATE}" class="post" /></td>
 </tr>
</table>

</form>
<script type="text/javascript">
<!--
var admin = {CHARACTER_ADMIN};
var classname = '[CHARACTER_CLASSNAME]';
var map_dir = {CHARACTER_MAP_DIR};
var classes_hp_plus = new Array();
var classes_mp_plus = new Array();
<!-- BEGIN class_list -->
classes_hp_plus['[class_list.NAME]'] = {class_list.HP_PLUS};
classes_mp_plus['[class_list.NAME]'] = {class_list.MP_PLUS};
<!-- END class_list -->
//-->
</script>
<script type="text/javascript" src="javascript/admin.user_editor.js"></script>