import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { MessageService } from '../../shared/services/message.service';
@Component({
  selector: 'appi-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: any[];
  constructor(
    private _homeService: HomeService,
    private _msgService: MessageService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers() {
    this._homeService.getAllUser().subscribe(
      (res: any) => {
        this.users = res;
        this._msgService.showSuccess('Data retrieved successfully');
      },
      err => {
        this._msgService.showError(err.error.message);
      }
    );
  }
}
