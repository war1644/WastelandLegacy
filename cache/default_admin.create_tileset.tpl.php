<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_CREATE_TILESET'])) ? $this->tpldata['.'][0]['L_CREATE_TILESET'] : ((isset($lang->create_tileset)) ? $lang->create_tileset : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1">
';

echo '  <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.map&amp;mode=create_tileset" method="POST">
';

echo '  <input type="hidden" name="create_tileset" value="1" />
';

echo '
';

echo '  <table width="100%" cellpadding="3" cellspacing="0" border="0">
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TILESET_NAME'])) ? $this->tpldata['.'][0]['L_TILESET_NAME'] : ((isset($lang->tileset_name)) ? $lang->tileset_name : '')) , ' :</td><td align="left" width="50%"><input type="text" name="tileset_name" value="" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TILESET_TILES_LOWER'])) ? $this->tpldata['.'][0]['L_TILESET_TILES_LOWER'] : ((isset($lang->tileset_tiles_lower)) ? $lang->tileset_tiles_lower : '')) , ' :</td><td align="left" width="50%"><input type="numeric" name="tileset_tiles_lower" value="' , ((isset($this->tpldata['.'][0]['TILESET_TILES_LOWER'])) ? $this->tpldata['.'][0]['TILESET_TILES_LOWER'] : '') , '" style="width:25px" maxlength="3" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TILESET_TILES_UPPER'])) ? $this->tpldata['.'][0]['L_TILESET_TILES_UPPER'] : ((isset($lang->tileset_tiles_upper)) ? $lang->tileset_tiles_upper : '')) , ' :</td><td align="left" width="50%"><input type="numeric" name="tileset_tiles_upper" value="' , ((isset($this->tpldata['.'][0]['TILESET_TILES_UPPER'])) ? $this->tpldata['.'][0]['TILESET_TILES_UPPER'] : '') , '" style="width:25px" maxlength="3" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TILESET_COLS'])) ? $this->tpldata['.'][0]['L_TILESET_COLS'] : ((isset($lang->tileset_cols)) ? $lang->tileset_cols : '')) , ' :</td><td align="left" width="50%"><input type="numeric" name="tileset_cols" value="' , ((isset($this->tpldata['.'][0]['TILESET_COLS'])) ? $this->tpldata['.'][0]['TILESET_COLS'] : '') , '" style="width:25px" maxlength="2" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="center" colspan="2"><input type="submit" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? $this->tpldata['.'][0]['L_VALIDATE'] : ((isset($lang->validate)) ? $lang->validate : '')) , '" class="button" /></td>
';

echo '   </tr>
';

echo '  </table>
';

echo '
';

echo '  </form>
';

echo '  </td>
';

echo ' </tr>
';

echo '</table>
';


