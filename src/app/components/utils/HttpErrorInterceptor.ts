import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent,
    HttpResponse
} from '@angular/common/http';

import {Observable, EMPTY, throwError, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    alert('An error occurred:' + error.message);
                    console.error('An error occurred:', error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    alert('Backend returned code' + error.status + ' ,message: ' + error.message);
                    console.error('Backend returned code ${error.status}, message: ' + error.message);
                }

                //  If you want to return a new response:
                // return of(new HttpResponse({body: [{name: "Default value..."}]}));

                // If you want to return the error on the upper level:
                return throwError(error);

                // or just return nothing:
                // return EMPTY;
            })
        );
    }
}
