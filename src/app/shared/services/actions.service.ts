import { Injectable, Optional } from '@angular/core';
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
  public temp_ids_list !: number[] ;

  public action_list !: Action[] ;

  public categories !: string[] ;
  public temp_categories_list !: string[] ;

  public current_view : string = "Actions" ;
  public category_folded : { [name: string]: boolean } = {"No category": true} ;

  public days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] ;

  public settings_index = [0, 1, 2] ;
  public settings_list = ["mode", "text size", "colour customisation"] ;
  public settings_values : any[] = ["dark", 12, "background-ffffff/p0-rrrrrr/p1-oooooo/p2-jjjjjj/p3-bbbbbb"];
  public settings_default_values : { [name: string]: any } = {
    "mode": "dark",
    "text-size": 12,
    "colour customisation": "background-ffffff/p0-rrrrrr/p1-oooooo/p2-jjjjjj/p3-bbbbbb",
  };
  public settings_possible_values : { [name: string]: any } = {
    "mode": ["dark", "wrong"],
    "text-size": [8, 10, 12, 14, 16],
    "colour customisation": [],
  };


  // current keys :
  //  id_counter : number - current highest id
  //  ids : number[] - list of all IDs of actions currently saved in order
  //  <each id> : json - a json acting as an Action
  //  categories : string[] - list of names (string) of each category
  //  settings : json - json of the settings names as keys, their values as values

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
    var key_list = await this._storage?.keys()
    // console.log("key_list : ", key_list)
    if (!(key_list)) {
      key_list = [] ;
      console.log("no key list ")
    }
    return key_list
  }

  // clear all keys
  public async clear_keys() {
    await this._storage?.clear();
  }

  // verifications
  public async check_key_is_stored(key: string, default_value: string): Promise<void> {
    var key_list = await this.get_keys()
    if (!(key_list.includes(key))) {
      console.log(key + " not in key_list ")
      await this.set(key, default_value)
    }
  }

  // id counter
  public async get_id_counter(): Promise<number> {
    await this.check_key_is_stored("id_counter", "0") ;
    var id_counter_str = await this.get("id_counter") ;
    var id_counter = JSON.parse(id_counter_str) ;
    // console.log("id_counter : ", id_counter)
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
    await this.check_key_is_stored("ids", "[]") ;
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
    await this.check_key_is_stored(String(id), "{}") ;
    var action_str = await this.get(String(id)) ;
    var action = new Action(JSON.parse(action_str)) ;
    return action
  }
  public async set_action_by_id(id:number, action: Action): Promise<void> {
    var action_str = JSON.stringify(action) ;
    await this.set(String(id), action_str) ;
  }

  // settings
  public async get_settings(): Promise<any> {
    await this.check_key_is_stored("settings", "{}") ;
    var settings_str = await this.get("settings") ;
    var settings = JSON.parse(settings_str) ;
    return settings
  }
  public async set_settings(settings: any): Promise<void> {
    var settings_str = JSON.stringify(settings) ;
    await this.set("settings", settings_str) ;
  }

  // categories
  public async get_categories_list(): Promise<string[]> {
    // await this.set("categories", "[]") ;
    await this.check_key_is_stored("categories", "[]") ;
    var categories_list_str = await this.get("categories") ;
    var categories_list = JSON.parse(categories_list_str) ;
    if (categories_list.length == 0) {
      categories_list.push("No category") ;
      await this.set_categories_list(categories_list) ;
    }
    console.log("db categories list : ", categories_list) ;
    return categories_list
  }
  public async set_categories_list(categories_list: string[]): Promise<void> {
    var categories_list_str = JSON.stringify(categories_list) ;
    await this.set("categories", categories_list_str) ;
  }
  public fold_unfold(category: string) {
    this.category_folded[category] = !this.category_folded[category]
  }


  // view
  public async get_current_view(): Promise<string> {
    await this.check_key_is_stored("current_view", "Actions") ;
    return await this.get("current_view") ;
  }
  public async set_current_view(current_view: string): Promise<void> {
    await this.set("current_view", current_view) ;
  }

  // ------- business functions -------------

  async refresh() {
    this.ids = await this.get_ids_list()
    this.action_list = await this.getActionList() ;
    this.categories = await this.get_categories_list() ;
    this.current_view = await this.get_current_view() ;
    var settings_json = await this.get_settings() ;
  }

  public closeAllCategories() {
    for (let category of this.categories) {
      this.category_folded[category] = true ;
    }
  }
  public openAllCategories() {
    for (let category of this.categories) {
      this.category_folded[category] = false ;
    }
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
    // create the Action
    var action = new Action(partial_action) ;
    await this.set_action_by_id(action.id, action) ;

    await this.refresh() ;
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
    var date_string = this.make_date(new Date()) ;
    var current_action = await this.getActionDetails(id) ;
    current_action.last_done = date_string
    await this.set_action_by_id(id, current_action) ;
    await this.refresh() ;
  }

  async unDone(id: number) {
    console.log("unDone", id) ;
    var this_action = await this.getActionDetails(id) ;
    this_action.last_done = this_action.creation_date ;
    await this.set_action_by_id(id, this_action) ;
    await this.refresh()
  }

  public async switchCurrentView(new_view?: string): Promise<void> {
    await this.refresh() ;

    if (new_view) {
      await this.set_current_view(new_view);
    }
    else {
      if (this.current_view == "Actions") {
        await this.set_current_view("Categories");
      }
      if (this.current_view == "Categories") {
        await this.set_current_view("Actions");
      }
    }

    await this.refresh() ;
  }


  public async addNewCategory(category_name: string): Promise<void> {
    var current_category_list = await this.get_categories_list() ;
    current_category_list.push(category_name) ;
    await this.set_categories_list(current_category_list) ;
    await this.refresh() ;
  }
  public async updateCategory(old_name: string, new_name: string): Promise<void> {
    // change the name of the category in the category list
    var current_category_list = await this.get_categories_list() ;
    for (let index in current_category_list) {
      if (current_category_list[index] == old_name) {
        current_category_list[index] = new_name ;
      }
    }
    await this.set_categories_list(current_category_list) ;
    // change the name of the category in the actions attributes
    var action_list = await this.getActionList() ;
    for (let action of action_list) {
      if (action.category == old_name) {
        action.category = new_name ;
        await this.updateAction(action.id, action) ;
      }
    }
    await this.refresh() ;
  }
  public async deleteCategory(category_name: string): Promise<void> {
    // remove the name of the category in the category list
    var current_category_list = await this.get_categories_list() ;
    const index_of_category = current_category_list.indexOf(category_name)
    if (index_of_category > -1) {
      current_category_list.splice(index_of_category, 1) ;
    }
    await this.set_categories_list(current_category_list) ;
    // change the name of the category to "No category" in the actions attributes
    var action_list = await this.getActionList() ;
    for (let action of action_list) {
      if (action.category == category_name) {
        action.category = "No category" ;
        await this.updateAction(action.id, action) ;
      }
    }
    await this.refresh() ;
  }

  public async changeSettingValue(setting: string, value: string): Promise<void> {
    var current_settings = await this.get_settings() ;
    current_settings[setting] = value ;
    await this.set_settings(current_settings) ;
  }
  public async resetSettings(): Promise<void> {
    var current_settings = await this.get_settings() ;
    for (let index of this.settings_index) {
      var setting_name = this.settings_list[index] ;
      var setting_value = this.settings_values[index] ;
      current_settings[setting_name] = setting_value ;
    }
    await this.set_settings(current_settings) ;
  }

  public async get_export(): Promise<string> {
    var database_json : any = {} ;
    var db_keys = await this.get_keys() ;
    for (let key of db_keys) {
      database_json[key] = await this.get(key) ;
    }
    return JSON.stringify(database_json) ;
  }
  public async set_import(database_str: string): Promise<void> {
    var database_json = JSON.parse(database_str) ;
    for (let key in database_json) {
      if(database_json.hasOwnProperty(key)){
        await this.set(key, database_json[key]) ;
      }
    }
  }

  // not database-related

  make_date(date :Date) : string {
    var date_string = date.toLocaleString('en-GB') ;
    // console.log("date_string : ", date_string) ;
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
    // console.log("hour : ", hour) ;

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
    // console.log("my_date", my_date) ;
    return my_date ;
  }

  get_day_from_number(day_in_num: number): string {
    return this.days[day_in_num]
  }
}
