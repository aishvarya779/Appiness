import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserAuthService } from '../user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient, private _userAuth: UserAuthService) {}

  register(user) {
    return this._http.post(`/register`, user);
  }

  userLogin(data) {
    return this._http.post(`/authenticate`, data).pipe(
      map((user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this._userAuth.setUserData(user);
        }
        return user;
      })
    );
  }
}
