import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home.component';
import { SharedModule } from '@app/shared';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskListResolver } from '@app/core/resolvers';
import { TaskAddComponent } from './task/task-add/task-add.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TaskViewComponent } from './task/task-view/task-view.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [DashboardComponent, HomeComponent, TaskListComponent, TaskAddComponent, TaskEditComponent, TaskViewComponent],
  providers: [TaskListResolver]
})
export class HomeModule { }
