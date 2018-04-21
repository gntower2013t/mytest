import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	templateUrl: `<div [innerHtml]="html"></div>`
})
export class AppComponent {
	html: any;

	constructor(private sanitizer: DomSanitizer) {
		this.html = sanitizer.bypassSecurityTrustHtml(`<span style=\"color:red;\">1234</span>`);
	}
}
