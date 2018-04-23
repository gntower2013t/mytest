import { Component, OnInit, ComponentFactoryResolver, Injector, ApplicationRef } from "@angular/core";

/*
	render this component in a DOM element running outside the Angular context
	ApplicationRef
*/
@Component({
	selector: 'app-root',
	template: ``
})
export class AppComponent implements OnInit {
	private componentRef;

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private injector: Injector,
		private applicationRef: ApplicationRef
	) { }

	ngOnInit() {
		// Locate an element that exists on the page
		const headerElement = document.querySelector('#pageHeader');
		// Locate the component factory for the HeaderComponent
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HeaderComponent);
		// Generate an instance of the HeaderComponent, on headerElement
		this.componentRef = componentFactory.create(this.injector, [], headerElement);
		// Attach to the component to Angular's component tree for dirty checking
		this.applicationRef.attachView(this.componentRef.hostView);
	}

	/* manual trigger change detection, angular cdk solve this problem
	  portal hosts
		https://blog.angularindepth.com/angular-cdk-portals-b02f66dd020c
	*/
	doCheck() {
		this.componentRef.changeDetectorRef.detectChanges();
	}
}
