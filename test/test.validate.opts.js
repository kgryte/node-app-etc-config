/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	validate = require( './../lib/validate.opts.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate options', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values,
			err,
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
			err = validate( {}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a schema option which is not an object', function test() {
		var values,
			err,
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
			err = validate( {}, {
				'schema': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `sep` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'sep': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `create` option which is not a boolean primitive', function test() {
		var values,
			err,
			i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'create': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a schema option which is not an object', function test() {
		var values,
			err,
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
			err = validate( {}, {
				'schema': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an invalid schema', function test() {
		var err = validate( {}, {
			'schema': {
				'type': 'object',
				'properties': [ // invalid
					'string',
					'number'
				]
			}
		});
		assert.isTrue( err instanceof Error );
	});

	it( 'should return an error if provided a formats option which is not an object', function test() {
		var values,
			err,
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
			err = validate( {}, {
				'formats': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an external schemas option which is not an object', function test() {
		var values,
			err,
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
			err = validate( {}, {
				'extSchemas': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return `null` if all options are valid', function test() {
		var opts,
			err;

		opts = {
			'schema': {},
			'formats': {},
			'extSchemas': {},
			'sep': '|',
			'create': false
		};

		err = validate( {}, opts );
		assert.isNull( err );

		// Unrecognized options:
		opts = {
			'beep': 'boop'
		};

		err = validate( {}, opts );
		assert.isNull( err );
	});

});
