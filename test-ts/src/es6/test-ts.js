var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var arr = [1, 2, 3];
var a2 = (arr.reverse()).slice();
console.log("" + a2);
var obj = { aa: 'Waaaaa' };
console.log("gogo: " + JSON.stringify(obj));
var o = null;
var o2 = __assign({}, o);
console.log("gogo: " + JSON.stringify(o2));
var My = (function () {
    function My() {
    }
    My.gg = function () {
    };
    return My;
}());
My.bb = 55;
var my = new My();
// My.prototype===my.prototype 
//# sourceMappingURL=test-ts.js.map