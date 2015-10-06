/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	etc = require( './../lib' ),
	get = require( './../lib/get.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'get', function tests() {

	var ctx;

	beforeEach( function before() {
		ctx = etc();
	});

	it( 'should export a function', function test() {
		expect( get ).to.be.a( 'function' );
	});

	it( 'should return an object representing the underlying data store', function test() {
		var val;
		ctx.set( 'beep', 'boop' );
		val = ctx.get();
		assert.deepEqual( val, {
			'beep': 'boop'
		});

		// Should be a copy:
		val.hello = 'world';
		assert.isNull( ctx.get( 'hello' ) );
	});

	it( 'should get a configuration value', function test() {
		ctx.set( 'beep', 'boop' );
		assert.strictEqual( get.call( ctx, 'beep' ), 'boop' );
	});

	it( 'should get a configuration value using a specified keypath separator', function test() {
		var val;
		ctx.set( 'beep.boop', 'bop' );
		val = get.call( ctx, 'beep|boop', {
			'sep': '|'
		});
		assert.strictEqual( val, 'bop' );
	});

	it( 'should return `null` if a keypath does not exist', function test() {
		var val = get.call( ctx, 'beep.boop.bop.bup.bip' );
		assert.isNull( val );
	});

});
