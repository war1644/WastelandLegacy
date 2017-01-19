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

require_once($config->path. 'language/french/main.' . $config->phpex);

class lang_english extends lang_french
{
	// constructeur
	function lang_english()
	{
		$this->this_language = 'English';
		$this->direction = 'ltr';
		$this->encoding = 'ISO-8859-1';
		$this->loaded_cats = array();
	}

	function load_keys($cat, $force_reload = false)
	{
		global $config;

		if ( isset($this->loaded_cats[$cat]) && !$force_reload )
		{
			return true;
		}

		if ( !preg_match('`^([a-z0-9\-_]+)$`', $cat) )
		{
			return false;
		}
		
		$loaded_from_parent = parent::load_keys($cat, $force_reload);

		if ( $cat == 'common' ) // cl�s de langue communes
		{
			$this->validate = 'Submit';
			$this->connection = 'Connection';
			$this->register = 'Character creation';
			$this->page_map = 'Map';
			$this->access_denied = 'Access denied';
			$this->guest = 'Guest';
			$this->session_stop = 'Session ended';
			$this->session_stop_explain = 'Your session has been stopped because it has been recreated by another user.';
			$this->left = 'Left';
			$this->right = 'Right';
			$this->up = 'Up';
			$this->down = 'Down';
			$this->center = 'Centered';
			$this->justify = 'Justified';
			$this->yes = 'Yes';
			$this->no = 'No';
			$this->javascript_required = 'Javascript is required for this website.';
			$this->chatbox = 'Chat';
			$this->chatbox_reduce = 'Hide';
			$this->chatbox_increase = 'Show';
			$this->redirect_at = 'Redirect in';
			$this->redirection = 'Redirect';
			$this->character_name = 'Character name';
			$this->password = 'Password';
			$this->go_to_reception = 'Go to homepage';
			$this->do_not_wait = 'Don\'t wait';
			$this->go_to_admin_panel = 'Go to administration panel';
			$this->error = 'Error';
			$this->hp = 'HP';
			$this->mp = 'MP';
			$this->attack = 'Attack';
			$this->defense = 'Defense';
			$this->mind = 'Mind';
			$this->agility = 'Agility';
			$this->exp = 'Experience';
			$this->level = 'Level';
			$this->class = 'Class';
			$this->points = 'Points';

			$this->nav_reception = 'Home';
			$this->nav_map = 'Map';
			$this->nav_profile = 'Profile';
		}
		elseif ( $cat == 'chat' )
		{
			// Who is slash command [Nuladion]
			$this->whois_char_not_found = '未知chat!';
		}
		elseif ( $cat == 'default' )
		{
			$this->reception = 'Home';
			$this->register_now = 'Create my character now';
			$this->if_no_account = 'If you are not yet registered, you can create a new account.';
			$this->connection_explain = 'If you already have a character, you can connect with your character\'s name and password.';
			$this->character_stats = 'Character stats';
			$this->logout = 'Disconnect';
			$this->go_to_map = 'Go to map';
		}
		elseif ( $cat == 'synchro_pic' )
		{
			$this->synchro_pic_title = 'Synchronize pictures';
			$this->synchro_pic_success = 'Event pictures and characters synchronized';
		}
		elseif ( $cat == 'profile' )
		{
			$this->registering = 'Registering';
			$this->register_explain = 'The registration is here simplified. It will be completely different in the final version of PHPore.';
			$this->password_confirm = 'Password (confirm)';
			$this->email = 'Email address';
			$this->logout_succeeded = 'Logout succeeded!';
			$this->login_succeeded = 'Login succeeded !';
			$this->login_failed = 'Login failed...';
			$this->invalid_name_or_password = 'You have entered an invalid password or character name!';
			$this->you_are_now_logged_in = 'You are now logged in under the name of <b>%s</b>.';
			$this->you_are_already_logged_in = 'You are already logged in under the name of <b>%s</b>.';
			$this->you_are_logged_out = 'You logged out.';
			$this->empty_name = 'Character name not specified';
			$this->invalid_email = 'Invalid email';
			$this->user_with_same_email_or_name = 'Your character name or your email has been used by somebody else';
			$this->not_equal_passwords = 'The two passwords entered are different';
			$this->registration_succeeded = 'Registration succeeded!';
			$this->you_can_login = 'The registration is completed. You can now connect with your character name and your password.';
			$this->charaset = 'Charaset';
		}
		elseif ( $cat == 'map' )
		{
			$this->map_loading = 'Map loading...';
			$this->close_message = 'OK';
			$this->post_message = 'Post a message';
			$this->flood_alert = 'Please do not flood!';
		}
		elseif ( $cat == 'general_config' ) // configuration g�n�rale
		{
			$this->general_config = 'General configuration';
			$this->config_updated = 'Configuration updated';
			$this->config_updated_explain = 'Configuration infos have been updated in the database.';

			$this->website_options = 'Website options';
			$this->site_name = 'Website name';
			$this->site_desc = 'Short website description';
			$this->time_zone = 'Website time zone';
			$this->language = 'Website language';
			$this->template = 'Website template';
			$this->use_cache = 'Cache activated';
			$this->cache_dir = 'Cache directory';
			$this->use_gzip = 'Gzip compression activated';

			$this->tileset_options = 'Tileset options';
			$this->tile_size = 'Tile width';
			$this->tileset_tiles_lower = 'Number of tiles in lower layer';
			$this->tileset_tiles_upper = 'Number of tiles in upper layer';
			$this->tileset_cols = 'Number of columns in a tileset';
			$this->tileset_bgcolor = 'Tileset background color';

			$this->misc_options = 'Miscellaneous options';
			$this->refresh_method = 'Refresh method';
			$this->refresh_iframe = 'By iframe';
			$this->refresh_ajax = 'By ajax';
			$this->chat_history = 'Nombre de messages dans l\'historique du chat';
			$this->chat_history_time = 'Dur�e de vie d\'un message avant qu\'il ne soit supprim�';
			$this->default_location = 'Position de d�part des personnages (ID,X,Y dir)';
			$this->variables = 'Variables';
		}
		elseif ( $cat == 'admin' ) // panneau d'administration
		{
			$this->admin_panel = 'Administration panel';
			$this->admin_maps = 'Administer maps';
			$this->admin_tilesets = 'Administer tilesets';
			$this->admin_events = 'Administer events';
			$this->admin_panel_explain = 'Welcome to the administration panel of PHPore.<br />You can here modify all settings of your website-rpg, create maps, characters...';
			$this->not_saved_continue_question = 'You didn\'t save. Are you sure you want to continue?';
			$this->mod_map = 'Map module';
			$this->map_editor = 'Map editor';
			$this->create_map = 'Create map';
			$this->tileset_editor = 'Tileset editor';
			$this->create_tileset = 'Create tileset';
			$this->export_tileset = 'Export tileset';
			$this->import_tileset = 'Import tileset';
			$this->event_editor = 'Event editor';
			$this->create_event = 'Create event';
			$this->synchro_pic = 'Synchronize pictures';
			$this->general_config = 'General configuration';
			$this->delete_tileset = 'Delete tileset';
			$this->delete_map = 'Delete map';
			$this->delete_event = 'Delete event';
		}
		elseif ( $cat == 'map_editor' ) // �diteur de carte
		{
			$this->map_editor = 'Map editor';
			$this->map_tileset = 'Map tileset';
			$this->map_properties = 'Map properties';
			$this->map_name = 'Map name';
			$this->map_music = 'Map music';
			$this->save_map = 'Save map';
			$this->select_tile = 'Select a tile';
			$this->map_saved = 'Map saved';
			$this->no_tileset = 'Tileset not found';
			$this->lower_layer = 'Lower layer';
			$this->upper_layer = 'Upper layer';
			$this->mode_tile = 'Tiles';
			$this->mode_event = 'Events';
			$this->tools = 'Tools';
			$this->preset_event = 'Preset event';
			$this->teleport_here = 'Teleport here';
			$this->event_teleport_here = 'You are about to create an event wich teleport here.';
			$this->width_tiles_copy = 'Number of tiles to copy in width';
			$this->height_tiles_copy = 'Number of tiles to copy in height';
			$this->width_tiles_paste = 'Number of tiles to paste in width';
			$this->height_tiles_paste = 'Number of tiles to paste in height';
		}
		elseif ( $cat == 'select_map_to_edit' ) // s�lection de la carte � �diter
		{
			$this->edit_map = 'Edit a map';
			$this->select_map_to_edit = 'Select a map to edit';
		}
		elseif ( $cat == 'select_event_to_edit' ) // s�lection de l'�v�nement � �diter
		{
			$this->edit_event = 'Edit an event';
			$this->select_event_to_edit = 'Select an event to edit';
		}
		elseif ( $cat == 'select_tileset_to_edit' ) // s�lection du tileset � �diter
		{
			$this->edit_tileset = 'Edit tileset';
			$this->select_tileset_to_edit = 'Select a tileset to edit';
		}
		elseif ( $cat == 'select_tileset_to_export' ) // s�lection du tileset � exporter
		{
			$this->edit_tileset = 'Export a tileset';
			$this->select_tileset_to_export = 'Select a tileset to export';
		}
		elseif ( $cat == 'import_tileset' ) // importer tileset
		{
			$this->import_tileset = 'Import tileset';
			$this->invalid_file = 'The file is invalid. Please verify that it is a tileset file.';
			$this->upload_error = 'The transfer has failed...';
			$this->importation_succeeded = 'Import succeeded!';
			$this->importation_succeeded_explain = 'Import succeeded! You can now edit this tileset with the tileset editor.';
		}
		elseif ( $cat == 'delete_map' ) // effacer carte
		{
			$this->delete_map = 'Delete a map';
			$this->select_map_to_delete = 'Select a map to delete';
			$this->are_you_sure_to_delete_map = 'This map will be removed from the database. This cannot be undone! Are you sure you want to continue?';
			$this->map_deleted = 'Map deleted';
		}
		elseif ( $cat == 'delete_tileset' ) // effacer tileset
		{
			$this->delete_tileset = 'Delete a tileset';
			$this->select_tileset_to_delete = 'Select a tileset to delete';
			$this->are_you_sure_to_delete_tileset = 'This tileset will be removed from the database. This cannot be undone! Are you sure you want to continue?';
			$this->tileset_deleted = 'Tileset deleted';
			$this->not_delete_tileset = 'Cannot delete';
			$this->this_is_last_tileset = 'This tileset is the only one available. You can\'t delete it because PHPore requires at least one tileset to work.';
		}
		elseif ( $cat == 'delete_event' ) // effacer �v�nement
		{
			$this->delete_event = 'Delete an event';
			$this->select_event_to_delete = 'Select an event to delete';
			$this->are_you_sure_to_delete_event = 'This event will be removed from the database. This cannot be undone!. Are you sure you want to continue?';
			$this->event_deleted = 'Event deleted';
		}
		elseif ( $cat == 'create_map' ) // cr�er carte
		{
			$this->create_map = 'Create a map';
			$this->map_name = 'Map name';
			$this->map_tileset = 'Map tileset';
			$this->map_width = 'Map width';
			$this->map_height = 'Map height';
		}
		elseif ( $cat == 'create_event' ) // cr�er �v�nement
		{
			$this->create_event = 'Create an event';
			$this->event_name = 'Event name';
		}
		elseif ( $cat == 'create_tileset' ) // cr�er tileset
		{
			$this->create_tileset = 'Create a tileset';
			$this->tileset_name = 'Name of the tileset';
			$this->tileset_tiles_lower = 'Number of tiles in lower layer';
			$this->tileset_tiles_upper = 'Number of tiles in upper layer';
		}
		elseif ( $cat == 'tileset_editor' ) // �diteur de tileset
		{
			$this->tileset_editor = 'Tileset editor';
			$this->tileset_properties = 'Tileset properties';
			$this->tileset_name = 'Name of the tileset';
			$this->tileset_tiles_lower = 'Number of tiles in lower layer';
			$this->tileset_tiles_upper = 'Number of tiles in upper layer';
			$this->resize_tileset = 'Resize tileset';
			$this->save_tileset = 'Save tileset';
			$this->select_tile = 'Select tile';
			$this->tileset_saved = 'Tileset saved';
			$this->lower_layer = 'Lower layer';
			$this->upper_layer = 'Upper layer';
			$this->mode_tile = 'Tiles mode';
			$this->mode_layer = 'Layers mode';
			$this->click_to_change_layer = 'Click on a tile to change its layer type';
			$this->layer_below = 'Below the character';
			$this->layer_same = 'Stops the character';
			$this->layer_above = 'Above the character';
		}
		elseif ( $cat == 'event_editor' ) // �diteur d'�v�nement
		{
			$this->event_editor = 'Event editor';
			$this->save_event = 'Save event';
			$this->event_saved = 'Event saved';
			$this->message_content = 'Message content';
			$this->event_script = 'Event script';
			$this->event_name = 'Event name';
			$this->event_picture = 'Event picture';
			$this->event_picture_type = 'Picture type';
			$this->event_charaset = 'Charaset';
			$this->event_dir = 'Direction';
			$this->event_sprite = 'Sprite';
			$this->event_layer = 'Layer';
			$this->dynamic = 'Dynamic';
			$this->static = 'Static';
			$this->time_limit = 'Time limit';
			$this->validation = 'Validation';
			$this->show_face = 'Show a face';
			$this->stored_in_var = 'Saved in a variable';
			$this->number = 'Number';
			$this->text = 'Text';
			$this->variable = 'Variable';
			$this->value = 'Value';
			$this->var_set = 'Assign value';
			$this->var_increase = 'Increase';
			$this->var_decrease = 'Decrease';
			$this->var_multiply = 'Multiply';
			$this->var_divide = 'Divide';
			$this->map_dir = 'Direction';
			$this->do_not_change = 'Do not change';
			$this->warning_function = 'Warning, a misuse of this function could<br/> partially or completely destroy the website !';
			$this->condition_equal = 'Equal to';
			$this->condition_different = 'Different to';
			$this->condition_smaller = 'Lower than';
			$this->condition_bigger = 'Greater than';
			$this->condition_smaller_or_equal = 'Lower or equal to';
			$this->condition_bigger_or_equal = 'Greater or equal to';
			$this->condition_with_else = 'Else + End condition';
			$this->condition_without_else = 'End condition';
			$this->event_properties = 'Event properties';
			$this->script_editor = 'Script editor';
			$this->html_activated = 'HTML activated';
			$this->show_message = 'Show a message';
			$this->set_message_align = 'Message alignment';
			$this->set_message_time = 'Type of end of message';
			$this->set_message_face = 'Select face';
			$this->wait = 'Wait a moment';
			$this->display_choice = 'Display a choice';
			$this->input_string = 'Input text/number';
			$this->modify_var = 'Modify/create a variable';
			$this->teleport = 'Teleport character';
			$this->create_condition = 'Create a condition';
			$this->stop_condition = 'End condition';
			$this->condition_else = 'If condition false';
			$this->exec_javascript = 'Evaluate javascript';
			$this->exec_php = 'Evaluate php';
			$this->start_combat = 'Start a battle';
		}
		elseif ( $cat == 'compile_script' )
		{	
			$this->syntax_error_at_line = 'Syntax error at line %s';
			$this->not_closed_condition = 'Condition isn\'t closed in the script';
			$this->not_closed_javascript = 'Javascript code not finished in the script';
			$this->not_closed_php = 'Php code not finished in the script';
			$this->not_closed_message = 'Message not finished in the script';
			$this->not_closed_choice = 'Fork of choices not finished in the script';
			$this->no_choice = 'You didn\'t enter any choice';
		}
		elseif ( !empty($cat) && is_file($config->path . 'language/' . $config->language . '/' . $cat . '.' . $config->phpex) )
		{
			include($config->path . 'language/' . $config->language . '/' . $cat . '.' . $config->phpex);
		}
		elseif ( !$loaded_from_parent )
		{
			message_die('Error', 'No language data from cat ' . $cat);
		}

		$this->loaded_cats[$cat] = true;
		return true;
	}
}

$lang = new lang_english;

?>