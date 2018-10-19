import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public userData$ = new BehaviorSubject(null);
  constructor() {
    const cUser = JSON.parse(localStorage.getItem('currentUser'));
    if (cUser) {
      this.setUserData(cUser);
    }
  }

  setUserData(userData) {
    this.userData$.next(userData);
  }

  clearUserData() {
    this.userData$.next(null);
  }
}
