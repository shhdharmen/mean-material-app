import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '@app/core';

@Component({
  selector: 'kps-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [routeAnimations]
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
