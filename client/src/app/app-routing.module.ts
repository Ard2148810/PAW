import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotLoggedGuard } from './guards/notlogged.guard';
import { LoggedGuard } from './guards/logged.guard';
import {BoardComponent} from './components/board/board.component';
import {PublicBoardComponent} from './components/public-board/public-board.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotLoggedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedGuard] },
  { path: 'board/:id', component: BoardComponent, canActivate: [LoggedGuard] },
  { path: 'public-board/:id/:id2', component: PublicBoardComponent, canActivate: [LoggedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
