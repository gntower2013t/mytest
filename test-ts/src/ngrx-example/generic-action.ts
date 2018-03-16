/* not sure it is best common practise, necessary to do so? */
import { Action } from '@ngrx/store';

type GenericAction<T> = {
	[K in keyof T]: T[K]
}
export default interface Action<T> extends Action {
	payload: GenericAction<T>
}
