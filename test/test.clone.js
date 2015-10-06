/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	etc = require( './../lib' ),
	clone = require( './../lib/clone.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'clone', function tests() {

	var ctx;

	beforeEach( function before() {
		ctx = etc();
	});

	it( 'should export a function', function test() {
		expect( clone ).to.be.a( 'function' );
	});

	it( 'should clone a configuration instance', function test() {
		var config;

		ctx.set( 'beep.boop', 'bop' );
		config = clone.call( ctx );

		assert.isFalse( config === ctx );
		assert.deepEqual( config.get(), ctx.get() );
	});

	it( 'should clone a nested configuration instance', function test() {
		var config;

		ctx.set( 'beep.boop', 'bop' );
		config = clone.call( ctx, 'beep' );

		assert.isFalse( config === ctx );
		assert.deepEqual( config.get(), ctx.get( 'beep' ) );
	});

	it( 'should clone a nested configuration instance using a specified separator', function test() {
		var config;

		ctx.set( 'beep.boop.bip.bap', 'bop' );
		config = clone.call( ctx, 'beep|boop|bip', {
			'sep': '|'
		});

		assert.isFalse( config === ctx );
		assert.deepEqual( config.get(), ctx.get( 'beep.boop.bip' ) );
	});

	it( 'should use the keypath basename if the cloned value is not an object', function test() {
		var config;

		ctx.set( 'beep.bop', 'boop' );
		config = clone.call( ctx, 'beep.bop' );

		assert.isFalse( config === ctx );
		assert.deepEqual( config.get(), {
			'bop': 'boop'
		});
	});

	it( 'should return `null` if a keypath does not exist', function test() {
		var config = clone.call( ctx, 'beep.bop' );
		assert.isNull( config );
	});

});
