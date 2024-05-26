import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from 'src/app/model/course';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {

  courseId: number = -1;
  course: Course = new Course();

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courseId = params['id'];
      this.getCourse();
    })
  }

  constructor(private service: CoursesService, private route: ActivatedRoute){}

  getCourse():void {
    this.service.getSingleCourse(this.courseId).subscribe({
      next: (data: any) => {
        this.course = data;
        // console.log(this.course);
      }
    })
  }

}
