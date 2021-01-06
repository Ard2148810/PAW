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
  messageIsLoading: boolean;
  registerSuccessful: boolean;
  registerFailed: boolean;

  loadingMessage: string;
  responseMessage: string;
  errorMessage: string;

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
    this.messageIsLoading = false;
    this.registerSuccessful = false;
    this.registerFailed = false;
  }

  ngOnInit(): void {
  }

  onSubmit(userData: UserRegisterData): void {
    if (!userData.name || !userData.email  || !userData.password || !userData.username){
      this.registerFailed = true;
      this.errorMessage = 'Complete the rest of the form.';
      return;
    }

    this.registerFailed = false;
    this.registerSuccessful = false;
    this.messageIsLoading = true;
    this.loadingMessage = 'Please wait...';

    this.authenticationService.registerUser(userData).subscribe(response => {
      console.log(response);
      this.messageIsLoading = false;
      this.registerSuccessful = true;
      this.responseMessage = `Hello ${response.name}! You can log in now :)`;
    }, error => {
      this.messageIsLoading = false;
      this.registerFailed = true;
      this.errorMessage = `${error}`;
    });
  }

}

export interface UserRegisterData {
  username: string;
  name: string;
  email: string;
  password: string;
}
