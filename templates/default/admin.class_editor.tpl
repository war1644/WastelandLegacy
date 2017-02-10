<form action="{U_INDEX}?mod=admin.general" method="POST">
<input type="hidden" name="mode" value="save_class" />
<input type="hidden" name="old_classname" value="{CLASSNAME}" />

<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{L_CLASS_EDITOR} : {CLASS_TITLE}</th>
 </tr>

 <tr>
  <td align="center" class="cat">{L_ACCOUNT_OPTIONS}</td>
 </tr>

 <tr>
  <td class="row1">

  <table width="100%" border="0" cellpadding="3" cellspacing="0">
   <tr>
    <td align="right" width="50%">{L_CLASS_IDENTIFICATION} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="classname" value="{CLASSNAME}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_CLASS_TITLE} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="class_title" value="{CLASS_TITLE}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_SELECTABLE_WHEN_START} :</td>
    <td align="left" width="50%"><select name="selectable" id="selectable"><option value="0">{L_NO}</option><option value="1">{L_YES}</option></select></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_DESCRIPTION} :</td>
    <td align="left" width="50%"><textarea name="description" cols="" rows="" style="width:200px;height:60px">{CLASS_DESCRIPTION}</textarea></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_CHARASET} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="charaset" value="{CLASS_CHARASET}" onchange="document.getElementById('charaset_pic').src='images/charasets/'+this.value;" /></td>
   </tr>
   <tr>
    <td align="center" width="100%" colspan="2" style="padding:10px"><img src="images/charasets/{CLASS_CHARASET}" alt="" id="charaset_pic" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_BATTLER} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="battler" value="{CLASS_BATTLER}" onchange="document.getElementById('battler_pic').src='images/battlers/'+this.value;" /></td>
   </tr>
   <tr>
    <td align="center" width="100%" colspan="2" style="padding:10px"><img src="images/battlers/{CLASS_BATTLER}" alt="" id="battler_pic" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_HP_PLUS} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="hp_plus" value="{CLASS_HP_PLUS}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MP_PLUS} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="mp_plus" value="{CLASS_MP_PLUS}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_ATTACK_PLUS} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="attack_plus" value="{CLASS_ATTACK_PLUS}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_DEFENSE_PLUS} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="defense_plus" value="{CLASS_DEFENSE_PLUS}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MIND_PLUS} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="mind_plus" value="{CLASS_MIND_PLUS}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_AGILITY_PLUS} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="agility_plus" value="{CLASS_AGILITY_PLUS}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_EXPERIENCE_CURVE} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="exp_curve" value="{CLASS_EXP_CURVE}" style="width:200px" /> <input type="button" onclick="window.open('{U_INDEX}?mod=admin.general&mode=class_curve&type=exp&function='+exp_curve.value,'class_curve','left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550');" value="{L_VIEW_CURVE}" class="button" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_HP_CURVE} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="hp_curve" value="{CLASS_HP_CURVE}" style="width:200px" /> <input type="button" onclick="window.open('{U_INDEX}?mod=admin.general&mode=class_curve&type=hp&function='+hp_curve.value,'class_curve','left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550');" value="{L_VIEW_CURVE}" class="button" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MP_CURVE} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="mp_curve" value="{CLASS_MP_CURVE}" style="width:200px" /> <input type="button" onclick="window.open('{U_INDEX}?mod=admin.general&mode=class_curve&type=mp&function='+mp_curve.value,'class_curve','left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550');" value="{L_VIEW_CURVE}" class="button" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_ATTACK_CURVE} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="attack_curve" value="{CLASS_ATTACK_CURVE}" style="width:200px" /> <input type="button" onclick="window.open('{U_INDEX}?mod=admin.general&mode=class_curve&type=attack&function='+attack_curve.value,'class_curve','left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550');" value="{L_VIEW_CURVE}" class="button" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_DEFENSE_CURVE} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="defense_curve" value="{CLASS_DEFENSE_CURVE}" style="width:200px" /> <input type="button" onclick="window.open('{U_INDEX}?mod=admin.general&mode=class_curve&type=defense&function='+defense_curve.value,'class_curve','left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550');" value="{L_VIEW_CURVE}" class="button" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MIND_CURVE} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="mind_curve" value="{CLASS_MIND_CURVE}" style="width:200px" /> <input type="button" onclick="window.open('{U_INDEX}?mod=admin.general&mode=class_curve&type=mind&function='+mind_curve.value,'class_curve','left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550');" value="{L_VIEW_CURVE}" class="button" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_AGILITY_CURVE} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="agility_curve" value="{CLASS_AGILITY_CURVE}" style="width:200px" /> <input type="button" onclick="window.open('{U_INDEX}?mod=admin.general&mode=class_curve&type=agility&function='+agility_curve.value,'class_curve','left=10,top=10,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,menuBar=0,width=550,height=550');" value="{L_VIEW_CURVE}" class="button" /></td>
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

var class_selectable = {CLASS_SELECTABLE};

//-->
</script>
<script type="text/javascript" src="javascript/admin.class_editor.js"></script>