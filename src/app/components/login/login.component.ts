import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { Message } from 'primeng/api';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }
    user: UserModel = new UserModel();
    msgs: Message[] = [];

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['home']);
        }
    }

    handleLoginClick() {
        this.msgs = [];
        if (!this.user.password)
            this.msgs.push({ severity: 'error', summary: "Please enter password" });

        if (!this.user.email || this.user.email.trim() === '')
            this.msgs.push({ severity: 'error', summary: "Please enter email" });

        this.authService.getUser(this.user)
            .subscribe((res: any) => {
                if (res.access_token) {
                    this.authService.setToken(res);
                    this.router.navigate(['home']);
                }
                else {
                    this.msgs.push({ severity: 'error', summary: 'Login failed' })
                }
            },
                error => {
                    console.log(error)
                });
    }

    toRegister(e) {
        e.preventDefault();
        this.router.navigate(['register']);
    }

}