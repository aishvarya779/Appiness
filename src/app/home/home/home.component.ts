import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { MessageService } from '../../shared/services/message.service';
import { UserAuthService } from '../../user-auth.service';

@Component({
  selector: 'appi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private _homeService: HomeService,
    private _msgService: MessageService,
    private _userAuth: UserAuthService
  ) {}

  ngOnInit() {
    this._userAuth.userData$.subscribe(val => {
      console.log(val);
    });
    // this.getAllUsers();
  }

  public getAllUsers() {
    this._homeService.getAllUser().subscribe(
      res => {
        this._msgService.showSuccess('Data retrieved successfully');
      },
      err => {
        console.log(err);
        this._msgService.showError(err.error.message);
      }
    );
  }
}
