import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pretty-date'
})
export class PrettyDatePipe implements PipeTransform {

  transform(date :Date) : string {
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

}
