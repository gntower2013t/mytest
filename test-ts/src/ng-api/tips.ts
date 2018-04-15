import { ElementRef, ViewChild, Component, HostListener, HostBinding } from "@angular/core";

/* reference component self, host */
@Component({
	selector:'mytag',
	template: `<button #input>Button</button>`,
	host: {
		'class': 'myclass1 myclass2 myclass3',
		//result: <mytag class="myclass1 myclass2 myclass3"></mytag>
		'(window:blur)': 'focusOutFunction($event)',
    '(window:focus)': 'focusInFunction($event)',
  }
})
export class MyComponent {

	//inject self
	constructor(private el: ElementRef) {
		el.nativeElement //...
	}

	/* view child, #input reference */
	@ViewChild('input') button: ElementRef;

	@HostListener('click', ['$event']) //bind self
  onclick(evt:MouseEvent) { //DOM event
    console.log("evt: " + evt.target) //DOM element
	}

	@HostBinding('attr.role') role = 'admin'; //DOM attribute 'role', inspect DOM in browser
}

