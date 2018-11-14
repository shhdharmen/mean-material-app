import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { routeAnimations, ROUTE_ANIMATIONS_ELEMENTS } from '@appcore';
import { TaskService } from '@appcore/services';
import { Task } from '@appcore/models';
import { NotificationService } from '@appcore/notifications/notification.service';
import { Observable, Subscription } from 'rxjs';
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

  constructor(private fb: FormBuilder, private taskService: TaskService, private notificationService: NotificationService,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.initForm();
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

  private initForm() {
    this.taskForm = this.fb.group({
      title: [null, Validators.required],
      description: null,
      descSameAsTitle: false,
      category: ['medium', Validators.required],
      module: ['client', Validators.required]
    });
    this.taskTitle.nativeElement.focus();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskForm.controls['title'].setValue(this.taskForm.controls['title'].value.trim());
      if (this.taskForm.controls['description'].value) {
        this.taskForm.controls['description'].setValue(this.taskForm.controls['description'].value.trim());
      }
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
    }
  }

  ngOnDestroy() {
    this.descSameAsTitleValueSubscriber$.unsubscribe();
  }
}
