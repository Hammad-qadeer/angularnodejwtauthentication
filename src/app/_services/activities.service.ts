import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../_models/activity.model';

const ACTIVITY_API = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) { }

  getActivities() {
    return this.http.get(ACTIVITY_API + 'activities');
  }

  postActivity(activity: any) {
    return this.http.post(ACTIVITY_API + 'activities', activity)
  }

  updateActivity(activity: any, id: number) {
    debugger
    return this.http.put(ACTIVITY_API + 'activity/' + id, activity)
  }

  deleteActivity(id: any) {
    return this.http.delete(ACTIVITY_API +  'activity/' + id);
  }

  getAssignedActivities(role_id: number) {
    debugger
    return this.http.get(ACTIVITY_API+ 'get-role-activities/' + role_id);
  }

  assignActivityToRole(data: any) {
    debugger
    return this.http.post<any>(ACTIVITY_API +'assign-activity-to-role', data);
  }
}
