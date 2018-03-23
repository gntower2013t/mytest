export interface Named {
	name: string;
}

class Person {
	name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();

let x: Named;
let y = { name: "Alice", location: "Seattle" };

//y has more props, it's ok
x = y;
x =  { name: "Alice", location: "Seattle" }; //error, when literal assignment

function greet(n: Named) {
	alert("Hello, " + n.name);
}
greet(y); // OK
greet({ name: "Alice", location: "Seattle" }) //error


/* Comparing two functions: extra parameters */
{
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

// OK, as ignoring extra function parameters is actually quite common in JavaScript
y = x;  //ok, x has less params
x = y; // Error, y has more params
}

let items = [1, 2, 3];

// Don't force these extra parameters
items.forEach((item, index, array) => console.log(item));

// Should be OK!
items.forEach(item => console.log(item));


{ /* function return types */
let x = () => ({name: "Alice"});
let y = () => ({name: "Alice", location: "Seattle"});

x = y; // OK
y = x; // Error because x() lacks a location property

}


/* function parameters */
enum EventType { Mouse, Keyboard }

interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}

// Unsound, more specific on source side, but useful and common
// it's possible at runtime, this hanlder is called using param: actual type KeyEvent
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

// Ok, less specific on source
listenEvent(null, (o: {}) => console.log(""));

// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y));
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + "," + e.y)));

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
listenEvent(EventType.Mouse, (e: number) => console.log(e));


/* rest params */
function invokeLater(args: any[], callback: (...args: any[]) => void) {
	/* ... Invoke callback with 'args' ... */
}

// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));


/* opt params */
{
let x: (a: string, b: string, c?:string) => void;
let y: (a: string, b: string, x?: number) => void;
x = y; //error
y = x; //error
}

enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let xx = 3; xx = Status.Ready; //ok

let status = Status.Ready;
status = 2;
status = Color.Green;  //error

{
/* !! except init at var declar, which type infer take effect
assignment doesn't change type declaration	*/
let x; 						//x is type "any"
x = 1; x = "bb";

let xx = 3; xx = Status.Ready; // xx is number

class Name{
	x; //class member must declare or init with type defer
}

}

/* Class */
class A{
	name: string;
	age?: number; //optional property, typically in interface
}

class B{
	name: string;
}
let a: A; let b: B=new B();
a = b; //ok


{ /* Generics */

interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // okay, y matches structure of x
// because their structures do not use the type argument in a differentiating way

interface NotEmpty<T> {
	data: T;
}
let xx: NotEmpty<number>;
let yy: NotEmpty<string>;

xx = yy;  // error, x and y are not compatible

}
