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

    // need to compare the "start" (last occurence of repetition) and the "current date"
    const my_now = this.actionService.make_date(new Date());
    var current_date = this.make_date_object(my_now) ;
    var last_done = this.make_date_object(action.last_done) ;
    var start = new DateObject();

    if (action.repetition == "ONCE") {
      // start = creation ;
      start = this.make_date_object(action.creation_date);
    }

    if (action.repetition == "DAILY") {
      // "start" begins as "current date" but at the time of repetition
      start = Object.assign(new DateObject(), current_date) ;
      start.hour = Number(action.repetition_hour.split(":")[0]) ;
      start.minute = Number(action.repetition_hour.split(":")[1]) ;

      // if the current time is before the day's repetition, then the last repetition was the day before
      if (this.is_earlier_than(current_date, start)) {
        this.remove_one_day(start) ;
      } ;
    }

    if (action.repetition == "WEEKLY") {
      // "start" begins as "current date" but at the time of repetition
      start = Object.assign(new DateObject(), current_date) ;
      start.hour = Number(action.repetition_hour.split(":")[0]) ;
      start.minute = Number(action.repetition_hour.split(":")[1]) -1 ;
      // the -1 minute is for things to reset on time T and not T + 1 minute
      if (start.minute < 0) {
        // console.log("start.minute < 0")
        start.minute += 60 ;
        start.hour -= 1 ;
        if (start.hour < 0) {
          // console.log("start.hour < 0")
          start.hour += 24 ;
          this.remove_one_day(start) ;
        }
      }

      // start.day must now be set as the previous day of repetition
      var start_fancy = new Date(start.year, start.month-1, start.day, start.hour, start.minute);
      var start_day = start_fancy.getDay(); //  0 for sunday, 1 for monday, ..., 6 for saturday

      // console.log("current_date : ", current_date)
      // console.log(" beginning start : ", start)
      // console.log("start_fancy : ", start_fancy)
      // console.log("start_day : ", start_day)
      // console.log("action.repetition_day : ", action.repetition_day)
      // if current day is the day of repetition, and if current time is before repetition time, the last repetition was last week
      if (start_day == action.repetition_day) {
        // console.log(" current day is the day of repetition")
        if (this.is_earlier_than(current_date, start)) {
          // console.log(" current time is earlier than start")
          this.remove_one_week(start) ;
        }
        // if the current day is the day of repetition, but the current time is after the repetition time, then "start" is correct
      }
      // if the days are different, then we calculate the difference and remove that amount of day to "start"
      else {
        // console.log(" else")
        var go_back_days = start_day - action.repetition_day ;
        if (go_back_days < 0) {
          go_back_days += 7
        }
        // console.log(" go_back_days : ", go_back_days)
        for (let i=0; i<go_back_days; i++) {
          // console.log(" went back")
          this.remove_one_day(start) ;
        }
      }

    }

    // console.log("action.name : ", action.name)
    // console.log("action.creation_date : ", action.creation_date)
    // console.log("action.repetition : ", action.repetition)
    // console.log("start : ", start)
    // console.log("last_done : ", last_done)
    // console.log("current_date : ", current_date)
    // console.log("this.is_earlier_than(start, last_done) : ", this.is_earlier_than(start, last_done))
    // console.log("this.is_earlier_than(last_done, start) : ", this.is_earlier_than(last_done, start))

    if (this.is_earlier_than(start, last_done)) var done = true ;
    if (this.is_earlier_than(last_done, start)) var done = false ;
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

  remove_one_week(input_date: DateObject) : void {
    for (let i=0 ; i<7 ; i++) {
      this.remove_one_day(input_date) ;
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
