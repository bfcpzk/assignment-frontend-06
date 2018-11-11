import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterationComponent } from './auth/registeration/registeration.component';
import { FollowingComponent } from './main/following/following.component';
import { HeadlineComponent } from './main/headline/headline.component';
import { PostsComponent } from './main/posts/posts.component';
import { AppRoutingModule } from './/app-routing.module';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { CommentsComponent } from './main/posts/comments/comments.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    ProfileComponent,
    LoginComponent,
    RegisterationComponent,
    FollowingComponent,
    HeadlineComponent,
    PostsComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    CommonModule
  ],
  entryComponents:[
    CommentsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
