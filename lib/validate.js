'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );


// VALIDATE //

/**
* FUNCTION: validate( [validator] )
*	Validates a configuration store.
*
* @param {Function} [validator] - JSON schema validator
* @returns {Boolean|Object[]|*} validation results
*/
function validate( validator ) {
	/* jshint validthis:true */
	var out;
	if ( arguments.length ) {
		if ( !isFunction( validator ) ) {
			throw new TypeError( 'invalid input argument. Input argument must be a function. Value: `' + validator + '`.' );
		}
		return validator( this._db );
	}
	if ( this._validate === void 0 ) {
		return true;
	}
	out = this._validate( this._db );
	if ( out === false ) {
		return this._validate.errors;
	}
	return out;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
