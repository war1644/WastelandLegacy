<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{L_SELECT_CLASS_TO_EDIT}</th>
 </tr>

 <tr>
  <td class="row1" align="center" style="padding:20px">
  <form action="{U_INDEX}" method="GET" onsubmit="if(document.getElementById('classname').value==''){return false;}">
  <input type="hidden" name="mod" value="admin.general" />
  <input type="hidden" name="mode" value="class_editor" />
  <select name="classname" id="classname">
  <option value=""> - </option>
<!-- BEGIN class_list -->
  <option value="{class_list.NAME}">{class_list.TITLE}</option>
<!-- END class_list -->
  </select>
  <input type="submit" value="{L_VALIDATE}" class="button" />
  </form>
  </td>
 </tr>
</table>