import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { FakeBackendInterceptor } from './fake-db/fake-backend';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor';
import { UserAuthService } from './user-auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MainLayoutModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    UserAuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
