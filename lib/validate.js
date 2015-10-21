'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );


// VALIDATE //

/**
* FUNCTION: validate( [validator] )
*	Validates a configuration store.
*
* @param {Function} [validator] - JSON schema validator
* @returns {Boolean|Object|*} boolean indicating if a configuration is valid or an object containing errors
*/
function validate( validator ) {
	/* jshint validthis:true */
	var out,
		v;
	if ( arguments.length ) {
		v = validator;
		if ( !isFunction( v ) ) {
			throw new TypeError( 'invalid input argument. Input argument must be a function. Value: `' + validator + '`.' );
		}
	} else {
		v = this._validate;
		if ( v === void 0 ) {
			return true;
		}
	}
	out = v( this._db );
	if ( v === this._validate && out === false ) {
		return v.errors;
	}
	return out;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
