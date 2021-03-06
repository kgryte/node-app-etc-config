Config
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a configuration API.


## Installation

``` bash
$ npm install app-etc-config
```


## Usage

``` javascript
var etc = require( 'app-etc-config' );
```

#### etc( [options] )

Creates a configuration API.

``` javascript
var config = etc();
```

The constructor accepts the following `options`:

*	__sep__: default keypath separator used when getting and setting configuration values. See [utils-deep-set](https://github.com/kgryte/utils-deep-set) and [utils-deep-get](https://github.com/kgryte/utils-deep-get). Default: `'.'`.
*	__create__: `boolean` indicating whether to create a keypath if it does not exist. See [utils-deep-set](https://github.com/kgryte/utils-deep-set). Default: `true`.
*	__schema__: JSON [schema](http://json-schema.org/) for validating a configuration.
*	__formats__: JSON [schema](http://json-schema.org/) custom formats (see [jsen#custom-formats](https://github.com/bugventure/jsen#custom-formats)).
*	__extSchemas__: hash containing external JSON [schemas](http://json-schema.org/) referenced by a main configuration `schema` (see [jsen#external-schemas](https://github.com/bugventure/jsen#external-schemas)).

To specify `options`,

``` javascript
var config = etc({
	'sep': '|',
	'create': false,
	'schema': require( '/path/to/schema.json' ),
	'formats': {
		'only-a': /^a+$/
	},
	'extSchemas': {
		'ref_schema1': require( '/path/to/ref_schema1.json' ),
		'ref_schema2': require( '/path/to/ref_schema2.json' )
	}
});
```

===
##### config.set( keypath, value[, options] )

Sets a configuration value at a specified `keypath`.

``` javascript
var bool = config.set( 'foo.bar', 'beep' );
// returns a <boolean> indicating whether a value was set

/*
	{
		'foo': {
			'bar': 'beep'
		}
	}
*/
```

The method accepts the following `options`: 

*	__sep__: keypath separator used when setting configuration values. See [utils-deep-set](https://github.com/kgryte/utils-deep-set).
*	__create__: `boolean` indicating whether to create a keypath if it does not exist. See [utils-deep-set](https://github.com/kgryte/utils-deep-set).

Specifying method `options` will override the default `options` provided during `config` creation.


===
##### config.merge( [keypath,] config[, options] )

Merges a configuration `object` or another `config` instance.

``` javascript
var bool = config.merge({
	'beep': 'boop'
});
// returns a <boolean> indicating if merge was successful

/*
	{
		'foo': {
			'bar': 'beep'
		},
		'beep': 'boop'
	}
*/
```

If provided a `keypath`, the method merges a configuration object with a sub-configuration.

``` javascript
var config2 = etc();
config2.set( 'hello', 'world' );

var bool = config.merge( 'foo', config2 );
/*
	{
		'foo': {
			'bar': 'beep',
			'hello': 'world'
		},
		'beep': 'boop'
	}
*/
```

If a `keypath` does not correspond to an `object`, the method returns `false` and `set()` should be used instead.

``` javascript
var bool = config.merge( 'abcdefg', config2 );
// returns false

/*
	{
		'foo': {
			'bar': 'beep',
			'hello': 'world'
		},
		'beep': 'boop'
	}
*/

bool = config.set( 'abcdefg', config2 );
// returns true
```

The method accepts the following `options`: 

*	__sep__: keypath separator used when merging nested configuration values. See [utils-deep-set](https://github.com/kgryte/utils-deep-set).

Specifying method `options` will override the default `options` provided during `config` creation.


===
##### config.get( [ keypath[, options] ] )

Returns a __copy__ of the raw configuration store. 

``` javascript
var obj = config.get();
/*
	{
		'foo': {
			'bar': 'beep',
			'hello': 'world'
		},
		'beep': 'boop'
	}
*/
```

If provided a `keypath`, the method returns a __copy__ of the corresponding configuration value.

``` javascript
var val = config.get( 'foo.hello' );
// returns 'world'
```

If a `keypath` does __not__ exist, the method returns `undefined`.

``` javascript
var val = config.get( 'non.existent.path' );
// returns undefined
```

The method accepts the following `options`: 

*	__sep__: keypath separator used when getting configuration values. See [utils-deep-get](https://github.com/kgryte/utils-deep-get).

Specifying method `options` will override the default `options` provided during `config` creation.


===
##### config.clone( [keypath[, options] ] )

Clones a `config` instance.

``` javascript
var config2 = config.clone();
console.log( config2.get() );
/*
	{
		'foo': {
			'bar': 'beep',
			'hello': 'world'
		},
		'beep': 'boop'
	}
*/

console.log( config === config2 );
// returns false
```

If provided a `keypath`, the method clones a  sub-configuration value as a new `config` instance.

``` javascript
var config2;

// Configuration value is an object:
config2 = config.clone( 'foo' );
/*
	{
		'bar': 'beep',
		'hello': 'world'
	}
*/

// Configuration value is not an object:
config2 = config.clone( 'beep' );
/*
	{
		'beep': 'boop'
	}
*/
```

If a `keypath` does __not__ exist, the method returns `undefined`.

``` javascript
var config3 = config.clone( 'non.existent.path' );
// returns undefined
```

The method accepts the following `options`: 

*	__sep__: keypath separator used when getting configuration values. See [utils-deep-get](https://github.com/kgryte/utils-deep-get).

Specifying method `options` will override the default `options` provided during `config` creation.


===
##### config.load( filename )

Convenience method which loads and merges a configuration file.

``` javascript
config.load( '/path/to/config/file.<ext>' );
```

__Note__: this method does __not__ directly support loading a configuration file into a sub-configuration. To achieve this, use [app-etc-load](https://github.com/kgryte/node-app-etc-load) and then `merge` at a specified `keypath`.

``` javascript
var load = require( 'app-etc-load' );

var obj = load( '/path/to/config/file.<ext>' );
config.merge( 'foo', obj );
```

===
##### config.validate( [validator] )

Validates a configuration.

``` javascript
// Valid configuration:
var out = config.validate();
// returns true
```

If a configuration is invalid, the method returns an `array` containing validation [errors](https://github.com/bugventure/jsen#errors).

``` javascript
// Invalid configuration:
out = config.validate();
// returns [{...},{...},...]
```

The method accepts a `validator` function, which can be useful for validating against multiple schemas or when a `schema` was not provided during initialization. The `validator` should accept as its first argument the configuration `object` to be validated. The method returns validation results without modification. 

``` javascript
// Example JSON schema validator:
var validator = require( 'jsen' );

var schema = require( '/path/to/schema.json' );
var validate = validator( schema, {
	'greedy': true
});

var out = config.validate( validate );
console.log( out );
console.log( validate.errors );
```

If a `schema` option was __not__ provided during initialization and a `validator` is __not__ provided at runtime, the method __always__ returns `true`.

``` javascript
var config = etc();
config.set( 'port', 80 );

var out = config.validate();
// returns true
```


===
#### etc.exts()

Returns a list of supported filename extensions.

``` javascript
var exts = etc.exts();
// returns ['.json','.toml',...]
```

For more details, see [app-etc-load](https://github.com/kgryte/node-app-etc-load).


#### etc.parser( extname[, parser] )

Returns a parser for the specified extension.

``` javascript
var parser = etc.parser( '.json' );
```

Including the `.` when specifying an extension is optional.

``` javascript
var parser = etc.parser( 'json' );
```

To support additional file formats or to override a parser, provide a `parser` function for an associated extension.

``` javascript
var parser = require( 'my-special-fmt-parser' );

etc.parser( '<my-ext>', parser );
```

Once a parser is set, __all__ `config` instances will parse provided files accordingly.

``` javascript
config.load( './file.<my-ext>' );
```

For more details, see [app-etc-load](https://github.com/kgryte/node-app-etc-load).


---
## Notes

*	This module uses [jsen](https://github.com/bugventure/jsen) for validating an internal configuration `object` against a JSON [schema](http://json-schema.org/). One compelling feature of [jsen](https://github.com/bugventure/jsen) is the ability to extend a schema definition by specifying custom error [messages](https://github.com/bugventure/jsen#errors). For example, given the following schema,

	``` javascript
	{
		"type": "object",
		"definitions": {
			"port": {
				"description": "schema for a port",
				"type": "integer",
				"minimum": 1024,
				"maximum": 65536,
				"requiredMessage": "port is required",
				"messages": {
					"type": "invalid type. Must be an integer.",
					"minimum": "invalid value. Must be an integer greater than or equal to 1024.",
					"maximum": "invalid value. Must be an integer less than or equal to 65536."
				}
			}
		},
		"properties": {
			"port": {
				"$ref": "#/definitions/port"
			}
		},
		"required": [
			"port"
		],
		"messages": {
			"type": "invalid data type where an object is expected"
		}
	}
	```

	validation will return more informative error messages based on [keywords](https://github.com/bugventure/jsen#custom-errors-for-keywords).

	``` javascript
	var validator = require( 'jsen' );

	var validate = validator( schema );

	var bool = validate({
		'port': 80
	})

	console.dir( validate.errors );
	/*
		[
			{
				'path': 'port',
				'keyword': 'minimum',
				'message': 'invalid value. Must be an integer greater than or equal to 1024.'
			}
		]
	*/
	```


---
## Examples

``` javascript
var etc = require( 'app-etc-config' );

// Create a new configuration API:
var config = etc();

// Load local files:
config.load( './.travis.yml' );
console.dir( config.get() );

config.load( './package.json' );
console.dir( config.get() );

// Merge in a custom object:
config.merge( 'author', {
	'beep': 'boop'
});
console.dir( config.get( 'author' ) );

// Access a shallow value:
console.log( config.get( 'license' ) );

// Access nested values:
console.log( config.get( 'author.name' ) );

// Create and set shallow values:
config.set( 'hello', false );
console.log( config.get( 'hello' ) );

// Create and set deeply nested values:
config.set( 'foo.bar.bip', 'bap', {
	'create': true
});
console.log( config.get( 'foo.bar.bip' ) );

// Clone the current configuration:
var clone = config.clone();
console.log( config === clone );
// returns false
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/app-etc-config.svg
[npm-url]: https://npmjs.org/package/app-etc-config

[travis-image]: http://img.shields.io/travis/kgryte/node-app-etc-config/master.svg
[travis-url]: https://travis-ci.org/kgryte/node-app-etc-config

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/node-app-etc-config/master.svg
[codecov-url]: https://codecov.io/github/kgryte/node-app-etc-config?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/node-app-etc-config.svg
[dependencies-url]: https://david-dm.org/kgryte/node-app-etc-config

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/node-app-etc-config.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/node-app-etc-config

[github-issues-image]: http://img.shields.io/github/issues/kgryte/node-app-etc-config.svg
[github-issues-url]: https://github.com/kgryte/node-app-etc-config/issues
