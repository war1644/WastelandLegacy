<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
 <tr>
  <th>{L_CREATE_CLASS}</th>
 </tr>

 <tr>
  <td class="row1">
  <form action="{U_INDEX}?mod=admin.general&amp;mode=create_class" method="post">
  <input type="hidden" name="create_class" value="1" />

  <table width="100%" cellpadding="3" cellspacing="0" border="0">
   <tr>
    <td align="right" width="50%">{L_CLASSNAME} :</td><td align="left" width="50%"><input type="text" name="classname" value="" maxlength="24" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_CLASS_TITLE} :</td><td align="left" width="50%"><input type="text" name="class_title" value="" maxlength="64" /></td>
   </tr>
   <tr>
    <td align="center" colspan="2"><input type="submit" value="{L_VALIDATE}" class="button" /></td>
   </tr>
  </table>

  </form>
  </td>
 </tr>
</table>