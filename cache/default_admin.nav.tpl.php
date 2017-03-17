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

echo '<title>' , ((isset($this->tpldata['.'][0]['SITE_NAME'])) ? $this->tpldata['.'][0]['SITE_NAME'] : '') , ' - ' , ((isset($this->tpldata['.'][0]['PAGE_NAME'])) ? $this->tpldata['.'][0]['PAGE_NAME'] : '') , '</title>
';

echo '<link rel="stylesheet" href="' , ((isset($this->tpldata['.'][0]['TEMPLATE_PATH'])) ? $this->tpldata['.'][0]['TEMPLATE_PATH'] : '') , 'style.css" type="text/css" />
';

echo '</head>
';

echo '
';

echo '
';

echo '<body style="margin:2px">
';

echo '<table width="100%" cellpadding="4" cellspacing="1" border="0" class="portaline">
';

$_cat_nav_title_count = (isset($this->tpldata['cat_nav_title'])) ? count($this->tpldata['cat_nav_title']) : 0;for ($_cat_nav_title_i = 0; $_cat_nav_title_i < $_cat_nav_title_count; $_cat_nav_title_i++){
echo ' <tr>
';

echo '  <td class="cat">' , ((isset($this->tpldata['cat_nav_title'][$_cat_nav_title_i]['VALUE'])) ? $this->tpldata['cat_nav_title'][$_cat_nav_title_i]['VALUE'] : '') , '</td>
';

echo ' </tr>
';

$_cat_nav_option_count = (isset($this->tpldata['cat_nav_title'][$_cat_nav_title_i]['cat_nav_option'])) ? count($this->tpldata['cat_nav_title'][$_cat_nav_title_i]['cat_nav_option']) : 0;for ($_cat_nav_option_i = 0; $_cat_nav_option_i < $_cat_nav_option_count; $_cat_nav_option_i++){
echo ' <tr>
';

echo '  <td class="row1" align="center">
';

echo '  <a href="' , ((isset($this->tpldata['cat_nav_title'][$_cat_nav_title_i]['cat_nav_option'][$_cat_nav_option_i]['URL'])) ? $this->tpldata['cat_nav_title'][$_cat_nav_title_i]['cat_nav_option'][$_cat_nav_option_i]['URL'] : '') , '" target="main" class="gensmall">' , ((isset($this->tpldata['cat_nav_title'][$_cat_nav_title_i]['cat_nav_option'][$_cat_nav_option_i]['VALUE'])) ? $this->tpldata['cat_nav_title'][$_cat_nav_title_i]['cat_nav_option'][$_cat_nav_option_i]['VALUE'] : '') , '</a>
';

echo '  </td>
';

echo ' </tr>
';

} // END cat_nav_option
} // END cat_nav_title
echo '</table>
';

echo '</body>
';

echo '
';

echo '</html>
';


