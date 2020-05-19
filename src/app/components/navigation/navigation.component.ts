import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnChanges {
  @Input() isAuthenticated: Observable<boolean>;
  routes: Array<RouteModel> = new Array<RouteModel>();
  url: string = '';

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.initRoutes();
  }

  ngOnChanges() {
    this.initRoutes();
  }

  initRoutes() {
    this.url = this.router.url;
    this.routes = [{ name: 'Login', path: 'login' }, { name: 'Register', path: 'register' }];
    if (this.isAuthenticated) {
      this.routes = [{ name: 'Home', path: 'home' }, { name: 'Courses', path: 'courses' }, { name: 'Profile', path: 'profile' }];
    }
    if (this.authService.isAdmin()) {
      this.routes.push({ name: 'Users', path: 'users' });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

class RouteModel {
  name: string;
  path: string;
}
