/*
  batch action
  https://gitlab.com/linagora/petals-cockpit/blob/master/frontend/src/app/shared/helpers/batch-actions.helper.ts#L34-42
*/
export function enableBatching<S>(reduce: ActionReducer<S>): ActionReducer<S> {
	return function batchingReducer(state: S, action: Action): S {
		if (action.type === BatchType) {
			return (action as Batch).payload.reduce(batchingReducer, state);
		} else {
			return reduce(state, action);
		}
	};
}
