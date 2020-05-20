import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from '../shared/constants';
import { UserModel } from '../models/user.model';

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

    getUser(id: number) {
        return this.http.get(`${apiUrl}/users/${id}`, { headers: this.headers });
    }

    updateUser(user: UserModel) {
        return this.http.put(`${apiUrl}/users`, user, { headers: this.headers })
    }

    deleteUser(id: number) {
        return this.http.delete(`${apiUrl}/users/${id}`, { headers: this.headers })
    }
}