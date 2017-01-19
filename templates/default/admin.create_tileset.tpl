<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
 <tr>
  <th>{L_CREATE_TILESET}</th>
 </tr>

 <tr>
  <td class="row1">
  <form action="{U_INDEX}?mod=admin.map&amp;mode=create_tileset" method="POST">
  <input type="hidden" name="create_tileset" value="1" />

  <table width="100%" cellpadding="3" cellspacing="0" border="0">
   <tr>
    <td align="right" width="50%">{L_TILESET_NAME} :</td><td align="left" width="50%"><input type="text" name="tileset_name" value="" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_TILESET_TILES_LOWER} :</td><td align="left" width="50%"><input type="numeric" name="tileset_tiles_lower" value="{TILESET_TILES_LOWER}" style="width:25px" maxlength="3" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_TILESET_TILES_UPPER} :</td><td align="left" width="50%"><input type="numeric" name="tileset_tiles_upper" value="{TILESET_TILES_UPPER}" style="width:25px" maxlength="3" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_TILESET_COLS} :</td><td align="left" width="50%"><input type="numeric" name="tileset_cols" value="{TILESET_COLS}" style="width:25px" maxlength="2" /></td>
   </tr>
   <tr>
    <td align="center" colspan="2"><input type="submit" value="{L_VALIDATE}" class="button" /></td>
   </tr>
  </table>

  </form>
  </td>
 </tr>
</table>