<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{L_SELECT_MAP_TO_EDIT}</th>
 </tr>

 <tr>
  <td class="row1" align="center" style="padding:20px">
  <form action="{U_INDEX}" method="GET" onsubmit="if(document.getElementById('map_id').value==0){return false;}">
  <input type="hidden" name="mod" value="admin.map" />
  <input type="hidden" name="mode" value="map_editor" />
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