import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'src/app/core/models/action';
import { ActionsService } from 'src/app/shared/services/actions.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // sqlite: any;

  // action_list_str : string[] = [] ;
  // action_list : Action[] = [] ;

  // id_counter !: number;
  // public collection!: Action[];

  // public new_action_list!: Action[];
  public ids !: Number[] ;
  public action_list !: Action[] ;
  public debug !: any ;


  constructor(
    private actionService : ActionsService,
    private router : Router,
  ) {
    // this.new_action_list = this.actionService.getActionList()
    // console.log("constructor", this.new_action_list) ;

  }

  async ngOnInit() {
    // var id_counter_str = await this.actionService.get("id_counter") ;
    // this.actionService.set('actions', 'this is an action')
    // var result = this.actionService.get('actions') ;
    // console.log("actions", result) ;
    // this.debug = result ;
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

  async add_value() {
    await this.actionService.set("ids", '[1]') ;
    console.log("added value") ;
  }

  async get_value() {
    this.debug = await this.actionService.get("1") ;
    console.log("got value : ", await this.debug) ;
  }

  async get_testing() {
    this.debug = await this.actionService.get_keys() ;
  }

  async clickAction(id: number) {
    console.log("clickAction", id) ;
    const now = new Date();
    var date_string = this.make_date(now) ;
    var current_action_str = await this.actionService.get(String(id)) ;
    var current_action = JSON.parse(current_action_str) ;
    current_action["last_done"] = date_string
    current_action_str = JSON.stringify(current_action)
    this.actionService.set(String(id), current_action_str)

    this.refresh()

    console.log("clickAction current_action_str : ", current_action_str) ;

  }



  make_date(date :Date) : String {
    var date_string = date.toLocaleString() ;
    var total_date = date_string.split(" ") ;
    // 12/30/2022
    var date_day = total_date[0] ;
    // 4:08:32
    var date_hour = total_date[1] ;
    //  PM
    var date_halfday = total_date[2] ;
    // var date_day
    var month = date_day.split("/")[0]
    var day = date_day.split("/")[1]
    var year = date_day.split("/")[2].split(",")[0]
    var hour = date_hour.split(":")[0]
    if (date_halfday == "PM") {
      hour = String ( Number(hour) + 12 );
    }
    var minute = date_hour.split(":")[1]

    var my_date = year + "Y - " + month + "M - " + day + "D - " + hour + ":" + minute;
    console.log("my_date", my_date) ;
    return my_date ;
  }

}
