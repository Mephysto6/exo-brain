import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsService } from 'src/app/shared/services/actions.service';

@Component({
  selector: 'app-page-action-view',
  templateUrl: './page-action-view.component.html',
  styleUrls: ['./page-action-view.component.scss'],
})
export class PageActionViewComponent implements OnInit {

  // public ids !: Number[] ;
  // public action_list !: Action[] ;
  public debug !: any ;
  public refreshed : boolean = false ;
  // public view : string = "Actions" ;

  constructor(
    public actionService : ActionsService,
    private router : Router,
  ) { }

  async ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.actionService.refresh() ;
  }

  async segmentChanged(ev: any) {
    console.log("segment change : ", ev)
    console.log("event.detail : ", ev.detail)
    console.log("event.detail.value : ", ev.detail.value)
    await this.actionService.switchCurrentView(ev.detail.value);
  }
  // async refresh() {
  //   var ids_str = await this.actionService.get("ids") ;
  //   this.ids = await JSON.parse(ids_str) ;
  //   this.action_list = await this.actionService.getActionList() ;
  // }

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

  // public refreshing() {
  //   this.refreshed = true ;
  // }
}
