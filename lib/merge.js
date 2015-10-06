'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isObject = require( 'validate.io-object' ),
	typeName = require( 'type-name' ),
	merge2 = require( 'utils-merge2' )(),
	deepGet = require( 'utils-deep-get' ),
	deepSet = require( 'utils-deep-set' );


// MERGE //

/**
* FUNCTION: merge( [ keypath,] config[, options ] )
*	Merges a configuration object with an existing configuration. If provided a `keypath`, merges with a sub-configuration.
*
* @param {String} [keypath] - key path
* @param {Object|Config} config - config to merge
* @param {Object} [options] - function options
* @returns {Boolean} boolean indicating whether a merge was successful
*/
function merge() {
	/* jshint validthis:true */
	var nargs = arguments.length,
		keypath,
		options,
		config,
		name,
		opts,
		flg,
		tmp;

	if ( nargs === 1 ) {
		config = arguments[ 0 ];
		flg = 2; // arg #s
	}
	else if ( nargs === 2 ) {
		if ( isString( arguments[ 0 ] ) ) {
			keypath = arguments[ 0 ];
			config = arguments[ 1 ];
			flg = 12; // arg #s
		} else {
			config = arguments[ 0 ];
			options = arguments[ 1 ];
			flg = 23; // arg #s
		}
	}
	else {
		keypath = arguments[ 0 ];
		config = arguments[ 1 ];
		options = arguments[ 2 ];
		flg = 123; // arg #s
	}
	name = typeName( config );
	if (
		!isObject( config ) &&
		name !== this._name
	) {
		throw new TypeError( 'invalid input argument. Configuration must be either an object or a Config instance. Value: `' + config + '`.' );
	}
	opts = {};
	if ( flg === 23 || flg === 123 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
		}
		if ( options.hasOwnProperty( 'sep' ) ) {
			opts.sep = options.sep;
		}
		if ( options.hasOwnProperty( 'create' ) ) {
			opts.create = options.create;
		}
	}
	if ( opts.sep === void 0 ) {
		opts.sep = this._opts.sep;
	}
	if ( opts.create === void 0 ) {
		opts.create = this._opts.create;
	}
	if ( flg === 123 ) {
		if ( !isString( keypath ) ) {
			throw new TypeError( 'invalid input argument. Keypath argument must be a primitive string. Value: `' + keypath + '`.' );
		}
	}
	// Merge...
	if ( keypath === void 0 ) {
		if ( name === this._name ) {
			merge2( this._db, config._db );
		} else {
			merge2( this._db, config );
		}
		return true;
	}
	// Deep set and merge...
	tmp = deepGet( this._db, keypath, opts );
	if ( !isObject( tmp ) ) {
		return false;
	}
	if ( name === this._name ) {
		merge2( tmp, config._db );
	} else {
		merge2( tmp, config );
	}
	return deepSet( this._db, keypath, tmp, opts );
} // end FUNCTION merge()


// EXPORTS //

module.exports = merge;
