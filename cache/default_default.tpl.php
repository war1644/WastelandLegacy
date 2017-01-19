<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

$_not_logged_in_count = (isset($this->tpldata['not_logged_in'])) ? count($this->tpldata['not_logged_in']) : 0;for ($_not_logged_in_i = 0; $_not_logged_in_i < $_not_logged_in_count; $_not_logged_in_i++){
echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_CONNECTION'])) ? $this->tpldata['.'][0]['L_CONNECTION'] : ((isset($lang->connection)) ? $lang->connection : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1" align="center">
';

echo '  <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=profile" method="post">
';

echo '  <input type="hidden" name="mode" value="login" />
';

echo '
';

echo '  <div class="gensmall" style="padding:10px">' , ((isset($this->tpldata['.'][0]['L_CONNECTION_EXPLAIN'])) ? $this->tpldata['.'][0]['L_CONNECTION_EXPLAIN'] : ((isset($lang->connection_explain)) ? $lang->connection_explain : '')) , '</div>
';

echo '
';

echo '  <table width="100%" cellpadding="2" cellspacing="0" border="0">
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CHARACTER_NAME'])) ? $this->tpldata['.'][0]['L_CHARACTER_NAME'] : ((isset($lang->character_name)) ? $lang->character_name : '')) , ' : </td><td align="left" width="50%"><input type="text" value="" name="name" class="post" /></td>
';

echo '   </tr>
';

echo '
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_PASSWORD'])) ? $this->tpldata['.'][0]['L_PASSWORD'] : ((isset($lang->password)) ? $lang->password : '')) , ' : </td><td align="left" width="50%"><input type="password" value="" name="password" class="post" /></td>
';

echo '   </tr>
';

echo '
';

echo '   <tr>
';

echo '    <td align="center" colspan="2"><input type="submit" value="登录" class="post" /></td>
';

echo '   </tr>
';

echo '  </table>
';

echo '
';

echo '  </form>
';

echo '
';

echo '  <div class="gensmall" style="padding:10px">' , ((isset($this->tpldata['.'][0]['L_IF_NO_ACCOUNT'])) ? $this->tpldata['.'][0]['L_IF_NO_ACCOUNT'] : ((isset($lang->if_no_account)) ? $lang->if_no_account : '')) , '<br /><br /><a href="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=profile&amp;mode=register" class="genmed"><b>' , ((isset($this->tpldata['.'][0]['L_REGISTER_NOW'])) ? $this->tpldata['.'][0]['L_REGISTER_NOW'] : ((isset($lang->register_now)) ? $lang->register_now : '')) , '</b></a></div>
';

echo '  </td>
';

echo ' </tr>
';

echo '</table>
';

} // END not_logged_in
$_logged_in_count = (isset($this->tpldata['logged_in'])) ? count($this->tpldata['logged_in']) : 0;for ($_logged_in_i = 0; $_logged_in_i < $_logged_in_count; $_logged_in_i++){
echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_CHARACTER_STATS'])) ? $this->tpldata['.'][0]['L_CHARACTER_STATS'] : ((isset($lang->character_stats)) ? $lang->character_stats : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1" align="center">
';

echo '
';

echo '  <br />' , ((isset($this->tpldata['.'][0]['L_CHARACTER_NAME'])) ? $this->tpldata['.'][0]['L_CHARACTER_NAME'] : ((isset($lang->character_name)) ? $lang->character_name : '')) , ' : <b>' , ((isset($this->tpldata['.'][0]['USER_NAME'])) ? $this->tpldata['.'][0]['USER_NAME'] : '') , '</b><br /><br />
';

echo '  <div style="width:' , ((isset($this->tpldata['.'][0]['CHAR_WIDTH'])) ? $this->tpldata['.'][0]['CHAR_WIDTH'] : '') , 'px;height:' , ((isset($this->tpldata['.'][0]['CHAR_HEIGHT'])) ? $this->tpldata['.'][0]['CHAR_HEIGHT'] : '') , 'px;background-image:url(\'images/charasets/' , ((isset($this->tpldata['.'][0]['CHARASET'])) ? $this->tpldata['.'][0]['CHARASET'] : '') , '\')"></div><br /><br />
';

echo '  <a href="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=map">' , ((isset($this->tpldata['.'][0]['L_GO_TO_MAP'])) ? $this->tpldata['.'][0]['L_GO_TO_MAP'] : ((isset($lang->go_to_map)) ? $lang->go_to_map : '')) , '</a><br /><br />
';

echo '  <span class="gensmall"><a href="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=profile&mode=logout">' , ((isset($this->tpldata['.'][0]['L_LOGOUT'])) ? $this->tpldata['.'][0]['L_LOGOUT'] : ((isset($lang->logout)) ? $lang->logout : '')) , '</a></span><br /><br />
';

echo '
';

echo '  </td>
';

echo ' </tr>
';

echo '</table>
';

} // END logged_in

