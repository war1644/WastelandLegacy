<?php
class lang_french
{
	// constructeur
	function lang_french()
	{
		$this->this_language = 'Français';
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

		if ( $cat == 'common' ) // clés de langue communes
		{
			$this->validate = 'Valider';
			$this->connection = 'Connexion';
			$this->register = 'Création du personnage';
			$this->page_map = 'Carte';
			$this->access_denied = 'Accès refusé';
			$this->guest = 'Invité';
			$this->session_stop = 'Session terminée';
			$this->session_stop_explain = 'Votre session a été stoppée parce qu\'elle a été recréée par une autre personne.';
			$this->left = 'Gauche';
			$this->right = 'Droite';
			$this->up = 'Haut';
			$this->down = 'Bas';
			$this->center = 'Centré';
			$this->justify = 'Justifié';
			$this->yes = 'Oui';
			$this->no = 'Non';
			$this->javascript_required = 'Ce site nécessite la prise en charge de Javascript.';
			$this->chatbox = 'Chat';
			$this->chatbox_reduce = 'Réduire';
			$this->chatbox_increase = 'Agrandir';
			$this->post_message = 'Poster un message';
			$this->flood_alert = 'Attention au flood !';
			$this->redirect_at = 'Redirection dans';
			$this->redirection = 'Redirection';
			$this->character_name = 'Nom du personnage';
			$this->password = 'Mot de passe';
			$this->go_to_reception = 'Aller à l\'accueil';
			$this->do_not_wait = 'Ne pas attendre';
			$this->click_to_continue = 'Cliquez ici pour continuer';
			$this->go_to_admin_panel = 'Aller sur le panneau d\'administration';
			$this->quit_map = 'quitte la carte';
			$this->join_map = 'rejoint la carte';
			$this->error = 'Erreur';
			$this->infos = 'Informations';
			$this->hp = 'HP';
			$this->mp = 'MP';
			$this->attack = 'Attaque';
			$this->defense = 'Défense';
			$this->mind = 'Esprit';
			$this->agility = 'Agilité';
			$this->exp = 'Expérience';
			$this->level = 'Niveau';
			$this->class = 'Classe';
			$this->points = 'Points';
			$this->hp1 = 'HP';
			$this->mp1 = 'MP';
			$this->attack1 = 'attaque';
			$this->defense1 = 'défense';
			$this->mind1 = 'esprit';
			$this->agility1 = 'agilité';
			$this->exp1 = 'expérience';
			$this->level1 = 'niveau';
			$this->class1 = 'classe';
			$this->points1 = 'points';

			$this->nav_reception = 'Accueil';
			$this->nav_map = 'Carte';
			$this->nav_profile = 'Profil';
			$this->nav_battle = 'Combat';
		}
		elseif ( $cat == 'chat' )
		{
			// Who is slash command [Nuladion]
			$this->whois_char_not_found = 'Personnage non trouvé !';
		}
		elseif ( $cat == 'battle' ) // combat !
		{
			$this->battle = 'Combat';
			$this->allies = 'Alliés';
			$this->opponents = 'Adversaires';
			$this->battle_failure = 'Echec du combat';
			$this->you_disconnect_battle = 'Vous avez été déconnecté du combat. Ne pouvant pas savoir si votre déconnexion est volontaire ou non, vous perdez le combat.';
			$this->battle_menu = 'Menu de combat';
			$this->wait_turn = 'Attente de votre tour...';
			$this->click_to_attack = 'Cliquez sur un adversaire pour l\'attaquer';
			$this->click_opponent = 'Cliquez sur un adversaire !';
			$this->you_won_battle = 'Vous avez gagné le combat !';
			$this->you_win_exp = 'Vous gagnez %s points d\'expérience.';
			$this->you_win_points = 'Vous gagnez %s ' . $this->points1;
			$this->you_win_exp_gain_level = 'Vous gagnez %s points d\'expérience et atteignez le niveau %s !';

			$this->x_inflict_y_to_z = '%s inflige %s points de dégats à %s';
			$this->x_died = '%s est mort';

			$this->basic_action = 'Action de base';
			$this->act_attack = 'Attaquer';
			$this->act_defend = 'Se défendre';
			$this->act_flee = 'Fuir';
		}
		elseif ( $cat == 'default' )
		{
			$this->reception = 'Accueil';
			$this->register_now = 'Créer mon personnage maintenant';
			$this->if_no_account = 'Si vous n\'êtes pas inscrit, vous pouvez créer un nouveau compte.';
			$this->connection_explain = 'Si vous possédez déjà un personnage, vous pouvez vous connecter avec votre nom de personnage et votre mot de passe.';
			$this->character_stats = 'Stats du personnages';
			$this->logout = 'Déconnecter';
			$this->go_to_map = 'Aller sur la carte';
		}
		elseif ( $cat == 'synchro_pic' )
		{
			$this->synchro_pic_title = 'Synchroniser images';
			$this->synchro_pic_success = 'Images des événements et personnages synchronisées';
		}
		elseif ( $cat == 'profile' )
		{
			$this->registering = 'Inscription';
			$this->register_explain = 'L\'inscription est ici simplifiée. Elle sera complètement différente lors de la version finale de PHPore.';
			$this->password_confirm = 'Mot de passe (confirmer)';
			$this->email = 'Adresse email';
			$this->logout_succeeded = 'Déconnexion réussie !';
			$this->login_succeeded = 'Connexion réussie !';
			$this->login_failed = 'Connexion échouée...';
			$this->invalid_name_or_password = 'Vous avez entré un mot de passe ou un nom d\'utilisateur incorrect !';
			$this->you_are_now_logged_in = 'Vous êtes maintenant connecté sous le nom de <b>%s</b>.';
			$this->you_are_already_logged_in = 'Vous êtes déjà connecté sous le nom de <b>%s</b>.';
			$this->you_are_logged_out = 'Vous êtes déconnecté.';
			$this->empty_name = 'Pseudo non spécifié';
			$this->invalid_email = 'Email invalide';
			$this->user_with_same_email_or_name = 'Votre pseudo ou votre email a déjà été utilisé par quelqu\'un d\'autre';
			$this->not_equal_passwords = 'Les deux passwords entrés sont différents';
			$this->registration_succeeded = 'Inscription réussie !';
			$this->you_can_login = 'L\'inscription est terminée. Vous pouvez maintenant vous connecter avec votre pseudo et votre mot de passe.';
		}
		elseif ( $cat == 'map' )
		{
			$this->map_loading = 'Chargement de la carte...';
			$this->close_message = 'OK';
		}
		elseif ( $cat == 'general_config' ) // configuration générale
		{
			$this->general_config = 'Configuration générale';
			$this->config_updated = 'Configuration mise à jour';
			$this->config_updated_explain = 'Les information de configuration du site ont été mises à jour dans la base de donnée.';

			$this->website_options = 'Options du site';
			$this->site_name = 'Nom du site';
			$this->site_desc = 'Description courte du site';
			$this->time_zone = 'Fuseau horaire du site';
			$this->language = 'Langue du site';
			$this->template = 'Template du site';
			$this->use_cache = 'Cache activé';
			$this->cache_dir = 'Répertoire du cache';
			$this->use_gzip = 'Compression gzip activée';
			$this->optimize_maps = 'Optimiser nombre de hit cartes (nécessite GD)';

			$this->tileset_options = 'Options de tileset';
			$this->tile_size = 'Largeur d\'un tile';
			$this->tileset_tiles_lower = 'Nombre de tiles en couche inférieure';
			$this->tileset_tiles_upper = 'Nombre de tiles en couche supérieure';
			$this->tileset_cols = 'Nombre de colonnes dans un tileset';
			$this->tileset_bgcolor = 'Arrière plan du tileset';

			$this->misc_options = 'Options diverses';
			$this->refresh_method = 'Méthode de rafraichissement';
			$this->refresh_iframe = 'Par iframe';
			$this->refresh_ajax = 'Par ajax';
			$this->chat_history = 'Nombre de messages dans l\'historique du chat';
			$this->chat_history_time = 'Durée de vie d\'un message avant qu\'il ne soit supprimé';
			$this->default_location = 'Position de départ des personnages (ID,X,Y dir)';
			$this->variables = 'Variables';
			$this->preset_teleport_sprite = 'Image de téléporteur prédéfini';
		}
		elseif ( $cat == 'admin_panel' ) // panneau d'administration
		{
			$this->admin_menu = 'Menu d\'administration';
			$this->admin_panel = 'Panneau d\'administration';
			$this->admin_maps = 'Administration des cartes';
			$this->admin_tilesets = 'Administration des tilesets';
			$this->admin_events = 'Administration des événements';
			$this->admin_general = 'Administration générale';
			$this->admin_panel_explain = 'Bienvenue sur le panneau d\'administration de PHPore.<br />Vous pouvez ici modifier tous les paramètres de votre site-rpg, créer des cartes, des personnages...';
			$this->not_saved_continue_question = 'Vous n\'avez pas sauvegardé. Etes-vous sûr de vouloir continuer ?';
			$this->mod_map = 'Module de carte';
			$this->map_editor = 'Editeur de carte';
			$this->create_map = 'Créer carte';
			$this->resize_map = 'Redimensionner carte';
			$this->tileset_editor = 'Editeur de tileset';
			$this->create_tileset = 'Créer tileset';
			$this->export_tileset = 'Exporter tileset';
			$this->import_tileset = 'Importer tileset';
			$this->event_editor = 'Editeur d\'événement';
			$this->create_event = 'Créer événement';
			$this->synchro_pic = 'Synchroniser images';
			$this->delete_tileset = 'Supprimer tileset';
			$this->delete_map = 'Supprimer carte';
			$this->delete_event = 'Supprimer événement';
			$this->general_config = 'Configuration générale';
			$this->user_editor = 'Editeur de personnage';
			$this->delete_user = 'Supprimer personnage';
			$this->class_editor = 'Editeur de classe';
			$this->delete_class = 'Supprimer classe';
			$this->create_class = 'Créer classe';
		}
		elseif ( $cat == 'user_editor' ) // éditeur de personnage
		{
			$this->user_editor = 'Editeur de personnage';
			$this->user_updated = 'Personnage mise à jour';
			$this->user_updated_explain = 'Les données du personnage ont été mises à jour dans la base de donnée.';

			$this->account_options = 'Options du compte';
			$this->name = 'Nom';
			$this->change_password = 'Changer mot de passe';
			$this->email = 'Email';
			$this->administrator = 'Administrateur';

			$this->character_properties = 'Propriétés du personnage';
			$this->start_location = 'Position de départ et/ou recommencement (ID,X,Y dir)';
			$this->variables = 'Variables';
			$this->charaset = 'Charaset';
			$this->battler = 'Image de combat';
			$this->gender = 'Sexe';
			$this->male = 'Masculin';
			$this->female = 'Féminin';
			$this->biography = 'Biographie';
			$this->space_storage = 'Capacité de stockage';
			$this->modify_location = 'Modifier place du personnage';
			$this->map_id = 'ID de la carte';
			$this->map_x = 'Coordonnée X';
			$this->map_y = 'Coordonnée Y';
			$this->direction = 'Direction';
		}
		elseif ( $cat == 'class_editor' ) // éditeur de classe
		{
			$this->class_editor = 'Editeur de classe';
			$this->class_updated = 'Classe mise à jour';
			$this->class_updated_explain = 'Les données de la classe ont été mises à jour dans la base de donnée.';
			$this->view_curve = 'Visionner la courbe';

			$this->class_identification = 'Nom d\'identification de la classe';
			$this->class_title = 'Titre de la classe';
			$this->selectable_when_start = 'Sélectionnable lors de l\'inscription';
			$this->description = 'Description';
			$this->hp_plus = 'Gain ' . $this->hp1;
			$this->mp_plus = 'Gain ' . $this->mp1;
			$this->attack_plus = 'Gain ' . $this->attack1;
			$this->defense_plus = 'Gain ' . $this->defense1;
			$this->mind_plus = 'Gain ' . $this->mind1;
			$this->agility_plus = 'Gain ' . $this->agility1;
			$this->experience_curve = 'Courbe ' . $this->exp1;
			$this->hp_curve = 'Courbe ' . $this->hp1;
			$this->mp_curve = 'Courbe ' . $this->mp1;
			$this->attack_curve = 'Courbe ' . $this->attack1;
			$this->defense_curve = 'Courbe ' . $this->defense1;
			$this->mind_curve = 'Courbe ' . $this->mind1;
			$this->agility_curve = 'Courbe ' . $this->agility1;
			$this->charaset = 'Charaset';
			$this->battler = 'Combattant';
		}
		elseif ( $cat == 'map_editor' ) // éditeur de carte
		{
			$this->map_editor = 'Editeur de carte';
			$this->map_tileset = 'Tileset de la carte';
			$this->map_properties = 'Propriétés de la carte';
			$this->map_name = 'Nom de la carte';
			$this->map_music = 'Musique de la carte';
			$this->save_map = 'Sauvegarder la carte';
			$this->select_tile = 'Sélectionner le bloc';
			$this->map_saved = 'Carte sauvegardée';
			$this->no_tileset = 'Tileset introuvable';
			$this->lower_layer = 'Couche inférieure';
			$this->upper_layer = 'Couche supérieure';
			$this->mode_tile = 'Mode bloc';
			$this->mode_event = 'Mode événement';
			$this->tools = 'Outils';
			$this->preset_event = 'Evénement prédéfini';
			$this->action = 'Action';
			$this->action_done = 'Action effectuée';
			$this->teleport_here = 'Téléporter ici';
			$this->set_default_start_position = 'Redéfinir départ des joueurs';
			$this->set_players_position = 'Placer tous les joueurs ici';
			$this->teleport = 'Téléporter';
			$this->width_tiles_copy = 'Nombre de tiles à copier en largeur';
			$this->height_tiles_copy = 'Nombre de tiles à copier en hauteur';
			$this->width_tiles_paste = 'Nombre de tiles à coller en largeur';
			$this->height_tiles_paste = 'Nombre de tiles à coller en hauteur';
		}
		elseif ( $cat == 'select_map_to_edit' ) // sélection de la carte à éditer
		{
			$this->edit_map = 'Editer une carte';
			$this->select_map_to_edit = 'Sélectionner une carte à éditer';
		}
		elseif ( $cat == 'resize_map' ) // redimensionner une carte
		{
			$this->resize_map = 'Redimensionner une carte';
			$this->map_resized = 'Carte redimensionnée';
			$this->map_to_resize = 'Carte à redimensionner';
			$this->map_width = 'Largeur de la carte';
			$this->map_height = 'Hauteur de la carte';
			$this->are_you_sure_to_resize_map = 'Cette carte va être définitivement redimensionnée. Etes-vous sûr de vouloir continuer ?';
		}
		elseif ( $cat == 'select_event_to_edit' ) // sélection de l'événement à éditer
		{
			$this->edit_event = 'Editer un événement';
			$this->select_event_to_edit = 'Sélectionner un événement à éditer';
		}
		elseif ( $cat == 'select_user_to_edit' ) // sélection du personnage à éditer
		{
			$this->edit_user = 'Editer un personnage';
			$this->select_user_to_edit = 'Sélectionner un personnage à éditer';
		}
		elseif ( $cat == 'select_class_to_edit' ) // sélection d'une classe à éditer
		{
			$this->edit_class = 'Editer une classe';
			$this->select_class_to_edit = 'Sélectionner une classe à éditer';
		}
		elseif ( $cat == 'select_tileset_to_edit' ) // sélection du tileset à éditer
		{
			$this->edit_tileset = 'Editer un tileset';
			$this->select_tileset_to_edit = 'Sélectionner un tileset à éditer';
		}
		elseif ( $cat == 'select_tileset_to_export' ) // sélection du tileset à exporter
		{
			$this->export_tileset = 'Exporter un tileset';
			$this->select_tileset_to_export = 'Sélectionner un tileset à exporter';
		}
		elseif ( $cat == 'import_tileset' ) // importer tileset
		{
			$this->import_tileset = 'Importer tileset';
			$this->invalid_file = 'Le fichier est invalide. Vérifiez qu\'il s\'agit bien d\'un fichier de tileset.';
			$this->upload_error = 'Le transfert a échoué...';
			$this->importation_succeeded = 'Importation réussie !';
			$this->importation_succeeded_explain = 'Importation réussie ! Vous pouvez à présent éditer ce tileset avec l\'éditeur de tileset.';
		}
		elseif ( $cat == 'delete_map' ) // effacer carte
		{
			$this->delete_map = 'Supprimer une carte';
			$this->select_map_to_delete = 'Sélectionner une carte à supprimer';
			$this->are_you_sure_to_delete_map = 'Cette carte va être définitivement supprimée de la base de donnée. Etes-vous sûr de vouloir continuer ?';
			$this->map_deleted = 'Carte supprimée';
		}
		elseif ( $cat == 'delete_tileset' ) // effacer tileset
		{
			$this->delete_tileset = 'Supprimer un tileset';
			$this->select_tileset_to_delete = 'Sélectionner un tileset à supprimer';
			$this->are_you_sure_to_delete_tileset = 'Ce tileset va être définitivement supprimé de la base de donnée. Etes-vous sûr de vouloir continuer ?';
			$this->tileset_deleted = 'Tileset supprimé';
			$this->not_delete_tileset = 'Suppression impossible';
			$this->this_is_last_tileset = 'Ce tileset est le dernier, vous ne pouvez pas le supprimer car il faut au moins un tileset en service.';
		}
		elseif ( $cat == 'delete_class' ) // effacer classe
		{
			$this->delete_class = 'Supprimer une classe';
			$this->select_class_to_delete = 'Sélectionner une classe à supprimer';
			$this->are_you_sure_to_delete_class = 'Cette classe va être définitivement supprimée de la base de donnée. Etes-vous sûr de vouloir continuer ?';
			$this->class_deleted = 'Classe supprimée';
			$this->not_delete_class = 'Suppression impossible';
			$this->this_is_last_class = 'Cette classe est la dernière, vous ne pouvez pas la supprimer car il faut au moins une classe en service.';
		}
		elseif ( $cat == 'delete_event' ) // effacer événement
		{
			$this->delete_event = 'Supprimer un événement';
			$this->select_event_to_delete = 'Sélectionner un événément à supprimer';
			$this->are_you_sure_to_delete_event = 'Cet événément va être définitivement supprimé de la base de donnée. Etes-vous sûr de vouloir continuer ?';
			$this->event_deleted = 'Evénement supprimé';
		}
		elseif ( $cat == 'delete_user' ) // effacer personnage
		{
			$this->delete_user = 'Supprimer un personnage';
			$this->select_user_to_delete = 'Sélectionner un personnage à supprimer';
			$this->are_you_sure_to_delete_user = 'Ce personnage va être définitivement supprimé de la base de donnée. Etes-vous sûr de vouloir continuer ?';
			$this->user_deleted = 'Personnage supprimé';
		}
		elseif ( $cat == 'create_map' ) // créer carte
		{
			$this->create_map = 'Créer une carte';
			$this->map_name = 'Nom de la carte';
			$this->map_tileset = 'Tileset de la carte';
			$this->map_width = 'Largeur de la carte';
			$this->map_height = 'Hauteur de la carte';
		}
		elseif ( $cat == 'create_event' ) // créer événement
		{
			$this->create_event = 'Créer un événement';
			$this->event_name = 'Nom de l\'événement';
		}
		elseif ( $cat == 'create_class' ) // créer événement
		{
			$this->create_class = 'Créer une classe';
			$this->classname = 'Nom d\'identifiant de la classe';
			$this->class_title = 'Titre de la classe';
		}
		elseif ( $cat == 'create_tileset' ) // créer tileset
		{
			$this->create_tileset = 'Créer un tileset';
			$this->tileset_name = 'Nom du du tileset';
			$this->tileset_tiles_lower = 'Nombre de tiles en couche inférieure';
			$this->tileset_tiles_upper = 'Nombre de tiles en couche supérieure';
			$this->tileset_cols = 'Nombre de colonnes du tileset';
		}
		elseif ( $cat == 'tileset_editor' ) // éditeur de tileset
		{
			$this->tileset_editor = 'Editeur de tileset';
			$this->tileset_properties = 'Propriétés du tileset';
			$this->tileset_name = 'Nom du du tileset';
			$this->tileset_tiles_lower = 'Nombre de tiles en couche inférieure';
			$this->tileset_tiles_upper = 'Nombre de tiles en couche supérieure';
			$this->resize_tileset = 'Redimensionner le tileset';
			$this->save_tileset = 'Sauvegarder le tileset';
			$this->select_tile = 'Sélectionner le bloc';
			$this->tileset_saved = 'Tileset sauvegardé';
			$this->lower_layer = 'Couche inférieure';
			$this->upper_layer = 'Couche supérieure';
			$this->mode_tile = 'Mode bloc';
			$this->mode_layer = 'Mode couche';
			$this->click_to_change_layer = 'Cliquez sur un bloc pour changer son type de couche';
			$this->layer_below = 'En dessous du personnage';
			$this->layer_same = 'Bloque le personnage';
			$this->layer_above = 'Au dessus du personnage';
		}
		elseif ( $cat == 'event_editor' ) // éditeur d'événement
		{
			$this->event_editor = 'Editeur d\'événement';
			$this->save_event = 'Sauvegarder l\'événement';
			$this->event_saved = 'Evénement sauvegardé';
			$this->message_content = 'Contenu du message';
			$this->event_script = 'Script de l\'événement';
			$this->event_name = 'Nom de l\'événement';
			$this->event_picture = 'Image de l\'événement';
			$this->event_picture_type = 'Type d\'image';
			$this->event_charaset = 'Charaset';
			$this->event_dir = 'Direction';
			$this->event_sprite = 'Sprite';
			$this->event_layer = 'Couche';
			$this->dynamic = 'Dynamique';
			$this->static = 'Statique';
			$this->time_limit = 'Limite de temps';
			$this->validation = 'Validation';
			$this->show_face = 'Afficher visage';
			$this->stored_in_var = 'Stocké dans la variable';
			$this->number = 'Nombre';
			$this->text = 'Texte';
			$this->variable = 'Variable';
			$this->value = 'Valeur';
			$this->var_set = 'Assigner valeur';
			$this->var_increase = 'Incrémenter';
			$this->var_decrease = 'Diminuer';
			$this->var_multiply = 'Multiplier';
			$this->var_divide = 'Diviser';
			$this->var_concat = 'Concaténer';
			$this->map_dir = 'Direction';
			$this->do_not_change = 'Ne pas changer';
			$this->warning_function = 'Attention, une mauvaise utilisation de cette fonction peut<br />provoquer un disfonctionnement partiel ou complet du site !';
			$this->condition_equal = 'Egal à';
			$this->condition_different = 'Différent de';
			$this->condition_smaller = 'Plus petit que';
			$this->condition_bigger = 'Plus grand que';
			$this->condition_smaller_or_equal = 'Plus petit ou égal à';
			$this->condition_bigger_or_equal = 'Plus grand ou égal à';
			$this->condition_with_else = 'Sinon + Fin condition';
			$this->condition_without_else = 'Fin condition';
			$this->event_properties = 'Propriétés de l\'événement';
			$this->script_editor = 'Editeur de script';
			$this->html_activated = 'HTML activé';
			$this->show_message = 'Afficher un message';
			$this->set_message_align = 'Alignement de message';
			$this->set_message_time = 'Type de fin de message';
			$this->set_message_face = 'Séléctionner visage de l\'interlocuteur';
			$this->wait = 'Attendre un moment';
			$this->display_choice = 'Afficher un choix';
			$this->input_string = 'Saisie de texte/nombre';
			$this->modify_var = 'Modifier/créer une variable';
			$this->teleport_character = 'Téléporter personnage';
			$this->create_condition = 'Créer une condition';
			$this->stop_condition = 'Fin condition';
			$this->condition_else = 'Si condition fausse';
			$this->exec_javascript = 'Exécuter javascript';
			$this->exec_php = 'Exécuter php';
			$this->start_combat = 'Commencer un combat';
		}
		elseif ( $cat == 'compile_script' )
		{	
			$this->syntax_error_at_line = 'Erreur de syntaxe à la ligne %s';
			$this->not_closed_condition = 'Condition non fermée dans le script';
			$this->not_closed_javascript = 'Code javascript non terminé dans le script';
			$this->not_closed_php = 'Code php non terminé dans le script';
			$this->not_closed_message = 'Message non terminé dans le script';
			$this->not_closed_choice = 'Fourchette de choix non terminée dans le script';
			$this->no_choice = 'Vous n\'avez saisi aucun choix';
		}
		elseif ( !empty($cat) && is_file($config->path . 'language/' . $config->language . '/' . $cat . '.' . $config->phpex) )
		{
			include($config->path . 'language/' . $config->language . '/' . $cat . '.' . $config->phpex);
		}
		else
		{
			message_die('Error', 'No language data from cat ' . $cat);
		}

		$this->loaded_cats[$cat] = true;
		return true;
	}
}

$lang = new lang_french;
