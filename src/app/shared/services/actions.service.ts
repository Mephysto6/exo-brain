import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { readFileSync, writeFileSync, promises as fsPromises } from 'fs';
import { Action } from 'src/app/core/models/action';
// import database from 'src/assets/database.json' ;
// '../../assets/database.json' ;
// import * as fs from 'fs';
// const fs = require('fs');
// const database = require('src/assets/database.json');
// import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private _storage: Storage | null = null;
  public ids !: Number[] ;
  public action_list !: Action[] ;
  public temp_ids_list !: number[] ;

  // attributes for each db column incl. id
  // make new service for db interactions
  // private dbReady = new BehaviorSubject(false) ;
  // private dbName = "" ;

  // current keys :
  //  ids : list of all IDs of actions currently saved
  //  each id (number) : a json acting for an Action
  //  ?columns : list of the attributes of Actions
  //  settings : list of the settings names
  //  each of the settings name : just the value necessary

  constructor(private storage: Storage) {
    console.log('constructor');
    this.init();
   }

  async init() {
    console.log('init');
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    // await this.storage.defineDriver() ;
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //  base setter and getter
  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }
  public async get(key: string) {
    return await this._storage?.get(key)
  }

  // get database keys
  public async get_keys() {
    return await this._storage?.keys()
  }

  // clear all keys
  public async clear_keys() {
    await this._storage?.clear();
  }

  // id counter
  public async get_id_counter(): Promise<number> {
    var key_list = await this._storage?.keys()
    console.log("key_list : ", key_list)
    if (!(key_list)) {
      key_list = [] ;
      console.log("no key list ")
    }
    if (!(key_list.includes("id_counter"))) {
      console.log("id_counter not in key_list ")
      this.set("id_counter", "0")
    }
    var id_counter_str = await this.get("id_counter") ;
    var id_counter = JSON.parse(id_counter_str) ;
    console.log("id_counter : ", id_counter)
    return id_counter
  }
  public async increment_id_counter(): Promise<void> {
    var current_counter = await this.get_id_counter() ;
    console.log("current_counter : ", current_counter)
    var new_counter = current_counter +1 ;
    console.log("new_counter : ", new_counter)
    await this.set("id_counter", String(new_counter)) ;
  }

  // id list
  public async get_ids_list(): Promise<number[]> {
    var key_list = await this._storage?.keys()
    console.log("key_list : ", key_list)
    if (!(key_list)) {
      key_list = [] ;
      console.log("no key list ")
    }
    if (!(key_list.includes("ids"))) {
      console.log("ids not in key_list ")
      this.set("ids", "[]")
    }
    var ids_list_str = await this.get("ids") ;
    var ids_list = JSON.parse(ids_list_str) ;
    console.log("ids_list : ", ids_list)
    return ids_list
  }
  public async set_ids_list(ids_list: number[]): Promise<void> {
    var ids_list_str = JSON.stringify(ids_list) ;
    await this.set("ids", ids_list_str) ;
  }

  // action by id
  public async get_action_by_id(id:number): Promise<Action> {
    var action_str = await this.get(String(id)) ;
    var action = new Action(JSON.parse(action_str)) ;
    return action
  }
  public async set_action_by_id(id:number, action: Action): Promise<void> {
    var action_str = JSON.stringify(action) ;
    await this.set(String(id), action_str) ;
  }

  // settings
  public async get_settings_list(): Promise<string[]> {
    var settings_list_str = await this.get("settings") ;
    var settings_list = JSON.parse(settings_list_str) ;
    return settings_list
  }
  public async get_setting_by_name(setting_name:string): Promise<string> {
    var setting_value = await this.get(setting_name) ;
    return setting_value
  }
  public async set_setting_by_name(setting_name:string, setting_value:string): Promise<void> {
    await this.set(setting_name, setting_value) ;
  }

  // business functions

  async refresh() {
    var ids_str = await this.get("ids") ;
    this.ids = await JSON.parse(ids_str) ;
    this.action_list = await this.getActionList() ;
  }

  async createAction(partial_action : Partial<Action>) {
    console.log('createAction');
    // give the new action an id
    await this.increment_id_counter() ;
    partial_action.id = await this.get_id_counter() ;
    // add the id to the list
    var ids_list = await this.get_ids_list() ;
    ids_list.push(partial_action.id) ;
    await this.set_ids_list(ids_list) ;
    // give the action a creation date
    var date_string = this.make_date(new Date()) ;
    partial_action.creation_date = date_string;
    // give the action an order n#
    partial_action.order = ids_list.length - 1 ;
    // create the Action
    var action = new Action(partial_action) ;
    await this.set_action_by_id(action.id, action) ;

    await this.refresh() ;
    // var new_action = new Action(action) ;
    // if (new_action.id == 0) {
    //   new_action.id = id_counter ;
    //   id_counter ++ ;
    //   await this.set("id_counter", id_counter) ;
    // }
    // actions_list[new_action.id] = JSON.stringify(new_action);
    // actions_list_str = JSON.stringify(actions_list);
    // await this.set("actions", actions_list_str) ;
  }

  async getActionDetails(id: number) : Promise<Action> {
    console.log('getActionDetails');
    var current_action_str = await this.get(String(id)) ;
    var current_action = new Action(JSON.parse(current_action_str)) ;
    return current_action
  }

  async getActionList() : Promise<Action[]>{
    console.log('getActionList');
    var ids_list = await this.get_ids_list() ;
    var action_list = [] ;
    for (let id of ids_list) {
      var current_action_str = await this.get(String(id)) ;
      var current_action = new Action(JSON.parse(current_action_str)) ;
      action_list.push(current_action)
    }
    return action_list
  }

  async updateAction(id: number, action : Partial<Action>) {
    var stored_action = await this.get_action_by_id(id) ;
    Object.assign(stored_action, action)
    await this.set_action_by_id(id, stored_action) ;
    await this.refresh() ;
    // get id, update the id, set id
  }

  async deleteAction(id: number) {
    // remove id from ids_list
    var ids_list = await this.get_ids_list()
    const index = ids_list.indexOf(id)
    if (index > -1) {
      ids_list.splice(index, 1);
    }
    await this.set_ids_list(ids_list)
    // remove the key of id
    await this._storage?.remove(String(id));
    await this.refresh() ;
  }

  async clickAction(id: number) {
    console.log("clickAction", id) ;
    const now = new Date();
    var date_string = this.make_date(now) ;
    var current_action_str = await this.get(String(id)) ;
    var current_action = JSON.parse(current_action_str) ;
    current_action["last_done"] = date_string
    current_action_str = JSON.stringify(current_action)
    this.set(String(id), current_action_str)
    this.refresh()
    console.log("clickAction current_action_str : ", current_action_str) ;
  }


  // not database-related

  make_date(date :Date) : string {
    var date_string = date.toLocaleString('en-GB') ;
    console.log("date_string : ", date_string) ;
    var total_date = date_string.split(" ") ;
    // 12/30/2022
    var date_day = total_date[0] ;
    // 4:08:32
    var date_hour = total_date[1] ;
    //  PM
    var date_halfday = total_date[2] ;
    // var date_day
    var day = date_day.split("/")[0]
    var month = date_day.split("/")[1]
    var year = date_day.split("/")[2].split(",")[0]
    var hour = date_hour.split(":")[0]
    console.log("hour : ", hour) ;

    if (hour == "12") {
      if (date_halfday == "AM") {
        hour = "00";
      }
      if (date_halfday == "PM") {
        hour = "12";
      }
    }
    else if (date_halfday == "PM") {
      hour = String ( Number(hour) + 12 );
    }

    var minute = date_hour.split(":")[1]

    var my_date = year + "Y - " + month + "M - " + day + "D - " + hour + ":" + minute;
    console.log("my_date", my_date) ;
    return my_date ;
  }


  // private collection$ !: Observable<Action[]> ;
  // private url_api = environment.url_api ;

  // // constructor(private http: HttpClient) {
  // //   this.collection = this.http.get<Action[]>(`${this.url_api}/actions`) ;
  // // }

  // // getter
  // get collection() : Observable<Action[]> {
  //   return this.collection$ ;
  // }
  // // setter
  // set collection(collec: Observable<Action[]>) {
  //   this.collection$ = collec ;
  // }

  // observable (donc à utiliser avec this.orderService.add(item).subcribe() )
  // public add(item: Action) : Observable<Action> {
  //   return this.http.post<Action>(`${this.url_api}/actions`, item) ;
  // }

  // public getById(id: number) : Observable<Action> {
  //   return this.http.get<Action>(`${this.url_api}/actions/${id}`)
  // }

  // public update(obj: Action) : Observable<Action> {
  //   return this.http.put<Action>(`${this.url_api}/actions/${obj.id}`, obj)
  // }

}
