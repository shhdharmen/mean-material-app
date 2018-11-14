import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { SharedModule } from '@app/shared';
import { TaskListResolver } from '@appcore/resolvers';
import { TaskComponent } from './task.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [TaskListComponent, TaskViewComponent, TaskAddComponent, TaskEditComponent, TaskComponent],
  providers: [TaskListResolver]
})
export class TaskModule { }
