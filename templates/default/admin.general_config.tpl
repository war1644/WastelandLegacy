<form action="{U_INDEX}?mod=admin.general" method="POST">
<input type="hidden" name="mode" value="save_config" />

<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{L_GENERAL_CONFIG}</th>
 </tr>

 <tr>
  <td align="center" class="cat">{L_WEBSITE_OPTIONS}</td>
 </tr>
 <tr>
  <td class="row1">

  <table width="100%" border="0" cellpadding="3" cellspacing="0">
   <tr>
    <td align="right" width="50%">{L_SITE_NAME} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="site_name" value="{CONFIG_SITE_NAME}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_SITE_DESC} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="site_desc" value="{CONFIG_SITE_DESC}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_TIME_ZONE} :</td>
    <td align="left" width="50%"><select name="time_zone" id="time_zone"><option value="-12">GMT - 12</option><option value="-11">GMT - 11</option><option value="-10">GMT - 10</option><option value="-9">GMT - 9</option><option value="-8">GMT - 8</option><option value="-7">GMT - 7</option><option value="-6">GMT - 6</option><option value="-5">GMT - 5</option><option value="-4">GMT - 4</option><option value="-3.5">GMT - 3:30</option><option value="-3">GMT - 3</option><option value="-2">GMT - 2</option><option value="-1">GMT - 1</option><option value="0">GMT</option><option value="1">GMT + 1</option><option value="2">GMT + 2</option><option value="3">GMT + 3</option><option value="3.5">GMT + 3:30</option><option value="4">GMT + 4</option><option value="4.5">GMT + 4:30</option><option value="5">GMT + 5</option><option value="5.5">GMT + 5:30</option><option value="6">GMT + 6</option><option value="6.5">GMT + 6:30</option><option value="7">GMT + 7</option><option value="8">GMT + 8</option><option value="9">GMT + 9</option><option value="9.5">GMT + 9:30</option><option value="10">GMT + 10</option><option value="11">GMT + 11</option><option value="12">GMT + 12</option><option value="13">GMT + 13</option></select></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_LANGUAGE} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="language" value="{CONFIG_LANGUAGE}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_TEMPLATE} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="template" value="{CONFIG_TEMPLATE}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_USE_CACHE} :</td>
    <td align="left" width="50%"><select name="use_cache" id="use_cache"><option value="0"{CONFIG_USE_CACHE_0}>{L_NO}</option><option value="1"{CONFIG_USE_CACHE_1}>{L_YES}</option></select></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_CACHE_DIR} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="cache_dir" value="{CONFIG_CACHE_DIR}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_USE_GZIP} :</td>
    <td align="left" width="50%"><select name="use_gzip" id="use_gzip"><option value="0"{CONFIG_USE_GZIP_0}>{L_NO}</option><option value="1"{CONFIG_USE_GZIP_1}>{L_YES}</option></select></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_OPTIMIZE_MAPS} :</td>
    <td align="left" width="50%"><select name="optimize_maps" id="optimize_maps"><option value="0"{CONFIG_OPTIMIZE_MAPS_0}>{L_NO}</option><option value="1"{CONFIG_OPTIMIZE_MAPS_1}>{L_YES}</option></select></td>
   </tr>
  </table>

  </td>
 </tr>
 <tr>
  <td align="center" class="cat">{L_TILESET_OPTIONS}</td>
 </tr>
 <tr>
  <td class="row1">

  <table width="100%" border="0" cellpadding="3" cellspacing="0">
   <tr>
    <td align="right" width="50%">{L_TILE_SIZE} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="2" name="tile_size" value="{CONFIG_TILE_SIZE}" style="width:20px" /> px</td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_TILESET_TILES_LOWER} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="3" name="tileset_tiles_lower" value="{CONFIG_TILESET_TILES_LOWER}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_TILESET_TILES_UPPER} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="3" name="tileset_tiles_upper" value="{CONFIG_TILESET_TILES_UPPER}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_TILESET_COLS} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="2" name="tileset_cols" value="{CONFIG_TILESET_COLS}" style="width:20px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_TILESET_BGCOLOR} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="128" name="tileset_bgcolor" value="{CONFIG_TILESET_BGCOLOR}" /></td>
   </tr>
  </table>

  </td>
 </tr>
 <tr>
  <td align="center" class="cat">{L_MISC_OPTIONS}</td>
 </tr>
 <tr>
  <td class="row1">

  <table width="100%" border="0" cellpadding="3" cellspacing="0">
   <tr>
    <td align="right" width="50%">{L_REFRESH_METHOD} :</td>
    <td align="left" width="50%"><select name="refresh_method" id="refresh_method"><option value="0"{CONFIG_REFRESH_METHOD_0}>{L_REFRESH_IFRAME}</option><option value="1"{CONFIG_REFRESH_METHOD_1}>{L_REFRESH_AJAX}</option></select></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_CHAT_HISTORY} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="3" name="chat_history" value="{CONFIG_CHAT_HISTORY}" style="width:30px" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_CHAT_HISTORY_TIME} :</td>
    <td align="left" width="50%"><input type="numeric" maxlength="11" name="chat_history_time" value="{CONFIG_CHAT_HISTORY_TIME}" style="width:50px" /> s</td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_DEFAULT_LOCATION} :</td>
    <td align="left" width="50%"><input type="text" maxlength="128" name="default_location" value="{CONFIG_DEFAULT_LOCATION}" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_VARIABLES} :</td>
    <td align="left" width="50%"><textarea name="vars" cols="" rows="" style="width:200px;height:40px">{CONFIG_VARS}</textarea></td>
   </tr>
   <tr>
    <td align="right" width="50%">{L_PRESET_TELEPORT_SPRITE} :</td>
    <td align="left" width="50%"><i>images/sprites/</i> <input type="text" maxlength="128" name="preset_teleport_sprite" value="{CONFIG_PRESET_TELEPORT_SPRITE}" onchange="document.getElementById('teleport_pic').src='images/sprites/'+this.value;" /></td>
   </tr>
   <tr>
    <td align="center" width="100%" colspan="2" style="padding:10px"><img src="images/sprites/{CONFIG_PRESET_TELEPORT_SPRITE}" alt="" id="teleport_pic" /></td>
   </tr>
   </table>

  </td>

  </td>
 </tr>
 <tr>
  <td align="center" class="cat"><input type="submit" value="{L_VALIDATE}" class="post" /></td>
 </tr>
</table>

</form>
<script type="text/javascript">
<!--
var time_zone = {CONFIG_TIME_ZONE};
var use_cache = {CONFIG_USE_CACHE};
var use_gzip = {CONFIG_USE_GZIP};
var optimize_maps = {CONFIG_OPTIMIZE_MAPS};
var refresh_method = {CONFIG_REFRESH_METHOD};
//-->
</script>
<script type="text/javascript" src="javascript/admin.general_config.js"></script>