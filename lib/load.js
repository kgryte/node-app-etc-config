'use strict';

// MODULES //

var read = require( 'app-etc-load' );


// LOAD //

/**
* FUNCTION: load( file )
*	Loads a configuration file.
*
* @param {String} file - file path
* @returns {Object} context
*/
function load( file ) {
	/* jshint validthis:true */
	this.merge( read( file ) );
	return this;
} // end FUNCTION load()


// EXPORTS //

module.exports = load;
