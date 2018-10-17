import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./main-layout/layout/layout.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth",
    pathMatch: "full"
  },
  {
    path: "",
    component: AppComponent,
    children: [
      {
        path: "auth",
        loadChildren: "./auth/auth.module#AuthModule"
      }
    ]
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "home",
        loadChildren: "./home/home.module#HomeModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
