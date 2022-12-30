import { Component, OnInit } from '@angular/core';
import { ActionsService } from 'src/app/shared/services/actions.service';

@Component({
  selector: 'app-button-refresh',
  templateUrl: './button-refresh.component.html',
  styleUrls: ['./button-refresh.component.scss'],
})
export class ButtonRefreshComponent implements OnInit {

  constructor(
    public actionService : ActionsService,
  ) { }

  ngOnInit() {}

}
