// import { Repetition } from "../enums/enum-repetition";
import { ActionI } from "../interfaces/action-i";

export class Action implements ActionI {

  id = 0;
  name!: string;
  time = 15 ;
  priority = 0;
  repetition = "ONCE";
  repetition_hour = "00:00";
  repetition_day = 0;
  creation_date = "2022/12/31T23:59";
  last_done = "Never";
  category = "No category" ;

  constructor(obj?: Partial<Action>) {
    if (obj) {
      //  take new values from obj and assign to this
      Object.assign(this, obj)
    }
  }
}
