import { Component, Input, SimpleChanges } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { CourseSearchResult } from '../model/courseSearchResult';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../model/course';
import { Application } from '../model/application';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {

  @Input()
  preselectedCourse: Course;
  courseIsPreselected: boolean = false;


  courseList: CourseSearchResult = new CourseSearchResult();
  course: Course = new Course();
  prijava: Application = new Application();
  forma: FormGroup;

  constructor(private service: CoursesService, private formBuilder: FormBuilder, private router: Router){
    this.preselectedCourse = new Course();
    this.forma = this.formBuilder.group({
      name: ['', [Validators.required]],
      courseId: [-1, [Validators.required]],
      eMail: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      adress: ['', [Validators.required]],
    })
  }

  ngOnInit():void {
    console.log(this.preselectedCourse);
    
    if(this.preselectedCourse.id == null){
      this.service.getCourseList().subscribe({
        next: (data: any) => {
          this.courseList = data;
        }
      })
    } else {
      this.courseIsPreselected = true;
      this.course = this.preselectedCourse;
    }
    console.log()
    
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log("Selected option: ");
  //   this.forma.value.courseId = this.preselectedCourse.name;
  // }

  submit() {
    if(!this.forma.valid || this.forma.value.courseId == -1){
      alert("Forma nije pravilno popunjena");
      return;
    }

    this.course.id = Number(this.forma.value.courseId);
    this.prijava.course = this.course;

    this.prijava.name = this.forma.value.name;
    this.prijava.address = this.forma.value.adress;
    this.prijava.eMail = this.forma.value.eMail;
    this.prijava.tel = this.forma.value.tel;

    this.service.postApplication(this.prijava).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.router.navigate(['/courses']);
      },
      error: (err: any) => {
        console.log(err);
        if(err.status == 409){
          alert("Vec postoji prijava sa istim email-om!");
        }
      }
    })
    }
    
}
