import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [DashboardComponent, HomeComponent],
  providers: []
})
export class HomeModule { }
