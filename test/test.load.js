/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	etc = require( './../lib' ),
	load = require( './../lib/load.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'load', function tests() {

	var fixture,
		ctx;

	fixture = path.join( __dirname, 'fixtures/config.toml' );

	beforeEach( function before() {
		ctx = etc();
	});

	it( 'should export a function', function test() {
		expect( load ).to.be.a( 'function' );
	});

	it( 'should merge a configuration file', function test() {
		var out = load.call( ctx, fixture );

		assert.strictEqual( ctx, out );
		assert.deepEqual( ctx.get(), {
			'port': 7331,
			'address': '127.0.0.1'
		});
	});

});
