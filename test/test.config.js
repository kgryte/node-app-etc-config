/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	typeName = require( 'type-name' ),
	Config = require( './../lib/config.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'Config', function tests() {

	var fixture;

	fixture = path.join( __dirname, 'fixtures/config.toml' );

	it( 'should export a function', function test() {
		expect( Config ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			var config = new Config({
				'sep': 5
			});
		}
	});

	it( 'should return a `Config` instance', function test() {
		var config;

		config = new Config();
		assert.isTrue( config instanceof Config );

		config = new Config({
			'sep': '|'
		});
		assert.isTrue( config instanceof Config );
	});

	it( 'should not require the `new` operator', function test() {
		var createConfig = Config;

		assert.isTrue( createConfig() instanceof Config );

		assert.isTrue( createConfig({}) instanceof Config );
	});

	xit( 'should support external schemas', function test() {
		var config,
			out;

		config = new Config({
			'schema': {
				'$ref': '#external_schema'
			},
			'ext': {
				'external_schema': require( './fixtures/schema.json' )
			}
		});
		config.load( fixture );
		out = config.validate();
		assert.isTrue( out );

		config = new Config({
			'schema': {
				'$ref': '#external_schema'
			},
			'ext': {
				'external_schema': require( './fixtures/schema.json' )
			}
		});
		config.merge({
			'port': 80
		});
		out = config.validate();
		assert.isArray( out );
		assert.strictEqual( out.length, 1 );
	});

	it( 'should support custom schema formats', function test() {
		var config,
			out;

		config = new Config({
			'schema': require( './fixtures/schema.json' ),
			'formats': {
				'only-a': /^a+$/
			}
		});
		config.merge({
			'port': 1024,
			'str': 'bbb'
		});
		out = config.validate();
		assert.isArray( out );
		assert.strictEqual( out.length, 1 );
		assert.strictEqual( out[ 0 ].field, 'data.str' );
	});

	it( 'should validate greedily', function test() {
		var config,
			out;

		config = new Config({
			'schema': require( './fixtures/schema.json' ),
			'formats': {
				'only-a': /^a+$/
			}
		});
		config.merge({
			'port': 80,
			'address': false,
			'str': 'bbb'
		});
		out = config.validate();
		assert.isArray( out );
		assert.strictEqual( out.length, 3 );
	});

});
