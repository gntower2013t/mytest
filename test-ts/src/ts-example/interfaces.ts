interface LabelledValue {
	label: string;
	width?: number; //optional
	readonly x: number;
	[key: string]: any;
}

//make array readonly
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

interface SquareConfig {
	color?: string;
	width?: number;
	setTime(d: Date): any;
}

function createSquare(config: SquareConfig): any {
	// ...
}

// let var bypass the extra prop check
let squareOptions = { colour: "red", width: 100 }; 
let mySquare = createSquare(squareOptions);

interface SearchFunc {
	(source: string, subString: string): boolean;
}

interface StringArray {
	[index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

class Animal {
	name: string;
}
class Dog extends Animal {
	breed: string;
}
interface NotOkay {
	[x: number]: Dog;
	[x: string]: Animal;
}


interface ReadonlyStringArray {
	readonly [index: number]: string;
}

let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
myArray2[0] = 'blar'; // error


interface ClockConstructor {
	new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
	// tick(): any;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
	return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
	constructor(h: number, m: number) { }
}
			
createClock(DigitalClock, 12, 17); //class is constructor it self

interface Square extends Shape, PenStroke {
	sideLength: number;
}

interface Counter {
	(start: number): string;
	interval: number;
	reset(): void;
}

let c:Counter;
c(10);
c.reset();
c.interval = 5.0;

class Control {
	private state: any;
}

interface SelectableControl extends Control {
	select(): void;
}

class Button extends Control implements SelectableControl {
	select() { }
}

class TextBox extends Control {
	select() { }
}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
	select() { }
}
