export class A { }

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


/* iterate indexable type */
let myDictionary: { [index: string]: any; } = {};

for (let key in myDictionary) { }
// not safe, need to check hasOwnProperty,  if (myDictionary.hasOwnProperty(key))
// as there are too many libraries which do modify object prototypes

Object.keys(obj).forEach(key => { }) // <ES2017

Object.entries(obj).forEach(  // >=ES2017
	([key, value]) => console.log(key, value));

for (let [key, value] of Object.entries(obj)) { }
