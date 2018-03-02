var Rx = require("Rx");

Rx.Observable.timer(500)
    .subscribe({
        onNext: v => console.log(`======= ${v}`),
        onCompleted:  () => console.log(`complete`)
    });