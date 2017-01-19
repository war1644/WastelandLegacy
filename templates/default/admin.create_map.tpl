<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
 <tr>
  <th>{L_CREATE_MAP}</th>
 </tr>

 <tr>
  <td class="row1">
  <form action="{U_INDEX}?mod=admin.map&amp;mode=create_map" method="POST">
  <input type="hidden" name="create_map" value="1" />

  <table width="100%" cellpadding="3" cellspacing="0" border="0">
   <tr>
    <td align="right" width="50%">{L_MAP_NAME} :</td><td align="left" width="50%"><input type="text" name="map_name" value="" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MAP_WIDTH} :</td><td align="left" width="50%"><input type="numeric" name="map_width" value="" style="width:25px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MAP_HEIGHT} :</td><td align="left" width="50%"><input type="numeric" name="map_height" value="" style="width:25px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_MAP_TILESET} :</td><td align="left" width="50%"><select name="map_tileset">
<!-- BEGIN tileset_list -->
    <option value="{tileset_list.ID}">{tileset_list.ID}. {tileset_list.NAME}</option>
<!-- END tileset_list -->
    </select></td>
   </tr>
   <tr>
    <td align="center" colspan="2"><input type="submit" value="{L_VALIDATE}" class="button" /></td>
   </tr>
  </table>

  </form>
  </td>
 </tr>
</table>