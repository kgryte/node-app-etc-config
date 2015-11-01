/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	validator = require( 'jsen' ),
	etc = require( './../lib' ),
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	var fixture,
		schema;

	fixture = path.join( __dirname, 'fixtures/config.toml' );
	schema = require( './fixtures/schema.json' );

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a validator which is not a function', function test() {
		var values,
			ctx,
			i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{}
		];

		ctx = etc();
		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				validate.call( ctx, value );
			};
		}
	});

	it( 'should validate a valid configuration', function test() {
		var out,
			ctx;

		ctx = etc({
			'schema': schema
		});
		ctx.load( fixture );
		out = validate.call( ctx );

		assert.isTrue( out );
	});

	it( 'should validate an invalid configuration', function test() {
		var out,
			ctx;

		ctx = etc({
			'schema': schema
		});
		ctx.merge({
			'port': 80
		});
		out = validate.call( ctx );

		assert.isArray( out );
		assert.strictEqual( out.length, 1 );
	});

	it( 'should validate a valid configuration (external validator)', function test() {
		var ctx,
			out,
			v;

		ctx = etc({
			'schema': schema
		});
		ctx.load( fixture );
		v = validator( schema );
		out = validate.call( ctx, v );

		assert.isTrue( out );
	});

	it( 'should validate an invalid configuration (external validator)', function test() {
		var ctx,
			out,
			v;

		ctx = etc({
			'schema': schema
		});
		ctx.merge({
			'address': false
		});
		v = validator( schema, {
			'greedy': true,
			'verbose': true
		});
		out = validate.call( ctx, v );

		assert.isFalse( out );
		assert.strictEqual( v.errors.length, 2 );
	});

	it( 'should return true if never provided either a schema or validator', function test() {
		var ctx = etc();
		ctx.load( fixture );
		assert.isTrue( validate.call( ctx ) );
	});

});
