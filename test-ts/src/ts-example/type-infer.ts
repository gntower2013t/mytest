let zoo = [new Rhino(), new Animal(""), null, new Snake("")];

export class Animal {
	name: string;
	constructor(theName: string) { this.name = theName; }
}

class Snake extends Animal {
	snake: string;
	constructor(name: string) { super(name); }
}

class Rhino extends Animal {
	rhino: string;
	constructor() { super("Rhino"); }
}

window.onmousedown = function (mouseEvent) {
	console.log(mouseEvent.button);  //ok
};

function createZoo(): Animal[] {
	return [new Rhino(), , new Snake("")];
}

