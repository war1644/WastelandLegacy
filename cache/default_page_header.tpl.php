<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<!doctype html>
';

echo '<html lang="en" dir="' , ((isset($this->tpldata['.'][0]['SCREEN_DIRECTION'])) ? $this->tpldata['.'][0]['SCREEN_DIRECTION'] : '') , '">
';

echo '<head>
';

echo ' <meta charset="UTF-8">
';

echo ' <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
';

echo ' <meta http-equiv="X-UA-Compatible" content="ie=edge">
';

echo '<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
';

echo '<title>' , ((isset($this->tpldata['.'][0]['SITE_NAME'])) ? $this->tpldata['.'][0]['SITE_NAME'] : '') , ' - ' , ((isset($this->tpldata['.'][0]['PAGE_NAME'])) ? $this->tpldata['.'][0]['PAGE_NAME'] : '') , '</title>
';

echo '<link rel="stylesheet" href="' , ((isset($this->tpldata['.'][0]['TEMPLATE_PATH'])) ? $this->tpldata['.'][0]['TEMPLATE_PATH'] : '') , 'style.css" type="text/css" />
';

echo '<script type="text/javascript" src="javascript/common.js"></script>
';

$_redirect_count = (isset($this->tpldata['redirect'])) ? count($this->tpldata['redirect']) : 0;for ($_redirect_i = 0; $_redirect_i < $_redirect_count; $_redirect_i++){
echo '<meta http-equiv="refresh" content="' , ((isset($this->tpldata['redirect'][$_redirect_i]['TIMEOUT'])) ? $this->tpldata['redirect'][$_redirect_i]['TIMEOUT'] : '') , ';' , ((isset($this->tpldata['redirect'][$_redirect_i]['HTML_LOCATION'])) ? $this->tpldata['redirect'][$_redirect_i]['HTML_LOCATION'] : '') , '" />
';

echo '<script type="text/javascript">
';

echo 'function location_timeout(time)
';

echo '{
';

echo '	if ( document.getElementById(\'redirect_timeout\') )
';

echo '	{
';

echo '		document.getElementById(\'redirect_timeout\').innerHTML = time;
';

echo '		if ( time > 0 )
';

echo '		{
';

echo '			setTimeout(\'location_timeout(\' + (time - 1) + \');\', 1000);
';

echo '		}
';

echo '	}
';

echo '}
';

echo 'function location_redirect()
';

echo '{
';

echo '	document.location.href = \'' , ((isset($this->tpldata['redirect'][$_redirect_i]['LOCATION'])) ? quotes($this->tpldata['redirect'][$_redirect_i]['LOCATION']) : '') , '\';
';

echo '}
';

echo 'setTimeout(\'location_redirect();\', (' , ((isset($this->tpldata['redirect'][$_redirect_i]['TIMEOUT'])) ? $this->tpldata['redirect'][$_redirect_i]['TIMEOUT'] : '') , ' * 1000));
';

echo '</script>
';

} // END redirect
echo '
';

echo '</head>
';

echo '
';

echo '<body>
';

echo '<noscript><div id="noscript">' , ((isset($this->tpldata['.'][0]['L_JAVASCRIPT_REQUIRED'])) ? $this->tpldata['.'][0]['L_JAVASCRIPT_REQUIRED'] : ((isset($lang->javascript_required)) ? $lang->javascript_required : '')) , '</div></noscript>
';

echo '<span id="top"></span>
';

$_bgsound_ie_count = (isset($this->tpldata['bgsound_ie'])) ? count($this->tpldata['bgsound_ie']) : 0;for ($_bgsound_ie_i = 0; $_bgsound_ie_i < $_bgsound_ie_count; $_bgsound_ie_i++){
echo '<bgsound src="music/' , ((isset($this->tpldata['bgsound_ie'][$_bgsound_ie_i]['MUSIC'])) ? $this->tpldata['bgsound_ie'][$_bgsound_ie_i]['MUSIC'] : '') , '" loop="-1" />
';

} // END bgsound_ie
$_bgsound_ns_count = (isset($this->tpldata['bgsound_ns'])) ? count($this->tpldata['bgsound_ns']) : 0;for ($_bgsound_ns_i = 0; $_bgsound_ns_i < $_bgsound_ns_count; $_bgsound_ns_i++){
echo '<audio src="music/' , ((isset($this->tpldata['bgsound_ns'][$_bgsound_ns_i]['MUSIC'])) ? $this->tpldata['bgsound_ns'][$_bgsound_ns_i]['MUSIC'] : '') , '" autoplay loop></audio>
';

} // END bgsound_ns
echo '
';

echo '<table class="bodyline" width="100%" cellspacing="0" cellpadding="0" border="0">
';

echo ' <tr>
';

echo '  <td>
';

echo '
';

echo '  <div id="display_body">
';

echo '  <div id="real_body">
';

echo '  <table class="topbkg" width="100%" cellspacing="0" cellpadding="0" border="0">
';

echo '   <tr>
';

echo '    <td><a href="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=default"><img src="' , ((isset($this->tpldata['.'][0]['TEMPLATE_PATH'])) ? $this->tpldata['.'][0]['TEMPLATE_PATH'] : '') , 'images/logo.jpg" border="0" alt="' , ((isset($this->tpldata['.'][0]['SITE_DESC'])) ? $this->tpldata['.'][0]['SITE_DESC'] : '') , '" title="' , ((isset($this->tpldata['.'][0]['SITE_DESC'])) ? $this->tpldata['.'][0]['SITE_DESC'] : '') , '" width="300" height="110" /></a></td>
';

echo '    <td align="center" valign="middle" width="100%">&nbsp;</td>
';

echo '   </tr>
';

echo '  </table>
';

echo '
';

echo '  <table width="100%" class="topnav" border="0" cellspacing="0" cellpadding="0">
';

echo '   <tr>
';

echo '    <td align="center">
';

echo '    <span class="gensmall">' , ((isset($this->tpldata['.'][0]['SITE_DESC'])) ? $this->tpldata['.'][0]['SITE_DESC'] : '') , '&nbsp;-&nbsp;<span id="clock"></span>&nbsp;-&nbsp;<a href="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=default" style="color:black">' , ((isset($this->tpldata['.'][0]['L_GO_TO_RECEPTION'])) ? $this->tpldata['.'][0]['L_GO_TO_RECEPTION'] : ((isset($lang->go_to_reception)) ? $lang->go_to_reception : '')) , '</a></span>
';

echo '
';

echo '    <script type="text/javascript">
';

echo '    //在页面显示时间更新
';

echo '    function clock() {
';

echo '        Stamp = new Date();
';

echo '        document.getElementById("clock").innerHTML = (Stamp.getHours() < 10 ? "0" + Stamp.getHours() : Stamp.getHours()) + ":" + (Stamp.getMinutes() < 10 ? "0" + Stamp.getMinutes() : Stamp.getMinutes() ) + ":" + (Stamp.getSeconds() < 10 ? "0" + Stamp.getSeconds() : Stamp.getSeconds() );
';

echo '        setTimeout("clock();", 1000);
';

echo '    }
';

echo '    clock();
';

echo '    </script>
';

echo '
';

echo '    </td>
';

echo '   </tr>
';

echo '  </table>
';

echo '
';

echo '  <table width="100%" cellspacing="1" cellpadding="10" border="0" align="center">
';

echo ' <tr>
';

echo '<td align="center">
';

echo '
';

echo '<div class="nav" align="left">' , ((isset($this->tpldata['.'][0]['NAVIGATION'])) ? $this->tpldata['.'][0]['NAVIGATION'] : '') , '</div>
';


