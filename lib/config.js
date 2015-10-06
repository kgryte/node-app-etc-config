'use strict';

// MODULES //

var typeName = require( 'type-name' ),
	merge = require( 'utils-merge2' )(),
	validate = require( './validate.js' ),
	db = require( './db.js' );


// VARIABLES //

var DEFAULTS = require( './defaults.json' );


// CONFIG //

/**
* FUNCTION: Config( [options] )
*	Config constructor.
*
* @constructor
* @param {Object} [options] - function options
* @param {String} [options.sep='.'] - keypath separator
* @param {Boolean} [options.create=true] - boolean indicating whether to create a keypath if it does not exist
* @returns {Config} Config instance
*/
function Config( options ) {
	var opts,
		err;

	if ( !( this instanceof Config ) ) {
		if ( arguments.length ) {
			return new Config( opts );
		}
		return new Config();
	}
	opts = {};
	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	this._opts = merge( {}, DEFAULTS, opts );
	this._name = typeName( this );
	this._db = db();
	return this;
} // end FUNCTION Config()


// METHODS //

Config.prototype.set = require( './set.js' );
Config.prototype.merge = require( './merge.js' );

Config.prototype.get = require( './get.js' );
Config.prototype.clone = require( './clone.js' );

Config.prototype.load = require( './load.js' );


// EXPORTS //

module.exports = Config;
