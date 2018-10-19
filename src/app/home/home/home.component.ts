import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'appi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private _homeService: HomeService,
    private _msgService: MessageService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers() {
    this._homeService.getAllUser().subscribe(
      res => {
        console.log(res);
        this._msgService.showSuccess('Data retrieved successfully');
      },
      err => {
        console.log(err);
        this._msgService.showError(err.error.message);
      }
    );
  }
}
