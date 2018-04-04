import * as Rx from 'rxjs';

Rx.Observable.from(['foo', 'bar', 'baz', 'bay', 'bax', 'bar', 'cat'])
	.do(x => console.log((new Date).toLocaleTimeString() + " " + x))
	// grouping by 2
	.bufferCount(2)
	// concat received results
	.concatMap((data) => {
		return Rx.Observable.defer(() => {
			// assuming long operation here, e.g. downloading,
			// we can use merge here if we want to do operation per item
			return Rx.Observable.create((observer) => {
				setTimeout(function () {
					observer.next(data);
					observer.complete();
				}, 2000);
			})
		});
	})
	.subscribe(
		result => console.log((new Date).toLocaleTimeString() + " finished " + result),
		error => console.error(error),
		() => console.log('done')
	);

// Console ouput
// rxjs.html:9 Console was cleared
// rxjs.html:11 9:56:36 PM foo
// rxjs.html:11 9:56:36 PM bar
// rxjs.html:11 9:56:36 PM baz
// rxjs.html:11 9:56:36 PM bay
// rxjs.html:11 9:56:36 PM bax
// rxjs.html:11 9:56:36 PM bar
// rxjs.html:11 9:56:36 PM cat
// rxjs.html:28 9:56:38 PM finished foo,bar
// rxjs.html:28 9:56:40 PM finished baz,bay
// rxjs.html:28 9:56:42 PM finished bax,bar
// rxjs.html:28 9:56:44 PM finished cat
// rxjs.html:30 done
