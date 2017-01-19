<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{L_REGISTERING}</th>
 </tr>

 <tr>
  <td class="row1" align="center">

  <form action="{U_INDEX}?mod=profile" method="post">
  <input type="hidden" name="mode" value="register" />

  <!-- BEGIN register_error -->
  <br /><span style="color:red">{register_error.ERROR}</span>
  <!-- END register_error -->

  <div class="gensmall" style="padding:10px">{L_REGISTER_EXPLAIN}</div>
  <div style="padding:10px">

  <table width="100%" cellpadding="3" cellspacing="0" border="0">
   <tr>
    <td align="right" width="50%">{L_CHARACTER_NAME} : </td><td align="left" width="50%"><input type="text" value="{CHARACTER_NAME}" name="name" class="post" maxlength="16" /></td>
   </tr>

   <tr>
    <td align="right" width="50%">{L_PASSWORD} : </td><td align="left" width="50%"><input type="password" value="{PASSWORD}" name="password" class="post" maxlength="24" /></td>
   </tr>

   <tr>
    <td align="right" width="50%">{L_PASSWORD_CONFIRM} : </td><td align="left" width="50%"><input type="password" value="{PASSWORD_CONFIRM}" name="password_confirm" class="post" maxlength="24" /></td>
   </tr>

   <tr>
    <td align="right" width="50%">{L_EMAIL} : </td><td align="left" width="50%"><input type="text" value="{EMAIL}" name="email" class="post" maxlength="128" /></td>
   </tr>

   <tr>
    <td align="right" width="50%">{L_CLASS} : </td><td align="left" width="50%">&nbsp;</td>
   </tr>
<!-- BEGIN class_list -->
   <tr>
    <td align="right" width="50%"><input type="radio" name="classname" value="{class_list.CLASSNAME}" {class_list.CHECKED}/></td><td align="left" width="50%" style="padding:10px"><img src="images/battlers/{class_list.BATTLER}" alt="" style="float:left" /><b>{class_list.CLASS_TITLE}</b><br /><br /><i>{class_list.DESCRIPTION}</i></td>
   </tr>
<!-- END class_list -->
  </table>
  
  <br />
  <input type="submit" class="post" value="{L_VALIDATE}" />

  </div>

  </form>

  </td>
 </tr>
</table>