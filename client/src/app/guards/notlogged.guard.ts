import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService} from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class NotLoggedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authenticationService.getCurrentUser();
    console.log(currentUser);
    return !Boolean(currentUser);
    // // return !Boolean(localStorage.getItem('userValue'));
    //
    // if (currentUser.username) {
    //   // logged in so return true
    //   return false;
    // }
    //
    // // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // // and return false
    // return true;
  }
}
