import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '../core/models/action';
import { ActionsService } from '../shared/services/actions.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public ids !: Number[] ;
  public action_list !: Action[] ;
  public debug !: any ;

  constructor(
    private actionService : ActionsService,
    private router : Router,
  ) {
    // this.new_action_list = this.actionService.getActionList()

  }

  ngOnInit(): void {
  }

  async refresh() {
    var ids_str = await this.actionService.get("ids") ;
    this.ids = await JSON.parse(ids_str) ;
    this.action_list = [] ;
    for (let id of this.ids) {
      var new_action_str = await this.actionService.get(String(id)) ;
      var new_action = await JSON.parse(new_action_str) ;
      this.action_list.push(new Action(new_action))
    }
  }

  // add_action(action : Action) {
  //   if (action.id = 0) {
  //     action.id = this.id_counter ;
  //     this.id_counter ++ ;
  //   }
  //   this.action_list.push(action) ;
  // }

  // edit_action(id:number, action: Action) {
  //   for (let i = 0; i < this.action_list.length; i++) {
  //     if (this.action_list[i].id = id) {
  //       this.action_list[i] = action
  //     }
  //   }
  // }

  // delete_action(id: number) {
  //   for (let i = 0; i < this.action_list.length; i++) {
  //     if (this.action_list[i].id = id) {
  //       this.action_list.splice(i, 1)
  //     }
  //   }
  // }
}
