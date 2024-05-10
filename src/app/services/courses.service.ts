import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { CourseSearchResult } from '../model/courseSearchResult';

const baseURL = 'http://localhost:3000/api/courses';

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
          // .set('page', params.page || "")
          // .set('pageSize', params.pageSize || "")
          .set('filter', params.filter && JSON.stringify(params.filter) || "")
      }
    }

    return this.http.get(baseURL, options).pipe(map((data: any) => {
      return new CourseSearchResult(data);
    }));
  }
}
