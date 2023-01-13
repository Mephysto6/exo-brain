import { DateObjectI } from "../interfaces/date-object-i";

export class DateObject implements DateObjectI {

  year = 0;
  month = 0;
  day = 0 ;
  hour = 0;
  minute = 0;
  
  constructor(obj?: Partial<DateObject>) {
    if (obj) {
      //  take new values from obj and assign to this
      Object.assign(this, obj)
    }
  }
}
