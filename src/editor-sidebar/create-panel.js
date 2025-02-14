/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalVStack as VStack,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalSpacer as Spacer,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalText as Text,
	PanelBody,
	Button,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { addCard, copy } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import ScreenHeader from './screen-header';
import {
	createBlankTheme,
	createClonedTheme,
	createChildTheme,
} from '../resolvers';

export const CreateThemePanel = ( { createType } ) => {
	const { createErrorNotice } = useDispatch( noticesStore );

	const subfolder = useSelect( ( select ) => {
		const stylesheet = select( 'core' ).getCurrentTheme().stylesheet;
		if ( stylesheet.lastIndexOf( '/' ) > 1 ) {
			return stylesheet.substring( 0, stylesheet.lastIndexOf( '/' ) );
		}
		return '';
	}, [] );

	const [ theme, setTheme ] = useState( {
		name: '',
		description: '',
		uri: '',
		author: '',
		author_uri: '',
		tags_custom: '',
		subfolder,
	} );

	const cloneTheme = () => {
		if ( createType === 'createClone' ) {
			handleCloneClick();
		} else if ( createType === 'createChild' ) {
			handleCreateChildClick();
		}
	};

	const handleCreateBlankClick = () => {
		createBlankTheme( theme )
			.then( () => {
				// eslint-disable-next-line no-alert
				window.alert(
					__(
						'Theme created successfully. The editor will now reload.',
						'create-block-theme'
					)
				);
				window.location.reload();
			} )
			.catch( ( error ) => {
				const errorMessage =
					error.message ||
					__(
						'An error occurred while attempting to create the theme.',
						'create-block-theme'
					);
				createErrorNotice( errorMessage, { type: 'snackbar' } );
			} );
	};

	const handleCloneClick = () => {
		createClonedTheme( theme )
			.then( () => {
				// eslint-disable-next-line no-alert
				window.alert(
					__(
						'Theme cloned successfully. The editor will now reload.',
						'create-block-theme'
					)
				);
				window.location.reload();
			} )
			.catch( ( error ) => {
				const errorMessage =
					error.message ||
					__(
						'An error occurred while attempting to create the theme.',
						'create-block-theme'
					);
				createErrorNotice( errorMessage, { type: 'snackbar' } );
			} );
	};

	const handleCreateChildClick = () => {
		createChildTheme( theme )
			.then( () => {
				// eslint-disable-next-line no-alert
				window.alert(
					__(
						'Child theme created successfully. The editor will now reload.',
						'create-block-theme'
					)
				);
				window.location.reload();
			} )
			.catch( ( error ) => {
				const errorMessage =
					error.message ||
					__(
						'An error occurred while attempting to create the theme.',
						'create-block-theme'
					);
				createErrorNotice( errorMessage, { type: 'snackbar' } );
			} );
	};

	return (
		<PanelBody>
			<ScreenHeader
				title={ __( 'Create Theme', 'create-block-theme' ) }
			/>
			<VStack>
				<TextControl
					label={ __( 'Theme name', 'create-block-theme' ) }
					value={ theme.name }
					onChange={ ( value ) =>
						setTheme( { ...theme, name: value } )
					}
				/>
				<details>
					<summary>
						{ __(
							'Additional Theme MetaData',
							'create-block-theme'
						) }
					</summary>
					<Spacer />
					<TextareaControl
						label={ __(
							'Theme description',
							'create-block-theme'
						) }
						value={ theme.description }
						onChange={ ( value ) =>
							setTheme( { ...theme, description: value } )
						}
						placeholder={ __(
							'A short description of the theme',
							'create-block-theme'
						) }
					/>
					<TextControl
						label={ __( 'Theme URI', 'create-block-theme' ) }
						value={ theme.uri }
						onChange={ ( value ) =>
							setTheme( { ...theme, uri: value } )
						}
						placeholder={ __(
							'https://github.com/wordpress/twentytwentythree/',
							'create-block-theme'
						) }
					/>
					<TextControl
						label={ __( 'Author', 'create-block-theme' ) }
						value={ theme.author }
						onChange={ ( value ) =>
							setTheme( { ...theme, author: value } )
						}
						placeholder={ __(
							'the WordPress team',
							'create-block-theme'
						) }
					/>
					<TextControl
						label={ __( 'Author URI', 'create-block-theme' ) }
						value={ theme.author_uri }
						onChange={ ( value ) =>
							setTheme( { ...theme, author_uri: value } )
						}
						placeholder={ __(
							'https://wordpress.org/',
							'create-block-theme'
						) }
					/>
				</details>
				<br />
				{ createType === 'createClone' && (
					<>
						<Button
							icon={ copy }
							variant="primary"
							onClick={ () => cloneTheme() }
						>
							{ __( 'Create Theme', 'create-block-theme' ) }
						</Button>
					</>
				) }
				{ createType === 'createChild' && (
					<>
						<Button
							icon={ copy }
							variant="primary"
							onClick={ () => cloneTheme() }
						>
							{ __( 'Create Child Theme', 'create-block-theme' ) }
						</Button>
					</>
				) }
				{ createType === 'createBlank' && (
					<>
						<Button
							icon={ addCard }
							variant="primary"
							onClick={ handleCreateBlankClick }
						>
							{ __( 'Create Blank Theme', 'create-block-theme' ) }
						</Button>
						<Spacer />
						<Text variant="muted">
							{ __(
								'Create a blank theme with no styles or templates.',
								'create-block-theme'
							) }
						</Text>
					</>
				) }
			</VStack>
		</PanelBody>
	);
};
