/* numberic */
enum Direction {
	Up = 1, //auto-incremented from 1, otherwise 0
	Down,
	Left,
	Right,
}

//computed members
function getSomeValue():number{return 0}

enum E {
	C, //ok
	A = getSomeValue(),
	B, // error! 'A' is not constant-initialized, so 'B' needs an initializer, B = 1
}

/* String enums */
enum Direction2 {
	Up = "UP",
	Down = "DOWN",
	Left = "LEFT",
	Right = "RIGHT",
}


enum FileAccess {
	// constant members
	None,
	Read    = 1 << 1,
	Write   = 1 << 2,
	ReadWrite  = Read | Write,
	// computed member
	G = "123".length
}


/* enum member as type */
enum ShapeKind {
	Circle,
	Square,
}

interface Circle {
	kind: ShapeKind.Circle; //enum member as type
	radius: number;
}

interface Square {
	kind: ShapeKind.Square;
	sideLength: number;
}

let c: Circle = {
	kind: ShapeKind.Square,
	//    ~~~~~~~~~~~~~~~~ Error!
	radius: 100,
}


// enum is union type
enum E2 {
	Foo,
	Bar,
}

function f2(x: E2) {
	if (x !== E2.Foo || x !== E2.Bar) {
			//             ~~~~~~~~~~~
			// Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
	}
}


/* Enums at runtime */
{
enum E {
	X, Y, Z
}

function f3(obj: { X: number }) {
	return obj.X;
}


// Works, since 'E' has a property named 'X' which is a number.
f3(E);

}


/* Reverse mappings for numeric enun */
enum Enum {
	A
}
let aa = Enum.A;
let nameOfA = Enum[aa]; // "A"


const enum Enum2 {
	A = 1,
	B = A * 2
}


/* Ambient enums */
declare enum Enum3 {
	A = 1,
	B,
	C = 2
}
