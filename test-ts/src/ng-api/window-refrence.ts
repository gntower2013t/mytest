/* https://juristr.com/blog/2016/09/ng2-get-window-ref/ */

import { Injectable, NgModule } from '@angular/core';

function _window(): any {
	// return the global native browser window object
	return window;
}

@Injectable()
export class WindowRef {
	get nativeWindow(): any {
		return _window();
	}
}

@NgModule({
	...
	providers: [WindowRef]
})
export class AppModule { }
