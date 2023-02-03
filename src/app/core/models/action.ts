// import { Repetition } from "../enums/enum-repetition";
import { ActionI } from "../interfaces/action-i";

export class Action implements ActionI {

  id = 0;
  name!: string;
  time = 15 ;
  priority = 0;
  repetition = "ONCE";
  repetition_hour = 0;
  repetition_day = 0;
  creation_date = "2022Y - 12M - 1D - 00:00";
  last_done = "2022Y - 12M - 1D - 16:00";
  category !: string ;

  constructor(obj?: Partial<Action>) {
    if (obj) {
      //  take new values from obj and assign to this
      Object.assign(this, obj)
    }
  }
}
