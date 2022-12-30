import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-page-action-change',
  templateUrl: './page-action-change.component.html',
  styleUrls: ['./page-action-change.component.scss'],
})
export class PageActionChangeComponent implements OnInit {

  constructor(
    public actionService : ActionsService,
    private router : Router,
  ) { }

  ngOnInit() {}

  async handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    var order_1 = ev.detail.from ;
    var order_2 = ev.detail.to ;
    // swapping the two in the ids_list order
    var new_ids_list = await this.actionService.get_ids_list();
    var temp_id = new_ids_list[order_1] ;
    new_ids_list[order_1] = new_ids_list[order_2] ;
    new_ids_list[order_2] = temp_id ;
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
    console.log('finished handling')
  }
}
