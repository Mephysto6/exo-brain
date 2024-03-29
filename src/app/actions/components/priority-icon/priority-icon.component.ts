import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-priority-icon',
  templateUrl: './priority-icon.component.html',
  styleUrls: ['./priority-icon.component.scss'],
})
export class PriorityIconComponent implements OnInit {

  @Input() priority !: number ;

  constructor() { }

  ngOnInit() {}

}
