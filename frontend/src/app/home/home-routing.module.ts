import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ChildAuthGuard } from '@appcore';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'task', loadChildren: './task/task.module#TaskModule' },
      { path: '', redirectTo: 'task', pathMatch: 'full' }
    ], canActivateChild: [ChildAuthGuard]
  },
  { path: '', redirectTo: 'home/task', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
