import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "./profile.service";
import {Router} from "@angular/router";
import {User} from "../auth/registeration/registeration.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updateForm: FormGroup;

  user: User;

  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private router: Router) {}

  fetchUser() {
    this.user = new User();
    this.profileService.getUser()
      .subscribe((user) => {
        if(user){
          this.user.netId = user['username'];
          this.user.display_name = user['display_name'];
          this.user.email = user['email'];
          this.user.phone = user['phone'];
          this.user.dob = user['dob'];
          this.user.zipcode = user['zipcode'];
          this.user.avatar = user['avatar'];
          this.user.headline = user['headline'];
        }
      });
  }

  initForm(): void{
    this.updateForm = this.fb.group({
      name: ['', []],
      email: ['', [Validators.email]],
      phone: ['', [this.profileService.checkPhone]],
      zipcode: ['', [this.profileService.checkZipcode]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.initForm();
    this.fetchUser();
  }

  get updateName() { return this.updateForm.get('name'); }

  get updateEmail() { return this.updateForm.get('email'); }

  get updatePhone() { return this.updateForm.get('phone'); }

  get updateZipcode() { return this.updateForm.get('zipcode');}

  get updatePassword() { return this.updateForm.get('password');}

  onUpdate(): void{
    this.profileService.onUpdate(this.updateForm, this.user);
    this.initForm();
  }



  toMain(){
    this.router.navigate(['main']);
  }
}
