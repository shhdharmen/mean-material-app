import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '@appcore';

@Component({
  selector: 'mma-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [routeAnimations]
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
