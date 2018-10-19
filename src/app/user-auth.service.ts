import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public userData$ = new BehaviorSubject(null);
  constructor() {}

  setUserData(userData) {
    this.userData$.next(userData);
  }

  clearUserData() {
    this.userData$.next(null);
  }
}
