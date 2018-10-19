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
    this.userData$ = this._userAuth.userData$;
    this.userData$.subscribe(data => {
      if (data) {
        console.log(data);
        this.userData = data;
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._router.navigate(['/']);
  }
}
