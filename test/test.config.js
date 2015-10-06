/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	typeName = require( 'type-name' ),
	Config = require( './../lib/config.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'Config', function tests() {

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

});
