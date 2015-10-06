'use strict';

// MODULES //

var deepGet = require( 'utils-deep-get' ),
	isObject = require( 'validate.io-object' );


// CLONE //

/**
* FUNCTION: clone( [ keypath[, options] ] )
*	If no `keypath` is provided, clones the entire configuration. If a `keypath` is provided, clones the sub-configuration corresponding to the provided key path. If a `keypath` does not exist, returns `null`.
*
* @param {String} [keypath] - key path
* @param {Object} [options] - function options
* @returns {Config|Null} new instance or null
*/
function clone( keypath, options ) {
	/* jshint validthis:true */
	var config,
		opts,
		tmp;

	if ( arguments.length === 0 ) {
		config = new this.constructor();
		config.merge( this._db );
		return config;
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
	if ( isObject( tmp ) ) {
		config = new this.constructor();
		config.merge( tmp );
		return config;
	}
	keypath = keypath.split( this._opts.sep );
	keypath = keypath[ keypath.length-1 ];

	config = new this.constructor();
	config.set( keypath, tmp );

	return config;
} // end FUNCTION clone()


// EXPORTS //

module.exports = clone;
