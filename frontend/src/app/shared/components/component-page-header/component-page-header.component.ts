import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '@app/core/services';
import { UtilityService } from '@app/core/services/utility/utility.service';
import { fadeInOut } from '@app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kps-component-page-header',
  templateUrl: './component-page-header.component.html',
  styleUrls: ['./component-page-header.component.scss']
})
export class ComponentPageHeaderComponent implements OnInit, OnDestroy {
  segments: { label: string, path: string }[];
  routerEventsSubscriber: Subscription;
  constructor(private router: Router, private homeService: HomeService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.createBreadcrumbs();
    this.updateChildName();
    this.routerEventsSubscriber = this.router.events.subscribe(_ => {
      this.createBreadcrumbs();
      this.updateChildName();
    });
  }

  createBreadcrumbs() {
    this.segments = [];
    const segments = this.router.url.split('/');
    segments.splice(0, 2);
    segments.forEach((segment, i) => {
      this.segments.push(
        { label: segment, path: this.segments[i - 1] ? this.segments[i - 1].path + '/' + segment : segment }
      );
    });
  }

  updateChildName() {
    const segments = this.router.url.split('/');
    segments.splice(0, 2);
    this.utilityService.tick_then(() => {
      this.homeService.updateChild(segments[0]);
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscriber.unsubscribe();
  }

}
