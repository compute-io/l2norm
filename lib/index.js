/**
*
*	COMPUTE: l2norm
*
*
*	DESCRIPTION:
*		- Computes the L2 norm (Euclidean norm) of an array of values.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// L2NORM //

	/**
	* FUNCTION: l2norm( arr )
	*	Calculates the L2 norm (Euclidean norm) of an array of values.
	*
	* @param {Array} arr - array of values
	* @returns {Number} L2 norm
	*/
	function l2norm( arr ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'l2norm()::invalid input argument. Must provide an array.' );
		}
		var len = arr.length,
			t = 0,
			s = 1,
			r,
			val,
			abs;
		for ( var i = 0; i < len; i++ ) {
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
		return t * Math.sqrt( s );
	} // end FUNCTION l2norm()


	// EXPORTS //

	module.exports = l2norm;

})();