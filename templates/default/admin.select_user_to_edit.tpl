<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{L_SELECT_USER_TO_EDIT}</th>
 </tr>

 <tr>
  <td class="row1" align="center" style="padding:20px">
  <form action="{U_INDEX}" method="GET" onsubmit="if(document.getElementById('user_id').value==0){return false;}">
  <input type="hidden" name="mod" value="admin.general" />
  <input type="hidden" name="mode" value="user_editor" />
  <select name="user_id" id="user_id">
  <option value="0"> - </option>
<!-- BEGIN user_list -->
  <option value="{user_list.ID}">{user_list.ID}. {user_list.NAME}</option>
<!-- END user_list -->
  </select>
  <input type="submit" value="{L_VALIDATE}" class="button" />
  </form>
  </td>
 </tr>
</table>