import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'kps-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  routes: { path: string, label: string }[];
  @ViewChild('drawer') drawer: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.setMainRoutes();
  }

  closeDrawer() {
    const sub = this.isHandset$.subscribe(value => {
      if (value) {
        this.drawer.close();
        sub.unsubscribe();
      }
    });
  }

  setMainRoutes() {
    this.routes = [
      { path: '/login', label: 'Login' },
      { path: '/dashboard', label: 'Dashboard' }
    ];
  }
}
