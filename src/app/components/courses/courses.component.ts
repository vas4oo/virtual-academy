import { Component, OnInit } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Message } from 'primeng/api';
import { faHeart, faStar, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

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
  }

  onEditClick(course: CourseModel) {

  }

  onDeleteClick(course: CourseModel) {

  }

  handleCloseClick() {
    this.newCourse = new CourseModel();
    this.isVisibleDialog = false;
  }

  handleSaveClick() {
    let nDate = this.getDate(this.courseDate);
    this.newCourse.date = nDate;

  }

  getDate(date: Date): string {
    return (date.getDate() < 10 ? '0' + (date.getDate()).toString() : (date.getDate()).toString()) + '.' +
      (date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + '.' +
      +date.getFullYear().toString();
  }
}
