import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TaskListDataSource } from './task-list-datasource';
import { ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'kps-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  routerAnimationClass = ROUTE_ANIMATIONS_ELEMENTS;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TaskListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title'];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = new TaskListDataSource(this.paginator, this.sort, this.activatedRoute);
    // this.homeService.updateChild(this.activatedRoute.snapshot.url.join(''));
  }
}
