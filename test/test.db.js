/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	db = require( './../lib/db.js' );


// VARIABLES //

var expect = chai.expect;


// TESTS //

describe( 'db', function tests() {

	it( 'should export a function', function test() {
		expect( db ).to.be.a( 'function' );
	});

	it( 'return an object', function test() {
		expect( db() ).to.be.an( 'object' );
	});

});
