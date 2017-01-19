<!-- BEGIN map_deleted -->
<div id="to_erase">
<table width="100%" cellpadding="8" cellspacing="0" border="0" class="action_done">
 <tr>
  <td align="center"><b>{L_MAP_DELETED}</b></td>
 </tr>
</table>

<table width="100%">
 <tr>
  <td height="5"></td>
 </tr>
</table>
</div>
<script type="text/javascript">
<!--
setTimeout('document.getElementById(\'to_erase\').innerHTML=\'\';document.getElementById(\'to_erase\').style.display=\'inline\';', 3000);
//-->
</script>
<!-- END map_deleted -->

<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
 <tr>
  <th>{L_SELECT_MAP_TO_DELETE}</th>
 </tr>

 <tr>
  <td class="row1" align="center" style="padding:20px">
  <form action="{U_INDEX}?mod=admin.map&amp;mode=delete_map" method="POST" onsubmit="if(document.getElementById('map_id').value==0||!confirm('[L_ARE_YOU_SURE_TO_DELETE_MAP]')){return false;}">
  <input type="hidden" name="delete_map" value="1" />
  <select name="map_id" id="map_id">
  <option value="0"> - </option>
<!-- BEGIN map_list -->
  <option value="{map_list.ID}">{map_list.ID}. {map_list.NAME}</option>
<!-- END map_list -->
  </select>
  <input type="submit" value="{L_VALIDATE}" class="button" />
  </form>
  </td>
 </tr>
</table>