'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' ),
	isBoolean = require( 'validate.io-boolean-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} [options.sep] - keypath separator
* @param {Boolean} [options.create] - boolean indicating whether to create a keypath if it does not exist
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'invalid option. Separator option must be a primitive string. Option: `' + opts.sep + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'create' ) ) {
		opts.create = options.create;
		if ( !isBoolean( opts.create ) ) {
			return new TypeError( 'invalid option. Create option must be a primitive boolean. Option: `' + opts.create + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
