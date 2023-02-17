import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'src/app/core/models/action';
import { ActionsService } from 'src/app/shared/services/actions.service';

@Component({
  selector: 'app-page-action-list',
  templateUrl: './page-action-list.component.html',
  styleUrls: ['./page-action-list.component.scss'],
})
export class PageActionListComponent implements OnInit {

  // public ids !: Number[] ;
  // public action_list !: Action[] ;
  public debug !: any ;

  constructor(
    public actionService : ActionsService,
    private router : Router,
  ) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    await this.actionService.refresh() ;
  }

  goToEdit(id: number) {
    console.log("click") ;
    // rediriger vers /orders/edit/{id}
    this.router.navigate(['actions', 'edit', id])
  }

  async segmentChanged(ev: any) {
    console.log("segment change : ", ev)
    console.log("event.detail : ", ev.detail)
    console.log("event.detail.value : ", ev.detail.value)
    await this.actionService.switchCurrentView(ev.detail.value);
  }

  async on_add_new_category(obj: any) {
    console.log("on_add_new_category obj : ", obj)
    console.log("on_add_new_category obj[category_name] : ", obj["category_name"])
    var new_category = obj["category_name"] ;
    await this.actionService.addNewCategory(new_category) ;
    this.actionService.category_folded[new_category] = true ;
  }

  // async clickAction(id: number) {
  //   console.log("clickAction", id) ;
  //   const now = new Date();
  //   var date_string = this.actionService.make_date(now) ;
  //   var current_action_str = await this.actionService.get(String(id)) ;
  //   var current_action = JSON.parse(current_action_str) ;
  //   current_action["last_done"] = date_string
  //   current_action_str = JSON.stringify(current_action)
  //   this.actionService.set(String(id), current_action_str)

  //   this.actionService.refresh()

  //   console.log("clickAction current_action_str : ", current_action_str) ;

  // }

}
