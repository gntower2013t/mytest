// import * as Rx from 'rxjs';
var Rx = require("Rx");

let status = new Rx.Subject();

let ob = status.startWith(0).map(_ => ({ abc: 'abc' }))
	.distinctUntilChanged()
	.map(err => {
		console.log(`display errors`);
		if (err == null)
			return null;
		const keys = Object.keys(err);
		if (keys.length === 0)
			return null;
		return err[keys[0]];
	}).share();

let sup = ob.subscribe(x => console.log(`r1`));
sup.unsubscribe();
ob.subscribe(x => console.log(`r2`));
ob.subscribe(x => console.log(`r3`));

// status.next(0);


