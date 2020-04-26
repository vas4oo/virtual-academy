import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  user: UserModel = new UserModel();
  confirmPass: string;
  msgs: Message[] = [];

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  handleRegisterClick() {
    this.msgs = [];
    if (!this.user.password)
      this.msgs.push({ severity: 'error', summary: "Enter password" });

    if (!this.confirmPass)
      this.msgs.push({ severity: 'error', summary: "Enter Confirm password" });

    if (!this.user.password || !this.confirmPass || this.user.password.trim() !== this.confirmPass.trim())
      this.msgs.push({ severity: 'error', summary: "Passwords doesn't match" });

    if (!this.user.email || this.user.email.trim() === '')
      this.msgs.push({ severity: 'error', summary: "Please enter email" });

    if (!this.user.firstName || this.user.firstName.trim() === '')
      this.msgs.push({ severity: 'error', summary: "Please enter First name" });

    if (!this.user.lastName || this.user.lastName.trim() === '')
      this.msgs.push({ severity: 'error', summary: "Please enter Last name" });

    if (this.msgs.length === 0) {
      this.authService.createUser(this.user).subscribe(
        res => {
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Register completed you will be logged in' });
        },
        error => {
          if (error.status === 401) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Email already exist', detail: 'Validation failed' });
          }
        }
      );
    }
  }
}
