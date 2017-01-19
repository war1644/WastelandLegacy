<!doctype html>
<html lang="en" dir="{DIRECTION}">
<head>
 <meta charset="UTF-8">
 <meta name="viewport"
       content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="Content-Type" content="text/html; charset={ENCODING}" />
<title>{SITE_NAME} - {PAGE_NAME}</title>
<link rel="stylesheet" href="{TEMPLATE_PATH}style.css" type="text/css" />
</head>


<body style="margin:2px">
<table width="100%" cellpadding="4" cellspacing="1" border="0" class="portaline">
<!-- BEGIN cat_nav_title -->
 <tr>
  <td class="cat">{cat_nav_title.VALUE}</td>
 </tr>
<!-- BEGIN cat_nav_option -->
 <tr>
  <td class="row1" align="center">
  <a href="{cat_nav_title.cat_nav_option.URL}" target="main" class="gensmall">{cat_nav_title.cat_nav_option.VALUE}</a>
  </td>
 </tr>
<!-- END cat_nav_option -->
<!-- END cat_nav_title -->
</table>
</body>

</html>