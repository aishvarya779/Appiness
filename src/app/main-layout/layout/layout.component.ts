import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../user-auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'appi-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private userData$: Observable<any>;
  public userData: any;
  constructor(private _router: Router, private _userAuth: UserAuthService) {}

  ngOnInit() {
    this._userAuth.userData$.subscribe(val => {
      if (val) {
        this.userData = val;
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._userAuth.clearUserData();
    this._router.navigate(['/']);
  }
}
