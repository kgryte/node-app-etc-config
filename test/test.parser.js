/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	exts = require( './../lib' ).exts,
	parser = require( './../lib' ).parser;


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'parser', function tests() {

	it( 'should be a function', function test() {
		expect( parser ).to.be.a( 'function' );
	});

	it( 'should throw an error is provided an extension name which is not a string primitive', function test() {
		var values,
			i;

		values = [
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				parser( value );
			};
		}
	});

	it( 'should throw an error is provided an parser which is not a function', function test() {
		var values,
			i;

		values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			{}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				parser( '.js', value );
			};
		}
	});

	it( 'should return `null` if a requested parser does not exist', function test() {
		var values,
			i;

		values = [
			'.beep',
			'.css',
			'.html',
			'beep',
			'.c',
			'.go'
		];

		for ( i = 0; i < values.length; i++ ) {
			assert.isNull( parser( values[i] ), values[i] );
		}
	});

	it( 'should return parser functions', function test() {
		var vals = exts(),
			len = vals.length,
			i;

		for ( i = 0; i < len; i++ ) {
			if ( vals[ i ] !== '.js' ) {
				assert.isFunction( parser( vals[i] ), vals[i] );
			}
		}
	});

	it( 'should allow extension names to be provided without a leading `.`', function test() {
		var fcn;

		assert.isNull( parser( '.beep' ) );
		parser( 'beep', foo );
		fcn = parser( '.beep' );

		assert.strictEqual( fcn, foo );

		assert.isNull( parser( '.boop' ) );
		parser( '.boop', foo );
		fcn = parser( 'boop' );

		assert.strictEqual( fcn, foo );

		function foo() {}
	});

});
