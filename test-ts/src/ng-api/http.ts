import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { retry, catchError, tap } from 'rxjs/operators';
import { ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

export class ConfigService {
  config: Config;
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {
    // this.http.get('assets/config.json')
    this.http.get<Config>(this.configUrl,
      { observe: 'response' }) //HttpResponse<Config>
      //responseType: "blob", text
      //Observable<Blob>

      //query parameter
      //new HttpParams().set('q', 'cironunes'); { params }

      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    )

      .subscribe(res => this.config = {
        // heroesUrl: data['heroesUrl'],
        // textfile: data['textfile']
        ...res.body
      });
  }


  /* error handling */
  //rx:  catchError(this.handleError)
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }


  /* non JSON */
  getTextFile(filename: string) {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(filename, { responseType: 'text' })
      .pipe(
        tap( // Log the result or error
          data => this.log(filename, data),
          error => this.logError(filename, error)
        )
      );
  }

  /*
  get image from blob
  http://brianflove.com/2017/11/02/angular-http-client-blob/
  */
  @ViewChild("heroImage") image: ElementRef;
  // <img #heroImage >
  // this._window = this.windowRefService.nativeWindow;
  // this.image.nativeElement.src = this._window.URL.createObjectURL(image)

  getImage(): Observable<Blob>  {
    return this.http
      .get(`blar.jpg`, {
        responseType: "blob"
      });
  }
}

export interface Config {
  heroesUrl: string;
  textfile: string;
}
