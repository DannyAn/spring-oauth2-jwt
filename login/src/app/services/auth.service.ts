import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _registerUrl = 'backend-register';
  private _loginUrl = 'http://localhost:8085/authorization/oauth/token';
  private _clientApp = 'client-web';
  private _clientSecret = '123';
  private _grantType = 'password';

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    console.log('Mandei!', user);
    //return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    console.log('loguei com ' + user);

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this._clientApp + ':' + this._clientSecret));
    header = header.append('Content-Type', 'application/x-www-form-urlencoded');

    const formData = `grant_type=${this._grantType}&username=${user.email}&password=${user.password}`;
    return this.http.post(this._loginUrl, formData, {headers: header});
  }

  loggedIn() {
    return !!localStorage.getItem('jwt');
  }

  logoutUser() {
    localStorage.removeItem('jwt');
    this._router.navigate(['/events']);
  }

  getAccessToken() {
    return JSON.parse(localStorage.getItem('jwt')).access_token;
  }
}
