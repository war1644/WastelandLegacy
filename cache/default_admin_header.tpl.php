<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<!doctype html>
';

echo '<html lang="en" dir="' , ((isset($this->tpldata['.'][0]['DIRECTION'])) ? $this->tpldata['.'][0]['DIRECTION'] : '') , '">
';

echo '<head>
';

echo ' <meta charset="UTF-8">
';

echo ' <meta name="viewport"
';

echo '       content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
';

echo ' <meta http-equiv="X-UA-Compatible" content="ie=edge">
';

echo '<meta http-equiv="Content-Style-Type" content="text/css" />
';

echo '<meta http-equiv="Content-Type" content="text/html; charset=' , ((isset($this->tpldata['.'][0]['ENCODING'])) ? $this->tpldata['.'][0]['ENCODING'] : '') , '" />
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

echo 'setTimeout(\'location_redirect()\', (' , ((isset($this->tpldata['redirect'][$_redirect_i]['TIMEOUT'])) ? $this->tpldata['redirect'][$_redirect_i]['TIMEOUT'] : '') , ' * 1000));
';

echo '</script>
';

} // END redirect
echo '</head>
';

echo '
';

echo '
';

echo '<body>
';

echo '<span id="top"></span>
';

echo '
';

echo '<table class="bodyline" width="100%" cellspacing="0" cellpadding="0" border="0">
';

echo ' <tr>
';

echo '  <td>
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


