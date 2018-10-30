import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '@app/shared';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ],
  declarations: [LoginComponent, AccountComponent]
})
export class AccountModule { }
