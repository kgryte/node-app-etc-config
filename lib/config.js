'use strict';

// MODULES //

var typeName = require( 'type-name' ),
	merge = require( 'utils-merge2' )(),
	validator = require( 'is-my-json-valid' ),
	validate = require( './validate.opts.js' ),
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
* @param {Object} [options.schema] - configuration JSON schema
* @param {Object} [options.formats] - custom validation formats
* @param {Object} [options.ext] - external schemas
* @returns {Config} Config instance
*/
function Config( options ) {
	var opts,
		err;

	if ( !( this instanceof Config ) ) {
		if ( arguments.length ) {
			return new Config( options );
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
	if ( opts.schema !== void 0 ) {
		this._validate = validator( opts.schema, {
			'formats': opts.formats || {},
			'schemas': opts.ext || {},
			'greedy': true,
			'verbose': true
		});
		delete opts.schema;
		delete opts.formats;
		delete opts.ext;
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
Config.prototype.validate = require( './validate.js' );


// EXPORTS //

module.exports = Config;
