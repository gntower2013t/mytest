/* let a = (function (x, f = () => x) {
    // var x;
    let y = x;
    x = 2;
    return [x, y, f()];
})(1);
console.log(a); */

/* let a = (([x], xs) => x)(...[1, 2, 3]);
console.log(a); */

/* let arr = [ ], y=1;
for (let { x = 2, y:z } of [{ x: 3 }, 4, {y}]) { 
  arr.push(x, z);
}
console.log(arr); */

//What's the output?

/*
// In ES6, is there a better way to create this object?
let [protocol, url, method, callback = () => { }]
  = ["http", "google.com", "get"];
let options = { protocol, url, method, callback };
console.log(options.url);

let x = 42;
if (true) {
  console.log(x);
  let x = 1337;
}

let x = 42;
if (true) {
  let x = 1337;
}
console.log(x); 

var x = `foo ${y}`,
y = `bar ${x}`;

console.log(y);

// What's the difference between Map/Set and WeakMap/WeakSet ?


  
// class example
class Logger {
    constructor (type = "Info") {
      this.type = type;
    }
  
    get current()     { return `Logger: ${this.type}`; }
    set current(type) { this.type = type; }
  
    static create(type) { return new this(type); }
    log (message)       { } // Basic method
}
  
// syntax test: is it legal or not?
var score = [12, 7, 14];
Math.max(...score);

function stuff(x, ...y) {
    // Do stuff..
}
  
function stuff(x, y=12) {
    // Do stuff..
  }
stuff(2);
  
function stuff(x, y=x/3) {
    // Do stuff..
  }
stuff(6);
  
var [first, , last] = [1, 2, 3];

// nope
function stuff(a, x=12, y=42) {
	// Do stuff..
	console.log(`${x} + ${y}`)
}
stuff(1, 2);

var {foo, bar} = {
	foo: 'FOO',
	bar: 'BAR'
};
console.log(foo);
	

*/

var x = `foo ${y}`,
y = `bar ${x}`;

console.log(y);


// promise


