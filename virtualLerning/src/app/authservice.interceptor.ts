import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthserviceInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqZWVsYW4uZWVlLnJ5bWVjQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImV4cCI6MTY3MTEwMjkxNSwiaWF0IjoxNjcxMDkzOTE1fQ.PzYNat32bknRo2z_asgywEdU4ug1tPf34Ju-0KewSHOQjHH7B28F4lSSmuIvCzVzf8X_TZxM-cfkkhBU0fMh_g`;
    request = request.clone({headers:request.headers.set('Authorization','Bearer ' + token)});
    return next.handle(request);
  }
}
