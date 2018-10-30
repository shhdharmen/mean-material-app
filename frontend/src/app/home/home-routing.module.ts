import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { ChildAuthGuard } from '@app/core';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskListResolver } from '@app/core/resolvers';
import { TaskViewComponent } from './task/task-view/task-view.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TaskAddComponent } from './task/task-add/task-add.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'task', component: TaskListComponent, resolve: {
          tasks: TaskListResolver
        }, children: [
          { path: 'view/:id', component: TaskViewComponent },
          { path: 'edit/:id', component: TaskEditComponent },
          { path: 'add', component: TaskAddComponent },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ], canActivateChild: [ChildAuthGuard]
  },
  { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
