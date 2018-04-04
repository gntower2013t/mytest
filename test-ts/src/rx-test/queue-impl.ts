import { Subject } from 'rxjs/Subject';

/* implementing a queue */
class Queue extends Subject<any> {
	private items = [];

	add(item) {
		if (this.observers.length > 0) {
			this.next(item);
		} else {
			this.items.push(item);
		}
	}

	subscribe(observer) {
		let s = super.subscribe(observer);
		this.items.forEach(item => this.next(item));
		this.items = [];
		return s;
	}
}

let q = new Queue();
q.subscribe(item => console.log(item));

q.add('yo');
q.add('yo 2');
