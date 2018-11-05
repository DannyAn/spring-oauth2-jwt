import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {

    let authService = this.injector.get(AuthService);

    let tokenizedReq = req;

    if (authService.loggedIn()) {
      let header = new HttpHeaders();
      header = header.append('Authorization', `Bearer ${authService.getAccessToken()}`);
      tokenizedReq = req.clone({headers: header});
    }
    return next.handle(tokenizedReq);
  }

}
