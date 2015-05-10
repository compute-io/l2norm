/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	l2norm = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-l2norm', function tests() {

	it( 'should export a function', function test() {
		expect( l2norm ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				l2norm( value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				l2norm( [1,2,3], value );
			};
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( l2norm( [] ) );
	});

	it( 'should return the L2 norm', function test() {
		var data, expected;

		data = [ 3, 4 ];
		expected = 5;

		assert.strictEqual( l2norm( data ), expected );
	});

	it( 'should return the L2 norm', function test() {
		var data, d, sum, expected;

		data = [ 3, 4, 20, -10, 0 ];
		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			d = data[ i ];
			sum += d * d;
		}
		expected = Math.sqrt( sum );

		assert.strictEqual( l2norm( data ), expected );
	});


	it( 'should return the L2 norm using an accessor function', function test() {
		var data, expected, actual;

		data = [
			{'x':3},
			{'x':4}
		];

		actual = l2norm( data, getValue );
		expected = 5;

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return the L2 norm  using an accessor function', function test() {
		var data, d, sum, expected;

		data = [
			{'x':3},
			{'x':4},
			{'x':20},
			{'x':-10},
			{'x':0}
		];
		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			d = getValue( data[ i ] );
			sum += d * d;
		}
		expected = Math.sqrt( sum );

		assert.strictEqual( l2norm( data, getValue ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
