import { NotificationService } from '@appcore/notifications/notification.service';
import { ConfirmDialogComponent } from '@app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { Task } from '@appcore/models';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
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
  displayedColumns = ['select', 'title', 'description', 'action'];
  dataMustBeUpdated = new EventEmitter<any>();
  constructor(private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private utilityService: UtilityService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataSource = new TaskListDataSource(this.paginator, this.sort, this.activatedRoute, this.taskService, this.dataMustBeUpdated);
    this.utilityService.tick_then(() => {
      this.dataSource.isLoadingResults$.subscribe(isLoadingResults => {
        this.isLoadingResults = isLoadingResults;
      });
    });
    const dataMutations = [
      this.paginator.page,
      this.sort.sortChange,
      this.dataMustBeUpdated
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

  delete(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: `Are you sure, you want to delete the task ${task.title}?`, confirm: true, cancelBtn: 'No', okBtn: 'Yes' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(task._id).subscribe(resp => {
          this.notificationService.success(resp.message);
          this.dataMustBeUpdated.emit();
        });
      }
    });
  }
}
