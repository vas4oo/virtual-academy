import { Component, OnInit } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Message } from 'primeng/api';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Array<CourseModel> = new Array<CourseModel>(0);
  loading: boolean = false;
  msgs: Message[] = [];
  faHeart = faHeart;
  faStar = faStar;

  constructor(public courseService: CourseService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.loading = true;
    const userId = this.authService.getUserId();
    this.courseService.getAllCourses(userId).subscribe(
      (res: any) => {
        this.loading = false;
        this.courses = res.courses;
      },
      error => {
        this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Error get courses" });
      }
    );
  }

  onLikeClick(course: CourseModel) {
    this.loading = true;
    course.liked = !course.liked;
    const userId = this.authService.getUserId();
    this.courseService.setCourseLiked(userId, course.id, course.liked).subscribe(
      (res: any) => {
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: 'Error updationg favourites' });
      }
    );
  }

  onRateClick(event, course: CourseModel) {
    this.loading = true;
    const userId = this.authService.getUserId();
    this.courseService.setCourseRating(userId, course.id, course.userRating).subscribe(
      (res: any) => {
        this.loading = false;
        this.getAllCourses();
      },
      error => {
        this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: 'Error updationg rating' });
      }
    );
  }

}
