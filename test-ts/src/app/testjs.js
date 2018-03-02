class My{
    // static bb = 55;
    static gg() {
        
    }
}
let my = new My();
console.log(My.prototype === my.prototype);

function MyFunc() {
    
}
let f = new MyFunc();
console.log(typeof MyFunc.prototype);
//f.prototype  --> undefined