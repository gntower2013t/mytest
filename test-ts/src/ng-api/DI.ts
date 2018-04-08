let heroServiceFactory = (logger: Logger, userService: UserService) => {
	return new HeroService(logger, userService.user.isAuthorized);
};

export let heroServiceProvider =
	{
		provide: HeroService,
		useFactory: heroServiceFactory,
		deps: [Logger, UserService]
	};

constructor(@Inject(APP_CONFIG) config: AppConfig) { }

constructor(@Optional() private logger: Logger) { }


{
	provide: APP_INITIALIZER, useFactory: loadLocalizeResources,
		deps: [LocalizeService], multi: true
},


const injector = ReflectiveInjector.resolveAndCreate([{ provide: Shape, useClass: Square }]);
const shape: Shape = injector.get(Shape);


/* use multi */
const locale = new InjectionToken<string[]>('locale');
const injector = Injector.create([
	{ provide: locale, multi: true, useValue: 'en' },
	{ provide: locale, multi: true, useValue: 'sk' },
]);

const locales: string[] = injector.get(locale);
expect(locales).toEqual(['en', 'sk']);
