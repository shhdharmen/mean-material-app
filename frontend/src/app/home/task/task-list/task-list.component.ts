import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TaskListDataSource } from './task-list-datasource';
import { ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { TaskService } from '@app/core/services';
import { UtilityService } from '@app/core/services/utility/utility.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Task } from '@app/core/models';

@Component({
  selector: 'kps-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  routerAnimationClass = ROUTE_ANIMATIONS_ELEMENTS;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TaskListDataSource;
  isLoadingResults = true;
  selection = new SelectionModel<Task>(true, []);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'title', 'description'];

  constructor(private activatedRoute: ActivatedRoute, private taskService: TaskService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.dataSource = new TaskListDataSource(this.paginator, this.sort, this.activatedRoute, this.taskService);
    this.utilityService.tick_then(() => {
      this.dataSource.isLoadingResults$.subscribe(isLoadingResults => {
        // console.log(isLoadingResults);
        this.isLoadingResults = isLoadingResults;
      });
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
