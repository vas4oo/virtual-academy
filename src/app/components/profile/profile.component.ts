import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users.service';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel = new UserModel();
  loading: boolean = false;
  msgs: Message[] = [];
  confirmPass: string;

  constructor(public userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    let userId = this.authService.getUserId();
    this.userService.getUser(userId).subscribe(
      (res: any) => {
        this.loading = false;
        this.user = res.user;
      },
      error => {
        this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: 'Error geting user' });
      }
    );
  }

  handleSaveClick() {
    if (this.user.firstName.trim() === '') {
      this.msgs.push({ severity: 'error', detail: 'Please enter first name' });
    }

    if (this.user.lastName.trim() === '') {
      this.msgs.push({ severity: 'error', detail: 'Please enter last name' });
    }

    if (this.user.password.trim() !== '' && this.confirmPass.trim() === '') {
      this.msgs.push({ severity: 'error', detail: 'If you want to change your password please enter Confirm password too' });
    }

    if (this.msgs.length > 0) {
      return;
    }

    this.loading = true;
    this.userService.updateUser(this.user).subscribe(
      (res: any) => {
        this.loading = false;
        if (res) {
          this.user.password = '';
          this.confirmPass = '';
        }
      },
      (error: any) => {
        this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: 'Error updating user' });
      }
    );
  }
}
