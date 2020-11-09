import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {LoggedInGuard} from './guards/logged-in.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [LoggedInGuard]},
  {path: 'register', component: RegisterComponent, canDeactivate: [LoggedInGuard]},
  {path: 'login', component: LoginComponent, canDeactivate: [LoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
