import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';
import { CourseSearchResult } from '../model/courseSearchResult';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courseList: CourseSearchResult = new CourseSearchResult();
  searchControl: FormControl;
  rangeControl: FormControl;
  sortSelect: FormControl;

  queryParams = {
    page: 1,
    pageSize: 10,
    filter: {
      weeksTo: "",
      name: ""
    },
    sort: "",
    sortDirection: ""
  }

  constructor(private service: CoursesService) {
    this.searchControl = new FormControl("");
    this.rangeControl = new FormControl("");
    this.sortSelect = new FormControl("");
   }

  ngOnInit(): void {
    this.getCourseList();
  }

  getCourseList(): void {
    console.log("usli u getCourseList")
    console.log("sortSelect var: " + this.sortSelect.value)
    console.log("queryParams.sort: " + this.queryParams.sort)
    console.log("queryParams.sortDirection: " + this.queryParams.sortDirection)
    
    this.service.getCourseList(this.queryParams).subscribe({
      next: (data: any) => {
        this.courseList = data;
      }
    })
  }

  search() {
    this.queryParams.filter.name = this.searchControl.value;
    this.getCourseList();
  }

  rangeFilter() {
    this.queryParams.filter.weeksTo = this.rangeControl.value;
    this.getCourseList();
  }

  sort() {
    switch(this.sortSelect.value) {
      case "1":
        //do nothing
        break;
      case "2":
        console.log("CASE 2")
        this.queryParams.sort = "price";
        this.queryParams.sortDirection = "asc";
        break;
      case "3":
        console.log("CASE 3")
        this.queryParams.sort = "price";
        this.queryParams.sortDirection = "desc";
        break;
      case "4":
        this.queryParams.sort = "weeks";
        this.queryParams.sortDirection = "asc";
        break;
      case "5":
        this.queryParams.sort = "weeks";
        this.queryParams.sortDirection = "desc";
        break;
    }
    this.getCourseList();
  }

}
