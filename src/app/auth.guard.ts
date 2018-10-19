import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    if (url.indexOf('auth')) {
      if (localStorage.getItem('currentUser')) {
        this.router.navigate(['home']);
      }
      return true;
    }
    return false;
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // let url: string = state.url;
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/auth'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
