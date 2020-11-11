import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegisterData } from './register/register.component';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  getContent(): any {
    return this.http.get('https://swapi.dev/api/films/');
  }

  registerUser(userRegisterData: UserRegisterData): any {
    const url = `${window.location.protocol}/signup`;
    const headers = {
      'content-type': 'application/json'
    };
    return this.http.post(url, JSON.stringify(userRegisterData), { headers });
  }

}
