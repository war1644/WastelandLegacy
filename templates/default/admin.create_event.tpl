<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
 <tr>
  <th>{L_CREATE_EVENT}</th>
 </tr>

 <tr>
  <td class="row1">
  <form action="{U_INDEX}?mod=admin.map&amp;mode=create_event" method="POST">
  <input type="hidden" name="create_event" value="1" />

  <table width="100%" cellpadding="3" cellspacing="0" border="0">
   <tr>
    <td align="right" width="50%">{L_EVENT_NAME} :</td><td align="left" width="50%"><input type="text" name="event_name" value="" /></td>
   </tr>
   <tr>
    <td align="center" colspan="2"><input type="submit" value="{L_VALIDATE}" class="button" /></td>
   </tr>
  </table>

  </form>
  </td>
 </tr>
</table>