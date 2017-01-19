<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{L_RESIZE_MAP}</th>
 </tr>

 <tr>
  <td class="row1" align="center" style="padding:20px">
  <form action="{U_INDEX}?mod=admin.map&amp;mode=resize_map" method="POST" onsubmit="if(document.getElementById('map_id').value==0||!confirm('[L_ARE_YOU_SURE_TO_RESIZE_MAP]')){return false;}">
  <table width="100%" cellpadding="3" cellspacing="0" border="0">
   <tr>
    <td align="right" width="50%">{L_MAP_TO_RESIZE} : </td><td align="left" width="50%"><select name="map_id" id="map_id">
  <option value="0"> - </option>
<!-- BEGIN map_list -->
  <option value="{map_list.ID}">{map_list.ID}. {map_list.NAME}</option>
<!-- END map_list -->
  </select></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MAP_WIDTH} :</td><td align="left" width="50%"><input type="numeric" name="map_width" value="" style="width:25px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MAP_HEIGHT} :</td><td align="left" width="50%"><input type="numeric" name="map_height" value="" style="width:25px" /></td>
   </tr>
  </table>
  <input type="submit" value="{L_VALIDATE}" class="button" />
  </form>
  </td>
 </tr>
</table>