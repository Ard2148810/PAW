import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment} from '../../environments/environment';
import { User} from '../entities/user';
import { UserRegisterData } from '../components/register/register.component';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  // https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable
  private readonly currentUser: BehaviorSubject<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
  }

  public getCurrentUserValue(): User {
    return this.currentUser.value;
  }

  public getCurrentUserObservable(): Observable<User> {
    return this.currentUser;
  }

  registerUser(userRegisterData: UserRegisterData): any {
    const url = `${environment.backendURL}/auth/signup`;
    const headers = {
      'content-type': 'application/json'
    };
    return this.http.post(url, JSON.stringify(userRegisterData), { headers });
  }

  login(userName: string, userPassword: string): Observable<any> {
    const url = `${environment.backendURL}/auth/login`;
    const headers = {
      'content-type': 'application/json'
    };
    return this.http.post<any>(url, JSON.stringify({username: userName, password: userPassword}), {headers})
      .pipe(map(response => {
        // set current user
        console.log(response);
        const user = new User();
        user.id = response.id;
        user.username = response.username;
        user.name = response.name;
        user.email = response.email;
        user.token = response.token;
        // console.log(user);

        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.next(user);

        return response;
      }));
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }

}
