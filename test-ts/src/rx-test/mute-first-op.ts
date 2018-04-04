import { Observable } from 'rxjs/Observable';

/* from https://medium.com/@m3po22/stop-using-ngrx-effects-for-that-a6ccfe186399 */
const muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>) =>
	Observable.combineLatest(
	first$,
	second$,
	(a, b) => b
).distinctUntilChanged();
