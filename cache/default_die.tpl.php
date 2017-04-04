<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<div class="come_game">
';

echo '  <h3>' , ((isset($this->tpldata['.'][0]['DIE_TITLE'])) ? $this->tpldata['.'][0]['DIE_TITLE'] : '') , '</h3>
';

echo '  <div class="row1" align="center">
';

echo '   <div style="padding:10px">' , ((isset($this->tpldata['.'][0]['DIE_CONTENT'])) ? $this->tpldata['.'][0]['DIE_CONTENT'] : '') , '
';

echo '
';

$_clic_redirect_count = (isset($this->tpldata['clic_redirect'])) ? count($this->tpldata['clic_redirect']) : 0;for ($_clic_redirect_i = 0; $_clic_redirect_i < $_clic_redirect_count; $_clic_redirect_i++){
echo '   <br /><br /><i><span class="gensmall"><a href="' , ((isset($this->tpldata['clic_redirect'][$_clic_redirect_i]['HTML_LOCATION'])) ? $this->tpldata['clic_redirect'][$_clic_redirect_i]['HTML_LOCATION'] : '') , '">' , ((isset($this->tpldata['.'][0]['L_CLICK_TO_CONTINUE'])) ? $this->tpldata['.'][0]['L_CLICK_TO_CONTINUE'] : ((isset($lang->click_to_continue)) ? $lang->click_to_continue : '')) , '</a></span></i>
';

} // END clic_redirect
$_redirect_count = (isset($this->tpldata['redirect'])) ? count($this->tpldata['redirect']) : 0;for ($_redirect_i = 0; $_redirect_i < $_redirect_count; $_redirect_i++){
echo '   <br /><br /><i><span class="gensmall">' , ((isset($this->tpldata['.'][0]['L_REDIRECT_AT'])) ? $this->tpldata['.'][0]['L_REDIRECT_AT'] : ((isset($lang->redirect_at)) ? $lang->redirect_at : '')) , ' <span id="redirect_timeout">' , ((isset($this->tpldata['redirect'][$_redirect_i]['TIMEOUT'])) ? $this->tpldata['redirect'][$_redirect_i]['TIMEOUT'] : '') , '</span> s<br /><br />
';

echo '  <a href="' , ((isset($this->tpldata['redirect'][$_redirect_i]['HTML_LOCATION'])) ? $this->tpldata['redirect'][$_redirect_i]['HTML_LOCATION'] : '') , '">' , ((isset($this->tpldata['.'][0]['L_DO_NOT_WAIT'])) ? $this->tpldata['.'][0]['L_DO_NOT_WAIT'] : ((isset($lang->do_not_wait)) ? $lang->do_not_wait : '')) , '</a></span></i>
';

echo '   <script type="text/javascript">
';

echo '       <!--
';

echo '       location_timeout(' , ((isset($this->tpldata['redirect'][$_redirect_i]['TIMEOUT'])) ? $this->tpldata['redirect'][$_redirect_i]['TIMEOUT'] : '') , ');
';

echo '       //-->
';

echo '   </script>
';

} // END redirect
echo '  </div>
';

echo ' </div>
';

echo '</div>
';

echo '
';

echo '
';


