import { Component, Input } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-item-course',
  templateUrl: './item-course.component.html',
  styleUrls: ['./item-course.component.css']
})
export class ItemCourseComponent {
  @Input()
  courseItem: Course = new Course();
}
