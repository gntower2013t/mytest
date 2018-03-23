export class A{}

let map = new Map<string, number>(
  // ['detail/duplicate/:id',''] //es6, doesn't work in ts
)

/* iterate typescript Map
	https://stackoverflow.com/questions/37699320/iterating-over-typescript-map
	--downlevelIteration
	Provide full support for iterables in for..of, spread and destructuring
		for..of statements, Array Destructuring, and Spread elements in Array, Call,
		and New expressions support Symbol.iterator in ES5/E3

	turn off by default because it has a very significant impact on the size of generated code,
	and potentially on performance, for all uses of iterables (including arrays).

	If you can target ES2015, enabling downlevelIteration is a no-brainer,
*/
map.forEach((v, k, map) => { })

// map to array, make map iterable
Array.from(map)
