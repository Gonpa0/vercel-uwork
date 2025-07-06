import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {

  private loginStatus = new BehaviorSubject<boolean>(this.verificar());
  private userRol = new BehaviorSubject<string>(this.showRole() || '');

  loginStatus$ = this.loginStatus.asObservable();
  userRol$ = this.userRol.asObservable();

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post<any>('http://localhost:8801/login', request);
  }

  verificar() {
  if (typeof window !== 'undefined') {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  return false;
}

showRole() {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    return decoded?.role;
  }
  return null;
}

  getIdUsuario(): number | null {
    const token = sessionStorage.getItem('token');
    if (!token) return null;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.idUsuario || null;
  }

  actualizarEstado(): void {
    this.loginStatus.next(this.verificar());
    this.userRol.next(this.showRole() || '');
  }

  logout(): void {
    sessionStorage.clear();
    this.loginStatus.next(false);
    this.userRol.next('');
  }
}


