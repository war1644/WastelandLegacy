<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general" method="POST">
';

echo '<input type="hidden" name="mode" value="save_config" />
';

echo '
';

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo '
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_GENERAL_CONFIG'])) ? $this->tpldata['.'][0]['L_GENERAL_CONFIG'] : ((isset($lang->general_config)) ? $lang->general_config : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td align="center" class="cat">' , ((isset($this->tpldata['.'][0]['L_WEBSITE_OPTIONS'])) ? $this->tpldata['.'][0]['L_WEBSITE_OPTIONS'] : ((isset($lang->website_options)) ? $lang->website_options : '')) , '</td>
';

echo ' </tr>
';

echo ' <tr>
';

echo '  <td class="row1">
';

echo '
';

echo '  <table width="100%" border="0" cellpadding="3" cellspacing="0">
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_SITE_NAME'])) ? $this->tpldata['.'][0]['L_SITE_NAME'] : ((isset($lang->site_name)) ? $lang->site_name : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="site_name" value="' , ((isset($this->tpldata['.'][0]['CONFIG_SITE_NAME'])) ? $this->tpldata['.'][0]['CONFIG_SITE_NAME'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_SITE_DESC'])) ? $this->tpldata['.'][0]['L_SITE_DESC'] : ((isset($lang->site_desc)) ? $lang->site_desc : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="site_desc" value="' , ((isset($this->tpldata['.'][0]['CONFIG_SITE_DESC'])) ? $this->tpldata['.'][0]['CONFIG_SITE_DESC'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TIME_ZONE'])) ? $this->tpldata['.'][0]['L_TIME_ZONE'] : ((isset($lang->time_zone)) ? $lang->time_zone : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><select name="time_zone" id="time_zone"><option value="-12">GMT - 12</option><option value="-11">GMT - 11</option><option value="-10">GMT - 10</option><option value="-9">GMT - 9</option><option value="-8">GMT - 8</option><option value="-7">GMT - 7</option><option value="-6">GMT - 6</option><option value="-5">GMT - 5</option><option value="-4">GMT - 4</option><option value="-3.5">GMT - 3:30</option><option value="-3">GMT - 3</option><option value="-2">GMT - 2</option><option value="-1">GMT - 1</option><option value="0">GMT</option><option value="1">GMT + 1</option><option value="2">GMT + 2</option><option value="3">GMT + 3</option><option value="3.5">GMT + 3:30</option><option value="4">GMT + 4</option><option value="4.5">GMT + 4:30</option><option value="5">GMT + 5</option><option value="5.5">GMT + 5:30</option><option value="6">GMT + 6</option><option value="6.5">GMT + 6:30</option><option value="7">GMT + 7</option><option value="8">GMT + 8</option><option value="9">GMT + 9</option><option value="9.5">GMT + 9:30</option><option value="10">GMT + 10</option><option value="11">GMT + 11</option><option value="12">GMT + 12</option><option value="13">GMT + 13</option></select></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_LANGUAGE'])) ? $this->tpldata['.'][0]['L_LANGUAGE'] : ((isset($lang->language)) ? $lang->language : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="language" value="' , ((isset($this->tpldata['.'][0]['CONFIG_LANGUAGE'])) ? $this->tpldata['.'][0]['CONFIG_LANGUAGE'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TEMPLATE'])) ? $this->tpldata['.'][0]['L_TEMPLATE'] : ((isset($lang->template)) ? $lang->template : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="template" value="' , ((isset($this->tpldata['.'][0]['CONFIG_TEMPLATE'])) ? $this->tpldata['.'][0]['CONFIG_TEMPLATE'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_USE_CACHE'])) ? $this->tpldata['.'][0]['L_USE_CACHE'] : ((isset($lang->use_cache)) ? $lang->use_cache : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><select name="use_cache" id="use_cache"><option value="0"' , ((isset($this->tpldata['.'][0]['CONFIG_USE_CACHE_0'])) ? $this->tpldata['.'][0]['CONFIG_USE_CACHE_0'] : '') , '>' , ((isset($this->tpldata['.'][0]['L_NO'])) ? $this->tpldata['.'][0]['L_NO'] : ((isset($lang->no)) ? $lang->no : '')) , '</option><option value="1"' , ((isset($this->tpldata['.'][0]['CONFIG_USE_CACHE_1'])) ? $this->tpldata['.'][0]['CONFIG_USE_CACHE_1'] : '') , '>' , ((isset($this->tpldata['.'][0]['L_YES'])) ? $this->tpldata['.'][0]['L_YES'] : ((isset($lang->yes)) ? $lang->yes : '')) , '</option></select></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CACHE_DIR'])) ? $this->tpldata['.'][0]['L_CACHE_DIR'] : ((isset($lang->cache_dir)) ? $lang->cache_dir : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="cache_dir" value="' , ((isset($this->tpldata['.'][0]['CONFIG_CACHE_DIR'])) ? $this->tpldata['.'][0]['CONFIG_CACHE_DIR'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_USE_GZIP'])) ? $this->tpldata['.'][0]['L_USE_GZIP'] : ((isset($lang->use_gzip)) ? $lang->use_gzip : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><select name="use_gzip" id="use_gzip"><option value="0"' , ((isset($this->tpldata['.'][0]['CONFIG_USE_GZIP_0'])) ? $this->tpldata['.'][0]['CONFIG_USE_GZIP_0'] : '') , '>' , ((isset($this->tpldata['.'][0]['L_NO'])) ? $this->tpldata['.'][0]['L_NO'] : ((isset($lang->no)) ? $lang->no : '')) , '</option><option value="1"' , ((isset($this->tpldata['.'][0]['CONFIG_USE_GZIP_1'])) ? $this->tpldata['.'][0]['CONFIG_USE_GZIP_1'] : '') , '>' , ((isset($this->tpldata['.'][0]['L_YES'])) ? $this->tpldata['.'][0]['L_YES'] : ((isset($lang->yes)) ? $lang->yes : '')) , '</option></select></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_OPTIMIZE_MAPS'])) ? $this->tpldata['.'][0]['L_OPTIMIZE_MAPS'] : ((isset($lang->optimize_maps)) ? $lang->optimize_maps : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><select name="optimize_maps" id="optimize_maps"><option value="0"' , ((isset($this->tpldata['.'][0]['CONFIG_OPTIMIZE_MAPS_0'])) ? $this->tpldata['.'][0]['CONFIG_OPTIMIZE_MAPS_0'] : '') , '>' , ((isset($this->tpldata['.'][0]['L_NO'])) ? $this->tpldata['.'][0]['L_NO'] : ((isset($lang->no)) ? $lang->no : '')) , '</option><option value="1"' , ((isset($this->tpldata['.'][0]['CONFIG_OPTIMIZE_MAPS_1'])) ? $this->tpldata['.'][0]['CONFIG_OPTIMIZE_MAPS_1'] : '') , '>' , ((isset($this->tpldata['.'][0]['L_YES'])) ? $this->tpldata['.'][0]['L_YES'] : ((isset($lang->yes)) ? $lang->yes : '')) , '</option></select></td>
';

echo '   </tr>
';

echo '  </table>
';

echo '
';

echo '  </td>
';

echo ' </tr>
';

echo ' <tr>
';

echo '  <td align="center" class="cat">' , ((isset($this->tpldata['.'][0]['L_TILESET_OPTIONS'])) ? $this->tpldata['.'][0]['L_TILESET_OPTIONS'] : ((isset($lang->tileset_options)) ? $lang->tileset_options : '')) , '</td>
';

echo ' </tr>
';

echo ' <tr>
';

echo '  <td class="row1">
';

echo '
';

echo '  <table width="100%" border="0" cellpadding="3" cellspacing="0">
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TILE_SIZE'])) ? $this->tpldata['.'][0]['L_TILE_SIZE'] : ((isset($lang->tile_size)) ? $lang->tile_size : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="2" name="tile_size" value="' , ((isset($this->tpldata['.'][0]['CONFIG_TILE_SIZE'])) ? $this->tpldata['.'][0]['CONFIG_TILE_SIZE'] : '') , '" style="width:20px" /> px</td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TILESET_TILES_LOWER'])) ? $this->tpldata['.'][0]['L_TILESET_TILES_LOWER'] : ((isset($lang->tileset_tiles_lower)) ? $lang->tileset_tiles_lower : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="3" name="tileset_tiles_lower" value="' , ((isset($this->tpldata['.'][0]['CONFIG_TILESET_TILES_LOWER'])) ? $this->tpldata['.'][0]['CONFIG_TILESET_TILES_LOWER'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TILESET_TILES_UPPER'])) ? $this->tpldata['.'][0]['L_TILESET_TILES_UPPER'] : ((isset($lang->tileset_tiles_upper)) ? $lang->tileset_tiles_upper : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="3" name="tileset_tiles_upper" value="' , ((isset($this->tpldata['.'][0]['CONFIG_TILESET_TILES_UPPER'])) ? $this->tpldata['.'][0]['CONFIG_TILESET_TILES_UPPER'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TILESET_COLS'])) ? $this->tpldata['.'][0]['L_TILESET_COLS'] : ((isset($lang->tileset_cols)) ? $lang->tileset_cols : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="2" name="tileset_cols" value="' , ((isset($this->tpldata['.'][0]['CONFIG_TILESET_COLS'])) ? $this->tpldata['.'][0]['CONFIG_TILESET_COLS'] : '') , '" style="width:20px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_TILESET_BGCOLOR'])) ? $this->tpldata['.'][0]['L_TILESET_BGCOLOR'] : ((isset($lang->tileset_bgcolor)) ? $lang->tileset_bgcolor : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="128" name="tileset_bgcolor" value="' , ((isset($this->tpldata['.'][0]['CONFIG_TILESET_BGCOLOR'])) ? $this->tpldata['.'][0]['CONFIG_TILESET_BGCOLOR'] : '') , '" /></td>
';

echo '   </tr>
';

echo '  </table>
';

echo '
';

echo '  </td>
';

echo ' </tr>
';

echo ' <tr>
';

echo '  <td align="center" class="cat">' , ((isset($this->tpldata['.'][0]['L_MISC_OPTIONS'])) ? $this->tpldata['.'][0]['L_MISC_OPTIONS'] : ((isset($lang->misc_options)) ? $lang->misc_options : '')) , '</td>
';

echo ' </tr>
';

echo ' <tr>
';

echo '  <td class="row1">
';

echo '
';

echo '  <table width="100%" border="0" cellpadding="3" cellspacing="0">
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_REFRESH_METHOD'])) ? $this->tpldata['.'][0]['L_REFRESH_METHOD'] : ((isset($lang->refresh_method)) ? $lang->refresh_method : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><select name="refresh_method" id="refresh_method"><option value="0"' , ((isset($this->tpldata['.'][0]['CONFIG_REFRESH_METHOD_0'])) ? $this->tpldata['.'][0]['CONFIG_REFRESH_METHOD_0'] : '') , '>' , ((isset($this->tpldata['.'][0]['L_REFRESH_IFRAME'])) ? $this->tpldata['.'][0]['L_REFRESH_IFRAME'] : ((isset($lang->refresh_iframe)) ? $lang->refresh_iframe : '')) , '</option><option value="1"' , ((isset($this->tpldata['.'][0]['CONFIG_REFRESH_METHOD_1'])) ? $this->tpldata['.'][0]['CONFIG_REFRESH_METHOD_1'] : '') , '>' , ((isset($this->tpldata['.'][0]['L_REFRESH_AJAX'])) ? $this->tpldata['.'][0]['L_REFRESH_AJAX'] : ((isset($lang->refresh_ajax)) ? $lang->refresh_ajax : '')) , '</option></select></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CHAT_HISTORY'])) ? $this->tpldata['.'][0]['L_CHAT_HISTORY'] : ((isset($lang->chat_history)) ? $lang->chat_history : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="3" name="chat_history" value="' , ((isset($this->tpldata['.'][0]['CONFIG_CHAT_HISTORY'])) ? $this->tpldata['.'][0]['CONFIG_CHAT_HISTORY'] : '') , '" style="width:30px" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CHAT_HISTORY_TIME'])) ? $this->tpldata['.'][0]['L_CHAT_HISTORY_TIME'] : ((isset($lang->chat_history_time)) ? $lang->chat_history_time : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="numeric" maxlength="11" name="chat_history_time" value="' , ((isset($this->tpldata['.'][0]['CONFIG_CHAT_HISTORY_TIME'])) ? $this->tpldata['.'][0]['CONFIG_CHAT_HISTORY_TIME'] : '') , '" style="width:50px" /> s</td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_DEFAULT_LOCATION'])) ? $this->tpldata['.'][0]['L_DEFAULT_LOCATION'] : ((isset($lang->default_location)) ? $lang->default_location : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><input type="text" maxlength="128" name="default_location" value="' , ((isset($this->tpldata['.'][0]['CONFIG_DEFAULT_LOCATION'])) ? $this->tpldata['.'][0]['CONFIG_DEFAULT_LOCATION'] : '') , '" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_VARIABLES'])) ? $this->tpldata['.'][0]['L_VARIABLES'] : ((isset($lang->variables)) ? $lang->variables : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><textarea name="vars" cols="" rows="" style="width:200px;height:40px">' , ((isset($this->tpldata['.'][0]['CONFIG_VARS'])) ? $this->tpldata['.'][0]['CONFIG_VARS'] : '') , '</textarea></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_PRESET_TELEPORT_SPRITE'])) ? $this->tpldata['.'][0]['L_PRESET_TELEPORT_SPRITE'] : ((isset($lang->preset_teleport_sprite)) ? $lang->preset_teleport_sprite : '')) , ' :</td>
';

