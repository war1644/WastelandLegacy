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

echo '    <meta charset="UTF-8">
';

echo '    <meta name="viewport"
';

echo '          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
';

echo '    <meta http-equiv="X-UA-Compatible" content="ie=edge">
';

echo '<meta http-equiv="Content-Style-Type" content="text/css" />
';

echo '<meta http-equiv="Content-Type" content="text/html; charset=' , ((isset($this->tpldata['.'][0]['ENCODING'])) ? $this->tpldata['.'][0]['ENCODING'] : '') , '" />
';

echo '<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
';

echo '<title>' , ((isset($this->tpldata['.'][0]['L_ADMIN_PANEL'])) ? $this->tpldata['.'][0]['L_ADMIN_PANEL'] : ((isset($lang->admin_panel)) ? $lang->admin_panel : '')) , '</title>
';

echo '</head>
';

echo '
';

echo '<frameset cols="150,*" rows="*">
';

echo '<frame src="' , ((isset($this->tpldata['.'][0]['FRAME_NAV'])) ? $this->tpldata['.'][0]['FRAME_NAV'] : '') , '" name="nav" marginwidth="3" marginheight="3" scrolling="yes" frameborder="0" />
';

echo '<frame src="' , ((isset($this->tpldata['.'][0]['FRAME_MAIN'])) ? $this->tpldata['.'][0]['FRAME_MAIN'] : '') , '" name="main" marginwidth="10" marginheight="10" scrolling="yes" frameborder="0" />
';

echo '<noframes>
';

echo '<body>
';

echo '<p>Sorry, but your browser doesn\'t seem to support frames</p>
';

echo '</body>
';

echo '</noframes>
';

echo '</frameset>
';

echo '</html>
';


