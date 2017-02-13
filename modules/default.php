<?php

$lang->load_keys('default');

if ( !$user->logged_in )
{
	$template->assign_vars(array(
		'PAGE_NAME' => $lang->reception
		));
}
else
{
	$template->assign_vars(array(
		'PAGE_NAME' => $lang->reception,
		'CHARASET' => $user->charaset,
		'PIC_WIDTH' => $user->pic_width,
		'PIC_HEIGHT' => $user->pic_height,
		'CHAR_WIDTH' => ceil($user->pic_width/4),
		'CHAR_HEIGHT' => ceil($user->pic_height/4)
		));
}
$template->assign_block_vars('bgsound_ns', array(
    'MUSIC' => 'Startup.mp3'
));
$template->set_filenames(array(
	'header' => 'page_header.tpl',
	'footer' => 'page_footer.tpl',
	'body' => 'default.tpl'
	));

$template->pparse('header');
$template->pparse('body');
$template->pparse('footer');