echo '    <td align="left" width="50%"><i>images/sprites/</i> <input type="text" maxlength="128" name="preset_teleport_sprite" value="' , ((isset($this->tpldata['.'][0]['CONFIG_PRESET_TELEPORT_SPRITE'])) ? $this->tpldata['.'][0]['CONFIG_PRESET_TELEPORT_SPRITE'] : '') , '" onchange="document.getElementById(\'teleport_pic\').src=\'images/sprites/\'+this.value;" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="center" width="100%" colspan="2" style="padding:10px"><img src="images/sprites/' , ((isset($this->tpldata['.'][0]['CONFIG_PRESET_TELEPORT_SPRITE'])) ? $this->tpldata['.'][0]['CONFIG_PRESET_TELEPORT_SPRITE'] : '') , '" alt="" id="teleport_pic" /></td>
';

echo '   </tr>
';

echo '   </table>
';

echo '
';

echo '  </td>
';

echo '
';

echo '  </td>
';

echo ' </tr>
';

echo ' <tr>
';

echo '  <td align="center" class="cat"><input type="submit" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? $this->tpldata['.'][0]['L_VALIDATE'] : ((isset($lang->validate)) ? $lang->validate : '')) , '" class="post" /></td>
';

echo ' </tr>
';

echo '</table>
';

