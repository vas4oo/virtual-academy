import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/users.service';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './components/register/register.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService as AuthGuard } from './guards/auth.guard';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { AlreadyLoggedGuard } from './guards/already-logged.guard';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PathNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    AlreadyLoggedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
