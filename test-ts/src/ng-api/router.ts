import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
	Router, Resolve, RouterStateSnapshot,
	ActivatedRouteSnapshot
} from '@angular/router';

/* navigate */
router.navigate(['team', 33, 'user', 11], {relativeTo: route});

/* resolver */
@Injectable()
export class CrisisDetailResolver implements Resolve<Crisis> {
	constructor(private cs: CrisisService, private router: Router) { }
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis>{
		return this.cs.getCrisis(id).take(1)..map(crisis => {
			if (crisis) {
				return crisis;
			} else { // id not found
				this.router.navigate(['/crisis-center']);
				return null;
			}
		 }) }
	//return empty observable will escape navi ???
		 //escape by this.router.navigateByUrl(this.location.path()); ??
	//Observable provided to the Router must complete,
	//if not the navigation will not continue.
}

//routing module
routes: [ {path:'', resolve: { crisis: CrisisDetailResolver
providers: [ CrisisDetailResolver ]
export class CrisisCenterRoutingModule { }

//component
ngOnInit() {
	this.route.data.subscribe(
		(data: { crisis: Crisis }) => data.crisis ...)
