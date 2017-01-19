<?php

/*

Program: phpore
Author: Jeremy Faivre
Contact: http://www.jeremyfaivre.com/about
Year: 2005

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

*/

if ( !defined('IN_PHPORE') )
{
	exit;
}

// section critique : interdiction d'ex�cuter plusieurs fois ce script en meme temps
$rs = $db->sql_query('UPDATE ' . CONFIG_TABLE . ' SET locked = 1 WHERE locked = 0');

if ( $db->sql_affectedrows($rs) == 1 )
{
	// nettoyage du chat
	$db->sql_query('DELETE FROM ' . CHATBOX_TABLE . ' WHERE time < ' . (time() - $config->chat_history_time));

	// le code �crit ici sera ex�cut� � chaque appel de ce fichier.
	// si par exemple aucune page n'est affich�e pendant 3 jours,
	// puis que le 3e jour une page est affich�e,
	// le code qui est ici sera �xecut� 1 fois

	while ( $config->day_number < $actual_day_number )
	{
		$config->day_number++;

		// le code �crit ici sera ex�cut� une fois par jour.
		// si par exemple aucune page n'est affich�e pendant 3 jours,
		// puis que le 3e jour une page est affich�e,
		// le code qui est ici sera �xecut� 3 fois
	}

	$config->set('day_number', $config->day_number);


	$config->set('locked', 0);
	$config->update_db();
}

?>