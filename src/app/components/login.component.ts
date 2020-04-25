import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserLoginModel } from '../models/user-login.model';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private authService: AuthService) { }
    user: UserLoginModel = new UserLoginModel();

    handleLoginClick() {
        this.authService.login(this.user);
    }

}