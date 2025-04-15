import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private globals: Globals,
    private router: Router
  ) { }

  login(userName: string, password: string) {
    return this.http.post<any>(`${this.globals.BASE_ASPNET_ENDPOINT}/Auth/login`, {
      userName,
      password
    });
  }

  setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'seconds');
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration(): moment.Moment | null {
    const expiration = localStorage.getItem('expires_at');
    return expiration ? moment(JSON.parse(expiration)) : null;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}