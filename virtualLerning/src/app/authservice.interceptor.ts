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
    const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqZWVsYW4uZWVlLnJ5bWVjQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImV4cCI6MTY3MTAyNDcxOSwiaWF0IjoxNjcxMDE1NzE5fQ.uZ63v5emy54Ii1IfR3zgC5QnpZngy9LYju_AM_ev6a8whlGGWGIKNFUBl0K8MciIWrXnrU6xguKRnftTE4Rjzw`;
    request = request.clone({headers:request.headers.set('Authorization','Bearer ' + token)});
    return next.handle(request);
  }
}
