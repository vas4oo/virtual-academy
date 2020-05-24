import { Component, OnInit } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Message } from 'primeng/api';
import { faHeart, faStar, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { error } from 'protractor';

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
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  isAdministrator: boolean = false;
  isVisibleDialog: boolean = false;
  title: string = 'Add course';
  newCourse: CourseModel = new CourseModel();
  courseDate: Date = new Date();

  constructor(public courseService: CourseService, public authService: AuthService) { }

  ngOnInit(): void {
    this.isAdministrator = this.authService.isAdmin();
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

  handleAddClick() {
    this.isVisibleDialog = true;
    this.newCourse = new CourseModel();
  }

  onEditClick(course: CourseModel) {
    this.newCourse = { ...course };
    this.isVisibleDialog = true;
  }

  onDeleteClick(course: CourseModel) {
    this.loading = true;
    this.courseService.deleteCourse(course.id).subscribe(
      (res: any) => {
        this.loading = false;
        this.getAllCourses();
      },
      error => {
        this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: 'Error deleting course' })
      });
  }

  handleCloseClick() {
    this.newCourse = new CourseModel();
    this.isVisibleDialog = false;
  }

  handleSaveClick() {
    let nDate = this.getDate(this.courseDate);
    this.newCourse.date = nDate;
    this.loading = true;
    if (this.newCourse.id > 0) {
      this.courseService.updateCourse(this.newCourse).subscribe(
        (res: any) => {
          this.loading = false;
          this.isVisibleDialog = false;
          this.getAllCourses();
        },
        error => {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: 'Error updating course' });
        }
      );
    }
    else {
      this.courseService.createCourse(this.newCourse).subscribe(
        (res: any) => {
          this.loading = false;
          this.isVisibleDialog = false;
          this.getAllCourses();
        },
        error => {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: 'Error creating course' });
        }
      );
    }
  }

  getDate(date: Date): string {
    return (date.getDate() < 10 ? '0' + (date.getDate()).toString() : (date.getDate()).toString()) + '.' +
      (date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + '.' +
      +date.getFullYear().toString();
  }
}
