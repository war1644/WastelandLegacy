<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
 <tr>
  <th>{L_SELECT_CLASS_TO_DELETE}</th>
 </tr>

 <tr>
  <td class="row1" align="center" style="padding:20px">
  <form action="{U_INDEX}?mod=admin.general&amp;mode=delete_class" method="POST" onsubmit="if(document.getElementById('classname').value==0||!confirm('[L_ARE_YOU_SURE_TO_DELETE_CLASS]')){return false;}">
  <input type="hidden" name="delete_class" value="1" />
  <select name="classname" id="classname">
  <option value="0"> - </option>
<!-- BEGIN class_list -->
  <option value="{class_list.NAME}">{class_list.TITLE}</option>
<!-- END class_list -->
  </select>
  <input type="submit" value="{L_VALIDATE}" class="button" />
  </form>
  </td>
 </tr>
</table>