echo '
';

echo '</form>
';

echo '<script type="text/javascript">
';

echo '<!--
';

echo 'var time_zone = ' , ((isset($this->tpldata['.'][0]['CONFIG_TIME_ZONE'])) ? $this->tpldata['.'][0]['CONFIG_TIME_ZONE'] : '') , ';
';

echo 'var use_cache = ' , ((isset($this->tpldata['.'][0]['CONFIG_USE_CACHE'])) ? $this->tpldata['.'][0]['CONFIG_USE_CACHE'] : '') , ';
';

echo 'var use_gzip = ' , ((isset($this->tpldata['.'][0]['CONFIG_USE_GZIP'])) ? $this->tpldata['.'][0]['CONFIG_USE_GZIP'] : '') , ';
';

echo 'var optimize_maps = ' , ((isset($this->tpldata['.'][0]['CONFIG_OPTIMIZE_MAPS'])) ? $this->tpldata['.'][0]['CONFIG_OPTIMIZE_MAPS'] : '') , ';
';

echo 'var refresh_method = ' , ((isset($this->tpldata['.'][0]['CONFIG_REFRESH_METHOD'])) ? $this->tpldata['.'][0]['CONFIG_REFRESH_METHOD'] : '') , ';
';

echo '//-->
';

echo '</script>
';

echo '<script type="text/javascript" src="javascript/admin.general_config.js"></script>
';


