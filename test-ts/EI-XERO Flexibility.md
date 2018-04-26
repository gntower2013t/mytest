# EI-XERO Flexibility

This page describes designs to achieve configurability of EI-XERO and also the essential architeture related to the design.


## Architeture features

* State management
	* Centralized, immutable State as single source of truth, which can be accessed anywhere.
  * Router as source of truth, meaning url represents states.
  * UI components reflect state change via RxJS and selector.
  * Changes are predicable via action & reducer.

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

* Configuration is loaded via service and cached in store  
//TODO **picture here**  
```typescript
  providers: [
    {provide: CONFIG_NAME_SPACE, useValue: "search-config"},
    SearchConfigService,
  ],
export class SearchModule { }
```
Note: *lazy loaded module has its own injector, so that different config can be provided by the injector, in other word, lazy loaded module is a sandbox for services.*

* Loading config when bootstrap  
It's easy to hook application initialization, if some config is needed when bootstrap:
```typescript
providers:[{ provide: APP_INITIALIZER, 
      useFactory: initConfig,
      deps: [ConfigService], multi: true }]
```

## Search & Configuration

### Config model
```typescript
interface Config {
  simpleFilters: Filter[]
  advancedFilters: Filter[]
  columns:  Column[]
}
interface Column {
  head: string;
  valueAdapter?: Adatper;
  type: Type<BaseColumnComponent>
}
interface Filter {
  param: string;
  displayName: string;
  value?: any;
  type?: string
}
```

### Search service

ISearchService is the *class-interface* that defines method *getSearchResults* which uses filters  to assemble query, issues requests to backend and finally resolves returned data to client model.
```typescript
getSearchResults: (sf: SearchType, filters: SearchFilters)=> Observable<SearchResult[]>;
```

As mentioned above, different lazy loaded modules can have different implementation of ISearchService.
```typescript
...
{ provide: ISearchService, useClass: SearchServiceMock }
...
export class SearchModule { }


//another lazy loaded module, e.g. for IDC
...
{ provide: ISearchService, useClass: SearchServiceIDC }
...
export class SearchIDCModule { }
```

To load different module, different route config should be defined.
```typescript
Routes = [
  { path: 'search', loadChildren: 'app/search/search.module#SearchModule' },
	
	//route for IDC
  { path: 'search/idc', loadChildren: 'app/search-idc/search-idc.module#SearchIDCModule'},
...

export class AppRoutingModule { }
```


### Filters
Filter fields need to be dynamically displayed on the page according to the config. We achieve this by using [Dynamic Component Loader](https://angular.io/guide/dynamic-component-loader).

Building blocks:
* SearchConfigService to load config  
**search-config.json**
```json
"advancedFilters":[{
  "param": "prcd",
  "displayName": "Scheduled procedure date"
	//default type of component is TextInputFilterComponent
},
{
  "param": "arr",
  "displayName": "patient arrived",
  "type": "checkbox" //type of component
}]
```
* FilterHostDirective creates dynamic component based on configuration  
**Usage in template**
```html
<div *ngFor="let filter of (filters$ | async); let i = index">
  <ng-template [eiFilterHost]="filter"></ng-template>
</div>
```
* Different component class has different views
  * BaseFilterComponent the base class, input property "`@Input() filter`" will bind the filter configuration to view.
  * TextInputFilterComponent the default type of filter.
	* CheckboxFilterComponent

* Register components in modules  
To introduce a new type of filter component, you must register it in `filters` map which provided by module. Also filter components must be indicated as `entryComponents`, see [Dynamic Component Loader](https://angular.io/guide/dynamic-component-loader)
```typescript
const comps: FilterTypeMap = {
  text: TextfilterComponent,
  checkbox: CheckboxFilterComponent  //key "checkbox" will be referenced in config
};
export const filters: ValueProvider = { provide: FILTER_MAP, useValue: comps, multi:true };

...

  providers: [filters],  //the map
  entryComponents: [TextfilterComponent, CheckboxFilterComponent]
export class FilterModule { }
```

### Table columns
Displaying columns by config uses similar mechanism to filters. Building blocks:  
* SearchConfigService  
**Same set of config**
```json
"columns": [
{
  "head": "Patient",
  "props": [
    "patientName"
  ]
},
{
  "head": "Gender",
  "type": "genderIcon" //component type
},
{
  "head": "Name",
  "adapter": "namePrefix"  //value adapter
}]
```
* ColumnHostDirective
```html
<ng-container *ngFor="let col of columns$ | async">
  <td>
    <ng-container [eiColumnHost]="col" [result]="result"></ng-container>
  </td>
</ng-container>
```

* Components
  * BaseColumnComponent, render as plain text
  ```typescript
  @Input() result: SearchResult;  //data in current row
  @Input() valueAdapter: (r: SearchResult) => any;  //data transformer, configurable
  ```
  * PatientGenderComponent, display gender icon

* Value adapters  
  Adapters are just pure functions that tranform data to display value, which let column components more reusable. In addition, you can compose functions to satisfy complex requirements.
  ```typescript
  (r: SearchResult) => any //value adapter function

  //or function factory that returns value adapter function
  (args:any[]) => (r: SearchResult) => any
  ```
  * propResolver(props: string[]) , most common adapter factory. For convenience, you just need to specify `"props": ["foo", "bar"]` in configuration.

* Registering components is similar to filters

### Making Extension
Lazy loaded module can not only provide replacement of service, but aslo easily extend filters & columns config for dedicated use. For example, `SearchIDCModule` has additional types of filters only used when query against IDC backend.

The extensions are bundled as a separated lazy loaded module, so bundle size of the original `SearchModule` won't be increased.

```typescript
const comps: FilterTypeMap = {
  xero: XeroFilterComponent  //dedicated filter for IDC search
};

//register in another FILTER_MAP
export const filters: ValueProvider = { provide: FILTER_MAP, useValue: comps, multi: true };

  providers: [
    filters,
    { provide: CONFIG_NAME, useValue: "search-idc-config" }, //config for IDC search filters & columns
    SearchConfigService,],

  entryComponents:[XeroFilterComponent]
})
export class SearchIDCModule { }
```

## Integrate with external source
Some options:
  * external contents in iframe, loose coupled, communicated via message. Not easy to share state and complex interaction.
  * external contents wrapped as angular component / module. More coupled and fine-grained control, however, it needs more work and sometimes even impossible to do so.
  * exteranl static content (html). Works in angular.
  * DOM out of angular context. Communicated via global object?


