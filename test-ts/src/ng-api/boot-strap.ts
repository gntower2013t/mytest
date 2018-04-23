import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

/* bootstrap two apps
	two man.ts ?? no need ??

	Note from official code:
	https://github.com/angular/angular/blob/ae75e3640a2d9eb1e897a0771d92b976c5a42c75/modules/%40angular/platform-browser-dynamic/index.ts#L87
 * ## Bootstrapping Multiple Applications
 *
 * When working within a browser window, there are many singleton resources: cookies, title,
 * location, and others. Angular services that represent these resources must likewise be
 * shared across all Angular applications that occupy the same browser window. For this
 * reason, Angular creates exactly one global platform object which stores all shared
 * services, and each angular application injector has the platform injector as its parent.
 *
 * Each application has its own private injector as well. When there are multiple
 * applications on a page, Angular treats each application injector's services as private
 * to that application.

*/
platformBrowserDynamic().bootstrapModule(AppModule)
platformBrowserDynamic().bootstrapModule(AppModule2)
