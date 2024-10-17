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

  public show_update : any = {} ;
  constructor(
    public actionService : ActionsService,
    private router : Router,
  ) {
  }

  async ngOnInit() {
    this.actionService.temp_ids_list = await this.actionService.get_ids_list();
    this.actionService.temp_action_list = await this.actionService.getActionList(this.actionService.temp_ids_list);
    this.actionService.temp_categories_list = await this.actionService.get_categories_list();
    for (let category of this.actionService.categories) {
      this.show_update[category] = false ;
    }

  }

  async handleReorderActions(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    var order_1 = ev.detail.from ;
    var order_2 = ev.detail.to ;
    // swapping the two in the ids_list order
    // (copying the array)
    var new_ids_list = Object.assign([], this.actionService.temp_ids_list) ;
    console.log('start list', new_ids_list)
    this.actionService.temp_ids_list[order_1] = new_ids_list[order_2] ;
    this.actionService.temp_ids_list[order_2] = new_ids_list[order_1] ;
    console.log('result list', this.actionService.temp_ids_list)
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
    console.log('finished handling')
  }

  async handleReorderCategories(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    var order_1 = ev.detail.from ;
    var order_2 = ev.detail.to ;
    // swapping the two in the ids_list order
    // (copying the array)
    var new_categories_list = Object.assign([], this.actionService.temp_categories_list) ;
    console.log('start list', new_categories_list)
    this.actionService.temp_categories_list[order_1] = new_categories_list[order_2] ;
    this.actionService.temp_categories_list[order_2] = new_categories_list[order_1] ;
    console.log('result list', this.actionService.temp_categories_list)
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
    console.log('finished handling')
  }

  // BACK button's function : clear the temp ids_list & return to /preparation
  back() {
    this.actionService.temp_ids_list = [] ;
    console.log('clicked on back button')
    this.router.navigate(["preparation"]) ;
    this.actionService.refresh() ;
  }
  // CONFIRM button's funtion : apply temp_ids_list to the real list & return to /preparation
  async confirm() {
    await this.actionService.set_ids_list(this.actionService.temp_ids_list) ;
    await this.actionService.set_categories_list(this.actionService.temp_categories_list) ;
    this.actionService.temp_ids_list = [] ;
    this.actionService.temp_categories_list = [] ;
    await this.actionService.clean_db();
    console.log('clicked on confirm button')
    this.router.navigate(["preparation"]) ;
    this.actionService.refresh() ;
  }

  async on_update_category(category: string, obj: any) {
    console.log("on_add_new_category obj : ", obj)
    console.log("on_add_new_category obj[category_name] : ", obj["category_name"])
    await this.actionService.updateCategory(category, obj["category_name"]) ;
  }

  on_click_edit_category(category: string) {
    this.show_update[category] = true ;
  }

  on_click_delete_category(category: string) {
    this.actionService.deleteCategory(category) ;
  }
}
