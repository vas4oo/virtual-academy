import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from '../shared/constants';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    });
    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

    login(user) {
        return this.getUser(user)
            .subscribe((res: any) => {
                if (res.access_token) {
                    this.setToken(res);
                    this.loggedIn.next(true);
                    return true;
                }
                return false;
            },
                error => {
                    console.log(error)
                });
    }

    getUser(user) {
        return this.http.post(`${apiUrl}/auth/login`, JSON.stringify(user), { headers: this.headers });
    }

    createUser(user) {
        return this.http.post(`${apiUrl}/auth/register`, JSON.stringify(user), { headers: this.headers });
    }

    logout() {
        this.loggedIn.next(false);
        window.localStorage.removeItem("id_token");
    }

    isAuthenticated() {
        try {
            let token = this.getToken();
            if (token && token !== "undefined") {
                return true;
            }

            return false;
        } catch (err) {
            return false;
        }
    }

    isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    setToken(authResult) {
        window.localStorage.setItem("id_token", authResult.access_token);
    }

    getToken() {
        return window.localStorage.getItem("id_token");
    }

    getProfile() {
        const token = this.getToken();
        if (token && token !== "undefined") {
            return jwtDecode(token);
        } else {
            return null;
        }
    }

    getUserName() {
        let profile = this.getProfile();
        return profile &&
            profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
            ? profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
            : "";
    }

    getLoginName() {
        let profile = this.getProfile();
        return profile && profile["loginName"] ? profile["loginName"] : "";
    }

    getUserId() {
        let profile = this.getProfile();
        return profile && profile["id"] ? profile["id"] : undefined;
    }

    getEmailId() {
        let profile = this.getProfile();
        return profile && profile["email"] ? profile["email"] : undefined;
    }

    isAdmin() {
        let profile = this.getProfile();
        return profile && profile["isAdmin"] ? profile["isAdmin"] : false;
    }
}
