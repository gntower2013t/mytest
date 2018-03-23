import * as Rx from "rxjs";
import { Observer } from "rxjs";

let ob1: Rx.Observable<number> = Rx.Observable.create((os: Observer<number>) => {
	console.log(`start`);
	setTimeout(function () {
		os.next(1);
		os.next(2);
		os.complete();
	}, 500);
});
let ob2 = ob1.publish(ob => ob.map(v => v * 2));
console.log(`======sta===11========`);

ob2.subscribe(v => console.log(`sub1 ${v}`));
ob2.subscribe(v => console.log(`sub2 ${v}`));

console.log(`======end===11========`);
// ob2.connect()

const click$ = Rx.Observable.interval(100).take(5).multicast(new Rx.Subject());
// const one$ = click$.mapTo(1);
const seed = 0;
const count$ = click$.do(x => console.log(`source=== ` + x)).mergeScan(
	(acc, one) => Rx.Observable.interval(200).map(x => x + 100).take(3).do(x => console.log(`inner: ${acc} ${one} ${x}`)), seed)
	;
count$.subscribe(x => console.log("out: " + x));
