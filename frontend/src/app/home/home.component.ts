import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'kps-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
  routes: { path: string, label: string }[];
  @ViewChild('drawer') drawer: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
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
      { path: '/home/dashboard', label: 'Dashboard' }
    ];
  }

  logout() {
    this.authService.logout();
    location.reload(true);
  }
}
