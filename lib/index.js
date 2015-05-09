'use strict';

// L2NORM //

var isArray = require( 'validate.io-array' ),
	isFunction = require( 'validate.io-function' );


/**
* FUNCTION: l2norm( arr )
*	Calculates the L2 norm (Euclidean norm) of an array of values.
*
* @param {Array} arr - array of values
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number} L2 norm
*/
function l2norm( arr, clbk ) {
	if ( !isArray( arr ) ) {
		throw new TypeError( 'l2norm()::invalid input argument. Must provide an array.  Value: `' + arr + '`.' );
	}

	if ( arguments.length > 1 ) {
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'l2norm()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
		}
	}

	var len = arr.length,
		t = 0,
		s = 1,
		r,
		val,
		abs,
		i;

	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			val = clbk( arr[ i ] );
			abs = val;
			if ( abs < 0 ) {
				abs = -abs;
			}
			if ( abs > 0 ) {
				if ( abs > t ) {
					r = t / val;
					s = 1 + s*r*r;
					t = abs;
				} else {
					r = val / t;
					s = s + r*r;
				}
			}
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			val = arr[ i ];
			abs = val;
			if ( abs < 0 ) {
				abs = -abs;
			}
			if ( abs > 0 ) {
				if ( abs > t ) {
					r = t / val;
					s = 1 + s*r*r;
					t = abs;
				} else {
					r = val / t;
					s = s + r*r;
				}
			}
		}
	}
	return t * Math.sqrt( s );
} // end FUNCTION l2norm()


// EXPORTS //

module.exports = l2norm;
