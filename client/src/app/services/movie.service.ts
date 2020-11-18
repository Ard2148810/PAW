import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegisterData } from '../components/register/register.component';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) { }

  getContent(): any {
    return this.http.get('https://swapi.dev/api/films/');
  }

}
