import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TaskListDataSource } from './task-list-datasource';
import { ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@appcore';
import { TaskService } from '@appcore/services';
import { UtilityService } from '@appcore/services/utility/utility.service';
import { SelectionModel } from '@angular/cdk/collections';
import { merge } from 'rxjs';

@Component({
  selector: 'mma-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  routerAnimationClass = ROUTE_ANIMATIONS_ELEMENTS;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TaskListDataSource;
  isLoadingResults = true;
  isAllSelectedDb = false;
  selection = new SelectionModel<string>(true, []);
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
    const dataMutations = [
      this.paginator.page,
      this.sort.sortChange
    ];
    merge(...dataMutations).subscribe(_ => {
      this.selection.clear();
      this.isAllSelectedDb = false;
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
      this.dataSource.data.forEach(row => {
        this.selection.select(row._id);
      });
  }

  // toggle all records selection
  toggleAllSelectedDb() {
    this.isAllSelectedDb = !this.isAllSelectedDb;
  }

  onRowSelectionChange(ev: any, id: string) {
    if (ev) {
      this.selection.toggle(id);
      if (!this.selection.isSelected(id) || !this.isAllSelected()) {
        this.isAllSelectedDb = false;
      }
    }
  }
}
