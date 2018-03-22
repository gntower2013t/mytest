import { Store, select, ActionReducerMap, Action, StoreModule, META_REDUCERS, MetaReducer   } from '@ngrx/store';

// map(toPayload)  //deprecated
store.pipe(select('count'))  //select operator, since 5.0

/* ActionReducerMap,
	type checking for prop 'auth'
	reducer is ActionReducer: (state, action)=>
	generic: <V extends Action = Action> */
export interface State {
	auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
	auth: fromAuth.reducer
};


/* action types, enum */
export enum CounterActionTypes {
	INCREMENT = '[Counter] Increment',
	DECREMENT = '[Counter] Decrement',
	RESET = '[Counter] Reset'
}

export class Increment implements Action {
	readonly type = CounterActionTypes.INCREMENT;
}

/* Initial state provide in module */
StoreModule.forRoot(reducers, {
	initialState: {  //object or function
	}
})

/* Initial State & AoT
	 AoT requires all symbols referenced in the decorator to be statically analyzable,
	 so provided as function
*/
StoreModule.forRoot(reducers, { initialState: getInitialState })


/* Meta Reducers: MetaReducer  */
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
	return function (state, action) {
		console.log('state', state);
		console.log('action', action);

		return reducer(state, action);
	}
}
const metaReducers: MetaReducer<any>[] = [debug];
StoreModule.forRoot(reducers, { metaReducers })


/* Feature Module State Composition
  see createFeatureSelector
*/
StoreModule.forFeature('featureName', reducers)


/* Injecting Reducers
  why ?? */
import { NgModule, InjectionToken } from '@angular/core';
export const REDUCER_TOKEN = new InjectionToken
	<ActionReducerMap<fromRoot.State>>('Registered Reducers');

StoreModule.forRoot(REDUCER_TOKEN)
providers: [
	{
		provide: REDUCER_TOKEN,
		deps: [SomeService],
		useFactory: getReducers
	}
]

/* inject in  feature module */
export const FEATURE_REDUCER_TOKEN = '';
function getReducers(): ActionReducerMap<fromFeature.State> { }
StoreModule.forFeature('feature', FEATURE_REDUCER_TOKEN),


/* Injecting Meta-Reducers
	built-in token: META_REDUCERS
*/
	provide: META_REDUCERS
