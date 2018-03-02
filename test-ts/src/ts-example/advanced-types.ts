/* intersection: expand properties */
export function extend<T, U>(first: T, second: U): T & U {
	let result = <T & U>{};  //cast
	for (let id in first) {
			(<any>result)[id] = (<any>first)[id];
	}
	for (let id in second) {
			if (!result.hasOwnProperty(id)) {
					(<any>result)[id] = (<any>second)[id];
			}
	}
	return result;
}

class Person {
	constructor(public name: string) { }
}
interface Loggable {
	log(): void;
}
class ConsoleLogger implements Loggable {
	log() {
			// ...
	}
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();


/* union */
function padLeft(value: string, padding: string | number) { }

interface Bird {
	fly():any;
	layEggs():any;
}

interface Fish {
	swim():any;
	layEggs():any;
}

function getSmallPet(): Fish | Bird { }

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors


/* Differentiating Types */
// Each of these property accesses will cause an error
if (pet.swim) { //error, need type assert: if ((<Fish>pet).swim)
    pet.swim(); // (<Fish>pet).swim()
}
else if (pet.fly) {
    pet.fly();
}

/* type guard, type predicate */
function isFish(pet: Fish | Bird): pet is Fish {
	return (<Fish>pet).swim !== undefined;
}

// Both calls to 'swim' and 'fly' are now okay.
if (isFish(pet)) {
	pet.swim();
}
else {
	pet.fly();
}

/* typeof type guards */
function padLeft2(value: string, padding: string | number) {
	if (typeof padding === "number") {
			return Array(padding + 1).join(" ") + value;
	}
	if (typeof padding === "string") {
			return padding + value;
	}
	throw new Error(`Expected string or number, got '${padding}'.`);
}

/* instanceof type guards */
if (padder instanceof StringPadder) {
	padder; // type narrowed to 'StringPadder'
}


/* null */
let s = "foo";
s = null; // error, 'null' is not assignable to 'string'
let sn: string | null = "bar";
sn = null; // ok

sn = undefined; // error, 'undefined' is not assignable to 'string | null'

/* optional as undefined */
function f(x: number, y?: number) {
	return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null); // error, 'null' is not assignable to 'number | undefined'

/* type guard for null, x == null */
function f(sn: string | null): string {
	if (sn == null) {
			return "default";
	}
	else {
			return sn;
	}
}

function f(sn: string | null): string {
	return sn || "default"; //also works!!
}

/* postfix !: identifier */
function broken(name: string | null): string {
	function postfix(epithet: string) {
		//compiler can’t eliminate nulls inside a nested function
		//except immediately-invoked function expressions
		//because it can’t track all calls to the nested function,
		//especially if you return it from the outer function
		return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
	}
	name = name || "Bob"; //null is actually eliminate here, but compiler doesn't know
	return postfix("great");
}

function fixed(name: string | null): string {
	function postfix(epithet: string) {
		return name!.charAt(0) + '.  the ' + epithet; // ok
	}
	name = name || "Bob";
	return postfix("great");
}


/* Type alias */
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

type Container<T> = { value: T }; //generic

/*  type alias refer to itself props  */
type Tree<T> = {
	value: T;
	left: Tree<T>;
	right: Tree<T>;
}

type Yikes = Array<Yikes>; // error
type Yikes2 = { a: Array<Yikes2> }; // ok
type Yikes3 = Container<any>; // ok

/* mind-bending types, e.g. LinkdedList */
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person> = null;
var ss = people.name;
var s1 = people.next.name;
var s2 = people.next.next.name;
var s3 = people.next.next.next.name;


/* interface  vs. alias */
type Alias = { num: number }
interface Interface {
	num: number;
}
declare function aliased(arg: Alias): Alias;  //declare ???
declare function interfaced(arg: Interface): Interface;


/* String Literal Types */
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
	animate(dx: number, dy: number, easing: Easing) {
			if (easing === "ease-in") {
					// ...
			}
			else if (easing === "ease-out") {
			}
			else if (easing === "ease-in-out") {
			}
			else {
					// error! should not pass null or undefined.
			}
	}
}

