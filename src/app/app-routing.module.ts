import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

const routes: Routes = [
  {path : '' , component: LoginPageComponent},
  {path : 'Login' , component: LoginPageComponent},
  {path : 'Registration' ,component: RegistrationPageComponent},
  {path : 'Dashboard' ,component: DashboardComponent},
  {path : 'Logout' ,component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginPageComponent , RegistrationPageComponent,DashboardComponent,LogoutComponent]
