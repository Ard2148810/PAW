import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  responseMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.registerForm = this.formBuilder.group({
      username: '',
      name: '',
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(userData: UserRegisterData): void {
    this.responseMessage = 'Please wait...';
    console.log(userData);
    this.authenticationService.registerUser(userData).subscribe(response => {
      console.log(response);
      this.responseMessage = `Hello ${response.user.name}! You can log in now.`;
    }, error => {
      this.responseMessage = `Something went wrong :( ${error.status}: ${error.statusText}`;
    });
  }

}

export interface UserRegisterData {
  username: string;
  name: string;
  email: string;
  password: string;
}
