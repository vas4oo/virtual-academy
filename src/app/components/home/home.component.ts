import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CourseModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Message } from 'primeng/api';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses: Array<CourseModel> = new Array<CourseModel>(0);
  loading: boolean = false;
  msgs: Message[] = [];
  faHeart = faHeart;
  faStar = faStar;
  userName: string;

  constructor(private authService: AuthService, public courseService: CourseService) { }

  ngOnInit(): void {
    let profile = this.authService.getProfile();
    this.userName = profile.firstName;
    this.loading = true;
    const userId = this.authService.getUserId();
    this.courseService.getFavouriteCourses(userId).subscribe(
      (res: any) => {
        this.loading = false;
        this.courses = res.favCourses;
      },
      error => {
        this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Error get courses" });
      }
    );
  }

}
