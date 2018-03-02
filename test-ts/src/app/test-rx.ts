import * as Rx from 'rxjs';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/return';


const complete = () => console.log("completed");
const next = (v: any) => console.log(`====***=== ${v}`);
const obs = { next, complete };

const subs = (obr: Rx.Observable<any>) => obr.subscribe({ next, complete });

// Rx.Observable.timer(0,500).subscribe({...obs});

var source1 = Rx.Observable.of(42);
var source2 = Rx.Observable.of(56);

var source = Rx.Observable.concat(source1, source2);

// Rx.Observable.timer(0,500).subscribe({...obs});


subs(source);
