import { Component, ElementRef, HostListener, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ob$: Observable<any>;

  constructor(private el: ElementRef) {
    this.ob$ = Observable.fromEvent(el.nativeElement, 'click')
    .map((e:MouseEvent)=> e.clientX);
    this.ob$.subscribe(x=>console.log("click " + x))
  }

  @HostBinding('attr.role') role = 'admin';

  @HostListener('click', ['$event'])
  onclick(evt:MouseEvent) {
    console.log("evt: " + evt.target)
  }

}
