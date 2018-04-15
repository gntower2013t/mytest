import { Type, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';


export class AdBannerComponent implements OnInit, OnDestroy {

	constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

	//<ng-template ad-host></ng-template>, just a placeholder for viewContainer
	@ViewChild(AdDirective) adHost: AdDirective;

	loadComponent() {

		let componentFactory = this.componentFactoryResolver
			.resolveComponentFactory(adItem.component); // component type (constructor)

		let viewContainerRef = this.adHost.viewContainerRef;

		let componentRef = viewContainerRef.createComponent(componentFactory);
		//populate data
		(<AdComponent>componentRef.instance).data = adItem.data;
	}
}

export interface AdComponent {
	data: any;
}

export class HeroJobAdComponent implements AdComponent { }


export class AdItem {
	constructor(public component: Type<any>, public data: any) { }
}
new AdItem(HeroJobAdComponent, { name: 'Bombasto', bio: 'Brave as they come' })


/* Module */
entryComponents: [HeroJobAdComponent, HeroProfileComponent],
