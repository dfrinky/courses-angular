import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { Application } from '../model/application';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  applicationList: Application[] = [];

  nemaPronadjenih: boolean = false;

  constructor(private service: CoursesService) { 
  }

  search(): void {
    this.service.getApplications(this.email.value || '').subscribe({
      next: (data: any) => {
        this.applicationList = data;
        this.nemaPronadjenih = false;
        if(this.applicationList.length == 0){
          this.nemaPronadjenih = true;
        }
      },
      error: (data: any) => {
      }
    })
  }

  cancel(id: number) {
    this.service.cancel(id).subscribe({
      next: (data: any) => {
        this.search();
      }
    })
  }

}


