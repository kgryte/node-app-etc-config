'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	deepSet = require( 'utils-deep-set' );


// SET //

/**
* FUNCTION: set( keypath, value[, options] )
*	Sets a configuration value according to a provided `keypath`.
*
* @param {String} keypath - key path
* @param {*} value - value to set
* @param {Object} [options] - function options
* @returns {Boolean} boolean indicating whether a configuration value was set
*/
function set( keypath, value, options ) {
	/* jshint validthis:true */
	var opts = {};
	if ( arguments.length > 2 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
		}
		if ( options.hasOwnProperty( 'sep' ) ) {
			opts.sep = options.sep;
		}
		if ( opts.hasOwnProperty( 'create' ) ) {
			opts.create = options.create;
		}
	}
	if ( opts.sep === void 0 ) {
		opts.sep = this._opts.sep;
	}
	if ( opts.create === void 0 ) {
		opts.create = this._opts.create;
	}
	return deepSet( this._db, keypath, value, opts );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;
