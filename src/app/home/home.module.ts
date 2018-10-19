import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    SharedModule,
    MatListModule
  ],
  declarations: [HomeComponent, UserListComponent, UserProfileComponent],
  entryComponents: [UserListComponent, UserProfileComponent]
})
export class HomeModule {}
