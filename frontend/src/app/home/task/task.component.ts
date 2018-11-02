import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '@app/core';

@Component({
  selector: 'kps-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [routeAnimations]
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
