import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpService} from '../http.service';

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
    private http: HttpService
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
    console.log(userData);
    this.http.registerUser(userData).subscribe(result => {
      console.log(result);
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
