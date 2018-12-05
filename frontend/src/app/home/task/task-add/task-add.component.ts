import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { routeAnimations, ROUTE_ANIMATIONS_ELEMENTS } from '@appcore';
import { TaskService } from '@appcore/services';
import { Task } from '@appcore/models';
import { NotificationService } from '@appcore/notifications/notification.service';
import { Observable, Subscription, of } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mma-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  animations: [routeAnimations]
})
export class TaskAddComponent implements OnInit, OnDestroy {
  routerAnimationClass = ROUTE_ANIMATIONS_ELEMENTS;
  taskForm: FormGroup;
  modules = [
    { name: 'Client', value: 'client' },
    { name: 'Client Admin', value: 'clientAdmin' },
    { name: 'Support', value: 'support' },
    { name: 'Support Admin', value: 'supportAdmin' },
    { name: 'Seller', value: 'seller' },
    { name: 'Seller Admin', value: 'sellerAdmin' }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  isHandset: boolean;
  isDescriptionSameAsTitle: boolean;

  descSameAsTitleValueSubscriber$: Subscription;

  @ViewChild('taskTitle') taskTitle: ElementRef;
  editing: boolean;
  taskId: any;

  constructor(private fb: FormBuilder, private taskService: TaskService, private notificationService: NotificationService,
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // we have to be sure, that form is ready
    this.initForm().subscribe(_ => {
      this.activatedRoute.queryParams.subscribe(params => {
        this.taskId = params['id'];
        if (this.taskId) {
          this.editing = true;
          this.fillForm();
        }
      });
    });
    this.isHandset$.subscribe(isHandset => {
      this.isHandset = isHandset;
    });
    this.handleDescVsTitle();
  }

  private handleDescVsTitle() {
    let titleValueSubscriber$: Subscription;
    this.descSameAsTitleValueSubscriber$ = this.taskForm.controls['descSameAsTitle'].valueChanges.subscribe(value => {
      if (value) {
        const titleValue = this.taskForm.controls['title'].value;
        this.taskForm.controls['description'].setValue(titleValue);
        titleValueSubscriber$ = this.taskForm.controls['title'].valueChanges.subscribe(_titleValue => {
          this.taskForm.controls['description'].setValue(_titleValue);
        });
      } else {
        if (titleValueSubscriber$) {
          titleValueSubscriber$.unsubscribe();
        }
      }
    });
  }

  private initForm(): Observable<null> {
    this.taskForm = this.fb.group({
      title: [null, Validators.required],
      description: null,
      descSameAsTitle: false,
      category: ['medium', Validators.required],
      module: ['client', Validators.required]
    });
    this.taskTitle.nativeElement.focus();
    return of(null);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskForm.controls['title'].setValue(this.taskForm.controls['title'].value.trim());
      if (this.taskForm.controls['description'].value) {
        this.taskForm.controls['description'].setValue(this.taskForm.controls['description'].value.trim());
      }
      if (!this.editing) {
        this.taskService.add(<Task>this.taskForm.value).subscribe(res => {
          if (res.success) {
            this.notificationService.success(res.message, this.isHandset);
            // to get rid of validation error, setting a blank space value
            this.taskForm.controls['title'].setValue(' ');
            this.taskTitle.nativeElement.focus();
            this.taskForm.controls['description'].setValue('');
          } else {
            this.notificationService.error(res.message, this.isHandset);
          }
        }, err => {
          console.log(err);
          this.notificationService.error(err, this.isHandset);
        });
      } else {
        this.taskService.update(this.taskId, this.taskForm.value).subscribe(resp => {
          this.notificationService.success(resp.message);
          this.router.navigateByUrl('home/task/list');
        });
      }
    }
  }

  private fillForm() {
    this.taskService.get(this.taskId).subscribe(resp => {
      // below we can handle error if length is more than 1
      const task = resp.tasks[0];
      this.taskForm.get('title').setValue(task.title);
      this.taskForm.get('description').setValue(task.description);
      this.taskForm.get('category').setValue(task.category);
      this.taskForm.get('module').setValue(task.module);
    });
  }

  ngOnDestroy() {
    this.descSameAsTitleValueSubscriber$.unsubscribe();
  }
}
