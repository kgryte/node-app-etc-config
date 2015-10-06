/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	etc = require( './../lib' ),
	merge = require( './../lib/merge.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'merge', function tests() {

	var obj,
		ctx;

	beforeEach( function before() {
		obj = {
			'beep': 'boop'
		};
		ctx = etc();
		ctx.set( 'woot.hello', 'world' );
	});

	it( 'should export a function', function test() {
		expect( merge ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a merge argument which is neither an object or another configuration instance', function test() {
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
				merge.call( ctx, value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not a function', function test() {
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
			expect( badValue1( values[ i ] ) ).to.throw( TypeError );
			expect( badValue2( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue1( value ) {
			return function badValue() {
				merge.call( ctx, {}, value );
			};
		}
		function badValue2( value ) {
			return function badValue() {
				merge.call( ctx, 'beep', {}, value );
			};
		}
	});

	it( 'should throw an error if provided a keypath argument which is not a string primitive', function test() {
		var values,
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
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				merge.call( ctx, value, {}, {} );
			};
		}
	});

	it( 'should merge an object', function test() {
		var bool;

		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world'
			}
		});
		bool = merge.call( ctx, obj );
		assert.isTrue( bool );
		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world'
			},
			'beep': 'boop'
		});
	});

	it( 'should merge a configuration instance', function test() {
		var config,
			bool;

		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world'
			}
		});

		config = etc();
		config.merge( obj );
		bool = merge.call( ctx, config );

		assert.isTrue( bool );
		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world'
			},
			'beep': 'boop'
		});
	});

	it( 'should nested merge an object', function test() {
		var bool;

		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world'
			}
		});
		bool = merge.call( ctx, 'woot', obj );
		assert.isTrue( bool );
		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world',
				'beep': 'boop'
			}
		});
	});

	it( 'should nested merge a configuration instance', function test() {
		var config,
			bool;

		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world'
			}
		});

		config = etc();
		config.merge( obj );
		bool = merge.call( ctx, 'woot', config );

		assert.isTrue( bool );
		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world',
				'beep': 'boop'
			}
		});
	});

	it( 'should nested merge an object using a separator', function test() {
		var bool;

		ctx.set( 'a.b.c', 'd' );
		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world'
			},
			'a': {
				'b': {
					'c': 'd'
				}
			}
		});
		bool = merge.call( ctx, 'a|b', obj, {
			'sep': '|'
		});
		assert.isTrue( bool );
		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world'
			},
			'a': {
				'b': {
					'c': 'd',
					'beep': 'boop'
				}
			}
		});
	});

	it( 'should nested merge a configuration instance using a separator', function test() {
		var config,
			bool;

		ctx.set( 'a.b.c', 'd' );
		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world'
			},
			'a': {
				'b': {
					'c': 'd'
				}
			}
		});

		config = etc();
		config.merge( obj );

		bool = merge.call( ctx, 'a|b', config, {
			'sep': '|'
		});

		assert.isTrue( bool );
		assert.deepEqual( ctx.get(), {
			'woot': {
				'hello': 'world'
			},
			'a': {
				'b': {
					'c': 'd',
					'beep': 'boop'
				}
			}
		});
	});

	it( 'should return `false` if a keypath does not exist', function test() {
		assert.isFalse( merge.call( ctx, 'a.b.c.d.e.f', {} ) );
	});

});
