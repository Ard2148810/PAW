import {Component, Injectable, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../entities/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.sass']
})

export class NavigationBarComponent implements OnInit {
  userObservable: Observable<User>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.userObservable = this.authenticationService.getCurrentUserObservable();
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
