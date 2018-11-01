import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '@app/core/services';
import { User } from '@app/core/models';
import { routeAnimations } from '@app/core';

@Component({
  selector: 'kps-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routeAnimations]
})
export class HomeComponent implements OnInit {
  title = 'Angular 7 List App';
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
    this.handleRoutes();
  }

  closeDrawer() {
    const sub = this.isHandset$.subscribe(value => {
      if (value) {
        this.drawer.close();
        sub.unsubscribe();
      }
    });
  }

  handleRoutes() {
    this.setMainRoutes();
  }

  setMainRoutes() {
    this.routes = [
      { path: '/home/dashboard', label: 'Dashboard' },
      { path: '/home/task', label: 'Tasks' }
    ];
  }

  logout() {
    this.authService.logout();
    location.reload(true);
  }

  returnFalse(ev: any) {
    ev.preventDefault();
    return false;
  }
}
