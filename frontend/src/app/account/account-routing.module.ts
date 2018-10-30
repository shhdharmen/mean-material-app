import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: 'account', component: AccountComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'account/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
