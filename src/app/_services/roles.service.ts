import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../_models/activity.model';

const ROLE_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private baseUrl = 'http://localhost:8000/api/auth/roles';

  constructor(private http: HttpClient) { }

  getRole(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createRole(role: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, role);
  }

  updateRole(id: number): Observable<object> {
    return this.http.put(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getRolesList(): Observable<any> {
    return this.http.get(ROLE_API + 'roles');
  }
}
