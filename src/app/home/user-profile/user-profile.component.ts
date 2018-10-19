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
  constructor(private _userAuth: UserAuthService) {}

  ngOnInit() {
    this.user$ = this._userAuth.userData$;
  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }
}
