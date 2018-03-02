import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
const e = ErrorObservable.create(new Error('My bad'));
const e2 = new ErrorObservable(new Error('My bad too'));

import { Observable } from 'rxjs/Observable';
type pipeable = <T, R>(source: Observable<T>) => Observable<R>;


import { range } from 'rxjs/observable/range';
import { map, filter, scan } from 'rxjs/operators';

const source$ = range(0, 10);

source$.pipe(
	filter(x => x % 2 === 0),
	map(x => x + x),
	scan((acc, x) => acc + x, 0)
)
	.subscribe(x => console.log(x))


/* custome operator */
import { interval } from 'rxjs/observable/interval';
import { filter, map, take, toArray } from 'rxjs/operators';

/**
 * an operator that takes every Nth value
 */
const takeEveryNth = (n: number) => <T>(source: Observable<T>) =>
	new Observable<T>(observer => {
		let count = 0;
		return source.subscribe({
			next(x) {
				if (count++ % n === 0) observer.next(x);
			},
			error(err) { observer.error(err); },
			complete() { observer.complete(); }
		})
	});

/**
 * You can also use an existing operator like so
 */
const takeEveryNthSimple = (n: number) => <T>(source: Observable<T>) =>
	source.pipe(filter((value, index) => index % n === 0))

/**
 * And since pipeable operators return functions, you can further simplify like so
 */
const takeEveryNthSimplest = (n: number) => filter((value, index) => index % n === 0);

interval(1000).pipe(
	takeEveryNth(2),
	map(x => x + x),
	takeEveryNthSimple(3),
	map(x => x * x),
	takeEveryNthSimplest(4),
	take(3),
	toArray()
)
	.subscribe(x => console.log(x));
// [0, 12, 24]
