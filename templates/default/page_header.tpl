<!doctype html>
<html lang="en" dir="{SCREEN_DIRECTION}">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<title>{SITE_NAME} - {PAGE_NAME}</title>
<link rel="stylesheet" href="{TEMPLATE_PATH}style.css" type="text/css" />
<script type="text/javascript" src="javascript/common.js"></script>
<!-- BEGIN redirect -->
<meta http-equiv="refresh" content="{redirect.TIMEOUT};{redirect.HTML_LOCATION}" />
<script type="text/javascript">
function location_timeout(time)
{
	if ( document.getElementById('redirect_timeout') )
	{
		document.getElementById('redirect_timeout').innerHTML = time;
		if ( time > 0 )
		{
			setTimeout('location_timeout(' + (time - 1) + ');', 1000);
		}
	}
}
function location_redirect()
{
	document.location.href = '[redirect.LOCATION]';
}
setTimeout('location_redirect();', ({redirect.TIMEOUT} * 1000));
</script>
<!-- END redirect -->

</head>

<body>
<noscript><div id="noscript">{L_JAVASCRIPT_REQUIRED}</div></noscript>
<span id="top"></span>
<!-- BEGIN bgsound_ie -->
<bgsound src="music/{bgsound_ie.MUSIC}" loop="-1" />
<!-- END bgsound_ie -->
<!-- BEGIN bgsound_ns -->
<audio src="music/{bgsound_ns.MUSIC}" autoplay loop></audio>
<!-- END bgsound_ns -->

<table class="bodyline" width="100%" cellspacing="0" cellpadding="0" border="0">
 <tr>
  <td>
   
  <div id="display_body">
  <div id="real_body">
  <table class="topbkg" width="100%" cellspacing="0" cellpadding="0" border="0">
   <tr>
    <td><a href="{U_INDEX}?mod=default"><img src="{TEMPLATE_PATH}images/logo.jpg" border="0" alt="{SITE_DESC}" title="{SITE_DESC}" width="300" height="110" /></a></td>
    <td align="center" valign="middle" width="100%">&nbsp;</td>
   </tr>
  </table>
  
  <table width="100%" class="topnav" border="0" cellspacing="0" cellpadding="0">
   <tr>
    <td align="center">
    <span class="gensmall">{SITE_DESC}&nbsp;-&nbsp;<span id="clock"></span>&nbsp;-&nbsp;<a href="{U_INDEX}?mod=default" style="color:black">{L_GO_TO_RECEPTION}</a></span>
    
    <script type="text/javascript">
    //在页面显示时间更新
    function clock() {
        Stamp = new Date();
        document.getElementById("clock").innerHTML = (Stamp.getHours() < 10 ? "0" + Stamp.getHours() : Stamp.getHours()) + ":" + (Stamp.getMinutes() < 10 ? "0" + Stamp.getMinutes() : Stamp.getMinutes() ) + ":" + (Stamp.getSeconds() < 10 ? "0" + Stamp.getSeconds() : Stamp.getSeconds() );
        setTimeout("clock();", 1000);
    }
    clock();
    </script>

    </td>
   </tr>
  </table>

  <table width="100%" cellspacing="1" cellpadding="10" border="0" align="center">
 <tr>
<td align="center">

<div class="nav" align="left">{NAVIGATION}</div>