/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	etc = require( './../lib' ),
	set = require( './../lib/set.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'set', function tests() {

	var ctx;

	beforeEach( function before() {
		ctx = etc();
	});

	it( 'should export a function', function test() {
		expect( set ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values,
			i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				set.call( ctx, 'beep', 'boop', value );
			};
		}
	});

	it( 'should set a configuration value', function test() {
		var bool = set.call( ctx, 'beep', 'hello' );
		assert.isBoolean( bool );
		assert.strictEqual( ctx.get().beep, 'hello' );
	});

	it( 'should set a configuration value using a specified keypath separator', function test() {
		set.call( ctx, 'beep|boop', 'hello', {
			'sep': '|'
		});
		assert.strictEqual( ctx.get().beep.boop, 'hello' );
	});

	it( 'should not set a configuration value if provided a `create` option set to `false`', function test() {
		set.call( ctx, 'beep.boop', 'hello', {
			'create': false
		});
		assert.deepEqual( ctx.get(), {} );
	});

});
