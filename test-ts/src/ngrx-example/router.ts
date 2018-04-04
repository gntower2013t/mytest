/**
 * Payload of ROUTER_NAVIGATION.
 */
export type RouterNavigationPayload<T> = {
  routerState: T;
  event: RoutesRecognized;
};

/**
 * An action dispatched when the router navigates.
 */
export type RouterNavigationAction<T = RouterStateSnapshot> = {
  type: typeof ROUTER_NAVIGATION;
  payload: RouterNavigationPayload<T>;
};

export type RouterReducerState<T = RouterStateSnapshot> = {
	state: T;
	navigationId: number;
};

// ===============
this.actions.ofType(ROUTER_NAVIGATION).
routerAction.payload.routerState.root.firstChild
filter(s => s.routeConfig.path === segment) // ActivatedRouteSnapshot?

router.events.filter(evt => evt instanceof NavigationEnd)
	.withLatestFrom(store.select('app', 'search'))

withLatestFrom(
	this.store.select(fromRoot.getRouterState),

//ng router
RouterStateSnapshot
class RoutesRecognized extends RouterEvent
