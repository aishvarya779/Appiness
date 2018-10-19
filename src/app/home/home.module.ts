import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent, UserListComponent, UserProfileComponent],
  entryComponents: [UserListComponent, UserProfileComponent]
})
export class HomeModule {}
