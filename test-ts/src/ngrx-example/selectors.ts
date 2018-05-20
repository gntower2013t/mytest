import { createSelector, createFeatureSelector } from '@ngrx/store';

/* (fn, projector) */
export const selectFeature = (state: AppState) => state.feature;
export const selectFeatureCount =
	createSelector(selectFeature, (state: FeatureState) => state.counter);


/* selectors for multiple pieces */
export const selectUser = (state: AppState) => state.selectedUser;
export const selectAllBooks = (state: AppState) => state.allBooks;

export const selectVisibleBooks = createSelector(selectUser, selectAllBooks, (selectedUser: User, allBooks: Books[]) => {
	if (selectedUser && allBooks) {
		return allBooks.filter((book: Book) => book.userId === selectedUser.id);
	} else {
		return allBooks;
	}
});


/* createFeatureSelector */
export const selectFeature = createFeatureSelector<FeatureState>('feature');
export const selectFeatureCount = createSelector(selectFeature, (state: FeatureState) => state.counter);


/* Reset Memoized Selector */
let state = { counter1: 3, counter2: 4 };
const selectTotal = createSelector(...);
selectTotal(state);

selectTotal.release() //memoized value is null now.


/* Selector with the Store, select(fn) */
store.pipe(select(fromRoot.selectFeatureCount))  //5.0
store.selet(fn) //before 5.0


/* selector wrapped with rxjs pipe */
export function filterList<T>(selector:  (list: AppState)=> T ) {
  return pipe(
    filter((state: AppState) => !!state.list),
    map(selector)
  );
}

this.activeTaskList$ = store.pipe(filterList(listSelectors.activeTaskList));
