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
  @Input() current_page !: string;


  constructor(
    public actionService : ActionsService,
  ) {

  }

  ngOnInit() {
    // this.action = await this.actionService.getActionDetails(Number(this.action_id))
  }

  make_pretty_time(minutes: number): string {
    if (minutes < 60) {
      return minutes + " min"
    }
    var hours = Math.floor(minutes / 60)
    return hours + "h" + minutes%60
  }
}
