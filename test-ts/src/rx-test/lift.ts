/* e.g. from ngrx store.ts */
export class Store<T> extends Observable<T> {

	lift<R>(operator: Operator<T, R>): Store<R> {
		const store = new Store<R>(this, this.actionsObserver, this.reducerManager);
		store.operator = operator;

		return store;
	}

}
function select<T, K>(
	pathOrMapFn: ((state: T) => any) | string,
	...paths: string[]
) {
	return function selectOperator(source$: Store<T>): Store<K> { }
}
