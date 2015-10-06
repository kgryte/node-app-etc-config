'use strict';

var etc = require( './../lib' );

// Create a new configuration API:
var config = etc();

// Load local files:
config.load( './.travis.yml' );
console.dir( config.get() );

config.load( './package.json' );
console.dir( config.get() );

// Merge in a custom object:
config.merge( 'author', {
	'beep': 'boop'
});
console.dir( config.get( 'author' ) );

// Access a shallow value:
console.log( config.get( 'license' ) );

// Access nested values:
console.log( config.get( 'author.name' ) );

// Create and set shallow values:
config.set( 'hello', false );
console.log( config.get( 'hello' ) );

// Create and set deeply nested values:
config.set( 'foo.bar.bip', 'bap' );
console.log( config.get( 'foo.bar.bip' ) );

// Clone the current configuration:
var clone = config.clone();
console.log( config === clone );
// returns false
