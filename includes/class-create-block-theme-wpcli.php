<?php

/**
 * WPCLI Commands for the Create Block Theme plugin.
 *
 * @since
 * @package    Create_Block_Theme
 * @subpackage Create_Block_Theme/includes
 * @author     WordPress.org
 */
class CBT_WPCLI extends WP_CLI_Command {

	/**
	 * Saves your theme settings to the current theme.
	 *
	 * ## OPTIONS
	 *
	 * [--saveFonts]
	 * : Save the fonts settings.
	 *
	 * [--saveTemplates]
	 * : Save the templates settings.
	 *
	 * [--processOnlySavedTemplates]
	 * : Process only saved templates.
	 */
	public function save( $args, $assoc_args ) {

		$options = $assoc_args;

		// Example copied from includes/class-create-block-theme-api.php
		// Would be replaced with a proper abstraction, not duplicated code.

		if ( isset( $options['saveFonts'] ) && true === $options['saveFonts'] ) {
			CBT_Theme_Fonts::persist_font_settings();
		}

		if ( isset( $options['saveTemplates'] ) && true === $options['saveTemplates'] ) {
			if ( true === $options['processOnlySavedTemplates'] ) {
				CBT_Theme_Templates::add_templates_to_local( 'user', null, null, $options );
			} elseif ( is_child_theme() ) {
					CBT_Theme_Templates::add_templates_to_local( 'current', null, null, $options );
			} else {
				CBT_Theme_Templates::add_templates_to_local( 'all', null, null, $options );
			}
			CBT_Theme_Templates::clear_user_templates_customizations();
		}

		if ( isset( $options['saveStyle'] ) && true === $options['saveStyle'] ) {
			if ( is_child_theme() ) {
				CBT_Theme_JSON::add_theme_json_to_local( 'current', null, null, $options );
			} else {
				CBT_Theme_JSON::add_theme_json_to_local( 'all', null, null, $options );
			}
			CBT_Theme_Styles::clear_user_styles_customizations();
		}

		wp_cache_flush();

		WP_CLI::success( 'Saved.' );
	}
}