//overloads with string literal
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
    // ... code goes here ...
}

/* Numeric Literal Types */
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 { return 3; }

//implicit used by compiler, to catch bugs
function foo(x: number) {
	if (x !== 1 || x !== 2) {
			// Operator '!==' cannot be applied to types '1' and '2'.
	}
}

/* Discriminated Unions */
interface Square {
	kind: "square"; //discriminant
	size: number;
}
interface Rectangle {
	kind: "rectangle";
	width: number;
	height: number;
}
interface Circle {
	kind: "circle";
	radius: number;
}

interface Triangle {
	kind: "circle";
	high: number;
	radius: number;
}

type Shape = Square | Rectangle | Circle | Triangle;

//??? exaustive check
function assertNever(x: never): never {
	throw new Error("Unexpected object: " + x);
}

function area(s: Shape) {
	switch (s.kind) {
			case "square": return s.size * s.size;
			case "rectangle": return s.height * s.width;
			case "circle": return Math.PI * s.radius ** 2;
			default: return assertNever(s); // ??? error here if there are missing cases
	}
}


/* Polymorphic this */
class BasicCalculator {
	public constructor(protected value: number = 0) { }
	public currentValue(): number {
			return this.value;
	}
	public add(operand: number): this { //Polymorphic this, any subclass of it
			this.value += operand;
			return this;
	}
	public multiply(operand: number): this {
			this.value *= operand;
			return this;
	}
	// ... other operations go here ...
}

class ScientificCalculator extends BasicCalculator {
	public constructor(value = 0) {
		super(value);
	}
	public sin() {
			this.value = Math.sin(this.value);
			return this;
	}
}

let v = new ScientificCalculator(2)
        .multiply(5)
        .sin() //BasicCalculator doesn't hav sin method
        .add(1)
        .currentValue();


/* Index types */

//keyof T, the index type query operator.
let personProps: keyof Person; //string literal union: 'name' | 'age'

//pick a subset of properties from an object
//keyof T, the index type query operator.
//T[K], the indexed access operator,
//person['name'] has the type Person['name']
//generic: K extends keyof T
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
	return names.map(n => o[n]);
}

interface Person {
	name: string;
	age: number;
}
let person: Person = {
	name: 'Jarid',
	age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
pluck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'


/* Index types 2 */
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
	return o[name]; // o[name] is of type T[K]
}

let name2: string = getProperty(person, 'name'); //compiler knows return type is string
let age: number = getProperty(person, 'age');
let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'


/* Index types -- indexable interface */
interface Map<T> {
	[key: string]: T;
}
let keys: keyof Map<number>; // string
let value: Map<number>['foo']; // number


/* Mapped types
  take an existing type and make each of its properties optional
*/
type Readonly<T> = {
	readonly [P in keyof T]: T[P];
}

type Partial<T> = {
	[P in keyof T]?: T[P];
}

// resovle on generic, Person is input type
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;


/* Mapped types detail:
    The type variable K, which gets bound to each property in turn.
    The string literal union Keys, which contains the names of properties to iterate over.
    The resulting type of the property.
*/
type Keys = 'option1' | 'option2';
type Flags = {[K in Keys]: boolean };

type NullablePerson = {[P in keyof Person]: Person[P] | null }
type PartialPerson = {[P in keyof Person]?: Person[P]}

//general version
type Nullable<T> = {[P in keyof T]: T[P] | null }
type Partial2<T> = {[P in keyof T]?: T[P]}


/* Mapped types: proxy example */
type Proxy<T> = {
	get(): T;
	set(value: T): void;
}

type Proxify<T> = {
	[P in keyof T]: Proxy<T[P]>;
}

function proxify<T>(o: T): Proxify<T> {
	// ... wrap proxies ...
}

let proxyProps = proxify(props);


/* Mapped types: TS standard library
   Record is not homomorphic
*/
type Pick<T, K extends keyof T> = {
	[P in K]: T[P];
}
type Record<K extends string, T> = {
	[P in K]: T;
}

//Non-homomorphic types
//doesn’t take an input type to copy properties from
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
