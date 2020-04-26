import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }
  userName: string;

  ngOnInit(): void {
    let profile = this.authService.getProfile();
    this.userName = profile.firstName;
  }

}
