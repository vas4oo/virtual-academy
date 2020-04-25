import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from '../shared/constants';

@Injectable()
export class UserService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    });

    constructor(private http: HttpClient) { }


    getAllUsers() {
        return this.http.get(`${apiUrl}/users`, { headers: this.headers });
    }
}