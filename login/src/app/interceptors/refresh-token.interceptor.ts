import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor{

  private authService: AuthService = null;

  constructor(private injector: Injector) { 
    this.authService = this.injector.get(AuthService);
  }

  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

    return handler.handle(request).catch((httpError: HttpErrorResponse) => {

      console.log(httpError.error.error);

      if(httpError.status === 401 && httpError.error.error === 'invalid_token'){
        if(this.authService.getRefreshTokenProgress()) {
          this.authService.logoutUser();
        }else {
          this.authService.setRefreshTokenProgress(true);
          return this.authService.renewToken().flatMap(data => {
                    console.log('passei pelo flatMap');
                    localStorage.removeItem('jwt');
                    localStorage.setItem('jwt', JSON.stringify(data));
                    
                    let header = new HttpHeaders();
                    header = header.append('Authorization', `Bearer ${this.authService.getAccessToken()}`);
                    JSON.stringify(request);
                    const tokenizedReq = request.clone({headers: header});
                    this.authService.setRefreshTokenProgress(false);
                    return handler.handle(tokenizedReq);
                });
        }
      }

      return Observable.throw(httpError);
    });
  }

}
