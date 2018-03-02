class Greeter0 {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	greet() {
		return "Hello, " + this.greeting;
	}
}

export class Animal {
	name: string;
	constructor(theName: string) { this.name = theName; }
}

class Snake extends Animal {
	constructor(name: string) { super(name); } //super

	//override
	move(distanceInMeters = 5) {
		super.move(distanceInMeters); //super
	}
}

class Rhino extends Animal {
	constructor() { super("Rhino"); }
}

class Employee {
	private name: string; //not the same member!!
	constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat"); let rhino = new Rhino(); let employee = new Employee("Bob");

animal = rhino; //ok
animal = employee; // Error: 'Animal' and 'Employee' are not compatible

class Octopus {
	readonly name: string = `aaa`; //can only be assigned in constructor
	constructor (theName: string) {
		this.name = theName;
		this.name = "xxx"; //assign more than once
	}

	private init(str: string) {
		this.name = `aaa`; //error
	}
}
let oct = new Octopus(""); oct.name = "bbb"; //error

class Octopus2 {
	constructor(readonly name: string) {
	}
}

class Grid {
	static origin = { x: 0, y: 0 };
}

abstract class Animal2 {
	abstract makeSound(): void; //can't be private
	move(): void { }
}

let ani = new Animal2(); // error: cannot create an instance of an abstract class

class Greeter {
	static standardGreeting = "Hello, there";
	greeting: string;
	greet() { }
}

// class itself, type declare: "typeof Greeter"
let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!"; //static  member

//use as constructor
let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());