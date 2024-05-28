import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { CourseSearchResult } from '../model/courseSearchResult';
import { Course } from '../model/course';
import { Application } from '../model/application';

const baseURL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  
  constructor(private http: HttpClient) { }

  getCourseList(params?: any): Observable<CourseSearchResult> {
    let options = {};
    
    if (params) {
      options = {
        params: new HttpParams()
          .set('sort', params.sort || "")
          .set('sortDirection', params.sortDirection || "")
          .set('filter', params.filter && JSON.stringify(params.filter) || "")
      }
    }

    return this.http.get(baseURL + '/courses', options).pipe(map((data: any) => {
      return new CourseSearchResult(data);
    }));
  }

  getSingleCourse(id: number): Observable<Course>{
    return this.http.get(baseURL + '/courses' + "/" + id).pipe(map((data: any) => {
      return new Course(data);
    }))
  }

  postApplication(prijava: Application):Observable<any> {
    return this.http.post(baseURL + '/applications', prijava);
  }

  getApplications(email: string):Observable<Object>{
    return this.http.get(baseURL + '/candidates/' + email + '/applications');
  }

  cancel(applicationId: number):Observable<any>{
    return this.http.delete(baseURL + '/applications/' + applicationId);
  }

}
