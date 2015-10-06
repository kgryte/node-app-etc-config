/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	isStringArray = require( 'validate.io-string-array' ),
	exts = require( './../lib' ).exts;


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'exts', function tests() {

	it( 'should be a function', function test() {
		expect( exts ).to.be.a( 'function' );
	});

	it( 'should return an array of supported extensions', function test() {
		assert.isTrue( isStringArray( exts() ) );
	});

});
