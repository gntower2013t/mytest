"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx = require("rxjs");
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/return';
var complete = function () { return console.log("completed"); };
var next = function (v) { return console.log("====***=== " + v); };
var obs = { next: next, complete: complete };
var subs = function (obr) { return obr.subscribe({ next: next, complete: complete }); };
// Rx.Observable.timer(0,500).subscribe({...obs});
var source1 = Rx.Observable.of(42);
var source2 = Rx.Observable.of(56);
var source = Rx.Observable.concat(source1, source2);
// Rx.Observable.timer(0,500).subscribe({...obs});
subs(source);
//# sourceMappingURL=test-rx.js.map