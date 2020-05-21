import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from '../shared/constants';
import { CourseModel } from '../models/course.model';


@Injectable()
export class CourseService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    });

    constructor(private http: HttpClient) { }


    getAllCourses(id: number) {
        return this.http.get(`${apiUrl}/courses/${id}`, { headers: this.headers });
    }

    getCourse(id: number) {
        return this.http.get(`${apiUrl}/course/${id}`, { headers: this.headers });
    }

    createCourse(user: CourseModel) {
        return this.http.post(`${apiUrl}/courses`, user, { headers: this.headers });
    }

    updateCourse(user: CourseModel) {
        return this.http.put(`${apiUrl}/courses`, user, { headers: this.headers });
    }

    deleteCourse(id: number) {
        return this.http.delete(`${apiUrl}/courses/${id}`, { headers: this.headers });
    }

    setCourseLiked(userID: number, courseId: number, like: boolean) {
        return this.http.get(`${apiUrl}/likeCourses/${userID}/${courseId}/${like}`, { headers: this.headers });
    }

    setCourseRating(userID: number, courseId: number, ratng: number) {
        return this.http.get(`${apiUrl}/courseRating/${userID}/${courseId}/${ratng}`, { headers: this.headers });
    }

    getFavouriteCourses(userId) {
        return this.http.get(`${apiUrl}/favouriteCourses/${userId}`, { headers: this.headers });
    }
}