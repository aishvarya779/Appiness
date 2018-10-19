import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAuthService } from '../../user-auth.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'appi-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public user$: BehaviorSubject<any>;
  public user: any;
  constructor(private _userAuth: UserAuthService) {}

  ngOnInit() {
    this.user$ = this._userAuth.userData$;
    this.user$.subscribe(val => {
      this.user = val;
    });
  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }
}
