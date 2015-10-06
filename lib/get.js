'use strict';

// MODULES //

var copy = require( 'utils-copy' ),
	deepGet = require( 'utils-deep-get' );


// GET //

/**
* FUNCTION: get( [ keypath[, options] ] )
*	If no `keypath` is provided, returns a copy of the underlying raw configuration store. If a `keypath` is provided, returns the configuration value corresponding to the provided key path. If a `keypath` does not exist, returns `null`.
*
* @param {String} [keypath] - key path
* @param {Object} [options] - function options
* @param {String} [options.sep] - keypath separator
* @returns {*|Null} configuration, configuration value, or null
*/
function get( keypath, options ) {
	/* jshint validthis:true */
	var opts,
		tmp;
	if ( arguments.length === 0 ) {
		return copy( this._db );
	}
	if ( arguments.length > 1 ) {
		opts = options;
	} else {
		opts = {
			'sep': this._opts.sep
		};
	}
	tmp = deepGet( this._db, keypath, opts );
	if ( tmp === void 0 ) {
		return null;
	}
	return copy( tmp );
} // end FUNCTION get()


// EXPORTS //

module.exports = get;
