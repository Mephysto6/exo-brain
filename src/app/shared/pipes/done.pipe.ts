import { Pipe, PipeTransform } from '@angular/core';
import { Action } from 'src/app/core/models/action';
import { DateObject } from 'src/app/core/models/date-object';
import { ActionsService } from '../services/actions.service';


@Pipe({
  name: 'done'
})
export class DonePipe implements PipeTransform {

  months_days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30 ,31, 30, 31]

  constructor(
    public actionService : ActionsService,
  ) { }

  transform(action : Action): boolean {
    // console.log("transform")
    var done = false ;

    if (action.last_done === "Never") {
      return done;
    }
    // need to compare the "start" (last occurence of repetition) and the "current"
    const now = this.actionService.make_date(new Date());
    var current_date = this.make_date_object(now) ;
    var start = this.make_date_object(action.creation_date);
    var last_done = this.make_date_object(action.last_done) ;

    if (action.repetition == "ONCE") {
      // start = creation ;
      // do nothing
    }

    if (action.repetition == "DAILY") {
      start = Object.assign(new DateObject(), current_date) ;
      start.hour = Number(action.repetition_hour) ;
      start.minute = 0 ;

      if (current_date.hour < Number(action.repetition_hour)) {
        this.remove_one_day(start) ;
      } ;
    }

    if (action.repetition == "WEEKLY") {
      var start_fancy = new Date(
        start.year, start.month, start.day, start.hour, start.minute
      ) ;
      var now_fancy = new Date(
        current_date.year, current_date.month, current_date.day, current_date.hour, current_date.minute
      ) ;

      start = Object.assign(new DateObject(), current_date) ;
      start.hour = Number(action.repetition_hour) ;
      start.minute = 0 ;

      var start_day = start_fancy.getDay(); //  0 for sunday, 1 for monday, ..., 6 for saturday
      var now_day = now_fancy.getDay() ;

      console.log("start_fancy : ", start_fancy)
      console.log("now_fancy : ", now_fancy)
      console.log("start_day : ", start_day)
      console.log("action.repetition_day : ", action.repetition_day)
      if (start_day == Number(action.repetition_day)) {
        if (current_date.hour < Number(action.repetition_hour)) {
          for (let i=0 ; i<7 ; i++) {
            this.remove_one_day(start) ;
          }
        }
      }
      else {
        var go_back = now_day - Number(action.repetition_day) ;
        if (go_back < 0) go_back += 7 ;
        for (let i=0; i<go_back; i++) {
          this.remove_one_day(start) ;
        }
      }
    }
    console.log("action.creation_date : ", action.creation_date)
    console.log("action.repetition : ", action.repetition)
    console.log("start : ", start)
    console.log("last_done : ", last_done)
    console.log("current_date : ", current_date)
    console.log("this.is_earlier_than(start, last_done) : ", this.is_earlier_than(start, last_done))
    console.log("this.is_earlier_than(last_done, start) : ", this.is_earlier_than(last_done, start))

    if (this.is_earlier_than(start, last_done)) var done = true ;
    if (this.is_earlier_than(last_done, start)) var done = false ;
    // should not use last return statement
    // console.log("done : ", done)
    return done ;
  }

  is_earlier_than(date1: DateObject, date2: DateObject): boolean {
    if (date1.year < date2.year) return true ;
    if (date2.year < date1.year) return false ;

    if (date1.month < date2.month) return true ;
    if (date2.month < date1.month) return false ;

    if (date1.day < date2.day) return true ;
    if (date2.day < date1.day) return false ;

    if (date1.hour < date2.hour) return true ;
    if (date2.hour < date1.hour) return false ;

    if (date1.minute < date2.minute) return true ;
    if (date2.minute < date1.minute) return false ;

    // if both dates are equal
    return true ;
  }

  remove_one_day(input_date: DateObject) : void {
    input_date.day -= 1
    if (input_date.day == 0) {
      this.remove_one_month(input_date) ;
      input_date.day = this.months_days[input_date.month]
    }
  }

  remove_one_month(input_date: DateObject) : void {
    input_date.month  -= 1
    if (input_date.month == 0) {
      input_date.month = 12
      input_date.year  -= 1
    }
  }

  make_date_object(input_date: string): DateObject {
    var output_date = new DateObject() ;
    // input_date under the template of "2022/12/31T23:59"

    var split = input_date.split("/") ;
    var year = Number(split[0]) ; //  2022
    var month = Number(split[1]) ; //  12
    var sub_split = split[2].split("T") ;
    var day = Number(sub_split[0]); //  31
    var time = sub_split[1].split(":") ;
    var hour = Number(time[0]) ; //  23
    var minute = Number(time[1]) ; //  59

    output_date.year = year ;
    output_date.month = month ;
    output_date.day = day ;
    output_date.hour = hour ;
    output_date.minute = minute ;

    return output_date
  }
}
