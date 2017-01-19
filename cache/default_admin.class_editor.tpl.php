<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general" method="POST">
';

echo '<input type="hidden" name="mode" value="save_class" />
';

echo '<input type="hidden" name="old_classname" value="' , ((isset($this->tpldata['.'][0]['CLASSNAME'])) ? $this->tpldata['.'][0]['CLASSNAME'] : '') , '" />
';

echo '
';

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo '
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_CLASS_EDITOR'])) ? $this->tpldata['.'][0]['L_CLASS_EDITOR'] : ((isset($lang->class_editor)) ? $lang->class_editor : '')) , ' : ' , ((isset($this->tpldata['.'][0]['CLASS_TITLE'])) ? $this->tpldata['.'][0]['CLASS_TITLE'] : '') , '</th>
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

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CLASS_IDENTIFICATION'])) ? $this->tpldata['.'][0]['L_CLASS_IDENTIFICATION'] : ((isset($lang->class_identification)) ? $lang->class_identification : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="classname" value="' , ((isset($this->tpldata['.'][0]['CLASSNAME'])) ? $this->tpldata['.'][0]['CLASSNAME'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CLASS_TITLE'])) ? $this->tpldata['.'][0]['L_CLASS_TITLE'] : ((isset($lang->class_title)) ? $lang->class_title : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="class_title" value="' , ((isset($this->tpldata['.'][0]['CLASS_TITLE'])) ? $this->tpldata['.'][0]['CLASS_TITLE'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_SELECTABLE_WHEN_START'])) ? $this->tpldata['.'][0]['L_SELECTABLE_WHEN_START'] : ((isset($lang->selectable_when_start)) ? $lang->selectable_when_start : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><select name="selectable" id="selectable"><option value="0">' , ((isset($this->tpldata['.'][0]['L_NO'])) ? $this->tpldata['.'][0]['L_NO'] : ((isset($lang->no)) ? $lang->no : '')) , '</option><option value="1">' , ((isset($this->tpldata['.'][0]['L_YES'])) ? $this->tpldata['.'][0]['L_YES'] : ((isset($lang->yes)) ? $lang->yes : '')) , '</option></select></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_DESCRIPTION'])) ? $this->tpldata['.'][0]['L_DESCRIPTION'] : ((isset($lang->description)) ? $lang->description : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><textarea name="description" cols="" rows="" style="width:200px;height:60px">' , ((isset($this->tpldata['.'][0]['CLASS_DESCRIPTION'])) ? $this->tpldata['.'][0]['CLASS_DESCRIPTION'] : '') , '</textarea></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CHARASET'])) ? $this->tpldata['.'][0]['L_CHARASET'] : ((isset($lang->charaset)) ? $lang->charaset : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="charaset" value="' , ((isset($this->tpldata['.'][0]['CLASS_CHARASET'])) ? $this->tpldata['.'][0]['CLASS_CHARASET'] : '') , '" onchange="document.getElementById(\'charaset_pic\').src=\'images/charasets/\'+this.value;" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="center" width="100%" colspan="2" style="padding:10px"><img src="images/charasets/' , ((isset($this->tpldata['.'][0]['CLASS_CHARASET'])) ? $this->tpldata['.'][0]['CLASS_CHARASET'] : '') , '" alt="" id="charaset_pic" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_BATTLER'])) ? $this->tpldata['.'][0]['L_BATTLER'] : ((isset($lang->battler)) ? $lang->battler : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="battler" value="' , ((isset($this->tpldata['.'][0]['CLASS_BATTLER'])) ? $this->tpldata['.'][0]['CLASS_BATTLER'] : '') , '" onchange="document.getElementById(\'battler_pic\').src=\'images/battlers/\'+this.value;" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="center" width="100%" colspan="2" style="padding:10px"><img src="images/battlers/' , ((isset($this->tpldata['.'][0]['CLASS_BATTLER'])) ? $this->tpldata['.'][0]['CLASS_BATTLER'] : '') , '" alt="" id="battler_pic" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_HP_PLUS'])) ? $this->tpldata['.'][0]['L_HP_PLUS'] : ((isset($lang->hp_plus)) ? $lang->hp_plus : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="hp_plus" value="' , ((isset($this->tpldata['.'][0]['CLASS_HP_PLUS'])) ? $this->tpldata['.'][0]['CLASS_HP_PLUS'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MP_PLUS'])) ? $this->tpldata['.'][0]['L_MP_PLUS'] : ((isset($lang->mp_plus)) ? $lang->mp_plus : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="mp_plus" value="' , ((isset($this->tpldata['.'][0]['CLASS_MP_PLUS'])) ? $this->tpldata['.'][0]['CLASS_MP_PLUS'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_ATTACK_PLUS'])) ? $this->tpldata['.'][0]['L_ATTACK_PLUS'] : ((isset($lang->attack_plus)) ? $lang->attack_plus : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="attack_plus" value="' , ((isset($this->tpldata['.'][0]['CLASS_ATTACK_PLUS'])) ? $this->tpldata['.'][0]['CLASS_ATTACK_PLUS'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_DEFENSE_PLUS'])) ? $this->tpldata['.'][0]['L_DEFENSE_PLUS'] : ((isset($lang->defense_plus)) ? $lang->defense_plus : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="defense_plus" value="' , ((isset($this->tpldata['.'][0]['CLASS_DEFENSE_PLUS'])) ? $this->tpldata['.'][0]['CLASS_DEFENSE_PLUS'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MIND_PLUS'])) ? $this->tpldata['.'][0]['L_MIND_PLUS'] : ((isset($lang->mind_plus)) ? $lang->mind_plus : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="mind_plus" value="' , ((isset($this->tpldata['.'][0]['CLASS_MIND_PLUS'])) ? $this->tpldata['.'][0]['CLASS_MIND_PLUS'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_AGILITY_PLUS'])) ? $this->tpldata['.'][0]['L_AGILITY_PLUS'] : ((isset($lang->agility_plus)) ? $lang->agility_plus : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="agility_plus" value="' , ((isset($this->tpldata['.'][0]['CLASS_AGILITY_PLUS'])) ? $this->tpldata['.'][0]['CLASS_AGILITY_PLUS'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_EXPERIENCE_CURVE'])) ? $this->tpldata['.'][0]['L_EXPERIENCE_CURVE'] : ((isset($lang->experience_curve)) ? $lang->experience_curve : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="exp_curve" value="' , ((isset($this->tpldata['.'][0]['CLASS_EXP_CURVE'])) ? $this->tpldata['.'][0]['CLASS_EXP_CURVE'] : '') , '" style="width:200px" /> <input type="button" onclick="window.open(\'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general&mode=class_curve&type=exp&function=\'+urlencode(exp_curve.value),\'class_curve\',\'left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550\');" value="' , ((isset($this->tpldata['.'][0]['L_VIEW_CURVE'])) ? $this->tpldata['.'][0]['L_VIEW_CURVE'] : ((isset($lang->view_curve)) ? $lang->view_curve : '')) , '" class="button" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_HP_CURVE'])) ? $this->tpldata['.'][0]['L_HP_CURVE'] : ((isset($lang->hp_curve)) ? $lang->hp_curve : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="hp_curve" value="' , ((isset($this->tpldata['.'][0]['CLASS_HP_CURVE'])) ? $this->tpldata['.'][0]['CLASS_HP_CURVE'] : '') , '" style="width:200px" /> <input type="button" onclick="window.open(\'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general&mode=class_curve&type=hp&function=\'+urlencode(hp_curve.value),\'class_curve\',\'left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550\');" value="' , ((isset($this->tpldata['.'][0]['L_VIEW_CURVE'])) ? $this->tpldata['.'][0]['L_VIEW_CURVE'] : ((isset($lang->view_curve)) ? $lang->view_curve : '')) , '" class="button" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MP_CURVE'])) ? $this->tpldata['.'][0]['L_MP_CURVE'] : ((isset($lang->mp_curve)) ? $lang->mp_curve : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="mp_curve" value="' , ((isset($this->tpldata['.'][0]['CLASS_MP_CURVE'])) ? $this->tpldata['.'][0]['CLASS_MP_CURVE'] : '') , '" style="width:200px" /> <input type="button" onclick="window.open(\'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general&mode=class_curve&type=mp&function=\'+urlencode(mp_curve.value),\'class_curve\',\'left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550\');" value="' , ((isset($this->tpldata['.'][0]['L_VIEW_CURVE'])) ? $this->tpldata['.'][0]['L_VIEW_CURVE'] : ((isset($lang->view_curve)) ? $lang->view_curve : '')) , '" class="button" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_ATTACK_CURVE'])) ? $this->tpldata['.'][0]['L_ATTACK_CURVE'] : ((isset($lang->attack_curve)) ? $lang->attack_curve : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="attack_curve" value="' , ((isset($this->tpldata['.'][0]['CLASS_ATTACK_CURVE'])) ? $this->tpldata['.'][0]['CLASS_ATTACK_CURVE'] : '') , '" style="width:200px" /> <input type="button" onclick="window.open(\'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general&mode=class_curve&type=attack&function=\'+urlencode(attack_curve.value),\'class_curve\',\'left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550\');" value="' , ((isset($this->tpldata['.'][0]['L_VIEW_CURVE'])) ? $this->tpldata['.'][0]['L_VIEW_CURVE'] : ((isset($lang->view_curve)) ? $lang->view_curve : '')) , '" class="button" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_DEFENSE_CURVE'])) ? $this->tpldata['.'][0]['L_DEFENSE_CURVE'] : ((isset($lang->defense_curve)) ? $lang->defense_curve : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="defense_curve" value="' , ((isset($this->tpldata['.'][0]['CLASS_DEFENSE_CURVE'])) ? $this->tpldata['.'][0]['CLASS_DEFENSE_CURVE'] : '') , '" style="width:200px" /> <input type="button" onclick="window.open(\'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general&mode=class_curve&type=defense&function=\'+urlencode(defense_curve.value),\'class_curve\',\'left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550\');" value="' , ((isset($this->tpldata['.'][0]['L_VIEW_CURVE'])) ? $this->tpldata['.'][0]['L_VIEW_CURVE'] : ((isset($lang->view_curve)) ? $lang->view_curve : '')) , '" class="button" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_MIND_CURVE'])) ? $this->tpldata['.'][0]['L_MIND_CURVE'] : ((isset($lang->mind_curve)) ? $lang->mind_curve : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="mind_curve" value="' , ((isset($this->tpldata['.'][0]['CLASS_MIND_CURVE'])) ? $this->tpldata['.'][0]['CLASS_MIND_CURVE'] : '') , '" style="width:200px" /> <input type="button" onclick="window.open(\'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general&mode=class_curve&type=mind&function=\'+urlencode(mind_curve.value),\'class_curve\',\'left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550\');" value="' , ((isset($this->tpldata['.'][0]['L_VIEW_CURVE'])) ? $this->tpldata['.'][0]['L_VIEW_CURVE'] : ((isset($lang->view_curve)) ? $lang->view_curve : '')) , '" class="button" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_AGILITY_CURVE'])) ? $this->tpldata['.'][0]['L_AGILITY_CURVE'] : ((isset($lang->agility_curve)) ? $lang->agility_curve : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="agility_curve" value="' , ((isset($this->tpldata['.'][0]['CLASS_AGILITY_CURVE'])) ? $this->tpldata['.'][0]['CLASS_AGILITY_CURVE'] : '') , '" style="width:200px" /> <input type="button" onclick="window.open(\'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general&mode=class_curve&type=agility&function=\'+urlencode(agility_curve.value),\'class_curve\',\'left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550\');" value="' , ((isset($this->tpldata['.'][0]['L_VIEW_CURVE'])) ? $this->tpldata['.'][0]['L_VIEW_CURVE'] : ((isset($lang->view_curve)) ? $lang->view_curve : '')) , '" class="button" /></td>
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

echo '
';

echo 'var class_selectable = ' , ((isset($this->tpldata['.'][0]['CLASS_SELECTABLE'])) ? $this->tpldata['.'][0]['CLASS_SELECTABLE'] : '') , ';
';

echo '
';

echo '//-->
';

echo '</script>
';

echo '<script type="text/javascript" src="javascript/admin.class_editor.js"></script>
';


