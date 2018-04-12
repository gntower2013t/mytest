# EI-XERO Flexibility

This page describes the basic architeture of EI-XERO and how to achieve configurability and flexibility.

## State management
>  @ngrx is RxJS powered state management for Angular applications, inspired by Redux

With ngrx, state is well managed:
* Centralized, immutable State as single source of truth, which can be accessed anywhere.
* Router as source of truth, meaning url represents states.
* UI components reflect state change via RxJS and selector.
* Change is predicable via action & reducer.

![redux](./redux.png)

## Important features in Angular
* Feature Module  
  Angular encourages to organize a cohesive set of functionality as a feature module. Separates of concern also helps development cooperation on big projects.

  * Feature states
  > ngrx store uses fractal state management, which provides state composition through feature modules. The feature state is added to the global application state once the feature is loaded.

  * Feature modules in EI-XERO
    * activity ovieview
    * search
    * list
    * details (textarea & imagearea) 

* Lazy loading  
  With correct route config and help of *Angular CLI* build tool, we can make a feature module as separated bundle and only loaded on demand, which can boost performance. 

* Dependency injection  
  Angular provides *Hierarchical Dependency Injection* system.  
  We can separate interface and implementation easily, so **the consumer knows nothing but reference of interface**.

## Configuration

* Configuration can loaded via ConfigService and cached in store  
//TODO **picture here**  searchConfig.getFilters -> store or http request

* Load config when bootstrap  
If some config is needed when application is initializing, it can be loaded via:
```typescript
providers:[{ provide: APP_INITIALIZER, 
      useFactory: initConfig,
      deps: [ConfigService], multi: true }]
```

## Search Component & Configuration

### Search service
ISearchService is the *class-interface* that defines method *getSearchResults* which uses filters  to assemble query, issues requests to backend and finally resolves returned data to client model.

Given different contexts (e.g. different route config), different implementation of ISearchService could be provided via Angular DI system. For example, for IDC backend, implementation could be total different.

Instead of providing in module level, providers should be defined in metadata of *SearchComponent* so that sepecific service implementation of service can be injected when SearchComponent is creating (typically triggered by router).


### Filters
* components
* display filters accroding to config
* how to add a new type of filter

### Table columns
* components
* value resovler
* configurable

## Integrate with external source


## References
* dynamic components
