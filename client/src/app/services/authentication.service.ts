import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment} from '../../environments/environment';
import { User} from '../entities/user';
import {UserRegisterData} from '../components/register/register.component';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable
  private currentUser: BehaviorSubject<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
  }

  public getCurrentUser(): User {
    return this.currentUser.value;
  }

  registerUser(userRegisterData: UserRegisterData): any {
    const url = `${window.location.protocol}/auth/signup`;
    const headers = {
      'content-type': 'application/json'
    };
    return this.http.post(url, JSON.stringify(userRegisterData), { headers });
  }

  login(username: string, password: string): Observable<any> {
    console.log('username:', username, 'password:', password);
    return this.http.post<any>(`${environment.backendURL}/auth/login`, { username, password })
      .pipe(map(user => {
        // set current user
        console.log('HELLLLLLOOOOOOOOO');
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.next(user);
        return user;
      }));
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }

}
