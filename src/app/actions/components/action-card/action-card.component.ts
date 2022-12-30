import { Component, Input, OnInit } from '@angular/core';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Action } from 'src/app/core/models/action';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent implements OnInit {

  @Input() action !: Action ;
  @Input() action_css !: string;
  @Input() action_page !: string;


  constructor(
    public actionService : ActionsService,
  ) {

  }

  ngOnInit() {
    // this.action = await this.actionService.getActionDetails(Number(this.action_id))
  }

}
