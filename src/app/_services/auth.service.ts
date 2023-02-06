import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', { username, password });
  }

  register(username: string, email: string,phone: string, cnic: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', { username, email, phone, cnic, password, confirmPassword });
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { });
  }

  assignActivityToRole(role_id: number, activity_id: number) {
    return this.http.post<any>(AUTH_API +'assign-activity-to-role', { role_id, activity_id });
  }


}
