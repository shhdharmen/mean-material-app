import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '@appcore';

@Component({
  selector: 'mma-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [routeAnimations]
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
