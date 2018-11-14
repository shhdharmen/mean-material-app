import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subscription, BehaviorSubject } from 'rxjs';
import { Task } from '@appcore/models';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@appcore/services';


/**
 * Data source for the TaskList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TaskListDataSource extends DataSource<Task> {
  data: Task[];
  activatedRouteDataSubscriber: Subscription;
  private isLoadingResults_ = new BehaviorSubject(true);
  isLoadingResults$ = this.isLoadingResults_.asObservable();

  constructor(private paginator: MatPaginator,
    private sort: MatSort,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService) {
    super();
    this.activatedRouteDataSubscriber = this.activatedRoute.data.subscribe(data => {
      this.data = data.result.tasks;
      this.isLoadingResults_.next(false);
    });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Task[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      // observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults_.next(true);
        return this.taskService.getAll(
          this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults_.next(false);
        this.paginator.length = data.totalTasks;
        return data.tasks;
      }),
      catchError(() => {
        this.isLoadingResults_.next(false);
        return observableOf([]);
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.activatedRouteDataSubscriber.unsubscribe();
  }
}
