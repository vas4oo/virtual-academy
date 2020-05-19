import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { Message } from 'primeng/api';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<UserModel> = new Array<UserModel>();
  loggedUserEmail = this.authService.getEmailId();
  loading: boolean = false;
  msgs: Message[] = [];
  faTimes = faTimes;
  faTrash = faTrash;

  constructor(private userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.loading = false;
        this.users = res.users;
      },
      error => {
        this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Can't get users" })
      }
    )
  }

  onDeactivateClick(user) {
    console.log(user)
  }

  onDeleteClick(user) {

  }

}
