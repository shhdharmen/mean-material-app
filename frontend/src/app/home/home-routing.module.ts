import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { ChildAuthGuard } from '@appcore';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'task', loadChildren: './task/task.module#TaskModule' },
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
