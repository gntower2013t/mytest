
@Component({
	selector: 'app-root',
	template: ``
})
export class AppComponent implements OnInit {
	private componentRef;

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private injector: Injector
	) { }

	ngOnInit() {
		// Locate an element that exists on the page
		const headerElement = document.querySelector('#pageHeader');
		// Locate the component factory for the HeaderComponent
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HeaderComponent);
		// Generate an instance of the HeaderComponent
		this.componentRef = componentFactory.create(this.injector, [], headerElement);
		// Attach to the component to Angular's component tree for dirty checking
		this.applicationRef.attachView(this.componentRef.hostView);
	}
}
