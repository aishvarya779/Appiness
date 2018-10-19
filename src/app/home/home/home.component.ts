import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { HomeService } from '../home.service';
import { MessageService } from '../../shared/services/message.service';
import { UserAuthService } from '../../user-auth.service';
import { UserListComponent } from '../user-list/user-list.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'appi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public componentRef;
  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  container;
  constructor(
    private _homeService: HomeService,
    private _msgService: MessageService,
    private _userAuth: UserAuthService,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this._userAuth.userData$.subscribe(val => {
      console.log(val);
      if (val && val.role === 'Admin') {
        const factory = this.resolver.resolveComponentFactory(
          UserListComponent
        );
        this.componentRef = this.container.createComponent(factory);
      } else {
        const factory = this.resolver.resolveComponentFactory(
          UserProfileComponent
        );
        this.componentRef = this.container.createComponent(factory);
      }
    });
    // this.getAllUsers();
  }

  ngOnDestroy() {
    this.componentRef.destroy();
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
